data "aws_iam_policy_document" "assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
  }
}

data "aws_iam_policy_document" "this" {
  for_each = var.functions
  dynamic "statement" {
    for_each = concat(lookup(each.value, "statements", []), var.default_statements)

    content {
      sid           = lookup(statement.value, "sid", replace(statement.key, "/[^0-9A-Za-z]*/", ""))
      effect        = lookup(statement.value, "effect", null)
      actions       = lookup(statement.value, "actions", null)
      not_actions   = lookup(statement.value, "not_actions", null)
      resources     = lookup(statement.value, "resources", null)
      not_resources = lookup(statement.value, "not_resources", null)

      dynamic "principals" {
        for_each = lookup(statement.value, "principals", [])
        content {
          type        = principals.value.type
          identifiers = principals.value.identifiers
        }
      }

      dynamic "not_principals" {
        for_each = lookup(statement.value, "not_principals", [])
        content {
          type        = not_principals.value.type
          identifiers = not_principals.value.identifiers
        }
      }

      dynamic "condition" {
        for_each = lookup(statement.value, "condition", [])
        content {
          test     = condition.value.test
          variable = condition.value.variable
          values   = condition.value.values
        }
      }
    }
  }
}

data "aws_iam_policy" "basic_policy" {
  name = "AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "this" {
  for_each           = var.functions
  name               = "${local.app_env_fn_name}-${each.key}"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy" "this" {
  for_each = var.functions
  role     = aws_iam_role.this[each.key].id
  policy   = data.aws_iam_policy_document.this[each.key].json
}

resource "aws_iam_role_policy_attachment" "this" {
  for_each   = var.functions
  role       = aws_iam_role.this[each.key].name
  policy_arn = data.aws_iam_policy.basic_policy.arn
}

# IAM configuration for resolver permissions
data "aws_iam_policy_document" "appsync_datasource_assume_role_policy_document" {
  statement {
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = ["appsync.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "appsync_datasource_logging_policy_document" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "arn:aws:logs:*:*:*"
    ]
  }
}

locals {
  functions_with_resolver        = { for key, value in var.functions : key => value if value.create_resolver }
  functions_with_resolver_arns   = [for key in keys(local.functions_with_resolver) : aws_lambda_function.this[key].arn]
  chunked_resolver_function_arns = chunklist(local.functions_with_resolver_arns, 30)
}

resource "aws_iam_role" "appsync_datasource_role" {
  name               = "${local.app_env_fn_name}-appsync-datasource-role"
  assume_role_policy = data.aws_iam_policy_document.appsync_datasource_assume_role_policy_document.json
}

data "aws_iam_policy_document" "appsync_datasource_lambda_invocation_policy_document" {
  for_each = { for idx, val in local.chunked_resolver_function_arns : idx => val }

  statement {
    actions   = ["lambda:InvokeFunction"]
    resources = each.value
  }
}

resource "aws_iam_role_policy" "appsync_datasource_logging_policy" {
  name   = "${local.app_env_fn_name}-appsync-datasource-logging"
  role   = aws_iam_role.appsync_datasource_role.id
  policy = data.aws_iam_policy_document.appsync_datasource_logging_policy_document.json
}


resource "aws_iam_role_policy" "appsync_datasource_lambda_invocation_policy" {
  for_each = data.aws_iam_policy_document.appsync_datasource_lambda_invocation_policy_document

  name   = "appsync_datasource_lambda_invocation_policy_${each.key}"
  role   = aws_iam_role.appsync_datasource_role.id
  policy = each.value.json
}

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

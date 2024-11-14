terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    archive = {
      source = "hashicorp/archive"
    }
  }
}

locals {
  app_env_fn_name = "${var.app_name}-${var.env}"
}

data "archive_file" "this" {
  for_each    = var.publish ? var.functions : {}
  output_path = "${path.root}/out/${each.key}.zip"
  source_dir  = lookup(each.value, "source_dir", "${path.root}/../lambda")
  type        = "zip"
}

resource "aws_lambda_function" "this" {
  for_each      = var.functions
  function_name = "${local.app_env_fn_name}-${each.key}"
  runtime       = lookup(each.value, "runtime", var.default_runtime)
  handler       = "${var.dist_sub_dir}/${each.key}.handler"
  # handler = "${each.key}/${each.key}.handler"
  role    = aws_iam_role.this[each.key].arn
  filename         = var.publish ? data.archive_file.this[each.key].output_path : null
  source_code_hash = var.publish ? data.archive_file.this[each.key].output_base64sha256 : null
  # filename         = lookup(each.value, "source_zip", null)
  # source_code_hash = filebase64sha256(lookup(each.value, "source_zip", null))
  publish          = var.publish
  timeout          = each.value.timeout
  layers           = lookup(each.value, "lambda_layer_arn", null)
  environment {
    variables = merge(var.default_env_vars, lookup(each.value, "env_vars", {}))
  }
}

resource "aws_appsync_datasource" "this" {
  for_each         = var.create_resolver ? var.functions : {}
  api_id           = var.appsync_id
  name             = each.key
  type             = "AWS_LAMBDA"
  service_role_arn = var.appsync_role_arn

  lambda_config {
    function_arn = aws_lambda_function.this[each.key].arn
  }
}

resource "aws_appsync_resolver" "this" {
  # for_each          = var.functions
  for_each = var.create_resolver ? var.functions : {}
  # count             = var.create_resolver ? length(var.functions) : 0
  api_id            = var.appsync_id
  field             = each.key
  type              = each.value.resolver_type
  data_source       = aws_appsync_datasource.this[each.key].name
  request_template  = file(lookup(each.value, "request_template", "${path.root}/../api/lambda.default.request.vtl"))
  response_template = file(lookup(each.value, "response_template", "${path.root}/../api/lambda.default.response.vtl"))

  caching_config {
    caching_keys = lookup(each.value, "caching_keys", ["$context.identity"])
    ttl          = 900
  }
}

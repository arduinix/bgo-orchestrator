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

# data "archive_file" "this" {
#   for_each    = var.publish && (lookup(each.value, "loading_method", var.default_loading_method) == "tf-zip") ? var.functions : {}
#   output_path = "${path.root}/out/${lookup(each.value, "function_group", "")}/${lookup(each.value, "service_name", var.default_service_name)}/${each.key}.zip"
#   source_dir  = lookup(each.value, "source_dir", "${path.root}/../lambda")
#   type        = "zip"
# }

resource "aws_lambda_function" "this" {
  for_each      = var.functions
  function_name = "${local.app_env_fn_name}-${lookup(each.value, "service_name", var.default_service_name)}-${each.key}"
  runtime       = lookup(each.value, "runtime", var.default_runtime)
  handler       = lookup(each.value, "custom_handler", "${each.key}.handler")
  role          = aws_iam_role.this[each.key].arn
  # filename         = var.publish ? data.archive_file.this[each.key].output_path : null
  # source_code_hash = var.publish ? data.archive_file.this[each.key].output_base64sha256 : null
  filename         = var.publish ? lookup(each.value, "source_zip", null) : null
  source_code_hash = var.publish ? filebase64sha256(lookup(each.value, "source_zip", null)) : null
  publish          = var.publish
  timeout          = lookup(each.value, "timeout", var.default_timeout)
  layers           = lookup(each.value, "lambda_layer_arn", null)
  environment {
    variables = merge(var.default_env_vars, lookup(each.value, "env_vars", {}))
  }
}

resource "aws_appsync_datasource" "this" {
  for_each = {
    for key, value in var.functions : key => value
    if try(value.create_resolver, false)
  }
  api_id           = var.appsync_id
  name             = each.key
  type             = "AWS_LAMBDA"
  service_role_arn = var.appsync_role_arn

  lambda_config {
    function_arn = aws_lambda_function.this[each.key].arn
  }
}

resource "aws_appsync_resolver" "this" {
  # for_each = var.create_resolver ? var.functions : {}
  for_each = {
    for key, value in var.functions : key => value
    if try(value.create_resolver, false)
  }
  api_id            = var.appsync_id
  field             = each.key
  type              = each.value.resolver_type
  data_source       = aws_appsync_datasource.this[each.key].name
  request_template  = file(lookup(each.value, "request_template", var.default_request_template))
  response_template = file(lookup(each.value, "response_template", var.default_response_template))

  caching_config {
    caching_keys = lookup(each.value, "caching_keys", ["$context.identity"])
    ttl          = 900
  }
}

resource "aws_lambda_permission" "this" {
  for_each = {
    for key, value in var.functions : key => value
    if try(value.create_resolver, false)
  }
  statement_id  = "appsync_lambda_${each.key}"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.this[each.key].function_name
  principal     = "appsync.amazonaws.com"
  source_arn    = var.appsync_arn
}

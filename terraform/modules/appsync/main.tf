terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

resource "aws_appsync_graphql_api" "this" {
  name = var.app_env
  #authentication_type = "AWS_LAMBDA"
  authentication_type = "AMAZON_COGNITO_USER_POOLS"
  schema              = var.schema
  user_pool_config {
    aws_region     = var.region
    default_action = "ALLOW"
    user_pool_id   = var.user_pool_id
  }
  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.logging_role.arn
    exclude_verbose_content  = false
    field_log_level          = "ALL"
  }

  # lambda_authorizer_config {
  #   authorizer_uri = var.authorizer_arn
  # }
}

resource "aws_appsync_api_cache" "this" {
  count                      = var.enable_caching == true ? 1 : 0
  api_id                     = aws_appsync_graphql_api.this.id
  api_caching_behavior       = "PER_RESOLVER_CACHING"
  type                       = var.cache_size
  ttl                        = var.cache_ttl
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
}

# resource "aws_lambda_permission" "this" {
#   statement_id  = "appsync_lambda_authorizer"
#   action        = "lambda:InvokeFunction"
#   function_name = var.authorizer_name
#   principal     = "appsync.amazonaws.com"
#   source_arn    = aws_appsync_graphql_api.this.arn
# }

# resource "aws_lambda_permission" "door_crud_function" {
#   statement_id  = "appsync_lambda_authorizer"
#   action        = "lambda:InvokeFunction"
#   function_name = var.door_crud_function_name
#   principal     = "appsync.amazonaws.com"
#   source_arn    = aws_appsync_graphql_api.this.arn
# }

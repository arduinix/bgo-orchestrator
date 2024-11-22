terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

resource "aws_appsync_graphql_api" "this" {
  name = "${var.app_env}-${var.api_name}"
  #authentication_type = "AWS_LAMBDA"
  authentication_type = "AMAZON_COGNITO_USER_POOLS"
  schema              = var.schema
  introspection_config = "ENABLED"
  user_pool_config {
    aws_region     = var.region
    default_action = "ALLOW"
    user_pool_id   = var.user_pool_id
  }

  dynamic "additional_authentication_provider" {
    for_each = var.enable_api_key ? [1] : []
    content {
      authentication_type = "API_KEY"
    }
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

resource "aws_appsync_api_key" "this" {
  count   = var.enable_api_key ? 1 : 0
  api_id  = aws_appsync_graphql_api.this.id
  expires = timeadd(timestamp(), "720h") # 30 days

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_appsync_domain_name" "this" {
  count           = var.enable_custom_subdomain ? 1 : 0
  domain_name     = var.api_custom_domain
  certificate_arn = var.certificate_arn
}

resource "aws_appsync_domain_name_api_association" "this" {
  count           = var.enable_custom_subdomain ? 1 : 0
  domain_name     = aws_appsync_domain_name.this[0].domain_name
  api_id          = aws_appsync_graphql_api.this.id
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

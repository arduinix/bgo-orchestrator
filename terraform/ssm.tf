resource "aws_ssm_parameter" "frontend_bucket_name" {
  name        = "${local.ssm_prefix}/frontend_bucket_name"
  description = "The name of the S3 bucket where the frontend is hosted"
  type        = "String"
  value       = aws_s3_bucket.site_bucket.bucket
}

resource "aws_ssm_parameter" "cloudfront_distribution_id" {
  name        = "${local.ssm_prefix}/cloudfront_distribution_id"
  description = "The id of the CloudFront distribution"
  type        = "String"
  value       = aws_cloudfront_distribution.site_distribution.id
}

resource "aws_ssm_parameter" "cognito_user_pool_id" {
  count       = var.enable_cognito ? 1 : 0
  name        = "${local.ssm_prefix}/cognito_user_pool_id"
  description = "The id of the Cognito user pool"
  type        = "String"
  value       = aws_cognito_user_pool.this[0].id
}

resource "aws_ssm_parameter" "cognito_user_client_id" {
  count       = var.enable_cognito ? 1 : 0
  name        = "${local.ssm_prefix}/cognito_user_client_id"
  description = "The id of the Cognito user client"
  type        = "String"
  value       = aws_cognito_user_pool_client.user_client[0].id
}

resource "aws_ssm_parameter" "frontend_auth_fqdn" {
  count       = var.enable_cognito ? 1 : 0
  name        = "${local.ssm_prefix}/frontend_auth_fqdn"
  description = "The domain for the frontend auth"
  type        = "String"
  value       = local.frontend_auth_fqdn
}
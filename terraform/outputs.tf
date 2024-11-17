output "s3_webroot_bucket_name" {
  value = aws_s3_bucket.site_bucket.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.site_distribution.id
}

output "cloudfront_distribution_domain_name" {
  value = aws_cloudfront_distribution.site_distribution.domain_name
}

output "fqdn" {
  value = local.fqdn
}

output "cognito_user_pool_id" {
  value = var.enable_cognito ? aws_cognito_user_pool.this.id : null
}

output "cognito_user_client_id" {
  value = var.enable_cognito ? aws_cognito_user_pool_client.user_client.id : null
}

output "frontend_auth_fqdn" {
  value = var.enable_cognito ? local.frontend_auth_fqdn : null
}

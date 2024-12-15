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
  value = var.enable_cognito ? aws_cognito_user_pool.this[0].id : null
}

output "cognito_user_client_id" {
  value = var.enable_cognito ? aws_cognito_user_pool_client.user_client[0].id : null
}

output "frontend_auth_fqdn" {
  value = var.enable_cognito ? local.frontend_auth_fqdn : null
}

output "appsync_domain" {
  value = module.appsync_bgo_api.appsync_domain
}

output "dynamo_bgo_data_table_name" {
  value = aws_dynamodb_table.bgo_data.name
}
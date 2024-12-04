locals {
  schema_file_location = "${path.root}/../bgo-api/src/schema/schema.graphql"
}

module "appsync_bgo_api" {
  source = "./modules/appsync"

  env                     = var.env
  app_env                 = local.app_env
  api_name                = "bgo-api"
  region                  = var.region
  schema                  = file(local.schema_file_location)
  cache_size              = var.api_cache_size
  enable_caching          = var.enable_api_caching
  enable_api_key          = var.enable_api_key
  enable_custom_subdomain = var.enable_custom_api_subdomain
  api_custom_domain       = local.api_fqdn
  certificate_arn         = var.enable_custom_api_subdomain ? aws_acm_certificate.cert[0].arn : null
  user_pool_id            = var.enable_cognito ? aws_cognito_user_pool.this[0].id : null
  route53_zone_id         = aws_route53_record.record[0].zone_id
}

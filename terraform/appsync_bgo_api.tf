locals {
  schema_file_location = "${path.root}/../bgo-api/src/schema/schema.graphql"
}

module "appsync_bgo_api" {
  source = "./modules/appsync"

  env            = var.env
  app_env        = local.app_env
  region         = var.region
  schema         = file(local.schema_file_location)
  cache_size     = var.api_cache_size
  enable_caching = var.enable_api_caching
  user_pool_id   = var.enable_cognito ? aws_cognito_user_pool.this[0].id : null
}

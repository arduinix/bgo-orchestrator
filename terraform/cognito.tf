resource "aws_cognito_user_pool" "this" {
  count = var.enable_cognito ? 1 : 0
  name  = "${local.app_env}-cognito-user-pool"
  admin_create_user_config {
    allow_admin_create_user_only = true
  }
}

resource "random_string" "frontend_auth_domain" {
  count   = var.enable_cognito ? 1 : 0
  length  = 16
  special = false
  upper   = false
  numeric = true
  keepers = {
    "cognito_user_pool_id" = aws_cognito_user_pool.this[0].id
  }
}

resource "aws_cognito_user_pool_domain" "frontend_auth" {
  count        = var.enable_cognito ? 1 : 0
  domain       = "${var.frontend_auth_domain}${random_string.frontend_auth_domain[0].result}"
  user_pool_id = aws_cognito_user_pool.this[0].id
}

resource "aws_cognito_user_pool_client" "user_client" {
  count        = var.enable_cognito ? 1 : 0
  name         = "${local.app_env}-user-client-app"
  user_pool_id = aws_cognito_user_pool.this[0].id
}

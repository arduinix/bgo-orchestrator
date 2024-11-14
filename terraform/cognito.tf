resource "aws_cognito_user_pool" "this" {
  name = "${local.app_env}-cognito-user-pool"
  admin_create_user_config {
    allow_admin_create_user_only = true
  }
}

resource "random_string" "frontend_auth_domain" {
  length  = 16
  special = false
  upper   = false
  numeric = true
  keepers = {
    "cognito_user_pool_id" = aws_cognito_user_pool.this.id
  }
}

resource "aws_cognito_user_pool_domain" "frontend_auth" {
  domain       = "${var.frontend_auth_domain}${random_string.frontend_auth_domain.result}"
  user_pool_id = aws_cognito_user_pool.this.id
}

resource "aws_cognito_user_pool_client" "user_client" {
  name         = "${local.app_env}-user-client-app"
  user_pool_id = aws_cognito_user_pool.this.id
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.this.id
}

output "cognito_user_client_id" {
  value = aws_cognito_user_pool_client.user_client.id
}

output "frontend_auth_fqdn" {
  value = local.frontend_auth_fqdn
}

locals {
  app_env            = "${var.app_name}-${var.env}"
  app_env_alpha      = "${var.app_name}${var.env}"
  fqdn               = var.domain_name == null ? "" : "${var.subdomain}.${var.domain_name}"
  api_fqdn           = var.domain_name == null ? "" : "api.${var.subdomain}.${var.domain_name}"
  ssm_prefix         = "/${var.app_name}/${var.env}"
  frontend_auth_fqdn = var.enable_cognito ? "${var.frontend_auth_domain}${random_string.frontend_auth_domain[0].result}.auth.${var.region}.amazoncognito.com" : null
  # fqdn = var.domain_name == null ? "" : var.domain_name
  content_securty_policy = "default-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'; img-src 'self' https://ddls-cdn.s3.amazonaws.com/ http://www.w3.org/2000/svg; font-src 'self'; media-src 'self';"
  enable_logging         = true
  # libs_layer_filename    = "${path.root}/../backend_api/dist/lib.zip"
}

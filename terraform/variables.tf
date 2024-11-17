variable "app_name" {
  type        = string
  description = "The name of the app."
}

variable "env" {
  type        = string
  description = "The environment name for the app."
}

variable "region" {
  type        = string
  description = "The region the infrastructure is deployed to."
}

variable "domain_name" {
  type        = string
  default     = null
  description = "The domain name under which the app is hosted."
}

variable "subdomain" {
  type        = string
  description = "The subdomain for the app namespace."
}

variable "domain_is_private" {
  type        = bool
  default     = false
  description = "Is the domain private?"
}

variable "acm_region" {
  type        = string
  description = "The region where to create the ACM certificate"
  default     = "us-east-1"
}

variable "s3_log_retention_days" {
  type        = number
  default     = 15
  description = "The number of days to retain S3 logs."
}

variable "frontend_auth_domain" {
  type        = string
  default     = "portalauth"
  description = "The domain for the frontend auth"
}

variable "enable_cognito" {
  type        = bool
  default     = false
  description = "Enable Cognito for the frontend auth"
}

variable "manage_route53_zone" {
  type        = bool
  default     = false
  description = "Should this stack manage the Route53 zone?"
}
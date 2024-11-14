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
  description = "The domain name for the API."
}

variable "subdomain" {
  type        = string
  description = "The subdomain for the application namespace."
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

# variable "default_cloudwatch_log_group_retention_in_days" {
#   type        = number
#   default     = 15
#   description = "value in days to set the default retention in CloudWatch Log Groups"
# }

variable "frontend_auth_domain" {
  type = string
  default = "portalauth"
  description = "The domain for the frontend auth"
}
variable "app_name" {
  type        = string
  description = "The app name."
}

variable "env" {
  type        = string
  description = "The environment name for the microservice."
}

variable "region" {
  type        = string
  description = "The region the infrastructure is deployed to."
}


variable "functions" {
  description = "The function configuration"
}


variable "default_statements" {
  default     = []
  description = "The lambda iam policy document statements."
}

variable "function_group" {
  type        = string
  description = "The name of the group that the fucntions belong to."
}


variable "appsync_id" {
  type        = string
  default     = null
  description = "The appsync id."
}

variable "appsync_role_arn" {
  type        = string
  default     = null
  description = "The appsync service role arn."
}

variable "caching_keys" {
  type        = list(string)
  default     = ["$context.identity"]
  description = "A list of caching keys for the resolver."
}



variable "env_vars" {
  type        = map(string)
  default     = {}
  description = "Additional lambda environment variables to merge with the default."
}





variable "subdir" {
  type        = string
  description = "The subdirectory of the lambda function."
  default     = null
}


variable "default_env_vars" {
  type        = map(string)
  default     = {}
  description = "Default lambda environment variables to apply to all lambdas"
}

variable "default_runtime" {
  type        = string
  default     = "nodejs20.x"
  description = "The default lambda runtime"
}

variable "publish" {
  type        = bool
  default     = true
  description = "Whether to publish the lambda function"
}

variable "create_resolver" {
  type        = bool
  default     = true
  description = "Whether to create a resolver for the lambda function"
}

variable "default_service_name" {
  type        = string
  default     = "service"
  description = "The default service name"
}
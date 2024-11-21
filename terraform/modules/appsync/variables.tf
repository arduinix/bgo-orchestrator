variable "app_env" {
  type        = string
  description = "The app namee and env."
}

variable "authorizer_arn" {
  type        = string
  description = "The arn for the lambda authorizer."
  default = null
}

variable "authorizer_name" {
  type        = string
  description = "The name for the lambda authorizer."
  default = null
}

variable "cache_size" {
  type        = string
  default     = "SMALL"
  description = "The size of the API cache"

  validation {
    condition = contains([
      "SMALL",
      "MEDIUM",
      "LARGE",
      "XLARGE",
      "LARGE_2X",
      "LARGE_4X",
      "LARGE_8X",
      "LARGE_12X"
    ], var.cache_size)
    error_message = "Invalid cache_size variable."
  }
}

variable "cache_ttl" {
  type        = number
  default     = 120
  description = "The time to live for the cache."
}

variable "enable_caching" {
  type        = bool
  default     = false
  description = "Should caching be enabled?"
}

variable "env" {
  type        = string
  description = "The environment name for the app."
}

variable "region" {
  type        = string
  description = "The region the infrastructure is deployed to."
}

variable "schema" {
  type        = string
  description = "The schema for the API."
}

variable "statements" {
  default = [
    {
      actions   = ["lambda:InvokeFunction"]
      resources = ["*"]
    }
  ]
  description = "The lambda iam policy document statements. The default is lambda:InvokeFunction on all lambdas."
}

variable "user_pool_id" {
  type = string
  description = "The user pool id for the API."
  default = null
}

output "appsync_id" {
  description = "The appsync API Id."
  value       = aws_appsync_graphql_api.this.id
}

output "appsync_arn" {
  description = "The ARN of the appsync API."
  value       = aws_appsync_graphql_api.this.arn
}

output "appsync_domain" {
  description = "The domain for the appsync endpoint."
  # value       = trimsuffix(trimprefix(aws_appsync_graphql_api.this.uris["GRAPHQL"], "https://"), "/graphql")
  # value       = aws_appsync_graphql_api.this.uris["GRAPHQL"]
  value = var.enable_custom_subdomain ? aws_appsync_domain_name.this[0].domain_name : aws_appsync_graphql_api.this.uris["GRAPHQL"]
}

output "appsync_api_key" {
  description = "The API key"
  value       = var.enable_api_key ? aws_appsync_api_key.this[0].key : "none"
}


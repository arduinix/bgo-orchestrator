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
  value       = trimsuffix(trimprefix(aws_appsync_graphql_api.this.uris["GRAPHQL"], "https://"), "/graphql")
}
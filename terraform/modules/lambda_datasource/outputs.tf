output "lambda_function_arn" {
  value = [
    for fn in aws_lambda_function.this : fn.arn
  ]
}

output "data_source_name" {
  value = [
    for ds in aws_appsync_datasource.this : ds.name
  ]
}


locals {
  bgo_api_deps_layer_dir       = "${path.root}/../bgo-api/dist/deps"
  bgo_api_functions_parent_dir = "${path.root}/../bgo-api/dist/"
  bgo_api_function_group_name  = "bgo-api"

}

# data "archive_file" "bgo_api_deps" {
#   source_dir  = local.bgo_api_deps_layer_dir
#   output_path = "${path.root}/out/bgo-api/deps.zip"
#   type        = "zip"
# }

resource "aws_lambda_layer_version" "bgo_api_deps" {
  layer_name       = "${local.app_env}-${local.bgo_api_function_group_name}-deps2"
  # filename         = data.archive_file.bgo_api_deps.output_path
  # source_code_hash = data.archive_file.bgo_api_deps.output_base64sha256
  filename            = "${local.bgo_api_functions_parent_dir}/deps.zip"
  source_code_hash    = filebase64sha256("${local.bgo_api_functions_parent_dir}/deps.zip")
  compatible_runtimes = ["nodejs20.x"]
}


module "lambda_datasources_bgo_api" {
  source          = "./modules/lambda_datasource"
  env             = var.env
  app_name        = var.app_name
  region          = var.region
  function_group  = local.bgo_api_function_group_name
  create_resolver = false
  default_statements = [{
    sid       = "AllowLambdaToLog"
    effect    = "Allow"
    actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["*"]
  }]
  default_env_vars = {
    POWERTOOLS_LOGGER_LOG_EVENT = true
    ENV                         = var.env
  }
  functions = {
    getMessage = {
      service_name  = "exampleService"
      resolver_type = "Query"
      # source_dir    = "${local.bgo_api_functions_parent_dir}/exampleService/getMessage/"
      source_zip       = "${local.bgo_api_functions_parent_dir}/exampleService/getMessage.zip"
      timeout          = 30
      lambda_layer_arn = [aws_lambda_layer_version.bgo_api_deps.arn]
      statements       = []
    },
  }
}

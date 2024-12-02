
locals {
  bgo_api_deps_layer_dir       = "${path.root}/../bgo-api/dist/deps"
  bgo_api_functions_parent_dir = "${path.root}/../bgo-api/dist/"
  bgo_api_function_group_name  = "bgo-api"
  default_request_template     = "${path.root}/../bgo-api/src/resolvers/lambdaGeneric.request.vtl"
  default_response_template    = "${path.root}/../bgo-api/src/resolvers/lambdaGeneric.response.vtl"
  resolver_path_prefix         = "${path.root}/../bgo-api/src/resolvers/"
}

# data "archive_file" "bgo_api_deps" {
#   source_dir  = local.bgo_api_deps_layer_dir
#   output_path = "${path.root}/out/bgo-api/deps.zip"
#   type        = "zip"
# }

resource "aws_lambda_layer_version" "bgo_api_deps" {
  layer_name = "${local.app_env}-${local.bgo_api_function_group_name}-deps"
  # filename         = data.archive_file.bgo_api_deps.output_path
  # source_code_hash = data.archive_file.bgo_api_deps.output_base64sha256
  filename            = "${local.bgo_api_functions_parent_dir}/deps.zip"
  source_code_hash    = filebase64sha256("${local.bgo_api_functions_parent_dir}/deps.zip")
  compatible_runtimes = ["nodejs20.x"]
}


module "lambda_datasources_bgo_api" {
  source                    = "./modules/lambda_datasource"
  env                       = var.env
  app_name                  = var.app_name
  region                    = var.region
  function_group            = local.bgo_api_function_group_name
  default_request_template  = local.default_request_template
  default_response_template = local.default_response_template
  appsync_id = module.appsync_bgo_api.appsync_id
  default_statements = [
    {
      sid       = "AllowLambdaToLog"
      effect    = "Allow"
      actions   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"]
      resources = ["*"]
    },
    {
      sid    = "AllowDataKeyRead"
      effect = "Allow"
      actions = [
        "kms:Decrypt",
        "kms:GenerateDataKey*",
      ]
      resources = ["${aws_kms_key.bgo_data_kms_key.arn}"]
    },
    {
      sid    = "AllowDataTableRead"
      effect = "Allow"
      actions = [
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:BatchGetItem",
      ]
      resources = ["${aws_dynamodb_table.bgo_data.arn}"]
    }
  ]
  default_env_vars = {
    POWERTOOLS_LOGGER_LOG_EVENT = true
    ENV                         = var.env
  }
  functions = {
    getMessage = {
      service_name    = "exampleService"
      resolver_type   = "Query"
      create_resolver = true
      # source_dir    = "${local.bgo_api_functions_parent_dir}/exampleService/getMessage/"
      source_zip       = "${local.bgo_api_functions_parent_dir}/exampleService/getMessage.zip"
      lambda_layer_arn = [aws_lambda_layer_version.bgo_api_deps.arn]
      statements       = []
      # resquest_template =
      # response_template =
    },
  }
}

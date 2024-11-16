data "archive_file" "bgo_api_deps" {
  output_path = "${path.root}/out/bgo-api/deps.zip"
  source_dir  = "${path.root}/../bgo-api/dist/deps/"
  type        = "zip"
}

resource "aws_lambda_layer_version" "bgo_api_deps" {
  filename            = data.archive_file.bgo_api_deps.output_path
  layer_name          = "${local.app_env}-bgo-api-deps"
  source_code_hash    = data.archive_file.dependencies.output_base64sha256
  compatible_runtimes = ["nodejs20.x"]
}


module "lambda_datasources_bgo_api" {
  source          = "./modules/lambda_datasource"
  dist_sub_dir    = "./"
  env             = var.env
  app_name        = var.app_name
  region          = var.region
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
    exampleFunction = {
      fn_name          = "exampleFunction"
      resolver_type    = "Query"
      source_dir       = "${path.root}/../bgo-api/out/exampleFunction/"
      # source_zip       = "${path.root}/../backend_api/dist/createProject.zip"
      timeout          = 30
      lambda_layer_arn = [aws_lambda_layer_version.bgo_api_deps.arn]
      statements       = []
    },
  }
}

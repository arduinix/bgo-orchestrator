module "lambda_datasources_project" {
  source          = "./modules/lambda_datasource"
  dist_sub_dir    = "dist/project"
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
    createProject = {
      fn_name       = "createProject"
      resolver_type = "Mutation"
      source_dir    = "${path.root}/../backend_api/out/project/createProject"
      source_zip       = "${path.root}/../backend_api/dist/createProject.zip"
      timeout          = 30
      lambda_layer_arn = local.libs_layer_arn
      statements       = []

    },
  }

}


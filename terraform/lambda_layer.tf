data "archive_file" "dependencies" {
  output_path = "${path.root}/out/dependencies.zip"
  source_dir  = "${path.root}/../backend_api/dist/dependencies/"
  type        = "zip"
}

resource "aws_lambda_layer_version" "dependencies" {
  filename            = data.archive_file.dependencies.output_path
  layer_name          = "${var.app_name}-${var.env}"
  source_code_hash    = data.archive_file.dependencies.output_base64sha256
  compatible_runtimes = ["nodejs20.x"]
}

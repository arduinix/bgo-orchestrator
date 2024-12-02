
data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = [
      "sts:AssumeRole"
    ]
    principals {
      type        = "Service"
      identifiers = ["appsync.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "logging_policy" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "arn:aws:logs:*:*:*"
    ]
  }
}



resource "aws_iam_role" "logging_role" {
  name               = "${var.app_env}-appsync-${var.region}-logging"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}



resource "aws_iam_role_policy" "logging_policy" {
  name   = "${var.app_env}-appsync-logging"
  role   = aws_iam_role.logging_role.id
  policy = data.aws_iam_policy_document.logging_policy.json
}

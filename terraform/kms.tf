# data "aws_iam_policy_document" "state_bucket_kms_key_policy" {
#   statement {
#     actions   = ["kms:*"]
#     resources = ["*"]

#     principals {
#       type        = "AWS"
#       identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
#     }
#   }

#   statement {
#     actions   = ["kms:GenerateDataKey*"]
#     resources = ["*"]

#     principals {
#       type        = "Service"
#       identifiers = ["s3.amazonaws.com", "cloudfront.amazonaws.com"]
#     }
#   }
# }

# resource "aws_kms_key" "state_bucket_key" {
#   description             = "KMS key for the state bucket"
#   deletion_window_in_days = 10
#   enable_key_rotation     = true
#   policy                  = data.aws_iam_policy_document.state_bucket_kms_key_policy.json
# }

data "aws_iam_policy_document" "contact_topic_key_policy" {
  statement {
    actions   = ["kms:*"]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
  }
}

resource "aws_kms_key" "contect_topic_key" {
  description             = "KMS key for the state bucket"
  deletion_window_in_days = 10
  enable_key_rotation     = true
  policy                  = data.aws_iam_policy_document.contact_topic_key_policy.json
}
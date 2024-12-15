resource "aws_dynamodb_table" "bgo_data" {
  name         = "${local.app_env}-bgo-data"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"
  range_key    = "sk"
  attribute {
    name = "pk"
    type = "S"
  }
  attribute {
    name = "sk"
    type = "S"
  }
  ttl {
    attribute_name = "expiration_ttl"
    enabled        = true
  }
  server_side_encryption {
    enabled     = true
    kms_key_arn = aws_kms_key.bgo_data_kms_key.arn
  }
  deletion_protection_enabled = var.enable_table_deletion_protection
  #   on_demand_throughput {
  #     max_read_units = 300
  #     max_write_units = 150
  #   }

}

data "aws_iam_policy_document" "bgo_dynamo_kms_key_policy" {
  statement {
    actions   = ["kms:*"]
    resources = ["*"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
  }
}

resource "aws_kms_key" "bgo_data_kms_key" {
  description             = "KMS key for bgo app dynamodb tables"
  deletion_window_in_days = 10
  enable_key_rotation     = true
  policy                  = data.aws_iam_policy_document.bgo_dynamo_kms_key_policy.json
}

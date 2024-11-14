resource "aws_s3_bucket" "logs_bucket" {
  bucket_prefix = lower("${local.app_env}-logs")
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs_bucket" {
  bucket = aws_s3_bucket.logs_bucket.bucket

  rule {
    apply_server_side_encryption_by_default {
      # kms_master_key_id = aws_kms_key.logs_key.arn
      # sse_algorithm     = "aws:kms"
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "logs_bucket" {
  bucket = aws_s3_bucket.logs_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "logs_bucket" {
  bucket = aws_s3_bucket.logs_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_iam_policy_document" "logs_bucket_policy" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["delivery.logs.amazonaws.com"]
    }

    actions = ["s3:PutObject"]

    resources = [
      aws_s3_bucket.logs_bucket.arn,
      "${aws_s3_bucket.logs_bucket.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "logs_bucket" {
  bucket = aws_s3_bucket.logs_bucket.id
  policy = data.aws_iam_policy_document.logs_bucket_policy.json
}

resource "aws_s3_bucket_acl" "logs_bucket" {
  count  = local.enable_logging == true ? 1 : 0
  bucket = aws_s3_bucket.logs_bucket.id
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket_lifecycle_configuration" "logs_bucket" {
  bucket = aws_s3_bucket.logs_bucket.id

  rule {
    id     = "logsRetention"
    status = "Enabled"

    expiration {
      days = var.s3_log_retention_days
    }
  }
}

resource "aws_s3_bucket" "site_bucket" {
  bucket_prefix = lower("${local.app_env}-site")
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_cors_configuration" "site_bucket_cors" {
  bucket = aws_s3_bucket.site_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT", "DELETE"]
    allowed_origins = ["*"]
    expose_headers = [
      "ETag",
      "x-amz-meta-uploaded-user-email",
      "x-amz-meta-uploaded-timestamp",
      "x-amz-meta-uploaded-by-user-name",
      "x-amz-meta-message",
      "x-amz-meta-description"
    ]
    max_age_seconds = 60
  }
}

resource "aws_cloudfront_origin_access_identity" "site_bucket" {
  comment = "Access to ${aws_s3_bucket.site_bucket.id}"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site_bucket" {
  bucket = aws_s3_bucket.site_bucket.bucket

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
      # sse_algorithm     = "aws:kms"
      # kms_master_key_id = aws_kms_key.state_bucket_key.arn
    }
  }
}

resource "aws_s3_bucket_logging" "site_bucket" {
  bucket = aws_s3_bucket.site_bucket.id

  target_bucket = aws_s3_bucket.logs_bucket.id
  target_prefix = "logs/site/"
}

resource "aws_s3_bucket_public_access_block" "site_bucket" {
  bucket = aws_s3_bucket.site_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_iam_policy_document" "site_bucket_policy" {
  statement {
    actions = ["s3:GetObject"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.site_bucket.iam_arn]
    }
    effect = "Allow"

    resources = [
      aws_s3_bucket.site_bucket.arn,
      "${aws_s3_bucket.site_bucket.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "site_bucket_policy" {
  bucket = aws_s3_bucket.site_bucket.id
  policy = data.aws_iam_policy_document.site_bucket_policy.json
}

resource "aws_s3_bucket_ownership_controls" "this" {
  bucket = aws_s3_bucket.site_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "this" {
  depends_on = [aws_s3_bucket_ownership_controls.this]

  bucket = aws_s3_bucket.site_bucket.id
  acl    = "private"
}
resource "aws_cloudfront_function" "site_bucket_rewrite" {
  name    = "${local.app_env}-fronetend-rewrite"
  runtime = "cloudfront-js-1.0"

  code = file("${path.module}/functions/url-rewrite.js")
}

data "aws_cloudfront_response_headers_policy" "api_managed_response_headers_policy" {
  name = "Managed-CORS-with-preflight-and-SecurityHeadersPolicy"
}

resource "aws_cloudfront_distribution" "site_distribution" {
  origin {
    domain_name = aws_s3_bucket.site_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.site_bucket.id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.site_bucket.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Frontend for ${local.app_env}"
  default_root_object = "index.html"
  web_acl_id          = aws_wafv2_web_acl.web_acl_default.arn
  dynamic "logging_config" {
    for_each = local.enable_logging ? [1] : []
    content {
      include_cookies = false
      bucket          = aws_s3_bucket.logs_bucket.bucket_domain_name
      prefix          = "${local.app_env}/logs"
    }
  }

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods             = ["GET", "HEAD", "OPTIONS"]
    target_origin_id           = aws_s3_bucket.site_bucket.id
    viewer_protocol_policy     = "redirect-to-https"
    compress                   = true
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.api_managed_response_headers_policy.id
    origin_request_policy_id   = aws_cloudfront_origin_request_policy.request_policy.id
    cache_policy_id            = aws_cloudfront_cache_policy.cache_policy.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.site_bucket_rewrite.arn
    }
  }

  aliases = var.domain_name == null ? null : [local.fqdn]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = var.domain_name == null ? true : false
    acm_certificate_arn            = var.domain_name == null ? null : aws_acm_certificate.cert[0].arn
    minimum_protocol_version       = var.domain_name == null ? "TLSv1" : "TLSv1.2_2021"
    ssl_support_method             = var.domain_name == null ? null : "sni-only"
  }

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  tags = {
    app_env = local.app_env
  }

  depends_on = [aws_acm_certificate.cert, aws_cloudfront_origin_access_identity.site_bucket]
}

resource "aws_cloudfront_origin_request_policy" "request_policy" {
  name    = "${local.app_env}-frontend-request-policy"
  comment = "Request policy for ${local.app_env}-frontend"

  cookies_config {
    cookie_behavior = "none"
  }

  headers_config {
    header_behavior = "whitelist"
    headers {
      items = ["Access-Control-Request-Headers", "Access-Control-Request-Method", "Origin"]
    }
  }

  query_strings_config {
    query_string_behavior = "none"
  }
}

resource "aws_cloudfront_cache_policy" "cache_policy" {
  name    = "${local.app_env}-frontend-cache-policy"
  comment = "Cache policy for ${local.app_env}-frontend"

  default_ttl = 50
  max_ttl     = 100
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }

    enable_accept_encoding_gzip   = true
    enable_accept_encoding_brotli = true


    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Access-Control-Request-Headers", "Access-Control-Request-Method", "Origin"]
      }
    }

    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

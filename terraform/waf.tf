# TODO: the waf configuration needs to be updated if you update this.
resource "aws_wafv2_web_acl" "web_acl_default" {
  name        = "${local.app_env}-default-web-acl"
  description = "Web ACL for ${local.app_env}"
  scope       = "CLOUDFRONT"
  provider    = aws.va

  custom_response_body {
    key          = "Access-Denied"
    content      = "<div>Error: Access Denied</div>"
    content_type = "TEXT_HTML"
  }
  default_action {
    allow {}
  }
  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${local.app_env}-web-acl-metric"
    sampled_requests_enabled   = true
  }
  rule {
    name     = "${local.app_env}-rate-based-rule"
    priority = 1
    statement {
      rate_based_statement {
        limit              = 100
        aggregate_key_type = "IP"
      }
    }
    action {
      block {
        custom_response {
          custom_response_body_key = "Access-Denied"
          response_code            = 403
        }
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${local.app_env}-rate-based-rule-metric"
      sampled_requests_enabled   = true
    }
  }
}


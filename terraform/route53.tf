
resource "aws_route53_zone" "zone" {
  # count = var.domain_name == null ? 0 : 1
  count = var.domain_name == null ? 0 : (var.manage_route53_zone ? 1 : 0)
  name  = var.domain_name
}

data "aws_route53_zone" "zone" {
  # count        = var.domain_name == null ? 0 : 1
  count        = var.domain_name == null ? 0 : (var.manage_route53_zone ? 0 : 1)
  name         = var.domain_name
  private_zone = var.domain_is_private
}

resource "aws_route53_record" "dns_validation" {
  for_each = var.domain_name == null ? {} : {
    for dvo in aws_acm_certificate.cert[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  # zone_id         = aws_route53_zone.zone[0].zone_id
  # zone_id = data.aws_route53_zone.zone[0].zone_id
  zone_id = var.manage_route53_zone ? aws_route53_zone.zone[0].zone_id : data.aws_route53_zone.zone[0].zone_id
}

resource "aws_route53_record" "record" {
  count = var.domain_name == null ? 0 : 1
  # zone_id = aws_route53_zone.zone[0].zone_id
  # zone_id = data.aws_route53_zone.zone[0].zone_id
  zone_id = var.manage_route53_zone ? aws_route53_zone.zone[0].zone_id : data.aws_route53_zone.zone[0].zone_id
  name    = local.fqdn
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.site_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
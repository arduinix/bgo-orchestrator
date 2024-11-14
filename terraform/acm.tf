resource "aws_acm_certificate" "cert" {
  count                     = var.domain_name == null ? 0 : 1
  domain_name               = local.fqdn
  subject_alternative_names = []
  validation_method         = "DNS"
  provider                  = aws.va

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert_validation" {
  count                   = var.domain_name == null ? 0 : 1
  certificate_arn         = aws_acm_certificate.cert[0].arn
  validation_record_fqdns = [for record in aws_route53_record.dns_validation : record.fqdn]
  provider                = aws.va
}
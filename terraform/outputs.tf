output "s3_webroot_bucket_name" {
  value = aws_s3_bucket.site_bucket.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.site_distribution.id
}

output "cloudfront_distribution_domain_name" {
  value = aws_cloudfront_distribution.site_distribution.domain_name
}

output "fqdn" {
  value = local.fqdn
}
provider "aws" {
  region = var.region

  default_tags {
    tags = {
      environment = var.env
      app_name    = var.app_name
    }
  }
}

provider "aws" {
  region = var.acm_region
  alias  = "va"

  default_tags {
    tags = {
      environment = var.env
      app_name    = var.app_name
    }
  }
}

provider "aws" {
  region = var.region
  alias  = "no_tags"

}

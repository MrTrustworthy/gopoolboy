variable "domain_name_stud" {
  type    = string
  default = ".eu.auth0.com"
}

variable "project_name_stud" {
  type    = string
  default = "-poolboy"
}

locals {
  envs = {
    dev = {
      client_url      = "http://localhost:8080"
      admin_client_url      = "http://localhost:8081"
      domain          = "dev-poolboy${var.domain_name_stud}"
      api_identifier  = "http://dev-poolboy-api"
      password_policy = "none"
    }
    staging = {
      client_url      = "https://app.gopoolboy.dev"
      admin_client_url      = "https://admin.gopoolboy.dev"
      domain          = "staging-poolboy${var.domain_name_stud}"
      api_identifier  = "http://staging-poolboy-api"
      password_policy = "fair"
    }
    production = {}
  }
  env = lookup(local.envs, terraform.workspace)
}

// Provided via tfvars file

variable "auth0_client_id" {
  type    = string
  default = ""
}

variable "auth0_client_secret" {
  type    = string
  default = ""
}

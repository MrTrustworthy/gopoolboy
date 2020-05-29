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
      domain          = "dev-poolboy${var.domain_name_stud}"
      api_identifier  = "http://dev-poolboy-api"
      password_policy = "none"
    }
    staging = {
      client_url      = "https://app.gopoolboy.dev"
      domain          = "staging-poolboy${var.domain_name_stud}"
      api_identifier  = "http://staging-poolboy-api"
      password_policy = "fair"
    }
    production = {}
  }
  env = lookup(local.envs, terraform.workspace)
}
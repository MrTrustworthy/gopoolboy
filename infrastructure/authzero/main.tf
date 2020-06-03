
provider "auth0" {
  domain        = local.env.domain
  debug         = true
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}

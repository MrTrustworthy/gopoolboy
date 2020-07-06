resource "auth0_client" "orgamon" {
  name                                = "Orgamon"
  allowed_logout_urls                 = []
  allowed_origins                     = []
  app_type                            = "non_interactive"
  callbacks                           = []
  client_metadata                     = {}
  cross_origin_auth                   = false
  custom_login_page_on                = true
  encryption_key                      = {}
  grant_types                         = ["client_credentials"]
  is_first_party                      = true
  is_token_endpoint_ip_header_trusted = false
  oidc_conformant                     = true
  sso                                 = false
  sso_disabled                        = false
  web_origins                         = []

  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
}

resource "auth0_client" "poolboy_vue_app" {
  name = "Poolboy App"

  allowed_logout_urls  = [local.env.client_url]
  allowed_origins      = []
  app_type             = "spa"
  callbacks            = [local.env.client_url]
  client_metadata      = {}
  cross_origin_auth    = false
  custom_login_page_on = true
  encryption_key       = {}
  grant_types = [
    "authorization_code",
    "implicit",
    "refresh_token",
  ]
  is_first_party                      = true
  is_token_endpoint_ip_header_trusted = false
  oidc_conformant                     = true
  sso                                 = false
  sso_disabled                        = false
  token_endpoint_auth_method          = "none"
  web_origins                         = [local.env.client_url]

  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
}

resource "auth0_client" "poolboy_admin_app" {
  name = "Poolboy Admin App"

  allowed_logout_urls  = [local.env.admin_client_url]
  allowed_origins      = []
  app_type             = "spa"
  callbacks            = [local.env.admin_client_url]
  client_metadata      = {}
  cross_origin_auth    = false
  custom_login_page_on = true
  encryption_key       = {}
  grant_types = [
    "authorization_code",
    "implicit",
    "refresh_token",
  ]
  is_first_party                      = true
  is_token_endpoint_ip_header_trusted = false
  oidc_conformant                     = true
  sso                                 = false
  sso_disabled                        = false
  token_endpoint_auth_method          = "none"
  web_origins                         = [local.env.admin_client_url]

  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
    scopes              = {}
    secret_encoded      = false
  }
}
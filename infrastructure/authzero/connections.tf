
resource "auth0_connection" "user_pw_connection" {
  strategy = "auth0"
  name     = "Username-Password-Authentication"
  options {
    password_policy = local.env.password_policy
  }
}
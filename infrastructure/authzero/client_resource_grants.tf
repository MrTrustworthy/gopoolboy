

resource "auth0_client_grant" "orgamon_management_api_grant" {
  client_id = auth0_client.orgamon.client_id
  audience  = "https://${local.env.domain}/api/v2/"
  scope = [
    "read:users",
    "update:users",
    "delete:users",
    "create:users",
    "read:users_app_metadata",
    "update:users_app_metadata",
    "delete:users_app_metadata",
    "create:users_app_metadata",
    "read:roles"
  ]
}

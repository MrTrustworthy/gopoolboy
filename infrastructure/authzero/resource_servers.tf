resource "auth0_resource_server" "poolboy_api" {

  allow_offline_access                            = false
  enforce_policies                                = true
  identifier                                      = local.env.api_identifier
  name                                            = "Poolboy API"
  options                                         = {}
  signing_alg                                     = "RS256"
  skip_consent_for_verifiable_first_party_clients = true
  token_dialect                                   = "access_token_authz"
  token_lifetime                                  = 86400
  token_lifetime_for_web                          = 7200


  scopes {
    description = "Create/invite new users into the organization"
    value       = "create:users"
  }
  scopes {
    description = "delete users"
    value       = "delete:users"
  }
  scopes {
    description = "modify users"
    value       = "modify:users"
  }
  scopes {
    description = "read organization"
    value       = "read:organization"
  }
  scopes {
    description = "read users"
    value       = "read:users"
  }

  scopes {
    description = "Create Crumbs"
    value       = "create:crumbs"
  }
  scopes {
    description = "Read Crumbs"
    value       = "read:crumbs"
  }
  scopes {
    description = "Create CrumbLinks"
    value       = "create:crumblinks"
  }
  scopes {
    description = "Read CrumbLinks"
    value       = "read:crumblinks"
  }
  scopes {
    description = "Create Tags"
    value       = "create:tags"
  }
  scopes {
    description = "Read Tags"
    value       = "read:tags"
  }
}

resource "auth0_resource_server" "management_api" {
  allow_offline_access                            = false
  enforce_policies                                = false
  identifier                                      = "https://${local.env.domain}/api/v2/"
  name                                            = "Auth0 Management API"
  options                                         = {}
  signing_alg                                     = "RS256"
  skip_consent_for_verifiable_first_party_clients = false
  token_lifetime                                  = 86400
  token_lifetime_for_web                          = 7200

  scopes {
    description = "Blacklist Tokens"
    value       = "blacklist:tokens"
  }
  scopes {
    description = "Configure new custom domains"
    value       = "create:custom_domains"
  }
  scopes {
    description = "Create Actions"
    value       = "create:actions"
  }
  scopes {
    description = "Create Client Grants"
    value       = "create:client_grants"
  }
  scopes {
    description = "Create Client Keys"
    value       = "create:client_keys"
  }
  scopes {
    description = "Create Clients"
    value       = "create:clients"
  }
  scopes {
    description = "Create Connections"
    value       = "create:connections"
  }
  scopes {
    description = "Create Custom User Blocks"
    value       = "create:user_custom_blocks"
  }
  scopes {
    description = "Create Device Credentials"
    value       = "create:device_credentials"
  }
  scopes {
    description = "Create Email Provider"
    value       = "create:email_provider"
  }
  scopes {
    description = "Create Hooks"
    value       = "create:hooks"
  }
  scopes {
    description = "Create Resource Servers"
    value       = "create:resource_servers"
  }
  scopes {
    description = "Create Rules"
    value       = "create:rules"
  }
  scopes {
    description = "Create Shields"
    value       = "create:shields"
  }
  scopes {
    description = "Create User Tickets"
    value       = "create:user_tickets"
  }
  scopes {
    description = "Create Users App Metadata"
    value       = "create:users_app_metadata"
  }
  scopes {
    description = "Create Users"
    value       = "create:users"
  }
  scopes {
    description = "Create email templates"
    value       = "create:email_templates"
  }
  scopes {
    description = "Create enrollment tickets for Guardian"
    value       = "create:guardian_enrollment_tickets"
  }
  scopes {
    description = "Create log_streams"
    value       = "create:log_streams"
  }
  scopes {
    description = "Create password checking jobs"
    value       = "create:passwords_checking_job"
  }
  scopes {
    description = "Create roles"
    value       = "create:roles"
  }
  scopes {
    description = "Create signing keys"
    value       = "create:signing_keys"
  }
  scopes {
    description = "Delete Actions"
    value       = "delete:actions"
  }
  scopes {
    description = "Delete Anomaly Detection Blocks"
    value       = "delete:anomaly_blocks"
  }
  scopes {
    description = "Delete Client Grants"
    value       = "delete:client_grants"
  }
  scopes {
    description = "Delete Client Keys"
    value       = "delete:client_keys"
  }
  scopes {
    description = "Delete Clients"
    value       = "delete:clients"
  }
  scopes {
    description = "Delete Connections"
    value       = "delete:connections"
  }
  scopes {
    description = "Delete Custom User Blocks"
    value       = "delete:user_custom_blocks"
  }
  scopes {
    description = "Delete Device Credentials"
    value       = "delete:device_credentials"
  }
  scopes {
    description = "Delete Email Provider"
    value       = "delete:email_provider"
  }
  scopes {
    description = "Delete Guardian enrollments"
    value       = "delete:guardian_enrollments"
  }
  scopes {
    description = "Delete Hooks"
    value       = "delete:hooks"
  }
  scopes {
    description = "Delete Resource Servers"
    value       = "delete:resource_servers"
  }
  scopes {
    description = "Delete Rules Configs"
    value       = "delete:rules_configs"
  }
  scopes {
    description = "Delete Rules"
    value       = "delete:rules"
  }
  scopes {
    description = "Delete Shields"
    value       = "delete:shields"
  }
  scopes {
    description = "Delete User Grants"
    value       = "delete:grants"
  }
  scopes {
    description = "Delete Users App Metadata"
    value       = "delete:users_app_metadata"
  }
  scopes {
    description = "Delete Users"
    value       = "delete:users"
  }
  scopes {
    description = "Delete branding settings"
    value       = "delete:branding"
  }
  scopes {
    description = "Delete custom domains configurations"
    value       = "delete:custom_domains"
  }
  scopes {
    description = "Delete log_streams"
    value       = "delete:log_streams"
  }
  scopes {
    description = "Delete roles"
    value       = "delete:roles"
  }
  scopes {
    description = "Deletes password checking job and all its resources"
    value       = "delete:passwords_checking_job"
  }
  scopes {
    description = "Read Actions"
    value       = "read:actions"
  }
  scopes {
    description = "Read Anomaly Detection Blocks"
    value       = "read:anomaly_blocks"
  }
  scopes {
    description = "Read Client Grants"
    value       = "read:client_grants"
  }
  scopes {
    description = "Read Client Keys"
    value       = "read:client_keys"
  }
  scopes {
    description = "Read Clients"
    value       = "read:clients"
  }
  scopes {
    description = "Read Connections"
    value       = "read:connections"
  }
  scopes {
    description = "Read Custom User Blocks"
    value       = "read:user_custom_blocks"
  }
  scopes {
    description = "Read Device Credentials"
    value       = "read:device_credentials"
  }
  scopes {
    description = "Read Email Provider"
    value       = "read:email_provider"
  }
  scopes {
    description = "Read Guardian enrollments"
    value       = "read:guardian_enrollments"
  }
  scopes {
    description = "Read Guardian factors configuration"
    value       = "read:guardian_factors"
  }
  scopes {
    description = "Read Hooks"
    value       = "read:hooks"
  }
  scopes {
    description = "Read Logs"
    value       = "read:logs"
  }
  scopes {
    description = "Read Multifactor Authentication policies"
    value       = "read:mfa_policies"
  }
  scopes {
    description = "Read Resource Servers"
    value       = "read:resource_servers"
  }
  scopes {
    description = "Read Rules Configs"
    value       = "read:rules_configs"
  }
  scopes {
    description = "Read Rules"
    value       = "read:rules"
  }
  scopes {
    description = "Read Shields"
    value       = "read:shields"
  }
  scopes {
    description = "Read Stats"
    value       = "read:stats"
  }
  scopes {
    description = "Read Tenant Settings"
    value       = "read:tenant_settings"
  }
  scopes {
    description = "Read Triggers"
    value       = "read:triggers"
  }
  scopes {
    description = "Read User Grants"
    value       = "read:grants"
  }
  scopes {
    description = "Read Users App Metadata"
    value       = "read:users_app_metadata"
  }
  scopes {
    description = "Read Users IDP tokens"
    value       = "read:user_idp_tokens"
  }
  scopes {
    description = "Read Users"
    value       = "read:users"
  }
  scopes {
    description = "Read branding settings"
    value       = "read:branding"
  }
  scopes {
    description = "Read custom domains configurations"
    value       = "read:custom_domains"
  }
  scopes {
    description = "Read email templates"
    value       = "read:email_templates"
  }
  scopes {
    description = "Read entity limits"
    value       = "read:limits"
  }
  scopes {
    description = "Read log_streams"
    value       = "read:log_streams"
  }
  scopes {
    description = "Read prompts settings"
    value       = "read:prompts"
  }
  scopes {
    description = "Read roles"
    value       = "read:roles"
  }
  scopes {
    description = "Read signing keys"
    value       = "read:signing_keys"
  }
  scopes {
    description = "Update Actions"
    value       = "update:actions"
  }
  scopes {
    description = "Update Client Grants"
    value       = "update:client_grants"
  }
  scopes {
    description = "Update Client Keys"
    value       = "update:client_keys"
  }
  scopes {
    description = "Update Clients"
    value       = "update:clients"
  }
  scopes {
    description = "Update Connections"
    value       = "update:connections"
  }
  scopes {
    description = "Update Device Credentials"
    value       = "update:device_credentials"
  }
  scopes {
    description = "Update Email Provider"
    value       = "update:email_provider"
  }
  scopes {
    description = "Update Guardian factors"
    value       = "update:guardian_factors"
  }
  scopes {
    description = "Update Hooks"
    value       = "update:hooks"
  }
  scopes {
    description = "Update Multifactor Authentication policies"
    value       = "update:mfa_policies"
  }
  scopes {
    description = "Update Resource Servers"
    value       = "update:resource_servers"
  }
  scopes {
    description = "Update Rules Configs"
    value       = "update:rules_configs"
  }
  scopes {
    description = "Update Rules"
    value       = "update:rules"
  }
  scopes {
    description = "Update Shields"
    value       = "update:shields"
  }
  scopes {
    description = "Update Tenant Settings"
    value       = "update:tenant_settings"
  }
  scopes {
    description = "Update Triggers"
    value       = "update:triggers"
  }
  scopes {
    description = "Update Users App Metadata"
    value       = "update:users_app_metadata"
  }
  scopes {
    description = "Update Users"
    value       = "update:users"
  }
  scopes {
    description = "Update branding settings"
    value       = "update:branding"
  }
  scopes {
    description = "Update custom domain configurations"
    value       = "update:custom_domains"
  }
  scopes {
    description = "Update email templates"
    value       = "update:email_templates"
  }
  scopes {
    description = "Update entity limits"
    value       = "update:limits"
  }
  scopes {
    description = "Update log_streams"
    value       = "update:log_streams"
  }
  scopes {
    description = "Update prompts settings"
    value       = "update:prompts"
  }
  scopes {
    description = "Update roles"
    value       = "update:roles"
  }
  scopes {
    description = "Update signing keys"
    value       = "update:signing_keys"
  }
}


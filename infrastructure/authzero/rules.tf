resource "auth0_rule" "enrich_from_app_metadata" {
  name    = "Move tenant info from app-metadata to context"
  script  = <<EOF
function enrichTenantInfo(user, context, callback) {
    if (user.app_metadata && user.app_metadata.organization) {
        context.accessToken['${local.env.api_identifier}'] = {
            'organization': user.app_metadata.organization
        };
    }
    callback(null, user, context);
}    
EOF
  enabled = true
  order   = 1
}
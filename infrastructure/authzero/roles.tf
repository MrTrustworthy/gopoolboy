resource "auth0_role" "owner" {
  name        = "Owner"
  description = "Organization Owner"

  permissions {
    name                       = "create:users"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "delete:users"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "modify:users"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:organization"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:users"
    resource_server_identifier = local.env.api_identifier
  }

  permissions {
    name                       = "read:crumbs"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:crumblinks"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:tags"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:crumbs"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:crumblinks"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:tags"
    resource_server_identifier = local.env.api_identifier
  }
}

resource "auth0_role" "editor" {
  name        = "Editor"
  description = "Editor"

  permissions {
    name                       = "read:crumbs"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:crumblinks"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:tags"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:crumbs"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:crumblinks"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:tags"
    resource_server_identifier = local.env.api_identifier
  }
}

resource "auth0_role" "viewer" {
  name        = "Viewer"
  description = "Viewer"

  permissions {
    name                       = "read:crumbs"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:crumblinks"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:tags"
    resource_server_identifier = local.env.api_identifier
  }
}
resource "auth0_role" "owner" {
  name = "Owner"
  description = "Organization Owner"
  permissions {
    name                       = "create:answers"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:questions"
    resource_server_identifier = local.env.api_identifier
  }
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
    name                       = "read:answers"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:organization"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:questions"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:users"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "vote:answers"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "vote:questions"
    resource_server_identifier = local.env.api_identifier
  }
}

resource "auth0_role" "editor" {
  name = "Editor"
  description = "Editor"

  permissions {
    name                       = "create:answers"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "create:questions"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:answers"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:questions"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "vote:answers"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "vote:questions"
    resource_server_identifier = local.env.api_identifier
  }
}

resource "auth0_role" "viewer" {
  name = "Viewer"
  description = "Viewer"

  permissions {
    name                       = "read:answers"
    resource_server_identifier = local.env.api_identifier
  }
  permissions {
    name                       = "read:questions"
    resource_server_identifier = local.env.api_identifier
  }
}
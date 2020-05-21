resource "google_sql_database_instance" "app_postgres" {
  name             = "app-postgres"
  database_version = "POSTGRES_11"
  region           = var.project_region

  depends_on = [google_service_networking_connection.pg_private_vpc_connection]
  settings {
    tier              = "db-f1-micro"
    activation_policy = "ALWAYS"

    backup_configuration {
      enabled    = true
      start_time = "01:00"
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = module.network.network_self_link
    }
  }
}

resource "google_service_networking_connection" "pg_private_vpc_connection" {
  provider = google-beta

  network                 = module.network.network_self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.pg_private_ip_address.name]
}
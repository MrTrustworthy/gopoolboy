resource "google_compute_project_metadata" "general" {
  metadata = {
    "enable-oslogin"                = "TRUE"
    "google-compute-default-region" = var.project_region
    "google-compute-default-zone"   = var.project_zone
  }
}
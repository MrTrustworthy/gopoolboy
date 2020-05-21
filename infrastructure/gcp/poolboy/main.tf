provider "google" {
  project = "${terraform.workspace}${var.project_name_stud}"
  region = var.project_region
  zone = var.project_zone
  version = "~>2.5"
  credentials = file("service-account.json")
}

provider "google-beta" {
  project = "${terraform.workspace}${var.project_name_stud}"
  region = var.project_region
  zone = var.project_zone
  version = "~>2.5"
  credentials = file("service-account.json")
}


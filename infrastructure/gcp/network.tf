module "network" {
  source  = "terraform-google-modules/network/google"
  version = "~> 2.3.0"

  project_id   = "${terraform.workspace}${var.project_name_stud}"
  network_name = var.network_name
  routing_mode = "GLOBAL"

  subnets = [
    {
      subnet_name   = var.k8s-subnet-name
      subnet_ip     = var.k8s-subnet-ip
      subnet_region = var.project_region
      description   = "Subnet for all kubernetes-related things"

    },
  ]

  secondary_ranges = {
    kubernetes-subnet = [
      {
        range_name    = var.k8s-pods-range-name
        ip_cidr_range = var.k8s-pods-range-ip
      },
      {
        range_name    = var.k8s-services-range-name
        ip_cidr_range = var.k8s-services-range-ip
      },
    ]
  }
}


resource "google_compute_address" "ingress_static_ip" {
  name = "nginx-ingress-static-ip"
}

resource "google_compute_global_address" "pg_private_ip_address" {
  provider = google-beta

  name          = "pg-private-ip-address"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = module.network.network_self_link
}



data "google_compute_address" "jumphost_external" {
  name = "jumphost-static-external"
}

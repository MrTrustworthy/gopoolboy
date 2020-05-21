resource "google_compute_instance" "jumphost" {
  name         = "jumphost"
  machine_type = "f1-micro"
  zone         = var.project_zone

  tags = ["jumphost"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
      size = 15
      type = "pd-standard"
    }
  }

  network_interface {
    subnetwork = lookup(module.network.subnets, "${var.project_region}/${var.k8s-subnet-name}").self_link
    access_config {
        nat_ip = data.google_compute_address.jumphost_external.address
    }
  }

}




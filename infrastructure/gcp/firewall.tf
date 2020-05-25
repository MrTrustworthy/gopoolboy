resource "google_compute_firewall" "allow_office_to_jumphost" {
  name    = "allow-office-to-jumphost"
  network = module.network.network_self_link

  target_tags = [
    "jumphost",
  ]

  source_ranges = var.office_ips

  allow {
    protocol = "tcp"

    ports = [
      "22",
      "80",
      "443",
    ]
  }
}


resource "google_compute_firewall" "allow_office_to_gke" {
  name    = "allow-office-to-gke"
  network = module.network.network_self_link

  target_tags = [
    "small-pool",
  ]

  source_ranges = var.office_ips

  allow {
    protocol = "tcp"
  }
}
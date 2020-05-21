resource "google_compute_firewall" "allow_office_to_jumphost" {
  name    = "allow-office-to-jumphost"
  network = module.network.network_self_link

  target_tags = [
    "jumphost",
  ]

  source_ranges = [
    "78.94.91.125/32"
  ]

  allow {
    protocol = "tcp"

    ports = [
      "22",
      "80",
      "443",
    ]
  }
}



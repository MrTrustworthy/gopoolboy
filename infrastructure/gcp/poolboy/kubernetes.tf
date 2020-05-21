resource "google_container_cluster" "kubernetes_cluster" {
  provider = google
  name = "kubernetes-cluster"
  initial_node_count = 1

  network = module.network.network_self_link
  subnetwork = lookup(module.network.subnets, "${var.project_region}/${var.k8s-subnet-name}").self_link

  ip_allocation_policy {
    cluster_secondary_range_name = var.k8s-pods-range-name
    services_secondary_range_name = var.k8s-services-range-name
  }

  logging_service = "none"
  monitoring_service = "none"

  remove_default_node_pool = true

  maintenance_policy {
    daily_maintenance_window {
      start_time = "01:00"
    }
  }

resource "google_container_node_pool" "default_pool" {
  provider = google
  name = "default-pool"
  cluster = "kubernetes-cluster"

  depends_on = [
    google_container_cluster.kubernetes_cluster
  ]

  initial_node_count = 1

  autoscaling {
    max_node_count = "3"
    min_node_count = "1"
  }

  node_config {
    machine_type = "custom-1-2048"
    disk_type = "pd-ssd"
    disk_size_gb = "20"

    tags = [
      "small-pool"
    ]
    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/pubsub",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
      "https://www.googleapis.com/auth/bigquery",
      "https://www.googleapis.com/auth/devstorage.full_control"
    ]
  }
}



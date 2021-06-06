resource "google_pubsub_topic" "dev_crumbler_updates" {
  name = "dev-crumbler-updates"

  labels = {
    env = "dev"
  }
}
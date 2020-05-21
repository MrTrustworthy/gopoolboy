terraform {
  backend "gcs" {
    bucket      = "integration-poolboy-tf-state"
    prefix      = "poolboy"
    credentials = "service-account.json"
  }
}

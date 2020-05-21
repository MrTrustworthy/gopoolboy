terraform {
  backend "gcs" {
    bucket      = "integration-poolboy-tf-state"
    prefix      = "authzero"
    credentials = "service-account.json"
  }
}

variable "project_name_stud" {
  type    = string
  default = "-poolboy"
}

variable "network_name" {
  type    = string
  default = "global-network"
}

variable "tf_state_bucket" {
  type    = string
  default = "integration-poolboy-tf-state"
}

variable "project_region" {
  type    = string
  default = "europe-west3"
}

variable "project_zone" {
  type    = string
  default = "europe-west3-b"
}

variable "k8s-subnet-name" {
  type    = string
  default = "kubernetes-subnet"
}

variable "k8s-subnet-ip" {
  type    = string
  default = "10.16.0.0/16"
}

variable "k8s-pods-range-name" {
  type    = string
  default = "kubernetes-subnet-pods-range"
}

variable "k8s-pods-range-ip" {
  type    = string
  default = "10.128.0.0/16"
}

variable "k8s-services-range-name" {
  type    = string
  default = "kubernetes-subnet-services-range"
}

variable "k8s-services-range-ip" {
  type    = string
  default = "10.129.0.0/16"
}

variable "office_ips" {
  type    = list
  default = ["78.94.91.125/32", "78.35.144.135/32"]
}

// Provided via tfvars file

variable "orgamon_db_password" {
  type    = string
  default = ""
}

variable "crumbler_db_password" {
  type    = string
  default = ""
}

variable "zelda_db_password" {
  type    = string
  default = ""
}

variable "taginator_db_password" {
  type    = string
  default = ""
}
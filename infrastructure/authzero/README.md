# Auth0 Terraform

## Preparation for new environments

You'll need to create a new auth0 tenant manually and add the `auth0-deploy-cli-extension` extension by hand. The client id and secret are needed as environment variables. After the first `terraform apply` you should get some errors that some things already exist. those are autocreated resources from auth0 that we manage with terraform. Use the auth0 management API explorer to get the IDs of those resources, then `terraform import` them.

## Secrets

To apply, you'll have to provide confidential data for DB passwords via

`tf apply -var-file="staging.tfvars"`

And you also need a `service-account.json` file to connect to the GCS backend (use the `terraform@` service account).

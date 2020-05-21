# Auth0 Terraform

## Preparation

You'll need to create a new auth0 tenant manually and add the `auth0-deploy-cli-extension` extension by hand. The client id and secret are needed as environment variables

## Secrets

You'll need an `.env`-file that you can source before running any `terraform plan/apply` commands, such as

```
    export AUTH0_CLIENT_ID=cli-client-id
    export AUTH0_CLIENT_SECRET=cli-secret
```

And you also need a `service-account.json` file to connect to the GCS backend (use the `terraform@` service account).

# Hypersync App Templates

The templates found here are starting points for creating a new custom Hypersync app. They provide the basic structure of a Hypersync app which can be easily extended to meet your needs. Comments in the template source files help you figure out exactly how to customize the template.

## Choosing a Template

To choose the right Hypersync template, you must first decide how authentication and authorization works in your target service.

- If the target service uses OAuth 2.0 for authorization, choose one of the templates in the [oauth](./oauth) directory.

- If the target service does not use OAuth (i.e. it uses API Keys, email and password, or some other form of authentication), choose one of the templates in the [custom-auth](./custom-auth/) directory.

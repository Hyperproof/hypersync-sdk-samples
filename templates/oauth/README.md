# OAuth Authentication Hypersync App Templates
The Hypersync app templates found in this directory can be used for services that use the Oauth 2.0 authorication code flow for authorization.  Comments in the `App.ts` files provide guidance on customizing the authentication to meet your needs.

## Choosing an OAuth Authenticaton Template
To choose the right OAuth authentication template you need to understand how data is retrieved from your target service.

- If the service exposes its data via a REST API, choose the [rest-data-source](./rest-data-source) template.

- If the service exposes its data in some other way, choose the [custom-data-source](./custom-data-source/) template.

For both of these templates, comments in the `DataSource.ts` file will provide guidance on configuring the data source for your needs.
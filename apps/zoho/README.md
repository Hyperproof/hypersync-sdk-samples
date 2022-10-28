# Zoho Hypersync App Sample
This custom Hypersync app sample allows you to connect to your Zoho tenant and extract various pieces of Zoho information.  It can be easily extended to retrieve additional information from Zoho.

## OAuth Configuration
The Zoho custom app uses OAuth 2.0 for authentication.  The OAuth samples in this repository require some upfront configuration to work properly in a Hyperproof organization.  The steps below will help you configure the Zoho app in your organization.

1. Deploy the Zoho app to your organization using the HP CLI:
```
hp customapps import -d .
```
 
2. After the deployment is complete an `OAuth 2.0 Redirect URL` value will shown in the console.  Copy this value to the clipboard.  Alternatively you can use the `getredirect` command in the HP CLI to obtain this value.

3. Create a new OAuth 2.0 client in Zoho.  See the [Client - Setup OAuth with Zoho](https://www.zoho.com/accounts/protocol/oauth-setup.html) page for details.  Use the redirect URL you obtained in Step 2 when configuring the app in Zoho.

4. Copy `.env.template` at the root of Zoho package to `.env`.

5. Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` in the `.env` file with the values you obtained in Step 3.

6. Redeploy the Zoho app to apply the `.env` settings.
```
hp customapps import -d .
```

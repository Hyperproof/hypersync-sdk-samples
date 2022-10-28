# Zoho Hypersync App Sample
This custom Hypersync app sample allows you to connect to your Zoho tenant and extract various pieces of Zoho information.  It can be easily extended to retrieve additional information from Zoho.

## OAuth Configuration
The Zoho custom app uses OAuth 2.0 for authentication.  The OAuth samples in this repository require some upfront configuration to work properly in a Hyperproof organization.  The steps below will help you configure the Zoho app in your organization.

1. Deploy the Zoho app to your organization using the HP CLI:
```
hp customapps import -d .
```
 
2. After the deployment is complete, run the following command to get the ID of your deployed Zoho app:
 ```
 hp customapps list
 ```

3. Now that you have the unique ID of your app you can use the `getredirect` command to get the OAuth 2.0 redirect URL that is unique to your application:
```
hp customapps getredirect --id YOUR_CUSTOM_APP_ID
```
Replace `YOUR_CUSTOM_APP_ID` with the value you obtained in Step 2.

4. Create a new OAuth 2.0 client in Zoho.  See the [Client - Setup OAuth with Zoho](https://www.zoho.com/accounts/protocol/oauth-setup.html) page for details.  Use the redirect URL you obtained in Step 3 when configuring the app in Zoho.

5. Use the template below to create a `.env` file next to `package.json`.
```
oauth_authorization_url=https://accounts.zoho.com/oauth/v2/auth
oauth_token_url=https://accounts.zoho.com/oauth/v2/token
oauth_scope=ZohoProjects.portals.READ ZohoProjects.projects.READ
oauth_extra_params=prompt=consent&access_type=offline
oauth_client_id=YOUR_CLIENT_ID
oauth_client_secret=YOUR_CLIENT_SECRET
```

Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with the values you obtained in Step 4.

6. Redeploy the Zoho app to apply the `.env` settings.
```
hp customapps import -d .
```

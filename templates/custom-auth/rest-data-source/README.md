# Custom Authentication Rest Data Source Template

This template can be used to build a custom Hypersync that reads data from a REST API using custom authentication methods (e.g. basic authentication, API keys, etc.).

If your target service uses OAuth, or if it does not expose data through a REST API, please use one of the other templates in this repository.

## Customizing the Template

Customizing the template is fairly straightforward.

1. Make a copy of this project folder.

- Use any name for your new folder (e.g. `~/code/myservice`).

2. Open `package.json` and update the properties found there.

- Properties that need to be updated have `todo` or `TODO` in the value.
- Make sure to choose a good value for the package name. The Hyperproof CLI uses this value as an identifier.
- For more information on updating these values see [package.json Reference](https://github.com/Hyperproof/hypersync-sdk/blob/main/doc/10-pacakge-json-reference.md) in the Hypersync SDK documentation.

3. Open `CustomApp.ts` and search for `TODO`.

- You will find comments in the file that explain how to customize the app file for your needs.

4. Next, open `DataSource.ts` and search for `TODO` comments there.

5. Update the declarative files under `/decl` to fit your service.

- For more information on the files under `/decl` see [Declarative Files Reference](https://github.com/Hyperproof/hypersync-sdk/blob/main/doc/20-declarative-files-reference.md) in the Hypersync SDK documentation.

6. Update the four SVGs with images for your target service.

- For more information on the SVGs see [Icons and Images](https://github.com/Hyperproof/hypersync-sdk/blob/main/doc/11-svg-images.md) in the Hypersync SDK documentaiton.

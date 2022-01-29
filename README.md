# Temporal Survey

_Remix App that talks with Temporal server through TypeScript SDK_

- [Remix Docs](https://remix.run/docs)
- [Temporal Docs](https://docs.temporal.io/docs/typescript/introduction)

## Development

This is a repository pre configured with temporal dependencies in the `.devcontainer` folder. Feel free to start things manually through docker-compose. If you just use VSCode remote development, everything will be configured automatically for you.

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes and running temporal worker.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

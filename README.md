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

To have an active survey, run the command `npx prisma db seed`.

## Ports

Those ports will be mapped into your operating system:

- `http://localhost:3000`: The application
- `http://localhost:8088`: Temporal dashboard
- `http://localhost:8025`: Mailhog dashboard

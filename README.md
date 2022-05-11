# Electron-app

### Install packages

```shell
npm run
npm run electron:rebuild
```

### Run development mode

```shell
npm run dev
```

### Run app package

```shell
npm run package
```

### Run app make

```shell
npm run make
```

## Setting environment variables

- Create [.env-cmdrc](https://www.npmjs.com/package/env-cmd) file for electron process variables
  ### Define:
  - NODE_ENV
- Create the files for each execution mode

  - .env.development
  - .env.test
  - .env.production

  ### Define:

  - NODE_ENV
  - PORT=3000 (only in development)
  - SAFE_LINKS= connect-src 'self' ([Content Security Policy](https://developers.google.com/web/fundamentals/security/csp?utm_source=devtools#source_allowlists))
  - UPDATE_SERVER
  - VITE_SOME_API_URL

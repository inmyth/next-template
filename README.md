# Next-Template
## Set up
This app should be run in wsl, in Linux file system ($HOME/git) or hot reload will not work. Todo:

- authentication
- state
- routing
- api
- test
- clearable notification
- maybe graphs

## Authentication
Requires swr and iron-session.
In this app, `userUser` and redirection happens in HeaderResponsive.

login:
- login
- mutateUser
- fetchJson(/api/login) 
  - The parameter points to the login logic inside /pages/api/login.
- pages/api/login.ts sends the actual http request and saves user to session and returns it as json

logout:
- this is like login but uses fetchJson(/api/logout) where the session is destroyed 

useUser:
- returns mutateUser and user and manages redirect
- useSWR<User>('/api/user') points to where session is translated to isLoggedIn.
- mutateUser encapsulates fetchJson(/api/login) and fetchJson(/api/logout) which are a param for mutate
  - https://swr.vercel.app/docs/mutation
  - `mutate('/api/user', updateFn(user), options);` The updateFn should be a promise or asynchronous function to handle the remote mutation, it should return updated data.

fetchJson:
- fetchJson(/api/xxx)'s fetch *will* actually run the code in /api/xxx (because of iron-session withIronSessionApiRoute in /api/xxx)
- looks it will be refreshed from time to time without calling the underlying api

flow:
- mutateUser
- fetchJson(/api/xxx) which will run exported xxxRoute in /api/xxx due to iron-session
- xxxRoute doesn't return anything but updates request (req) and response (res). This includes persisting session and embedding response from the underlying api.
- fetchJson's fetch will return res which has the data embedded by xxxRoute.


## Routing
- Doc: https://swr.vercel.app/docs/getting-started.
- Example : https://github.com/vercel/swr/tree/bd0f5b59fed7ba044348c115efe89658408341ed/examples/api-hooks
- Use useXXX to update state
- implemented with element.ts, useElement.ts and `[elements].ts`

flow:
- use dynamic routing for pages that depend on params. 
- define a use, in this case useElement that acts as an alias to useSWR (in lib)
- the path in useSWR points to the real fetching logic in elements. 
- fetchJson will do the final processing on the response

## Offical Doc
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

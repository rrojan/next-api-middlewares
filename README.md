# NEXT-API-MIDDLEWARES

## Description

`next-api-middlewares` is a package that helps you structure your NextJS API route handlers with resuable middlewares.

It is heavily inspired by the middleware architecture of ExpressJS

### Features:

- Pipe together a chain of reusable middlewares before or after your controllers
- Pass data from one middleware to the next through a `context` object
- Use a global error handler to return meaningful error messages to your client

## Usage

### Basic Usage

```tsx
import MiddlewarePipe from "next-api-middlewares"

const middleware = new MiddlewarePipe()
export const GET = middleware.pipe(
  middleware1,
  middleware2,
  controller,
  middleware3
)
```

Call `next()` to go from one middleware to the next in chain

Return `NextResponse` from anywhere in your middleware chain to return a response

```tsx
import type { NextFn, Params } from "next-api-middlewares"

const logger = (req: NextRequest, params?: Params, next?: NextFn) => {
  // logic
  await next?.()
}

const getHandler = (req: NextRequest, params?: Params) => {
  return NextReponse.json({ message: "Success!" })
}

const middleware = new MiddlewarePipe()

export const GET = middleware.pipe(logger, getHandler)
export const POST = middleware.pipe(logger, postHandler)
// ...
```

### Passing data to the next middleware

Pass an object inside the `next` function to pass it to the next middleware

E.g. `next({ foo: 'bar' })`

This will be accessible in `params.context` object in the next middlewares

```tsx
import type { NextFn, Params } from "next-api-middlewares"

const authenticate = async (
  req: NextRequest,
  params?: Params,
  next?: NextFn
) => {
  // logic
  const user = await authenticate(req) // Example
  await next?.({ user }) // Objects passed like this are added to the `context` object in params
}

const getHandler = (req: NextRequest, params?: Params) => {
  const { user } = params.context
  return NextReponse.json({ user })
}

const middleware = new MiddlewarePipe()

export const GET = middleware.pipe(logger, getHandler)
export const POST = middleware.pipe(logger, postHandler)
// ...
```

### Error Handling

Pass a `errorHandler` while instantiating `MiddlewarePipe` to inject a reusable error boundary in your code.

This error boundary wraps your functions inside a `try... catch` so you can write once, use anywhere.

```tsx
import type { NextFn, Params } from "next-api-middlewares"

const getHandler = (req: NextRequest, params?: Params) => {
  const isError = someLogic()

  if (isError) {
    throw new Error("Oh no!")
  }

  return NextReponse.json({ user })
}

const errorHandler = (handler: RequestHandler) => {
  try {
    return await handler(req, params)
  } catch (error) {
    console.error(error)

    // Additional response building logic here (E.g. using error instanceOf CustomError)
    const error = error.message
    const status = 500

    return NextResponse.json({ error }, { status })
  }
}

const middleware = new MiddlewarePipe({ errorHandler })

export const GET = middleware.pipe(logger, getHandler)
export const POST = middleware.pipe(logger, postHandler)
// ...
```

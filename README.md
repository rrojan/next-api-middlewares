# NEXT-API-MIDDLEWARES

## Description

`next-api-middlewares` is a package that helps you structure your NextJS API route handlers with resuable middlewares.

It is designed to work well with the new NextJS app router, and is heavily inspired by the middleware architecture of ExpressJS.

Since we are piping together functions, *all middlewares run as route handlers - no edge functions involved!* This makes it different from NextJS' native `middleware.ts` implementation.

### Features:

- Pipe together a chain of reusable middlewares before or after your controllers
- Access `NextRequest`, `params` or return a `NextResponse` from any middleware in your code.
- Pass data from one middleware to the next through a `context` object
- Pass a shared `errorHandler` wrapper to return meaningful error messages in your responses. You can simply `throw` and exception anywhere in your code and let the errorHandler form clean error responses for you.

---

## Usage

### Basic Usage

The `MiddlewarePipe` class creates a new instance of a middleware pipe. Use the `pipe` method to chain multiple middlewares / handlers together.

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

#### Example

```tsx
import MiddlewarePipe from "next-api-middlewares"
import type { NextFn, Params } from "next-api-middlewares"

const logger = (req: NextRequest, params?: Params, next?: NextFn) => {
  console.log(req.method + " | " + req.nextUrl.pathname)
  await next?.()
}

const getHandler = (req: NextRequest, params?: Params) => {
  return NextReponse.json({ message: "Success!" })
}

const postHandler = (req: NextRequest, params?: Params) => {
  return NextReponse.json({ message: "Success!" })
}

const middleware = new MiddlewarePipe()

export const GET = middleware.pipe(logger, getHandler)
export const POST = middleware.pipe(logger, postHandler)
// ...
```

---

### Passing data to the next middleware

Pass an object inside the `next` function to pass it to the next middleware

E.g. `next({ foo: 'bar' })`

This will be accessible in `params.context` object in next-in-line middlewares

#### Example
```tsx
import MiddlewarePipe from "next-api-middlewares"
import type { NextFn, Params } from "next-api-middlewares"

const authenticate = async (
  req: NextRequest,
  params?: Params,
  next?: NextFn
) => {
  const user = await authenticate(req) // Example
  if (!user) {
    return NextResponse.json({ error: 'You are not logged in!' }, { status: 401 })
  }
  await next?.({ user }) // Objects passed like this are added to the `context` object in params
}

const getHandler = (req: NextRequest, params?: Params) => {
  const { user } = params.context
  return NextReponse.json({ user })
}

const postHandler =  async (req: NextRequest, params?: Params) => {
  const data = req.json()
  await createSomething(data)
  return NextResponse.json({ data }, { status: 201 })
}

const middleware = new MiddlewarePipe()

export const GET = middleware.pipe(authenticate, getHandler)
export const POST = middleware.pipe(authenticate, postHandler)
```

---

### Error Handling

Pass a `errorHandler` while instantiating `MiddlewarePipe` to inject a reusable error boundary in your code.

This error boundary wraps your functions inside a `try... catch` so you can now `throw` an error anywhere in your code and have the error handler catch and form a proper response.

```tsx
import MiddlewarePipe from "next-api-middlewares"
import type { NextFn, Params } from "next-api-middlewares"

const authenticate = async (
  req: NextRequest,
  params?: Params,
  next?: NextFn
) => {
  const user = await authenticate(req) // Example
  if (!user) {
    throw new Error('You are not logged in!')
  }
    await next?.({ user }) // Objects passed like this are added to the `context` object in params
  }

  const getHandler = (req: NextRequest, params?: Params) => {
    const { user } = params.context
    return NextReponse.json({ user })
  }

const errorHandler = (handler: RequestHandler) => {
  try {
    return await handler(req, params)
  } catch (error) {
    console.error(error)

    // Additional response building logic here (E.g. using `error instanceOf CustomError`
    // to also pass an error status code)
    const error = error.message
    const status = 401

    return NextResponse.json({ error }, { status })
  }
}

const middleware = new MiddlewarePipe({ errorHandler })

export const GET = middleware.pipe(authenticate, getHandler)
export const POST = middleware.pipe(authenticate, postHandler)
```

import { NextRequest, NextResponse } from "next/server"

export type RequestHandler = (
  req: NextRequest,
  params: any
) => Promise<NextResponse | void>

export type HandlerWrapper = (handler: RequestHandler) => RequestHandler

export type PipeOpts = {
  errorHandler?: HandlerWrapper
}

export type NextFn = (pipeParams?: any) => Promise<NextResponse | void>

export type Params = {
  params?: Record<string, string>
  context?: any
}

type MiddlewareOrHandler<AdditionalReqProperties = void> = (
  req: NextRequest & AdditionalReqProperties,
  params?: Params,
  next?: NextFn
) => NextResponse | Promise<NextResponse | void>

export type MiddlewareChain = MiddlewareOrHandler<any>[]

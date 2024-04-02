import { NextRequest, NextResponse } from "next/server"

export type NextFn = (pipeParams?: any) => Promise<NextResponse | void>

export type Params = Record<string, any>

export type MiddlewareOrHandler<AdditionalReqProperties = void> = (
  req: NextRequest & AdditionalReqProperties,
  params?: Params,
  next?: NextFn
) => NextResponse | Promise<NextResponse | void>

export type MiddlewareChain = MiddlewareOrHandler<any>[]

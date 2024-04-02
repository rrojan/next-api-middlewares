import * as next_server from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

type NextFn = (pipeParams?: any) => Promise<NextResponse | void>;
type Params = Record<string, any>;
type MiddlewareOrHandler<AdditionalReqProperties = void> = (req: NextRequest & AdditionalReqProperties, params?: Params, next?: NextFn) => NextResponse | Promise<NextResponse | void>;
type MiddlewareChain = MiddlewareOrHandler<any>[];

declare const middlewares: (...fns: MiddlewareChain) => Promise<(req: NextRequest, params: any) => Promise<void | next_server.NextResponse<unknown>>>;

export { middlewares };

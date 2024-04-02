import * as next_server from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

type NextFn = (pipeParams?: any) => Promise<NextResponse | void>;
type Params = {
    params?: Record<string, string>;
    pipeParams?: any;
};
type MiddlewareOrHandler<AdditionalReqProperties = void> = (req: NextRequest & AdditionalReqProperties, params?: Params, next?: NextFn) => NextResponse | Promise<NextResponse | void>;
type MiddlewareChain = MiddlewareOrHandler<any>[];

declare const pipe: (...fns: MiddlewareChain) => (req: NextRequest, params: Params) => Promise<void | next_server.NextResponse<unknown>>;
declare const pipeWithErrorInterceptor: (...fns: MiddlewareChain) => ((req: NextRequest, params: Params) => Promise<void | next_server.NextResponse<unknown>>) | undefined;

export { pipe, pipeWithErrorInterceptor };

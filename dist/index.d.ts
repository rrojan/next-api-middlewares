import * as next_server from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

type NextFn = (pipeParams?: any) => Promise<NextResponse | void>;
type Params = {
    params?: Record<string, string>;
    pipeParams?: any;
};
type MiddlewareOrHandler<AdditionalReqProperties = void> = (req: NextRequest & AdditionalReqProperties, params?: Params, next?: NextFn) => NextResponse | Promise<NextResponse | void>;
type MiddlewareChain = MiddlewareOrHandler<any>[];

declare const pipe: (...fns: MiddlewareChain) => Promise<(req: NextRequest, params: Params) => Promise<void | next_server.NextResponse<unknown>>>;

export { pipe as default };

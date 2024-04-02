import { NextResponse, NextRequest } from 'next/server';

type Next = (pipeParams?: any) => Promise<NextResponse | void>;
declare function pipe(...pipeFunctions: any): (req: NextRequest, params: any) => Promise<any>;

export { type Next, pipe };

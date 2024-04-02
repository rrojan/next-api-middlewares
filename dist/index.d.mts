import { NextRequest } from 'next/server';

declare const pipe: (...fns: any) => Promise<(req: NextRequest, params: any) => Promise<any>>;

export { pipe };

import { NextRequest } from "next/server"
import {
  HandlerWrapper,
  MiddlewareChain,
  Params,
  PipeOpts,
  RequestHandler,
  NextFn,
} from "./types"
import { startPipe } from "./helpers"

export { Params, NextFn }

class MiddlewarePipe {
  errorHandler?: HandlerWrapper

  constructor(opts?: PipeOpts) {
    this.errorHandler = opts?.errorHandler
  }

  pipe(...fns: MiddlewareChain) {
    const pipeFn: RequestHandler = async (req: NextRequest, params: Params) => {
      return await startPipe(req, params, fns, 0)
    }

    if (this.errorHandler) {
      return this.errorHandler(pipeFn)
    }

    return pipeFn
  }
}

export default MiddlewarePipe

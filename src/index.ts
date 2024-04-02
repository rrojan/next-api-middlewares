import { NextRequest } from "next/server"
import { MiddlewareChain } from "./types"
import { startPipe } from "./helpers"

const middlewares = async (...fns: MiddlewareChain) => {
  return async (req: NextRequest, params: any) => {
    return await startPipe(req, params, fns, 0)
  }
}

export default middlewares

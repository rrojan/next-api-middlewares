import { NextRequest } from "next/server"
import { MiddlewareChain, Params } from "./types"
import { startPipe } from "./helpers"

const pipe = async (...fns: MiddlewareChain) => {
  return async (req: NextRequest, params: Params) => {
    return await startPipe(req, params, fns, 0)
  }
}

export default pipe

import { NextRequest } from "next/server"
import { MiddlewareChain, Params } from "./types"
import { startPipe } from "./helpers"

const pipe = async (...fns: any) => {
  return async (req: NextRequest, params: any) => {
    return await startPipe(req, params, fns, 0)
  }
}

// const pipeWithErrorInterceptor = async (...fns: MiddlewareChain) => {
//   const errorInterceptor = fns[fns.length - 1]
//   try {
//     return pipe(...fns.slice(0, fns.length - 1))
//   } catch (e) {
//     errorInterceptor(e)
//   }
// }

export { pipe }

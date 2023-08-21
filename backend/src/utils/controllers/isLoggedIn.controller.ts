import { NextFunction, Request, Response } from 'express'
import { verify, VerifyErrors } from 'jsonwebtoken'
import { Status } from '../interfaces/Status'
import {Profile} from "../../apis/profile/profile.model";

export function isLoggedInController (request: Request, response: Response, next: NextFunction): any {
  const status: Status = { status: 400, message: 'Please login', data: null }

  const sessionProfile = request.session?.profile ?? undefined
  console.log(request.sessionID)

  const signature = request.session?.signature ?? ''

  const isSessionActive = sessionProfile !== undefined


  const unverifiedJwtToken: string | undefined = request.headers.authorization

console.log('we have arrived')
  const isJwtValid = (unverifiedJwtToken: string | undefined): boolean => {
    if (unverifiedJwtToken === undefined) {
      return false
    }
    const result: unknown = verify(
      unverifiedJwtToken,
      signature,
      { maxAge: '3hr' },
      (error: VerifyErrors | null): boolean => error == null
    ) as unknown
console.log(result)
    return result as boolean
  }

  // if (isJwtValid(unverifiedJwtToken) && isSessionActive) {
  //   return next()
  // }
  isJwtValid(unverifiedJwtToken) && isSessionActive ? next() : response.json(status)
}

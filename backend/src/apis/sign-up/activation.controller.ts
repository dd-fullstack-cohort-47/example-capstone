import { NextFunction, Request, Response } from 'express'
import { Profile, updateProfile } from '../profile/profile.model'
import { Status } from '../../utils/interfaces/Status'
import {selectProfileByProfileActivationToken} from "./sign-up.model";

/**
 * Handles the logic for account activation by checking for an existing profileActivationToken and updating the profileActivationToken to null
 * @param request {Request} the request object containing the profileActivationToken
 * @param response {Response} the response object containing the status and message
 * @param nextFunction not used in this case
 */
export async function activationController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
  try {
    const { activation } = request.params
    const profile = await selectProfileByProfileActivationToken(activation)

    const activationFailed = (): Response => response.json({
      status: 400,
      data: null,
      message: 'Account activation has failed. Have you already activated this account'
    })

    const activationSucceeded = async (profile: Profile): Promise<Response> => {
      const updatedProfile = { ...profile, profileActivationToken: null }
      await updateProfile(updatedProfile)
      return response.json({
        status: 200,
        data: null,
        message: 'Account activation was successful'
      })
    }

    return (profile != null) ? await activationSucceeded(profile) : activationFailed()
  } catch (error: any) {
    return response.json({ status: 500, data: null, message: error.message })
  }
}

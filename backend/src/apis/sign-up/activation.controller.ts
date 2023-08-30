import { NextFunction, Request, Response } from 'express'
import {PrivateProfile, selectPrivateProfileByProfileActivationToken, updateProfile} from '../profile/profile.model'
import { Status } from '../../utils/interfaces/Status'

import { zodErrorResponse } from '../../utils/response.utils'
import { activationProfileSchema } from './activation.validator'


/**
 * Handles the logic for account activation by checking for an existing profileActivationToken and updating the profileActivationToken to null
 * @param request {Request} the request object containing the profileActivationToken
 * @param response {Response} the response object containing the status and message
 * @param nextFunction not used in this case
 */
export async function activationController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
  try {
    const validationResult = activationProfileSchema.safeParse(request.body)
    // if the validation is unsuccessful, return a preformatted response to the client
    if (!validationResult.success) {
      return zodErrorResponse(response, validationResult.error)
    }

    // deconstruct the profileActivationToken from the request body
    const { activation } = request.params

    // select the profile by profileActivationToken
    const profile  = await selectPrivateProfileByProfileActivationToken(activation)

    // if the profile is null, return a preformatted response to the client
    const activationFailed = (): Response => response.json({
      status: 400,
      data: null,
      message: 'Account activation has failed. Have you already activated this account'
    })

    // if the profile is not null, update the profileActivationToken to null and prepare success response
    const activationSucceeded = async (profile: Profile): Promise<Response> => {
      const updatedProfile = { ...profile, profileActivationToken: null }
      await updateProfile(updatedProfile)
      return response.json({
        status: 200,
        data: null,
        message: 'Account activation was successful'
      })
    }

    // return the appropriate response
    return (profile != null) ? await activationSucceeded(profile) : activationFailed()

    // catch any errors and return them to the client
  } catch (error: any) {
    return response.json({ status: 500, data: null, message: error.message })
  }
}

import {Profile} from "../profile/profile.model";
import {selectProfileByProfileEmail} from "./sign-in.model";
import {generateJwt, validatePassword} from "../../utils/auth.utils";
import {Request, Response} from "express";
import {signInProfileSchema} from "./sign-in.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import { v4 as uuid } from 'uuid'

export async function signInController(request: Request, response: Response): Promise<Response> {
    try {

        const validationResult = signInProfileSchema.safeParse(request.body)

        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {profileEmail, profilePassword} = request.body
        const profile: Profile | null = await selectProfileByProfileEmail(profileEmail)

        return (profile !== null) && await validatePassword(profile.profileHash, profilePassword)
            ? signInSuccessful(request, response, profile)
            : signInFailed(response)
    } catch (error: any) {
        return response.json({status: 500, data: null, message: error.message})
    }
}

function signInFailed(response: Response): Response {
    return response.json({status: 400, message: 'Email or password is incorrect please try again.', data: null})
}

function signInSuccessful(request: Request, response: Response, profile: Profile): Response {
    const {profileId, profileAbout, profileEmail, profileImageUrl, profileName} = profile
    const signature: string = uuid()
    const authorization: string = generateJwt({
        profileId,
        profileAbout,
        profileEmail,
        profileImageUrl,
        profileName
    }, signature)

    request.session.profile = profile
    request.session.jwt = authorization
    request.session.signature = signature

    response.header({
        authorization
    })
    return response.json({status: 200, message: 'Sign in successful', data: null})
}

import {NextFunction, Request, Response} from 'express'
import {Status} from '../../utils/interfaces/Status'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import {setActivationToken, setHash} from '../../utils/auth.utils'
import {insertProfile} from './sign-up.model'
import {Profile} from '../profile/profile.model'
import {SignUpProfileSchema} from "./sign-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";


/** Controller for signupProfileController
 *  @param {Request} request an object containing the body contain a profileName, profileEmail, profilePassword and profilePasswordConfirm.
 *  @param {Response} response an object modeling the response that will be sent to the client.
 *  @returns {Promise<Response | undefined>}
 * @param nextFunction not used in this case
 * */
export async function signupProfileController(request: Request, response: Response, nextFunction: NextFunction): Promise<Response | undefined> {
    try {

        // validate the new profile data coming from the request body
        const validationResult = SignUpProfileSchema.safeParse(request.body)
        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // create a new mailgun client with the mailgun api key
        const mailgun: Mailgun = new Mailgun(formData)
        const mailgunClient = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY as string})

        const {profileName, profileEmail, profilePassword} = request.body
        const profileHash = await setHash(profilePassword)
        const profileActivationToken = setActivationToken()
        const profileImageUrl = 'http://placekitten.com/300/300'

        const basePath: string = `${request.protocol}://${request.hostname}:8080${request.originalUrl}activation/${profileActivationToken}`

        const message = `<h2>Welcome to Rethreads.</h2>
<p>In order to start posting threads of cats you must confirm your account.</p>
<p><a href="${basePath}">${basePath}</a></p>
`

        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
            to: profileEmail,
            subject: 'One step closer to Sticky Head -- Account Activation',
            html: message
        }

        const profile: Profile = {
            profileId: '',
            profileAbout: null,
            profileActivationToken,
            profileEmail,
            profileHash,
            profileName,
            profileImageUrl
        }
        await insertProfile(profile)

        await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)

        const status: Status = {
            status: 200,
            message: 'Profile successfully created please check your email.',
            data: null
        }

        return response.json(status)
    } catch (error: any) {
        const status: Status = {
            status: 500,
            message: error.message,
            data: null
        }

        return response.json(status)
    }
}

import { Router } from 'express'
import { signupProfileController } from './sign-up.controller'
import {activationController} from "./activation.controller";

export const signUpRoute: Router = Router()


signUpRoute.route('/').post(signupProfileController)

signUpRoute.route('/activation/:activation').get(activationController)

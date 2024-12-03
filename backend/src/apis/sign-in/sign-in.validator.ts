import { z } from 'zod'

/**
 * The shape of the data that comes from the client when signing in
 * @property profilePassword {string} the password
 * @property profileEmail {string} the email
 */
export const signInProfileSchema = z.object({
  profilePassword: z.string({
    invalid_type_error: 'profile password is the wring type',
    required_error: 'profile password is required'
  }).min(8, {message: 'please provide a valid password (min 8 characters)'}).max(32, {message: 'please provide a valid password (max 32 characters)'}),
  profileEmail: z.string({
    invalid_type_error: 'profile email must be a string',
    required_error: 'profile email is required'
  }).email({message: 'please provide a valid email'}).max(128, {message: 'please provide a valid email (max 128 characters)'})
})

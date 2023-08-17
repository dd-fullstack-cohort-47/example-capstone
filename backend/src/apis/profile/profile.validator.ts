import { z } from 'zod'

/**
 * The shape of a profile
 * @property profileId {string} the primary key
 * @property profileAbout {string} the profile's about
 * @property profileActivationToken {string} the profile's activation token
 * @property profileEmail {string} the profile's email
 * @property profileHash {string} the profile's hash
 * @property profileImageUrl {string} the profile's image url
 * @property profileName {string} the profile's name
 */
export const ProfileSchema = z.object({
  profileId: z.string().uuid({ message: 'please provide a valid profileId' }),
  profileAbout: z.string().max(512, { message: 'please provide a valid profileAbout' }).nullable(),
  profileActivationToken: z.string().length(32, { message: 'please provide a valid profileActivationToken' }).nullable(),
  profileEmail: z.string().email({ message: 'please provide a valid email' }).max(128, { message: 'please provide a valid email (max 128 characters)' }),
  profileHash: z.string().length(97, { message: 'please provide a valid profileHash' }),
  profileImageUrl: z.string().trim().url({ message: 'please provide a valid profileImageUrl' }).max(255, { message: 'please provide a valid profileImageUrl (max 255 characters)' }).nullable(),
  profileName: z.string().min(1, { message: 'please provide a valid profile name (min 1 characters)' }).trim().max(32, { message: 'please provide a valid profile name (max 32 characters)' })
})

/**
 * The shape of a profile id
 * @property profileId {string} the primary key
 */
export const ProfileIdSchema = ProfileSchema.pick({ profileId: true })

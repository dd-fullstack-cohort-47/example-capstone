import { z as zod } from 'zod'

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
export const ProfileSchema = zod.object({
  profileId: zod.string().uuid({ message: 'please provide a valid profileId' }),
  profileAbout: zod.string().max(512, { message: 'please provide a valid profileAbout' }).nullable(),
  profileActivationToken: zod.string().length(32, { message: 'please provide a valid profileActivationToken' }).nullable(),
  profileEmail: zod.string().email({ message: 'please provide a valid email' }).max(128, { message: 'please provide a valid email (max 128 characters)' }),
  profileHash: zod.string().length(97, { message: 'please provide a valid profileHash' }),
  profileImageUrl: zod.string().trim().url({ message: 'please provide a valid profileImageUrl' }).max(255, { message: 'please provide a valid profileImageUrl (max 255 characters)' }).nullable(),
  profileName: zod.string().min(1, { message: 'please provide a valid profile name (min 1 characters)' }).trim().max(32, { message: 'please provide a valid profile name (max 32 characters)' })
})

/**
 * The shape of a profile id
 * @property profileId {string} the primary key
 */
export const ProfileIdSchema = ProfileSchema.pick({ profileId: true })

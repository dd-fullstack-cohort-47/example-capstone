import { sql } from '../../utils/database.utils'
import { Profile } from '../profile/profile.model'

/**
 * Selects a profile from the profile table by profileEmail
 * @param profileEmail
 * @returns Profile or null if no profile was found
 */
export async function selectProfileByProfileEmail(profileEmail: string): Promise<Profile | null> {
  const result = <Profile[]>await sql `SELECT profile_id, profile_about, profile_activation_token, profile_email, profile_hash, profile_image_url, profile_name FROM profile WHERE profile_email = ${profileEmail}`
  return result?.length === 1 ? result[0] : null
}
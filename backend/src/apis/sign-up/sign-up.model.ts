import { sql } from '../../utils/database.utils'
import { Profile } from '../profile/profile.model'

/**
 * Inserts a new profile into the profile table
 * @param profile
 * @returns "profile successfully created"
 */
export async function insertProfile (profile: Profile): Promise<string> {
  const { profileAbout, profileActivationToken, profileEmail, profileHash, profileImageUrl, profileName } = profile
  await sql`INSERT INTO profile(profile_id, profile_about, profile_activation_token, profile_email, profile_hash, profile_image_url, profile_name) VALUES (gen_random_uuid() , ${profileAbout}, ${profileActivationToken}, ${profileEmail}, ${profileHash}, ${profileImageUrl}, ${profileName})`
  return 'Profile Successfully Created'
}

/**
 * Selects a profile from the profile table by profileActivationToken
 * @param profileActivationToken
 * @returns Profile or null if no profile was found
 */
export async function selectProfileByProfileActivationToken (profileActivationToken: string): Promise<Profile|null> {
  const result = <Profile[]>await sql `SELECT profile_id, profile_about, profile_activation_token, profile_email, profile_hash, profile_image_url, profile_name FROM profile WHERE profile_activation_token = ${profileActivationToken}`
  return result?.length === 1 ? result[0] : null
}
import { z } from 'zod'
import {ProfileSchema} from "./profile.validator";
import {sql} from "../../utils/database.utils";

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
export type Profile = z.infer<typeof ProfileSchema>

/**
 * updates a profile in the profile table
 * @param profile
 * @returns {Promise<string>} 'Profile successfully updated'
 */
export async function updateProfile (profile: Profile): Promise<string> {
    const {profileId, profileAbout, profileActivationToken, profileEmail, profileHash, profileImageUrl, profileName} = profile
    await sql `UPDATE profile SET profile_about = ${profileAbout}, profile_activation_token = ${profileActivationToken}, profile_email = ${profileEmail}, profile_hash = ${profileHash}, profile_image_url = ${profileImageUrl}, profile_name = ${profileName} WHERE profile_id = ${profileId}`
    return 'Profile successfully updated'
}
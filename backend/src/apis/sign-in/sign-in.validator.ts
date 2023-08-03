import {z} from "zod";
import {ProfileSchema} from "../profile/profile.validator";


export const signInProfileSchema = ProfileSchema.omit({ profileId: true, profileHash: true, profileActivationToken: true, profileImageUrl: true, profileAbout: true }).extend({profilePassword: z.string().min(8, { message: 'please provide a valid password (min 8 characters)' }).max(32, { message: 'please provide a valid password (max 32 characters)' })})
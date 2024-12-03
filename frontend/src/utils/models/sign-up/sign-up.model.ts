import {z} from "zod";
import {ProfileSchema} from "@/utils/models/profile/profile.model";


export const SignUpSchema = ProfileSchema.pick({profileName: true}).extend({
	profileEmail: z.string()
		.email({message: 'please provide a valid email'})
		.max(128, {message: 'profileEmail is to long'}),
	profilePasswordConfirm: z.string()
		.min(8, {message: 'please provide a valid password (min 8 characters)'})
		.max(32, {message: 'please provide a valid password (max 32 characters)'}),
	profilePassword: z.string()
		.min(8, {message: 'please provide a valid password (min 8 characters)'})
		.max(32, {message: 'please provide a valid password (max 32 characters)'})
})
	.refine(data => data.profilePassword === data.profilePasswordConfirm, {
		message: 'passwords do not match'
	})

export type SignUp = z.infer<typeof SignUpSchema>
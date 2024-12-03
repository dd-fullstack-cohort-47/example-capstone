'use server'
import {SignUp} from "@/utils/models/sign-up/sign-up.model";
import {Status} from "@/utils/interfaces/Status";

export async function preformSignUp(profile: SignUp): Promise<Status> {
	return  fetch(`${process.env.PUBLIC_API_URL}/apis/sign-up`, {
		method: "post",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(profile)
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		return response.json()
	}).catch((error) => {
		console.error(error)
		throw error
	})

}

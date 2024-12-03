'use server'
'use cache'
import {Profile, ProfileSchema} from "@/utils/models/profile/profile.model";

export async function fetchProfileByProfileId(profileId: string): Promise<Profile> {
	const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/profile/${profileId}`, {
		method: "get",
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok')
		} else {
			return response.json()
		}
	})
	return ProfileSchema.parse(data)
}

export async function createProfile(profile: Profile): Promise<Profile> {
	const {message} = await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-up`, {
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
	})
	return message
}


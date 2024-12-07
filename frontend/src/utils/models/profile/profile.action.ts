'use server'
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


export async function fetchProfileByProfileName(profileName: string): Promise<Profile|null> {
	const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/profile/profileName/${profileName}`, {
		method: "get",
		headers: {
			'Content-Type': 'application/json',
		},

	}).then((response: Response) => {
		if (!response.ok) {
			throw new Error('Error fetching profile')
		} else {
			return response.json()
		}

	})

	return ProfileSchema.nullable().parse(data)
}


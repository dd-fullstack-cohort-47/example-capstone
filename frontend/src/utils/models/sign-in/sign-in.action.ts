'use server'
import {SignIn} from "@/utils/models/sign-in/sign-in.model";
import {cookies, headers} from "next/headers";

export async function preformSignIn(signIn: SignIn) {

	const response : Response = await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-in`, {
		method: "post",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(signIn)
	})

	const authorization = response.headers.get("authorization")
	const cookie = response.headers.getSetCookie()
	const incomingHeaders = await headers()



	if (authorization) {
		const cookieJar = await cookies()
		cookieJar.set("jwt-token", authorization , {path: "/", sameSite:"strict", httpOnly: true, maxAge:10_800})
	}

	return response.json().then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		return response.json()
	}).catch((error) => {
		console.error(error)
		throw error
	})

}







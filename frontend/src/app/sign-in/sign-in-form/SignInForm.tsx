'use client'


import {Button, Label, TextInput} from "flowbite-react";
import {SignUpModal} from "@/app/sign-in/sign-in-form/sign-up-modal/SignUpModal";
import {SignIn, SignInSchema} from "@/utils/models/sign-in/sign-in.model";
import {preformSignIn} from "@/utils/models/sign-in/sign-in.action";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Status} from "@/utils/interfaces/Status";
import React from "react";
import {DisplayError} from "@/components/DisplayError";
import {DisplayStatus} from "@/components/DisplayStatus";


export function SignInForm() {

	const [status, setStatus] = React.useState<Status | null>(null)

	const defaultValues : SignIn = {
		profileEmail: '',
		profilePassword: ''
	}


	const fireServerAction = async (data: SignIn) => {
		try {
			const response = await preformSignIn(data)

			if(response.status === 200) {
				reset()
			}
			setStatus(response)
		} catch (error) {
			setStatus({status: 500, message: 'Internal Server Error try again later', data: undefined})
			console.error(error)
		}
	}

	const {register, handleSubmit, control, reset, formState: {errors}} = useForm<SignIn>({
		resolver: zodResolver(SignInSchema),
		defaultValues,
		mode: 'onBlur'
	})

	return(
		<>
			<form onSubmit={handleSubmit(fireServerAction)} className="flex  flex-col mx-auto gap-4">
				<h1 className="text-3xl font-bold">Welcome back.</h1>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" value="Your email"/>
					</div>
					<TextInput
						id="email1"
						type="email"

						{...register('profileEmail')}
						aria-invalid={errors.profileEmail ? true : false}
					/>
					<DisplayError error={errors.profileEmail}/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Your password"/>
					</div>
					<TextInput
						id="password1"
						type="password"
						{...register('profilePassword')}
					/>
					<DisplayError error={errors.profilePassword}/>
				</div>
				<SignUpModal/>
				<Button type="submit">Submit</Button>
			</form>
			<DisplayStatus status={status} />
		</>
	)
}
import {Button, Label, TextInput} from "flowbite-react";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProfileSchema} from "@/utils/models/profile/profile.model";
import {z} from "zod";
import {DevTool} from "@hookform/devtools";
import {DisplayError} from "@/components/DisplayError";

import {SignUp, SignUpSchema} from "@/utils/models/sign-up/sign-up.model";
import {preformSignUp} from "@/utils/models/sign-up/sign-up.action";
import {Status} from "@/utils/interfaces/Status";
import {DisplayStatus} from "@/components/DisplayStatus";

export function SignUpForm() {

	// create a state variable to hold the status of the form
	const [status, setStatus] = React.useState<Status | null>(null)

	// create a default value for the form to hold the data created in the form
	const defaultValues: SignUp = {
		profileName: '',
		profileEmail: '',
		profilePassword: '',
		profilePasswordConfirm: ''
	}

	// register the form with react-hook-form
	const {register, handleSubmit, control, reset, formState: {errors}} = useForm<SignUp>({
		resolver: zodResolver(SignUpSchema),
		defaultValues,
		mode: 'onBlur'
	})


	//define the function to handle the form submission
	const onSubmit = async (data: SignUp) => {
		try {
			const response = await  preformSignUp(data)
			if (response.status === 200) {
				reset()
			}
			setStatus(response)
		} catch (error) {
			setStatus({status: 500, message: 'Internal Server Error try again later', data: undefined})
			console.error(error)

		}
	}

	return (
		<>
			{/*call React hooks forms handle submit and pass it our function for form submission*/}
			<form onSubmit={handleSubmit(onSubmit)} className="flex min-h-auto gap-4 min-w-full flex-col grow">
				<h1 className="text-3xl font-bold">Create an account.</h1>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" value="email"/>
					</div>
					{/*tie the individual input field to a field in the default values*/}
					<TextInput aria-invalid={errors.profileEmail ? true: false} {...register('profileEmail')} autoComplete='email' id="email1" type="email"/>
					{/*display the error message if the field has an error*/}
					<DisplayError error={errors.profileEmail?.message}/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="profileName" value="name"/>
					</div>
					<TextInput aria-invalid={errors.profileName ? true : false } autoComplete='username' {...register('profileName')} id="profileName" type="text"/>
					<DisplayError error={errors.profileName?.message}/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="profilePassword" value="password"/>
					</div>
					<TextInput aria-invalid={errors.profilePassword ? true: false} autoComplete={'new-password'} id="profilePassword" {...register('profilePassword')} type="password"/>
					<DisplayError error={errors.profilePassword?.message}/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="profilePasswordConfirm" value="password confirm"/>
					</div>
					<TextInput aria-invalid={errors.profilePasswordConfirm ? true : false} {...register('profilePasswordConfirm')} id="profilePasswordConfirm" autoComplete={'new-password confirm'} type="password" />
					<DisplayError error={errors.profilePasswordConfirm?.message}/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
			<DisplayStatus status={status}/>
			<DevTool control={control}/>
		</>
	)
}


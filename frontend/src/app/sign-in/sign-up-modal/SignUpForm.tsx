import {Button, Label, TextInput} from "flowbite-react";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProfileSchema} from "@/utils/models/profile/profile.model";
import {z} from "zod";
import {DevTool} from "@hookform/devtools";
import {DisplayError} from "@/components/DisplayError";
import {createProfile} from "@/utils/models/profile/profile.action";

export function SignUpForm() {

	const [status, setStatus] = React.useState({type: 'failure', message: 'An unknown error occurred'})

	const formValidation = ProfileSchema.pick({profileName: true}).extend({
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

	type FormValidation = z.infer<typeof formValidation>

	const defaultValues: FormValidation = {
		profileName: '',
		profileEmail: '',
		profilePassword: '',
		profilePasswordConfirm: ''
	}

	const {register, handleSubmit, control, formState: {errors}} = useForm<FormValidation>({
		resolver: zodResolver(formValidation),
		defaultValues, mode: 'onBlur'
	})


	const onSubmit = async (data: FormValidation) => {
		try {
			const response = await  createProfile(data)
			console.log(response)

		} catch (error) {
			console.error(error)

		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="flex min-h-auto gap-4 min-w-full flex-col grow">
				<h1 className="text-3xl font-bold">Create an account.</h1>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" value="email"/>
					</div>
					<TextInput aria-invalid={errors.profileEmail ? true: false} {...register('profileEmail')} autoComplete='email' id="email1" type="email"/>
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
			<DevTool control={control}/>
		</>
	)
}


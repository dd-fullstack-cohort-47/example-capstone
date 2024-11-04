import {Button, Label, TextInput} from "flowbite-react";
import {SignUpFormModal} from "@/app/sign-in/sign-in-form/sign-up-form-modal/sign-up-form-modal";

export function SignInForm() {
	return(
		<>
			<form className="flex  flex-col mx-auto gap-4">
				<h1 className="text-3xl font-bold">Welcome back.</h1>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" value="Your email"/>
					</div>
					<TextInput
						autoComplete='email'

						id="email1"
						type="email"
						name="profileEmail"
					/>

				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" value="Your password"/>
					</div>
					<TextInput
						autoComplete='current-password'

						name="profilePassword"
						id="password1"
						type="password"
					/>
				</div>
				<SignUpFormModal/>
				<div className="flex">
					<Button className={'mr-1'} color={'info'} type="submit">Submit</Button>
					<Button className='ml-1' color={'failure'} type={'reset'}>Reset</Button>

				</div>
			</form>
		</>
	)
}
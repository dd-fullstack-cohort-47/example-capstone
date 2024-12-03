'use client'
import {Button, Label, Modal, ModalBody, ModalHeader, TextInput} from "flowbite-react";
import React from "react";
import {SignUpForm} from "@/app/sign-in/sign-up-modal/SignUpForm";

export function SignUpModal() {
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
	return (
		<>
			<a className="block cursor-pointer text-blue-500 active:text-purple-500 " onClick={() => {

				console.log("clicked")
				setIsModalOpen(true)
			}}>Dont have an account?</a>
			<Modal id='sign-up-modal' show={isModalOpen} onClose={() => {
				setIsModalOpen(false)
			}}>
				<ModalHeader />
				<ModalBody>

					<div className="space-y-4">
						<SignUpForm />
					</div>
				</ModalBody>
			</Modal>
		</>
	)
}
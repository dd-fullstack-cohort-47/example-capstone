import {Button, Label, Modal, ModalBody, ModalHeader, TextInput} from "flowbite-react";
import {DisplayError} from "@/components/DisplayError";
import {DisplayStatus} from "@/components/DisplayStatus";
import React from "react";
import {Profile} from "@/utils/models/profile/profile.model";
import {DisplayUploadErrorProps, ImageUploadDropZone} from "@/components/ImageUploadDropZone";

type Props = {
	profile: Profile,
	isSignedInUser: boolean

}

export function EditProfileForm(props: Props) {

	const {profile, isSignedInUser} = props

	if (!isSignedInUser) {
		return <></>
	}
	const [isModalOpen, setIsModalOpen] = React.useState(false)

	const [selectedImage, setSelectedImage] = React.useState<string|null>(null)
	return (
		<>
			<Button
				onClick={() => {
					setIsModalOpen(true)
				}}>
				Edit Profile
			</Button>
			<Modal id='sign-up-modal' show={isModalOpen} onClose={() => {
				setIsModalOpen(false)
			}}>
				<ModalHeader/>
				<ModalBody>
					<div className="space-y-2">
						<form  className="flex min-h-auto gap-4 min-w-full flex-col grow">
							<h1 className="text-3xl font-bold">Edit Profile</h1>
							<div>
							</div>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="profileName" value="name"/>
								</div>
								<TextInput
									autoComplete='username'
									name={'profileName'}
									id="profileName"
									type="text"
									required

								/>
								<DisplayError />
							</div>

							<div>
								<div className="mb-2 block">
									<Label htmlFor="profileAbout" value={"Profile About"}/>
								</div>
								<TextInput
									id="profileAbout"
									type="text"
									name={'profileAbout'}
								/>
								<DisplayError  />
							</div>

							<ImageUploadDropZone
								fieldValue={'profileImageUrl'}
								setSelectedImage={setSelectedImage}
							/>

							<DisplayUploadErrorProps errors={{}} field={'profileImageUrl'}/>
							<div className={"flex"}>
								<Button className={"mr-1"} type="submit"> Submit</Button>
								<Button  className={'ml-1'} color={"red"} type="reset"> Reset</Button>
							</div>
						</form>
						<DisplayStatus status={null} />
					</div>
				</ModalBody>
			</Modal>
		</>
	)
}
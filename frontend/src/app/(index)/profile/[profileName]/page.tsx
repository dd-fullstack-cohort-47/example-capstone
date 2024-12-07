
import {redirect} from "next/navigation";
import {ThreadCard} from "@/components/ThreadCard";
import {getSession} from "@/utils/session.utils";
import {fetchProfileByProfileName} from "@/utils/models/profile/profile.action";
import {fetchThreadsByProfileId} from "@/utils/models/thread/thread.action";
import {EditProfileForm} from "@/app/(index)/profile/[profileName]/EditProfileForm";

type Props = {
	params:{
		profileName: string
	}
}
export default async function (props: Props) {



	const {profileName} = props.params
	const session = await getSession()
	const signedInUser = session?.profile

	const profile = await fetchProfileByProfileName(profileName)
	if(profile === null) {
		return(redirect('/404'))
	}
	const threads = await fetchThreadsByProfileId(profile.profileId)


	const isSignedInUser = signedInUser?.profileId === profile.profileId

	return (
		<>
			<main className="container lg:w-2/3 grid mx-auto">
				<div className="flex flex-col justify-center items-center">
					<h1 className="text-3xl p-4 font-bold">{profile.profileName}</h1>
					{isSignedInUser &&
            <EditProfileForm isSignedInUser ={isSignedInUser}  profile={profile} />
					}
				</div>

				{threads.map((thread) => <ThreadCard thread={thread} key={thread.threadId} />)}
			</main>
		</>
	)
}

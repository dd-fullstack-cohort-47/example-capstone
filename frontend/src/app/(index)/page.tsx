"use server"
;
import {Suspense} from "react";
import {ThreadCard} from "@/components/ThreadCard";
import {fetchAllThreads} from "@/utils/models/thread/thread.action";
import {getSession} from "@/utils/session.utils";
import {ThreadForm} from "@/app/(index)/ThreadForm";
import {redirect} from "next/navigation";

export default async function () {
	const session = await getSession()

	if (!session) {
		redirect('/sign-in')
	}
	const profile = session?.profile

	const threads = await fetchAllThreads()

	return (
		<>
			<main className="container lg:w-2/3 grid mx-auto">
				<div className="col-span-full p-0 border border-base-content">
					<h1 className="text-3x p-4 font-bold">Welcome {profile.profileName}!</h1>
					<ThreadForm session={session}/>

					<Suspense fallback={<div>Loading...</div>}>
						{threads.map((thread) => <ThreadCard key={thread.threadId} thread={thread}/>)}
					</Suspense>


				</div>
			</main>
		</>
	)
}
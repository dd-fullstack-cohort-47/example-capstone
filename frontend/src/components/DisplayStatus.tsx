import {Alert} from "flowbite-react";
import {Status} from "@/utils/interfaces/Status";

type Props = {
	status: Status|null
}


export function DisplayStatus(props: Props) {
	const {status} = props

	const color = status?.status === 200 ? 'bg-green-400' : 'bg-red-400'
	if(status) {
		return(
			<output className={`flex border-2 justify-center items-center ${color}`} >
				{status.message}
			</output>

		)
	}
}


type Props = {
	error?: string
}



export function DisplayError(props: Props) {

	const {error} = props
	if (error) {
		return (
			< output className={'flex border-2 rounded-md justify-center items-center bg-red-400'} color="failure">
				{error}
			</output>
		)
	}
}
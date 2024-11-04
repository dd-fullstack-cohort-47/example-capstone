import {twMerge} from "tailwind-merge";
import {LayoutProps} from "@/utils/interfaces/NextComponent";

export default function ({children}: LayoutProps) {
	const isCollapsed = false
	return (
		<div className="flex items-start">
			<div
				id="main-content"
				className={twMerge(
					"relative h-full w-full overflow-y-auto pt-16",
					isCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64",
				)}
			>
				{children}
			</div>
		</div>
	)
}
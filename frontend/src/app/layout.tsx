import type { Metadata } from 'next'
import {Flowbite, DarkThemeToggle, ThemeModeScript} from 'flowbite-react';
import './globals.css'
import React from "react";
import {theme} from "@/utils/theme.utils";
import {cn} from "@/utils/tailwind.utils";


export const metadata: Metadata = {
	title: 'Rethreads',
	description: 'Twitters True Heir',
}

type RootLayoutProps = {
	children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
	const { children } = props
	return (
		<html suppressHydrationWarning={true}>
		<head>


			<link href="/frontend/public/favicon.svg" rel="icon" type="image/x-icon"/>
			<ThemeModeScript/>
		</head>
		<body className={cn("min-h-dvh font-sans antialiased bg-gray-50 text-stone-800 dark:bg-gray-800 dark:text-slate-200")} >

		<Flowbite theme={{theme: theme}}>
			{children}
		</Flowbite>
		</body>
		</html>
	)
}
import type { Metadata } from 'next'
import {Flowbite, DarkThemeToggle, ThemeModeScript} from 'flowbite-react';
import './globals.css'
import React from "react";

import {Signika as FontSans} from 'next/font/google';
import {cn} from "@/utils/tailwind.utils";
import {SidebarProvider} from "@/utils/context/sidebar.context";
import {theme} from "@/utils/theme.utils";
import {LayoutContent} from "@/app/LayoutContent";





export const metadata: Metadata = {
	title: 'Title Goes Here',
	description: 'description goes here',
}

type RootLayoutProps = {
	children: React.ReactNode
}


const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: "300",
})
export default function RootLayout(props : RootLayoutProps) {
	const { children } = props
	return (
		<html suppressHydrationWarning>
		<head>


			<link href="/frontend/public/favicon.svg" rel="icon" type="image/x-icon"/>
			<ThemeModeScript/>
		</head>
		<body className={cn("min-h-dvh bg-background font-sans antialiased bg-gray-50 text-stone-800 dark:bg-gray-800 dark:text-slate-200", fontSans.variable)} >

		<Flowbite theme={{theme: theme}}>
			{children}
		</Flowbite>
		</body>
		</html>
	)
}


import type { Metadata } from 'next'
import {Flowbite, DarkThemeToggle, ThemeModeScript} from 'flowbite-react';
import './globals.css'
import React from "react";


export const metadata: Metadata = {
	title: 'Title Goes Here',
	description: 'description goes here',
}

type RootLayoutProps = {
	children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
	const { children } = props
	return (
		<html className={"dark"} suppressHydrationWarning>

		<body >
		{children}
		</body>
		</html>
	)
}
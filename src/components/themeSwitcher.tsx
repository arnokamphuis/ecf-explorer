"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { Button } from "./ui/button";

export const ThemeSwitcher = () => {
	const prefersDarkMode =
		typeof window !== "undefined"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
			: false;
	const [isDark, setIsDark] = useLocalStorage<boolean>("theme", true);

	useEffect(() => {
		setIsDark(prefersDarkMode);
		if (prefersDarkMode || isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prefersDarkMode]);

	const toggleTheme = () => {
		if (!isDark) {
			document.documentElement.classList.add("dark");
			setIsDark(true);
			return;
		}
		document.documentElement.classList.remove("dark");
		setIsDark(false);
	};
	return (
		<Button onClick={toggleTheme}>{isDark ? "Light" : "Dark"} theme</Button>
	);
};

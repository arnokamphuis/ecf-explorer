"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { useMemo } from "react";

type ProviderProps = { children: React.ReactNode };

export default function Providers({ children }: ProviderProps) {
	const prefersDarkMode = "dark";

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode,
				},
			}),
		[prefersDarkMode]
	);
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

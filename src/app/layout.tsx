import { ThemeSwitcher } from "@/components/themeSwitcher";
import LevelProvider from "@/context/levelProvider";
import RolesProvider from "@/context/rolesProvider";
import Link from "next/link";
import "./globals.css";

type LayoutProps = {
	children: React.ReactNode;
};

export const metadata = {
	title: "e-Competence Framework",
	description: "eCF browser",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function Layout({ children }: LayoutProps) {
	return (
		<RolesProvider>
			<LevelProvider>
				<html lang="en">
					<body className="bg-slate-100 dark:bg-black">
						<nav className="dark:bg-[#121212] h-16 flex flex-row items-center px-4 justify-between shadow-sm bg-white">
							<Link className="font-bold text-xl no-underline" href="/">
								eCF-explorer
							</Link>
							<div className="flex items-center gap-4">
								<Link href="/roles" className="font-bold">
									Roles
								</Link>
								<Link href="/competences" className="font-bold">
									Competences
								</Link>
								<ThemeSwitcher />
							</div>
						</nav>
						<div className="p-5">{children}</div>
					</body>
				</html>
			</LevelProvider>
		</RolesProvider>
	);
}

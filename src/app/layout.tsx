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
		<html lang="en">
			<body className="dark:bg-black dark:text-white text-black bg-gray-100">
				<nav className="bg-[#121212] h-20 flex flex-row items-center px-4 justify-between shadow-sm">
					<Link className="font-bold text-2xl no-underline" href="/">
						Ecf-explorer
					</Link>
					<div className="flex items-center gap-4">
						<Link href="/roles" className="font-bold">
							Roles
						</Link>
						<Link href="/competences" className="font-bold">
							Competences
						</Link>
					</div>
				</nav>
				<div className="p-5">{children}</div>
			</body>
		</html>
	);
}

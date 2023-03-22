import Link from "next/link";
import "./globals.css";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<html lang="en">
			<head></head>
			<body className="dark:bg-black dark:text-white text-black bg-white">
				<nav className="bg-[#121212] h-20 flex flex-row items-center px-4 justify-between shadow-sm">
					<p className="font-bold text-xl">Ecf-explorer</p>
					<div className="flex items-center">
						<Link href="/roles" className="font-bold">
							Rollen
						</Link>
					</div>
				</nav>
				<div className="p-5">{children}</div>
			</body>
		</html>
	);
}

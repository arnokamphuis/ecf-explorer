import "./globals.css";

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<html lang="en">
			<head></head>
			<body>{children}</body>
		</html>
	);
}

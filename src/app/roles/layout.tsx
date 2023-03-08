import LevelProvider from "./levelProvider";
import RolesProvider from "./rolesProvider";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LevelProvider>
			<RolesProvider>{children}</RolesProvider>
		</LevelProvider>
	);
}

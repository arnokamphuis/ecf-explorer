import LevelProvider from "../../context/levelProvider";
import RolesProvider from "../../context/rolesProvider";

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

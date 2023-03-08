import LevelProvider from "../../components/levelProvider";
import RolesProvider from "../../components/rolesProvider";

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

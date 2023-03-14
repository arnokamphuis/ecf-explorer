import Providers from "@/providers";
import LevelProvider from "../../context/levelProvider";
import RolesProvider from "../../context/rolesProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<LevelProvider>
				<RolesProvider>{children}</RolesProvider>
			</LevelProvider>
		</Providers>
	);
}

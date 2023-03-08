import RoleCard from "./rolecard";
import RoleChecker from "./rolechecker";
import { Roles } from "../../types/role";
import { Levels } from "../../types/level";
import Slider from "./slider";
import { LvlWrapper, RoleWrapper } from "./wrappers";

async function getRoles(): Promise<Array<keyof Roles>> {
	const res = await fetch("http://localhost:3000/api/roles");
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return JSON.parse(await res.json());
}

async function getLevels(): Promise<Levels> {
	const res = await fetch("http://localhost:3000/api/levels");
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return JSON.parse(await res.json());
}

export default async function Page() {
	const roles = (await getRoles()) as string[];
	const levels = await getLevels();
	return (
		<div>
			<p>Level</p>
			<Slider />

			<div className="flex flex-row flex-wrap">
				{roles.map(name => (
					<RoleChecker key={"rc" + name} name={name} />
				))}
			</div>

				<div>
					{Object.keys(levels).map((lvl: string) => {
						const indevData = levels[lvl]["in development"];
						const devData = levels[lvl]["developed"];
						return (
							<LvlWrapper lvl={Number(lvl)} key={lvl}>
								<div>
									{devData.map(item => (
										<RoleWrapper name={item.name} key={item.name}>
											{/* @ts-expect-error Server Component */}
											<RoleCard className="dev" name={item.name} level={lvl} />
										</RoleWrapper>
									))}
								</div>
								<div>
									{indevData.map(item => (
										<RoleWrapper name={item.name} key={item.name}>
											{/* @ts-expect-error Server Component */}
											<RoleCard
												className="indev"
												name={item.name}
												level={lvl}
											/>
										</RoleWrapper>
									))}
								</div>
							</LvlWrapper>
						);
					})}
				</div>
		</div>
	);
}

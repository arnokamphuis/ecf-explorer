import RoleCard from "./rolecard";
import RoleChecker from "../../components/rolechecker";
import { Roles } from "../../types/role";
import { Levels } from "../../types/level";
import Slider from "../../components/slider";
import { LvlWrapper, RoleWrapper } from "../../components/wrappers";
import path from "path";
import { promises as fs } from "fs";

const jsonDirectory = path.join(process.cwd(), "json");
async function getRoles(): Promise<Roles> {
	const fileContents = await fs.readFile(jsonDirectory + "/roles.json", "utf8");

	return JSON.parse(fileContents);
}

async function getLevels(): Promise<Levels> {
	const fileContents = await fs.readFile(
		jsonDirectory + "/levels.json",
		"utf8"
	);
	return JSON.parse(fileContents);
}

export default async function Page() {
	const roleData = await getRoles();
	const roles = Object.keys(roleData);
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
										<RoleCard className="indev" name={item.name} level={lvl} />
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

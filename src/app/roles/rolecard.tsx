import "./rolecard.modules.css";
import { Competencies, Phase } from "@/types/competency";
import path from "path";
import { promises as fs } from "fs";
import { Roles } from "@/types/role";

type RoleCardProps = {
	name: string;
	level: string;
	className: string;
};

type ApiReturn = {
	name: string;
	description: string;
	phase: Phase;
	activity: string;
};
async function getRoleCompetencies(
	lvl: string,
	name: string
): Promise<{ dev: ApiReturn[]; inDev: ApiReturn[] }> {
	const jsonDirectory = path.join(process.cwd(), "json");
	const competencies: Competencies = JSON.parse(
		await fs.readFile(jsonDirectory + "/competencies.json", "utf8")
	);
	const roles: Roles = JSON.parse(
		await fs.readFile(jsonDirectory + "/roles.json", "utf8")
	);

	const currentRole = roles[name].competencies;
	const inDevCompetencies = Object.keys(currentRole).filter(r =>
		currentRole[r].available.includes(Number(lvl))
	);
	const devCompetencies = Object.keys(currentRole).filter(r =>
		currentRole[r].available.includes(Number(lvl) - 1)
	);
	const data = {
		dev: devCompetencies.map(comp => {
			const filteredData = competencies[comp];
			return {
				name: comp,
				description: filteredData.description,
				phase: filteredData.phase,
				activity: filteredData["levels"][lvl],
			};
		}),
		inDev: inDevCompetencies.map(comp => {
			const filteredData = competencies[comp];
			return {
				name: comp,
				description: filteredData.description,
				phase: filteredData.phase,
				activity: filteredData["levels"][lvl],
			};
		}),
	};

	return data;
}

export default async function RoleCard({
	name,
	level,
	className,
}: RoleCardProps) {
	const competencies = await getRoleCompetencies(level, name);
	return (
		<div className={"role " + className}>
			<p className="capitalize">{name}</p>
			<div>
				<h3 className="text-xl font-bold mt-6 mb-2">REQUIRED AT THIS LEVEL:</h3>
				{competencies.inDev.map(competency => (
					<div key={competency.name}>
						<p className="ml-4 font-bold">
							{competency.name}{" "}
							<span className="text-sx">({competency.phase})</span>:
						</p>
						<p className="ml-8 text-sx">{competency.activity} </p>
					</div>
				))}
				<h3 className="text-xl font-bold mt-6 mb-2">
					DEVELOPED AT LOWER LEVEL:
				</h3>
				{competencies.dev.map(competency => (
					<div key={competency.name}>
						<p className="ml-4 font-bold">
							{competency.name}{" "}
							<span className="text-sx">({competency.phase})</span>:
						</p>
						<p className="ml-8 text-sx">{competency.activity} </p>
					</div>
				))}
			</div>
		</div>
	);
}

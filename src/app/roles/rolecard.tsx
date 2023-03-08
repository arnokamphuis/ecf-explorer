import "./rolecard.modules.css";
import { Phase } from "@/types/competency";

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
	const res = await fetch(
		`http://localhost:3000/api/role-competence?level=${lvl}&role=${name}`
	);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return JSON.parse(await res.json());
}

export default async function RoleCard({
	name,
	level,
	className,
}: RoleCardProps) {
	const competencies = await getRoleCompetencies(level, name);
	return (
		<div className={"role " + className} key={name}>
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

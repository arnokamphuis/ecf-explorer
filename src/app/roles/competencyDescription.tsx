import { Phase } from "@/types/competency";

type CompetencyDescriptionProps = {
	lvl: string;
	comp: string;
};

type ApiReturn = {
	description: string;
	phase: Phase;
	activity: string;
};
async function getCompetency(lvl: string, comp: string): Promise<ApiReturn> {
	const res = await fetch(
		`http://localhost:3000/api/competencies/${comp}?level=${lvl}`
	);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return JSON.parse(await res.json());
}

export default async function CompetencyDescription({
	comp,
	lvl,
}: CompetencyDescriptionProps) {
	const competency = await getCompetency(lvl, comp);

	return (
		<div>
			<p className="ml-4 font-bold">
				{comp} <span className="text-sx">({competency.phase})</span>:
			</p>
			<p className="ml-8 text-sx">{competency.activity} </p>
		</div>
	);
}

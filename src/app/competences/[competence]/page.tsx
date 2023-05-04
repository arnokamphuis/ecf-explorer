import { getCompetences } from "@/utils/getCompetences";
import { getRoles } from "@/utils/getRoles";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCompetence(competence: string) {
	const competences = await getCompetences();

	if (!competences[competence]) {
		notFound();
	}

	return competences[competence];
}

async function getCompetenceRoles(competence: string) {
	const roles = await getRoles();

	return Object.keys(roles).filter(
		role => roles[role].competencies[competence]
	);
}

export default async function Competencepage({
	params: { competence = "" },
}: {
	params: { competence: string };
}) {
	const formatCompetence = competence.replaceAll("-", " ");
	const [competenceRoles, competenceData] = await Promise.all([
		getCompetenceRoles(formatCompetence),
		getCompetence(formatCompetence),
	]);
	return (
		<div className="flex flex-1 items-center justify-center">
			<div>
				<p>{formatCompetence}</p>
				<p>{competenceData.description}</p>
				<div className="flex flex-col">
					{competenceRoles.map(role => (
						<Link
							key={role}
							className="capitalize"
							href={`/roles/${role.replaceAll(" ", "-")}`}>
							{role}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

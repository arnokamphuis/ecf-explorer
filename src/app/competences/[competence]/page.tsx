import { getCompetences } from "@/utils/getCompetences";
import { getHboICompetenceLinks } from "@/utils/getHboICompetenceLinks";
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

async function getCompetenceHboI(competence: string) {
	const links = await getHboICompetenceLinks();

	return links[competence];
}

export default async function Competencepage({
	params: { competence = "" },
}: {
	params: { competence: string };
}) {
	const formatCompetence = competence.replaceAll("-", " ");
	const [competenceRoles, competenceData, hboiLinks] = await Promise.all([
		getCompetenceRoles(formatCompetence),
		getCompetence(formatCompetence),
		getCompetenceHboI(formatCompetence),
	]);
	const roles: typeof hboiLinks = Object.entries(hboiLinks).reduce(
		(refactoredObject: typeof hboiLinks, [key, values]) => {
			values.forEach(value => {
				refactoredObject[value] = [...(refactoredObject[value] ?? []), key];
			});
			return refactoredObject;
		},
		{}
	);
	return (
		<div className="flex flex-1 items-center justify-center">
			<div className="flex flex-col gap-4 max-w-xl card">
				<div>
					<h1>{formatCompetence}</h1>
					<p className="lead">{competenceData.description}</p>
				</div>
				<div>
					<h2>Levels</h2>
					{Object.keys(competenceData.levels).map(level => (
						<p key={level}>
							{level}: {competenceData.levels[level]}
						</p>
					))}
				</div>
				<div className="flex flex-col">
					<h2>Roles</h2>
					{competenceRoles.map(role => (
						<Link
							key={role}
							className="capitalize"
							href={`/roles/${role.replaceAll(" ", "-")}`}>
							{role}
						</Link>
					))}
				</div>
				{hboiLinks && Object.keys(hboiLinks).length > 0 && (
					<div>
						<h2>Hbo-i </h2>
						{Object.keys(roles).map(link => (
							<p key={link}>
								{link}: {roles[link].join(", ")}
							</p>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

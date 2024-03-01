import { Card } from "@/components/ui/card";
import { getCompetences } from "@/utils/getCompetences";
import { getHboICompetenceLinks } from "@/utils/getHboICompetenceLinks";
import { getRoles } from "@/utils/getRoles";
import { Metadata } from "next";
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
	const formatCompetence = decodeURI(competence);
	const [competenceRoles, competenceData, hboiLinks] = await Promise.all([
		getCompetenceRoles(formatCompetence),
		getCompetence(formatCompetence),
		getCompetenceHboI(formatCompetence),
	]);
	return (
		<div className="flex flex-1 items-center justify-center">
			<Card className="flex flex-col gap-4 max-w-xl p-4">
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
							href={`/roles/${encodeURI(role)}`}>
							{role}
						</Link>
					))}
				</div>
				{hboiLinks && Object.keys(hboiLinks).length > 0 && (
					<div>
						<h2>Hbo-i </h2>
						{Object.entries(hboiLinks).map(([key, values]) => (
							<p key={key}>
								{key}: {values.join(", ")}
							</p>
						))}
					</div>
				)}
			</Card>
		</div>
	);
}

export async function generateStaticParams() {
	const competences = await getCompetences();
	return Object.keys(competences).map(key => decodeURI(key));
}

export async function generateMetadata({
	params,
}: {
	params: { competence: string };
}): Promise<Metadata> {
	const competence = decodeURI(params.competence);
	const competences = await getCompetences();

	return {
		title: competence,
		description: competences[competence].description,
	};
}

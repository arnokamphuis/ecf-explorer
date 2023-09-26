import Link from "next/link";
import { getCompetences } from "@/utils/getCompetences";

type Section = {
	title: string;
	data: string[];
};

const phases: Record<string, string> = {
	Plan: "This competence area includes the (strategic) preparatory work within the ICT domain.",
	Build:
		"This competence area covers the development and implementation of products, services or solutions.",
	Run: "This competence area is about the delivery, support and maintenance of products, services and solutions provided.",
	Enable:
		"This competence area addresses (strategic) support activities in the ICT domain.",
	Manage:
		"This competence area concerns about managing and improving the ICT domain.",
};

export default async function Competencespage() {
	const competences = await getCompetences();

	const phaseSections: Section[] = [];
	Object.keys(competences).forEach(comp => {
		const existingSection = phaseSections.find(
			section => section.title === competences[comp].phase
		);
		if (existingSection) {
			existingSection.data.push(comp);
		} else {
			phaseSections.push({
				title: competences[comp].phase,
				data: [comp],
			});
		}
	});

	return (
		<>
			<h1 className="mb-4">Competences</h1>
			<div className="flex flex-row flex-wrap gap-4 card md:justify-evenly">
				{phaseSections.map(section => (
					<div key={section.title} className="">
						<h2>{section.title}</h2>
						<p className="w-60">{phases[section.title]}</p>
						<div className="flex flex-col">
							{section.data.map(comp => (
								<Link
									href={`/competences/${comp.replaceAll(" ", "-")}`}
									key={comp}>
									{comp}
								</Link>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

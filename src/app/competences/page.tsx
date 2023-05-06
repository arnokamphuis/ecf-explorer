import Link from "next/link";
import { getCompetences } from "@/utils/getCompetences";

type Section = {
	title: string;
	data: string[];
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

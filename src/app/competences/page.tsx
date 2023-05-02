import Link from "next/link";
import { getCompetences } from "@/utils/getCompetences";

export default async function Competencespage() {
	const competences = await getCompetences();
	return (
		<div className="flex flex-col flex-wrap h-[80vh]">
			{Object.keys(competences).map(comp => (
				<Link href={`/competences/${comp.replaceAll(" ", "-")}`} key={comp}>
					{comp}
				</Link>
			))}
		</div>
	);
}

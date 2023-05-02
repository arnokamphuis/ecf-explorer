import path from "path";
import { promises as fs } from "fs";
import { Competencies } from "@/types/competency";
import { cache } from "react";

export const getCompetences = cache(async () => {
	const jsonDirectory = path.join(process.cwd(), "json");
	const competences: Competencies = JSON.parse(
		await fs.readFile(jsonDirectory + "/competencies.json", "utf8")
	);

	return competences;
});

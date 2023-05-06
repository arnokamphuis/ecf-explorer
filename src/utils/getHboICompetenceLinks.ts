import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";
import { HboICompetenceLinks } from "@/types/hboi";

export const getHboICompetenceLinks = cache(async () => {
	const jsonDirectory = path.join(process.cwd(), "json");
	const links: HboICompetenceLinks = JSON.parse(
		await fs.readFile(jsonDirectory + "/ecf-hboi.json", "utf8")
	);

	return links;
});

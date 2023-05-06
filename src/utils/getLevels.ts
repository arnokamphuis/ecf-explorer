import path from "path";
import { promises as fs } from "fs";
import { Levels } from "@/types/level";
import { cache } from "react";

export const getLevels = cache(async () => {
	const levels: Levels = JSON.parse(
		await fs.readFile(path.join(process.cwd(), "json") + "/levels.json", "utf8")
	);
	return levels;
});

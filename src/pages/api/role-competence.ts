import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { Roles } from "@/types/role";
import { Competencies } from "@/types/competency";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const jsonDirectory = path.join(process.cwd(), "json");
	const competencies: Competencies = JSON.parse(
		await fs.readFile(jsonDirectory + "/competencies.json", "utf8")
	);
	const roles: Roles = JSON.parse(
		await fs.readFile(jsonDirectory + "/roles.json", "utf8")
	);
	const { level, role } = req.query;
	if (
		typeof level === "string" &&
		typeof role === "string" &&
		Object.keys(roles).includes(role)
	) {
		const currentRole = roles[role].competencies;
		const inDevCompetencies = Object.keys(currentRole).filter(r =>
			currentRole[r].available.includes(Number(level))
		);
		const devCompetencies = Object.keys(currentRole).filter(r =>
			currentRole[r].available.includes(Number(level) - 1)
		);
		const data = {
			dev: devCompetencies.map(comp => {
				const filteredData = competencies[comp];
				return {
					name: comp,
					description: filteredData.description,
					phase: filteredData.phase,
					activity: filteredData["levels"][level],
				};
			}),
			inDev: inDevCompetencies.map(comp => {
				const filteredData = competencies[comp];
				return {
					name: comp,
					description: filteredData.description,
					phase: filteredData.phase,
					activity: filteredData["levels"][level],
				};
			}),
		};
		return res.status(200).json(JSON.stringify(data));
	}
	res.status(204).end();
}

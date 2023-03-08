import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { Roles } from "@/types/role";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const jsonDirectory = path.join(process.cwd(), "json");
	const fileContents = await fs.readFile(jsonDirectory + "/roles.json", "utf8");
	const fileData: Roles = JSON.parse(fileContents);
	res.status(200).json(JSON.stringify(Object.keys(fileData)));
}

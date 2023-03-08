import {  NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
// @ts-ignore
export default async function handler(_, res: NextApiResponse) {
	const jsonDirectory = path.join(process.cwd(), "json");
	const fileContents = await fs.readFile(
		jsonDirectory + "/levels.json",
		"utf8"
	);
	res.status(200).json(fileContents);
}

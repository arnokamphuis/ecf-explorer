import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";
import { Roles } from "@/types/role";

export const getRoles = cache(async () => {
	const roles: Roles = JSON.parse(
		await fs.readFile(path.join(process.cwd(), "json") + "/roles.json", "utf8")
	);

	return roles;
});

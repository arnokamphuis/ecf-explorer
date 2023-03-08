import RoleChecker from "@/components/rolechecker";
import { Roles } from "@/types/role";
import { Levels } from "@/types/level";
import Slider from "@/components/slider";
import path from "path";
import { promises as fs } from "fs";
import { Competencies } from "@/types/competency";
import RoleFilter from "@/components/roleFilter";

const jsonDirectory = path.join(process.cwd(), "json");
async function getRoles(): Promise<Roles> {
	const fileContents = await fs.readFile(jsonDirectory + "/roles.json", "utf8");

	return JSON.parse(fileContents);
}

async function getCompleteRoles() {
	const levels: Levels = JSON.parse(
		await fs.readFile(jsonDirectory + "/levels.json", "utf8")
	);
	const competencies: Competencies = JSON.parse(
		await fs.readFile(jsonDirectory + "/competencies.json", "utf8")
	);
	return Object.keys(levels).map(level => ({
		developed: levels[level]["developed"].map(role => ({
			...role,
			developed: role.developed.map(competence => ({
				name: `${competence} (${competencies[competence].phase})`,
				activity: competencies[competence].levels[`${Number(level) - 1}`],
			})),
			"in development": role["in development"].map(competence => ({
				name: `${competence} (${competencies[competence].phase})`,
				activity: competencies[competence].levels[level],
			})),
		})),
		"in development": levels[level]["in development"].map(role => ({
			...role,
			developed: role.developed.map(competence => ({
				name: `${competence} (${competencies[competence].phase})`,
				activity: competencies[competence].levels[`${Number(level) - 1}`],
			})),
			"in development": role["in development"].map(competence => ({
				name: `${competence} (${competencies[competence].phase})`,
				activity: competencies[competence].levels[level],
			})),
		})),
	}));
}

export default async function Page() {
	const roleData = await getRoles();
	const roles = Object.keys(roleData);
	const completeRoles = await getCompleteRoles();
	return (
		<div>
			<p>Level</p>
			<Slider />

			<div className="flex flex-row flex-wrap">
				{roles.map(name => (
					<RoleChecker key={name} name={name} />
				))}
			</div>
			<RoleFilter allRoles={completeRoles} />
		</div>
	);
}

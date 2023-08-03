import RoleFilter from "@/components/roleFilter";
import RoleSelect from "@/components/roleselect";
import { getLevels } from "@/utils/getLevels";
import { getRoles } from "@/utils/getRoles";
import { getCompetences } from "@/utils/getCompetences";
import { cache } from "react";
import { LevelRoleDescription } from "@/types/level";

const getCompleteRoles = cache(async () => {
	const levels = await getLevels();
	const competences = await getCompetences();

	const mapCompetence = (
		competence: string,
		level: string,
		developed = false
	) => ({
		name: `${competence} (${competences[competence].phase})`,
		activity:
			competences[competence].levels[developed ? Number(level) - 1 : level],
	});

	const mapRole = (role: LevelRoleDescription, level: string) => ({
		...role,
		developed: role.developed.map(comp => mapCompetence(comp, level, true)),
		"in development": role["in development"].map(comp =>
			mapCompetence(comp, level)
		),
	});

	return Object.keys(levels).map(level => ({
		developed: levels[level]["developed"].map(role => mapRole(role, level)),
		"in development": levels[level]["in development"].map(role =>
			mapRole(role, level)
		),
	}));
});

const getRolesPerLevel = cache(async () => {
	const levels = await getLevels();

	return Object.keys(levels).map(level => [
		...levels[level].developed.map(role => role.name),
		...levels[level]["in development"].map(role => role.name),
	]);
});

export default async function Page() {
	const [completeRoles, rolesPerLevel, roles] = await Promise.all([
		getCompleteRoles(),
		getRolesPerLevel(),
		getRoles(),
	]);

	const roleNames = Object.keys(roles);

	return (
		<div>
			<div className="flex flex-col flex-wrap dark:bg-[#121212] p-4 rounded-lg gap-4 mt-5">
				<p>Select role(s)</p>
				<RoleSelect roleNames={roleNames} />
			</div>
			<RoleFilter allRoles={completeRoles} rolesPerLevel={rolesPerLevel} />
		</div>
	);
}

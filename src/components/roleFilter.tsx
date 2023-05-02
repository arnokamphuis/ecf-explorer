"use client";

import RoleCard from "@/components/rolecard";
import Button from "@mui/material/Button";
import { useContext, useMemo } from "react";
import { LevelContext, LevelContextType } from "@/context/levelProvider";
import { RolesContext, RolesContextType } from "@/context/rolesProvider";

type CompetenceInfo = { name: string; activity: string };
type RoleInfo = {
	developed: CompetenceInfo[];
	"in development": CompetenceInfo[];
	name: string;
};

type RoleFilterProps = {
	allRoles: {
		developed: RoleInfo[];
		"in development": RoleInfo[];
	}[];
	rolesPerLevel: string[][];
};

export default function RoleFilter({
	allRoles,
	rolesPerLevel,
}: RoleFilterProps) {
	const { level, changeLevel } = useContext(LevelContext) as LevelContextType;
	const { roles } = useContext(RolesContext) as RolesContextType;
	const filteredDevRoles = useMemo(
		() =>
			allRoles[level - 1].developed.filter(role => roles.includes(role.name)),
		[allRoles, level, roles]
	);
	const filteredInDevRoles = useMemo(
		() =>
			allRoles[level - 1]["in development"].filter(role =>
				roles.includes(role.name)
			),
		[allRoles, level, roles]
	);

	if (
		filteredDevRoles.length === 0 &&
		filteredInDevRoles.length === 0 &&
		roles.length > 0
	) {
		const nextLevel = rolesPerLevel.findIndex(
			lvl => roles.filter(role => lvl.includes(role)).length > 0
		);

		if (nextLevel === -1) {
			return null;
		}

		return (
			<div className="flex flex-1 justify-center items-center mt-10 gap-4">
				<p>
					Gekozen rol(len) niet beschikbaar op dit level, klik op de knop om
					naar
					<br />
					eerstvolgende level te gaan waar deze rol(len) wel beschikbaar is.
				</p>
				<Button onClick={() => changeLevel(nextLevel + 1)} variant="outlined">
					Ga naar level {nextLevel + 1}
				</Button>
			</div>
		);
	}
	return (
		<div className="flex lg:flex-row flex-col flex-2 mt-4">
			<div className="flex-1">
				<h2>Ontwikkeld</h2>
				{filteredDevRoles.map(role => (
					<RoleCard role={role} key={role.name} />
				))}
			</div>
			<div className="flex-1">
				<h2>In ontwikkeling</h2>
				{filteredInDevRoles.map(role => (
					<RoleCard role={role} key={role.name} />
				))}
			</div>
		</div>
	);
}

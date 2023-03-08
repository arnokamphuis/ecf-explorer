"use client";

import RoleCard from "@/app/roles/rolecard";
import { useContext } from "react";
import { LevelContext, LevelContextType } from "./levelProvider";
import { RolesContext, RolesContextType } from "./rolesProvider";

type RoleFilterProps = {
	allRoles: {
		developed: {
			developed: {
				name: string;
				activity: string;
			}[];
			"in development": {
				name: string;
				activity: string;
			}[];
			name: string;
		}[];
		"in development": {
			developed: {
				name: string;
				activity: string;
			}[];
			"in development": {
				name: string;
				activity: string;
			}[];
			name: string;
		}[];
	}[];
};

export default function RoleFilter({ allRoles }: RoleFilterProps) {
	const { level } = useContext(LevelContext) as LevelContextType;
	const { roles } = useContext(RolesContext) as RolesContextType;
	return (
		<div>
			<div>
				{allRoles[level - 1].developed
					.filter(role => roles.includes(role.name))
					.map(role => (
						<RoleCard role={role} key={role.name} />
					))}
			</div>
			<div>
				{allRoles[level - 1]["in development"]
					.filter(role => roles.includes(role.name))
					.map(role => (
						<RoleCard role={role} key={role.name} />
					))}
			</div>
		</div>
	);
}

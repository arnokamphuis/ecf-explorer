"use client";

import RoleCard from "@/components/rolecard";
import { useContext } from "react";
import { LevelContext, LevelContextType } from "../context/levelProvider";
import { RolesContext, RolesContextType } from "../context/rolesProvider";

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
		<div className="flex lg:flex-row flex-col flex-2">
			<div className="flex-1">
				{allRoles[level - 1].developed
					.filter(role => roles.includes(role.name))
					.map(role => (
						<RoleCard role={role} key={role.name} />
					))}
			</div>
			<div className="flex-1">
				{allRoles[level - 1]["in development"]
					.filter(role => roles.includes(role.name))
					.map(role => (
						<RoleCard role={role} key={role.name} />
					))}
			</div>
		</div>
	);
}

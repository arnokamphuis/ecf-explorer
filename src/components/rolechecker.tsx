"use client";

import React, { useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import { RolesContext, RolesContextType } from "./rolesProvider";
import { FormControlLabel } from "@mui/material";

type RoleCheckerProps = {
	name: string;
};

export default function RoleChecker({ name }: RoleCheckerProps) {
	const { roles, addRole, removeRole } = useContext(
		RolesContext
	) as RolesContextType;
	const inRoles = roles.includes(name);
	return (
		<div className="border-solid border-2 px-2 m-2 rounded hover:border-rose-500 hover:cursor-pointer">
			<FormControlLabel
				control={<Checkbox />}
				label={<p className="capitalize">{name}</p>}
				onChange={() => {
					if (!inRoles) {
						addRole(name);
					} else if (inRoles) {
						removeRole(name);
					}
				}}
			/>
		</div>
	);
}

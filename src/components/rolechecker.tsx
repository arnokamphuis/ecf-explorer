"use client";

import React, { useContext } from "react";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { RolesContext, RolesContextType } from "./rolesProvider";

type RoleCheckerProps = {
	name: string;
};

export default function RoleChecker({ name }: RoleCheckerProps) {
	const { roles, addRole, removeRole } = useContext(
		RolesContext
	) as RolesContextType;
	const inRoles = roles.find(r => r === name);
	return (
		<div className="border-solid border-2 px-2 m-2 rounded hover:border-rose-500">
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

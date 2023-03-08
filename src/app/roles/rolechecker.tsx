"use client";

import React, { useContext } from "react";
import { Typography, FormControlLabel } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import "./rolecard.modules.css";
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
		<Grid
			item
			className="role-checker border-solid border-2 p-2 m-2 rounded hover:border-rose-500">
			<FormControlLabel
				className=""
				control={<Checkbox />}
				label={
					<Typography className="role-checker-label capitalize">
						{name}
					</Typography>
				}
				onChange={() => {
					if (!inRoles) {
						addRole(name);
					} else if (inRoles) {
						removeRole(name);
					}
				}}
			/>
		</Grid>
	);
}

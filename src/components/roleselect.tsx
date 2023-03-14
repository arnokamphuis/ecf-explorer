"use client";

import { RolesContext, RolesContextType } from "@/context/rolesProvider";
import { useContext } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { Checkbox, ListItemText } from "@mui/material";

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

type RoleSelectProps = { roleNames: string[] };
export default function RoleSelect({ roleNames }: RoleSelectProps) {
	const { roles, setAllRoles, removeRole } = useContext(
		RolesContext
	) as RolesContextType;

	const handleChange = (event: SelectChangeEvent<typeof roles>) => {
		const {
			target: { value },
		} = event;
		setAllRoles(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div className="flex lg:flex-row items-center flex-col gap-4 flex-1">
			<FormControl className="lg:max-w-none  max-w-lg " sx={{minWidth: { sm: 400, md: 600}, width: {xs: '100%', sm: 'auto'}}}>
				<InputLabel id="multi-select">Rollen</InputLabel>
				<Select
					labelId="multi-select"
					id="multi-select"
					multiple
					value={roles}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					renderValue={() => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
							{roles.map(value => (
								<Chip
									key={value}
									label={value}
									className="capitalize text-sm"
									onDelete={() => {
										removeRole(value);
									}}
									onMouseDown={e => {
										e.stopPropagation();
									}}
								/>
							))}
						</Box>
					)}
					MenuProps={MenuProps}>
					{roleNames.map(role => (
						<MenuItem key={role} value={role} className="capitalize">
							<ListItemText>{role}</ListItemText>
							<Checkbox checked={roles.includes(role)} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{roles.length > 0 && <Button
				onClick={() => {
					setAllRoles([]);
				}}
				variant="outlined"
				className="min-w-fit">
				Verwijder alle
			</Button>}
			{roles.length !== roleNames.length && <Button
				onClick={() => {
					setAllRoles(roleNames);
				}}
				variant="outlined"
				className="min-w-fit">
				Selecteer alle
			</Button>}
		</div>
	);
}

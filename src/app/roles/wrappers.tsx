"use client";

import { LevelContext, LevelContextType } from "./levelProvider";
import { useContext } from "react";
import { RolesContext, RolesContextType } from "./rolesProvider";

export function LvlWrapper({
	children,
	lvl,
}: {
	children: React.ReactNode;
	lvl: number;
}) {
	const { level } = useContext(LevelContext) as LevelContextType;
	if (level !== lvl) {
		return null;
	}
	return <>{children}</>;
}

export function RoleWrapper({
	children,
	name,
}: {
	children: React.ReactNode;
	name: string;
}) {
	const { roles } = useContext(RolesContext) as RolesContextType;
	const containsRole = roles.find(role => role === name);

	if (!containsRole) {
		return null;
	}

	return <>{children}</>;
}

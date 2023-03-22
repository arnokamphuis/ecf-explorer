"use client";

import { createContext, useState } from "react";

export type RolesContextType = {
	roles: string[];
	addRole: (role: string) => void;
	removeRole: (role: string) => void;
	setAllRoles: (roles: string[]) => void;
};

export const RolesContext = createContext<RolesContextType | null>(null);

export default function RolesProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [roles, setRoles] = useState<string[]>([]);

	const addRole = (role: string) => {
		setRoles(prev => [...prev, role]);
	};
	const removeRole = (role: string) => {
		const newRoles = [...roles].filter(r => r !== role);
		setRoles(newRoles);
	};
	const setAllRoles = (roleArray: string[]) => {
		setRoles(roleArray);
	};
	return (
		<RolesContext.Provider value={{ roles, addRole, removeRole, setAllRoles }}>
			{children}
		</RolesContext.Provider>
	);
}

"use client";

import RoleCard from "@/components/rolecard";
import { useContext, useMemo, useState } from "react";
import { RolesContext, RolesContextType } from "@/context/rolesProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import clsx from "clsx";

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
	const [level, setLevel] = useState(1);
	const { roles } = useContext(RolesContext) as RolesContextType;
	const filteredDevRoles = useMemo(
		() =>
			allRoles.map(rolePerLevel =>
				rolePerLevel.developed.filter(role => roles.includes(role.name))
			),
		[roles, allRoles]
	);
	const filteredInDevRoles = useMemo(
		() =>
			allRoles.map(rolePerLevel =>
				rolePerLevel["in development"].filter(role => roles.includes(role.name))
			),
		[allRoles, roles]
	);
	return (
		<Tabs
			value={`${level}`}
			onValueChange={value => setLevel(Number(value))}
			className="flex flex-1 items-center flex-col mt-4">
			<TabsList className="mb-4">
				{[...new Array(5)].map((_, index) => (
					<TabsTrigger value={`${index + 1}`} key={index} className="text-lg">
						Level {index + 1}
					</TabsTrigger>
				))}
			</TabsList>
			{[...new Array(5)].map((_, index) => {
				if (
					filteredDevRoles[index].length === 0 &&
					filteredInDevRoles[index].length === 0
				) {
					if (roles.length === 0) return null;

					const nextLevel = rolesPerLevel.findIndex(
						lvl => roles.filter(role => lvl.includes(role)).length > 0
					);

					if (nextLevel === -1) {
						return null;
					}

					return (
						<TabsContent
							value={`${index + 1}`}
							className="flex flex-1 justify-center items-center gap-4"
							key={index}>
							<p>Chosen role(s) not available at this level</p>
							<Button onClick={() => setLevel(nextLevel + 1)}>
								Go to level {nextLevel + 1}
							</Button>
						</TabsContent>
					);
				}
				return (
					<TabsContent
						value={`${index + 1}`}
						key={index}
						className="flex flex-col lg:flex-row flex-1 mt-0">
						{filteredDevRoles[index].length > 0 && (
							<div className="flex-1">
								<h3>Developed</h3>
								<div
									className={clsx(
										filteredInDevRoles[index].length === 0 &&
											"grid lg:grid-cols-2 auto-rows-min"
									)}>
									{filteredDevRoles[index].map(role => (
										<RoleCard role={role} key={role.name} />
									))}
								</div>
							</div>
						)}
						{filteredInDevRoles[index].length > 0 && (
							<div className="flex-1">
								<h3>In development</h3>
								<div
									className={clsx(
										filteredDevRoles[index].length === 0 &&
											"grid lg:grid-cols-2 auto-rows-min"
									)}>
									{filteredInDevRoles[index].map(role => (
										<RoleCard
											role={role}
											key={role.name}
											className="max-h-min"
										/>
									))}
								</div>
							</div>
						)}
					</TabsContent>
				);
			})}
		</Tabs>
	);
}

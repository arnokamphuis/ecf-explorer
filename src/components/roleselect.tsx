"use client";

import { RolesContext, RolesContextType } from "@/context/rolesProvider";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check, X } from "lucide-react";
import { PopoverTrigger, PopoverContent, Popover } from "./ui/popover";
import { Badge } from "./ui/badge";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandSeparator,
} from "./ui/command";

type RoleSelectProps = { roleNames: string[] };
export default function RoleSelect({ roleNames }: RoleSelectProps) {
	const { roles, setAllRoles, removeRole, addRole } = useContext(
		RolesContext
	) as RolesContextType;
	const [open, setOpen] = useState(false);

	return (
		<div className="flex lg:flex-row items-center flex-col gap-4 flex-1">
			<Popover open={open} onOpenChange={state => setOpen(state)}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="min-w-[200px] justify-between">
						Select role...
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search by role" />
						<CommandEmpty>No role found.</CommandEmpty>
						<CommandGroup className="h-[500px] overflow-y-auto">
							<CommandItem
								className="cursor-pointer"
								value="0"
								onSelect={() => {
									if (roles.length === roleNames.length) {
										setAllRoles([]);
									} else {
										setAllRoles(roleNames);
									}
								}}>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										roles.length === roleNames.length
											? "opacity-100"
											: "opacity-0"
									)}
								/>{" "}
								Select all
							</CommandItem>
							<CommandSeparator className="my-2" />
							{roleNames.map(roleName => (
								<CommandItem
									value={roleName}
									key={roleName}
									className="capitalize cursor-pointer"
									onSelect={currentValue => {
										if (roles.includes(currentValue)) {
											removeRole(roleName);
										} else {
											addRole(roleName);
										}
									}}>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											roles.includes(roleName) ? "opacity-100" : "opacity-0"
										)}
									/>
									{roleName}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>

			<div className="flex flex-row flex-wrap gap-2">
				{roles.map(role => (
					<Badge
						tabIndex={0}
						role={"button"}
						className="capitalize cursor-pointer p-2"
						key={role}
						onClick={() => {
							removeRole(role);
						}}>
						{role}
						<X className="ml-2 h-4 w-4 shrink-0" />
					</Badge>
				))}
			</div>
			<div className="flex gap-2">
				{roles.length > 0 && (
					<Button
						onClick={() => {
							setAllRoles([]);
						}}
						className="min-w-max">
						Remove all
					</Button>
				)}
			</div>
		</div>
	);
}

"use client";

import clsx from "clsx";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type RoleCardProps = {
	role: {
		developed: {
			name: string;
			activity: string;
		}[];
		"in development": {
			name: string;
			activity: string;
		}[];
		name: string;
	};
	className?: string;
};

export default function RoleCard({ role, className }: RoleCardProps) {
	return (
		<div
			className={clsx(
				"dark:bg-[#121212] p-4 rounded-lg text-black bg-white dark:text-white m-6 max-w-4xl",
				className
			)}>
			<div className="flex justify-between">
				<h3 className="capitalize">{role.name}</h3>
				<Link
					href={`/roles/${role.name.replaceAll(" ", "-")}`}
					className="flex flex-row items-center gap-1">
					View role <ExternalLink />
				</Link>
			</div>
			<div>
				<h4 className="font-semibold mt-6 mb-2">Required at this level:</h4>
				{role["in development"].map(competency => (
					<div key={competency.name}>
						<p className="ml-4 font-semibold">{competency.name}:</p>
						{/* <p className="ml-8 text-sx">{competency.activity} </p> */}
					</div>
				))}
				{role.developed.length > 0 && (
					<>
						<h4 className="font-semibold mt-6 mb-2">
							Developed at a lower level:
						</h4>
						<>
							{role.developed.map(competency => (
								<div key={competency.name}>
									<p className="ml-4 font-semibold">{competency.name}:</p>
									{/* <p className="ml-8 text-sx">{competency.activity} </p> */}
								</div>
							))}
						</>
					</>
				)}
			</div>
		</div>
	);
}

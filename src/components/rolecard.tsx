"use client";

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
};

export default function RoleCard({ role }: RoleCardProps) {
	return (
		<div className="dark:bg-[#121212] p-4 rounded-lg text-black bg-black dark:text-white m-6">
			<div className="flex justify-between">
				<p className="capitalize text-lg font-bold underline">{role.name}</p>
				<Link href={`/roles/${role.name.replaceAll(" ", "-")}`}>View role</Link>
			</div>
			<div>
				<h3 className="text-xl font-bold mt-6 mb-2">REQUIRED AT THIS LEVEL:</h3>
				{role["in development"].map(competency => (
					<div key={competency.name}>
						<p className="ml-4 font-bold">{competency.name}:</p>
						<p className="ml-8 text-sx">{competency.activity} </p>
					</div>
				))}
				{role.developed.length > 0 && (
					<>
						<h3 className="text-xl font-bold mt-6 mb-2">
							DEVELOPED AT LOWER LEVEL:
						</h3>
						<>
							{role.developed.map(competency => (
								<div key={competency.name}>
									<p className="ml-4 font-bold">{competency.name}:</p>
									<p className="ml-8 text-sx">{competency.activity} </p>
								</div>
							))}
						</>
					</>
				)}
			</div>
		</div>
	);
}

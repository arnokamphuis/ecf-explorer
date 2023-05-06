"use client";

import { LaunchOutlined } from "@mui/icons-material";
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
		<div className="dark:bg-[#121212] p-4 rounded-lg text-black bg-white dark:text-white m-6">
			<div className="flex justify-between">
				<h2 className="capitalize">{role.name}</h2>
				<Link
					href={`/roles/${role.name.replaceAll(" ", "-")}`}
					className="flex flex-row items-center gap-1">
					View role <LaunchOutlined />
				</Link>
			</div>
			<div>
				<h3 className="font-semibold mt-6 mb-2">Required at this level:</h3>
				{role["in development"].map(competency => (
					<div key={competency.name}>
						<p className="ml-4 font-semibold">{competency.name}:</p>
						<p className="ml-8 text-sx">{competency.activity} </p>
					</div>
				))}
				{role.developed.length > 0 && (
					<>
						<h3 className="font-semibold mt-6 mb-2">
							Developed at a lower level:
						</h3>
						<>
							{role.developed.map(competency => (
								<div key={competency.name}>
									<p className="ml-4 font-semibold">{competency.name}:</p>
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

"use client";

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
		<div className="bg-red-700 p-4">
			<p className="capitalize">{role.name}</p>
			<div>
				<h3 className="text-xl font-bold mt-6 mb-2">REQUIRED AT THIS LEVEL:</h3>
				{role["in development"].map(competency => (
					<div key={competency.name}>
						<p className="ml-4 font-bold">{competency.name}:</p>
						<p className="ml-8 text-sx">{competency.activity} </p>
					</div>
				))}
				<h3 className="text-xl font-bold mt-6 mb-2">
					DEVELOPED AT LOWER LEVEL:
				</h3>
				{role.developed.map(competency => (
					<div key={competency.name}>
						<p className="ml-4 font-bold">{competency.name}:</p>
						<p className="ml-8 text-sx">{competency.activity} </p>
					</div>
				))}
			</div>
		</div>
	);
}

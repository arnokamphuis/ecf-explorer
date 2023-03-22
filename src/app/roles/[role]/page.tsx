import path from "path";
import { promises as fs } from "fs";
import { Roles } from "@/types/role";
import { Deliverable } from "@/types/deliverable";

async function getRole(role: string) {
	const jsonDirectory = path.join(process.cwd(), "json");
	const roles: Roles = JSON.parse(
		await fs.readFile(jsonDirectory + "/roles.json", "utf8")
	);
	if (roles[role]) {
		return roles[role];
	}
	return null;
}

export default async function RolePage({
	params = { role: "" },
}: {
	params: { role: string };
}) {
	const { role } = params;
	const formatRole = role.replaceAll("-", " ");
	const roleData = await getRole(formatRole);
	if (!roleData) return null;
	return (
		<div className="flex justify-center items-center flex-col flex-1">
			<div className="flex gap-4 flex-col bg-[#121212] p-10 max-w-xl">
				<h1 className="capitalize font-bold">{formatRole}</h1>
				<div>
					<p>Summary</p>
					<p>{roleData.summary}</p>
				</div>
				<div>
					<p>Mission</p>
					<p>{roleData.mission}</p>
				</div>
				<div>
					<p>Deliverables</p>
					<div className="flex flex-col gap-6 justify-center sm:flex-row">
						{Object.keys(roleData.deliverables).map(
							(deliverableType: keyof Deliverable) => (
								<div key={deliverableType} className="capitalize">
									<p>{deliverableType}</p>
									<ul className="list-disc">
										{roleData.deliverables[deliverableType].map(deliverable => (
											<li key={deliverable}>{deliverable}</li>
										))}
									</ul>
								</div>
							)
						)}
					</div>
				</div>
				<div>
					<p>Tasks</p>
					<ul>
						{roleData.tasks.map(task => (
							<li key={task} className="list-disc">
								{task}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

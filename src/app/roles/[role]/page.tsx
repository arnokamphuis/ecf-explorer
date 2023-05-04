import { Deliverable } from "@/types/deliverable";
import { cache } from "react";
import { getRoles } from "@/utils/getRoles";
import { notFound } from "next/navigation";
import Link from "next/link";

const getRole = cache(async (role: string) => {
	const roles = await getRoles();
	if (!roles[role]) {
		notFound();
	}
	return roles[role];
});

export default async function RolePage({
	params = { role: "" },
}: {
	params: { role: string };
}) {
	const { role } = params;
	const formatRole = role.replaceAll("-", " ");
	const roleData = await getRole(formatRole);
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
				<div>
					<p>Competences</p>
					<div className="flex flex-col">
						{Object.keys(roleData.competencies).map(comp => (
							<Link
								key={comp}
								href={`/competences/${comp.replaceAll(" ", "-")}`}>
								{comp}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

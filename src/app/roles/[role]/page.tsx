import { Deliverable } from "@/types/deliverable";
import { cache } from "react";
import { getRoles } from "@/utils/getRoles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

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
			<Card className="flex gap-4 flex-col max-w-xl p-4">
				<div>
					<h1 className="capitalize">{formatRole}</h1>

					<p className="lead">{roleData.summary}</p>
				</div>

				<div>
					<h2>Mission</h2>
					<p>{roleData.mission}</p>
				</div>
				<div>
					<h2>Deliverables</h2>
					<div className="flex flex-col gap-6 justify-center sm:flex-row">
						{Object.keys(roleData.deliverables).map(
							(deliverableType: keyof Deliverable) => (
								<div key={deliverableType} className="capitalize">
									<p className="font-semibold">{deliverableType}</p>
									<ul className="list-disc ml-4">
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
					<h2>Tasks</h2>
					<ul className="ml-4">
						{roleData.tasks.map(task => (
							<li key={task} className="list-disc">
								{task}
							</li>
						))}
					</ul>
				</div>
				<div>
					<h2>Competences</h2>
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
			</Card>
		</div>
	);
}

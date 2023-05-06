import Link from "next/link";

export default async function Home() {
	return (
		<div className="flex flex-1 items-center justify-center">
			<div className="card flex flex-col gap-4 max-w-4xl">
				<h1>The Ecf-explorer</h1>
				<p>
					The European Norm (EN) 16234-1 European e-Competence Framework (e-CF)
					provides a reference of 41 competences as applied at the Information
					and Communication Technology (ICT) workplace, using a common language
					for competences, skills, knowledge and proficiency levels that can be
					understood across Europe. <br />
					<Link href="/competences" className="font-semibold">
						View competences
					</Link>
				</p>

				<p>
					Use this interactive tool to explore the competences and the 30 ICT
					Professional Role Profiles identified by the European Committee for
					Standardization (CEN). These are typical roles performed by ICT
					Professionals in any organisation, covering the full ICT business
					processes using the e-CF as the basis for competence identification
					and illuminates each ICT Professional Profile with a number of
					components including work outcomes or “Deliverables”.
					<br />
					<Link href="/roles" className="font-semibold">
						View roles
					</Link>
				</p>
			</div>
		</div>
	);
}

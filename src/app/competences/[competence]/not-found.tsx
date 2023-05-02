import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<h2>Not Found</h2>
			<p>Gekozen vaardigheid niet gevonden</p>
			<Link href={"/competences"}>Terug naar competences</Link>
		</>
	);
}

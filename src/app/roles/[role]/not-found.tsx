import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<h2>Not Found</h2>
			<p>Gekozen rol niet gevonden</p>
			<Link href={"/roles"}>Terug naar rollen</Link>
		</>
	);
}

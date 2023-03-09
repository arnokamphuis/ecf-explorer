"use client";

import { createContext, useState } from "react";

export type LevelContextType = {
	level: number;
	changeLevel: (newLevel: number) => void;
};

export const LevelContext = createContext<LevelContextType | null>(null);

export default function LevelProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [level, setLevel] = useState<number>(1);

	const changeLevel = (newLevel: number) => {
		setLevel(newLevel);
	};
	return (
		<LevelContext.Provider value={{ level, changeLevel }}>
			{children}
		</LevelContext.Provider>
	);
}

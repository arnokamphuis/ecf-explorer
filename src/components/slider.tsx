"use client";
import { Slider as MuiSlider } from "@mui/material";
import { useContext } from "react";
import { LevelContext, LevelContextType } from "@/context/levelProvider";

const marks = [
	{
		value: 1,
		label: "1",
	},
	{
		value: 2,
		label: "2",
	},
	{
		value: 3,
		label: "3",
	},
	{
		value: 4,
		label: "4",
	},
	{
		value: 5,
		label: "5",
	},
];

export default function Slider() {
	const { level, changeLevel } = useContext(LevelContext) as LevelContextType;
	return (
		<MuiSlider
			aria-label={"slider"}
			value={level}
			onChange={(_, newValue) => changeLevel(newValue as number)}
			min={1}
			max={5}
			step={1}
			valueLabelDisplay="on"
			marks={marks}
		/>
	);
}

"use client";
import { Slider as MuiSlider } from "@mui/material";
import { useContext } from "react";
import { LevelContext, LevelContextType } from "./levelProvider";

export default function Slider() {
	const { level, changeLevel } = useContext(LevelContext) as LevelContextType;
	return (
		<MuiSlider
			aria-label={"slider"}
			value={level}
			onChange={(_, newValue: number | number[]) =>
				changeLevel(newValue as number)
			}
			min={1}
			max={5}
			step={1}
			valueLabelDisplay="on"
			marks
		/>
	);
}

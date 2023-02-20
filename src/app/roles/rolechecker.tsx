'use client';

import React from "react";
import { Typography, FormControlLabel } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import './rolecard.modules.css';
import Checkbox from "@mui/material/Checkbox";

type RoleCheckerProps = {
    name: string;
    handleClick: (e: React.ChangeEvent<{}>, name: string) => void
}

export default function RoleChecker({name, handleClick}: RoleCheckerProps) {
    return <Grid item className="role-checker border-solid border-2 p-2 m-2 rounded hover:border-rose-500">
        <FormControlLabel className="" control={<Checkbox />} label={<Typography className="role-checker-label">{name}</Typography>} onChange={(e) => handleClick(e, name)}/>
    </Grid>
}

'use client';

import React, { useState, useEffect, Component } from "react";
import { Card, Typography, Checkbox, FormControlLabel } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import './rolecard.modules.css';

export default function RoleChecker({name, handleClick}) {
    return <Grid item className="role-checker border-solid border-2 p-2 m-2 rounded hover:border-rose-500">
        <FormControlLabel className="" control={<Checkbox />} label={<Typography className="role-checker-label">{name}</Typography>} onChange={(e) => handleClick(e, name)}/>
    </Grid>
}

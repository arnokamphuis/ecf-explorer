'use client';

import React, { useState, useEffect } from "react";
import { Card, Typography, Slider } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import RoleCard from './rolecard';

export default function Roles() {
  const [data, setData] = useState(null);
  const [filterValue, setFilterValue] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/levels");
      const json = await res.json();
      const objectData = JSON.parse(json);
      console.log( objectData[2]["developed"] );
      setData(objectData);
    };
    fetchData();
  }, []);

  const indevData = data
    ? data[filterValue]['in development']
    : [];

  const devData = data
    ? data[filterValue]['developed']
    : [];

  return (
    <div>
      <Typography className="mt-10" id="input-slider" gutterBottom>
        Level
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={filterValue}
            onChange={(event, newValue) => setFilterValue(newValue)}
            min={1}
            max={5}
            step={1}
            valueLabelDisplay="on"
            marks
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="top" columns={{ xs: 2, md: 2 }}>
        <Grid item xs={1}>
          {indevData.map((item) => (
            <RoleCard className="indev" name={item.name} level={filterValue} indev={item['in development']} dev={item['developed']} />
          ))}
        </Grid>
        <Grid item xs={1}>
          {devData.map((item) => (
            <RoleCard key={item.name} className="dev" name={item.name} level={filterValue} indev={item['in development']} dev={item['developed']} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

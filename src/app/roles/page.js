'use client';

import React, { useState, useEffect } from "react";
import { Card, Typography, Slider, Checkbox } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import RoleCard from './rolecard';
import RoleChecker from './rolechecker';

export default function Roles() {
  const [data, setData] = useState(null);
  const [filterValue, setFilterValue] = useState(1);

  const [roles, setRoles] = useState({});

  useEffect(() => {
    const fetchRoles = async() => {
      const res = await fetch('/api/roles');
      if (res.status == 200) {
        const json = await res.json();
        const rolesData = JSON.parse(json);
        console.log(rolesData);
        let roles = {};
        for (const n of Object.keys(rolesData)) {
          roles[n] = false;
        }
        setRoles(roles);
      }
    };
  
    fetchRoles();

    const fetchData = async () => {
      const res = await fetch("/api/levels");
      const json = await res.json();
      const objectData = JSON.parse(json);
      setData(objectData);
    };
    fetchData();
  }, []);

  const handleClick = (e, id) => {
    roles[id] = !roles[id];
    setRoles(roles);
  };

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

      <Grid container spacing={2} alignItems="top" columns={{ xs: 4, md: 8 }}>
        {roles ? Object.keys(roles).map((name) => (
            <RoleChecker name={name} handleClick={handleClick} />
          )) : <></>}
      </Grid>


      <Grid container spacing={2} alignItems="top" columns={{ xs: 2, md: 2 }}>
        <Grid item xs={1}>
          {indevData.map((item) => (
              roles[item.name] ? <RoleCard className="indev" name={item.name} level={filterValue} indev={item['in development']} dev={item['developed']} /> : <></>
          ))}
        </Grid>
        <Grid item xs={1}>
          {devData.map((item) => (
            roles[item.name] ? <RoleCard key={item.name} className="dev" name={item.name} level={filterValue} indev={item['in development']} dev={item['developed']} /> : <></>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

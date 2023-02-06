'use client';

import React, { useState, useEffect, Component } from "react";
import { Card, Typography } from "@material-ui/core";
import './rolecard.modules.css';

function CompetencyDescription({comp, lvl}) {
  const [data, setData] = useState(comp, lvl);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/competencies/' + comp + '?level=' + lvl);
      if (res.status == 200) {
        const json = await res.json();
        const objectData = JSON.parse(json);
        setData(objectData["activity"]);
      } else {
        setData("UNAVAILABLE");
      }
    };
    fetchData();
  }, []);

  return <div><Typography className="ml-2 font-bold">{comp}:</Typography><Typography className="ml-6 text-sx">{data} </Typography></div>
}

export default function RoleCard({name, level, indev, dev}) {
  return <Card className="role" key={name}>
    <div>
      <h2 className="text-3xl font-bold rolecard-title mt-2">{name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h2>
      <h3 className="text-xl font-bold rolecard-subtitle">IN DEVELOPMENT:</h3>
      { indev ? indev.map((n) => ( <CompetencyDescription comp={n} lvl={level} /> )) : "" }      
      <h3 className="text-xl font-bold rolecard-subtitle">DEVELOPED:</h3>
      { dev ? dev.map((n) => ( <CompetencyDescription comp={n} lvl={level} /> )) : "" }      
    </div>
  </Card>
}

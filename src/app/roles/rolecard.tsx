"use client";

import React, { useState, useEffect, Component } from "react";
import { Card, Typography } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import "./rolecard.modules.css";
import { LevelRoleDescription } from "@/types/level";

type CompetencyDescriptionProps = {
  lvl: number;
  comp: string
};

function CompetencyDescription({ comp, lvl }: CompetencyDescriptionProps) {
  const [data, setData] = useState<string | string[]>(["", ""]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/competencies/" + comp + "?level=" + lvl);
      if (res.status == 200) {
        const json = await res.json();
        const objectData = JSON.parse(json);
        setData([objectData["activity"], objectData["phase"]]);
      } else {
        setData("UNAVAILABLE");
      }
    };

    fetchData();
  }, [comp, lvl]);

  return (
    <div>
      <p className="ml-4 font-bold">
        {comp} <span className="text-sx">({data[1]})</span>:
      </p>
      <p className="ml-8 text-sx">{data[0]} </p>
    </div>
  );
}

type RoleCardProps = {
  name: string;
  level: number;
  className: string;
  description: string;
  indev: LevelRoleDescription['in development'];
  dev: LevelRoleDescription['developed'];
};

export default function RoleCard({
  name,
  level,
  description,
  indev,
  dev,
  className,
}: RoleCardProps) {
  return (
    <Card className={"role " + className} key={name}>
      <div>
        <Tooltip
          title={<div style={{ whiteSpace: "pre-line" }}>{description}</div>}
          placement="top-end"
        >
          <h2 className="text-3xl font-bold underline">
            {name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase()
            )}
          </h2>
        </Tooltip>
        <h3 className="text-xl font-bold mt-6 mb-2">REQUIRED AT THIS LEVEL:</h3>
        {indev
          ? indev.map((n) => (
              <CompetencyDescription
                key={"indev" + n + level}
                comp={n}
                lvl={level}
              />
            ))
          : ""}
        <h3 className="text-xl font-bold mt-6 mb-2">
          DEVELOPED AT LOWER LEVEL:
        </h3>
        {dev
          ? dev.map((n) => (
              <CompetencyDescription
                key={"dev" + n + level}
                comp={n}
                lvl={level - 1}
              />
            ))
          : ""}
      </div>
    </Card>
  );
}

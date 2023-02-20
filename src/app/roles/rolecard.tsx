import { Card} from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";
import "./rolecard.modules.css";
import { LevelRoleDescription } from "@/types/level";
import CompetencyDescription  from "./competencyDescription";


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
            /* @ts-expect-error Server Component */
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
            /* @ts-expect-error Server Component */
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

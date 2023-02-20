import { Competencies } from './../../../types/competency';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/competencies.json', 'utf8');
  const objectData: Competencies = JSON.parse(fileContents);
  const { comp, level } = req.query;
  if (typeof comp === "string" && Object.keys(objectData).includes(comp) && typeof level === "string") {
    const filteredData = objectData[comp];

    if (level != null) {
      const data = {
        description: filteredData.description,
        phase: filteredData.phase,
        activity: filteredData["levels"][level]
      }
      return res.status(200).json(JSON.stringify(data))
    }

    res.status(200).json(JSON.stringify(filteredData));
  } else {
    res.status(204).end();
  }

}
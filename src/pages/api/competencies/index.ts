import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { Competencies, Competency } from '../../../types/competency';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Competencies | string>) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/competencies.json', 'utf8');


  const { level } = req.query;
  if (typeof level == "string") {
    const objectData: Competencies = JSON.parse(fileContents);
    let filteredData: Record<string, Competency> = {};
    for (const [comp, obj] of Object.entries(objectData)) {
        if (Object.keys(obj["levels"]).includes(level)) {
            filteredData[comp] = obj;
        }
    }
    return res.status(200).json(JSON.stringify(filteredData));
  } 
  return res.status(200).json(fileContents)
}
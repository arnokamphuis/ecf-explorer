import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { Levels } from '../../../types/level';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/levels.json', 'utf8');
  const objectData: Levels = JSON.parse(fileContents);
  const { level } = req.query
  if (typeof level === "string" && level in Object.keys(objectData) ) {
    const filteredData = objectData[level];
    res.status(200).json(JSON.stringify(filteredData));
  } else {
    res.status(204).end();
  }

}
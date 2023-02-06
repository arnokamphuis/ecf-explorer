import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/competencies.json', 'utf8');
  const objectData = JSON.parse(fileContents);
  const { comp, level } = req.query;
  if (Object.keys(objectData).includes(comp)) {
    const filteredData = objectData[comp];

    if (level != null) {
      filteredData["activity"] = filteredData["levels"][level];
      delete filteredData.levels;
    }

    res.status(200).json(JSON.stringify(filteredData));
  } else {
    res.status(204).end();
  }

}
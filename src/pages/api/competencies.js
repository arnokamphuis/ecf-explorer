import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/competencies.json', 'utf8');

  const { level } = req.query;
  if (level == null) {
    res.status(200).json(fileContents);
  } else {
    const objectData = JSON.parse(fileContents);
    console.log(objectData);
    let filteredData = {};
    for (const [comp, obj] of Object.entries(objectData)) {
        if (Object.keys(obj["levels"]).includes(level)) {
            filteredData[comp] = obj;
        }
    }
    res.status(200).json(filteredData);
  }
}
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/deliverables.json', 'utf8');
  const objectData = JSON.parse(fileContents);
  const { deliverable } = req.query;
  if (Object.keys(objectData).includes(deliverable)) {
    const filteredData = objectData[deliverable];
    res.status(200).json(JSON.stringify(filteredData));
  } else {
    res.status(204).end();
  }

}
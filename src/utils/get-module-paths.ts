import path from 'path';
import { fileURLToPath } from 'url';

function getModulePaths(fileURL: string) {
  const __filename = fileURLToPath(fileURL);
  const __dirname = path.dirname(__filename);
  return { __filename, __dirname };
}

export default getModulePaths;

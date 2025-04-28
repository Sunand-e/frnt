import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { FileCoverage, LineHits } from './coverage-collector';

const coverageJSONPath = './test-results/coverage/coverage-lines.json';
const reportPath = './test-results/coverage/coverage-report.json';

const includeDirs = [
  './components/',
  './context/',
  './graphql/',
  './hooks/',
  './layouts/',
  './pages/',
  './stores/',
  './themes/',
  './types/',
  './utils/',
];

function calculateSummary(coverage: FileCoverage) {
  let totalCovered = 0, totalLines = 0;
  const summary: Record<string, string> = {};

  for (const [file, lines] of Object.entries(coverage)) {
    const total = Object.keys(lines).length;
    const covered = Object.values(lines).filter(hit => hit > 0).length;
    const percent = total ? (covered / total) * 100 : 0;

    summary[file] = `${percent.toFixed(2)}%`;
    totalCovered += covered;
    totalLines += total;
  }

  const overall = totalLines ? (totalCovered / totalLines) * 100 : 0;
  const finalReport = {
    overallCoverage: `${overall.toFixed(2)}%`,
    fileCoverage: summary,
  };

  fs.writeFileSync(reportPath, JSON.stringify(finalReport, null, 2));
}

async function countLines(filePath: string): Promise<number> {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let count = 0;
  for await (const _ of rl) count++;
  return count;
}

function getFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getFiles(fullPath) : [fullPath];
  });
}

async function getAllSourceFilesWithLineCounts(): Promise<FileCoverage> {
  const fileCoverage: FileCoverage = {};

  for (const dir of includeDirs) {
    for (const file of getFiles(dir)) {
      const cleanPath = file.replace(/^\.\/+/, '').replace(/\\/g, '/');
      if (fileCoverage[cleanPath]) continue;

      const lines = await countLines(file);
      const lineHits: LineHits = {};
      for (let i = 1; i <= lines; i++) lineHits[i] = 0;
      fileCoverage[cleanPath] = lineHits;
    }
  }

  return fileCoverage;
}

async function generateFinalReport() {
  let finalCoverage: FileCoverage = {};

  if (fs.existsSync(coverageJSONPath)) {
    finalCoverage = JSON.parse(fs.readFileSync(coverageJSONPath, 'utf-8'));
  }

  const allFiles = await getAllSourceFilesWithLineCounts();
  for (const [file, lines] of Object.entries(allFiles)) {
    if (!finalCoverage[file]) finalCoverage[file] = lines;
  }

  fs.mkdirSync(path.dirname(coverageJSONPath), { recursive: true });
  fs.writeFileSync(coverageJSONPath, JSON.stringify(finalCoverage, null, 2));
  calculateSummary(finalCoverage);
}

export default generateFinalReport;

import v8toIstanbul from 'v8-to-istanbul';
import fs from 'fs';
import { Page } from '@playwright/test';

const coverageJSONPath = './test-results/coverage/coverage-lines.json';
export type LineHits = { [key: number]: number }
export type FileCoverage = { [key: string]: LineHits }

export async function collectCoverage(page: Page) {

  const coverage = await page.coverage.stopJSCoverage();
  let fileCoverageDetails: FileCoverage = {};

  fs.mkdirSync('./test-results/coverage', { recursive: true });

  if (fs.existsSync(coverageJSONPath)) {
    const existing = fs.readFileSync(coverageJSONPath, 'utf-8');
    fileCoverageDetails = JSON.parse(existing);
  }

  for (const entry of coverage) {
    try {
      const converter = v8toIstanbul('', 0, { source: entry.source });
      await converter.load();
      converter.applyCoverage(entry.functions);

      const fileCoverageMap = converter.toIstanbul();

      const [filePath, fileCoverage] = Object.entries(fileCoverageMap)[0];

      const cleanPath = filePath
        .replace(/^.*?_N_E[\\/]/, '')
        .replace(/\?.*$/, '')
        .replace(/\\/g, '/');

      if (cleanPath.includes('node_modules')) continue;

      const statements = fileCoverage.statementMap;
      const statementHits = fileCoverage.s;

      if (!fileCoverageDetails[cleanPath]) {
        fileCoverageDetails[cleanPath] = {};
      }

      for (const [stmtId, stmt] of Object.entries(statements)) {
        const line = stmt.start.line;
        const hits = statementHits[stmtId];
        fileCoverageDetails[cleanPath][line] =
          (fileCoverageDetails[cleanPath][line] || 0) + hits;
      }

    } catch (err: any) {
      console.warn(`⚠️ Coverage error for ${entry.url}:`, err.message);
    }
  }

  fs.writeFileSync(coverageJSONPath, JSON.stringify(fileCoverageDetails, null, 2));
}

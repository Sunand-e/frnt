import exportToCsv from "./exportToCsv";

export default function downloadCSV(exportFilename: string, tableCols: any, table: any) {
  const csvCols = tableCols.filter((col: any) => col.hideOnCsv !== true);
  const headerRow = csvCols.map((col: any) => col.header);
  const dataRows = table.getRowModel().rows.map((row: any) => {
    return csvCols.map((col: any) => row.getValue(col.id))
  })

  const filename = exportFilename.replace(/[^a-z0-9_\-]/gi, "_").toLowerCase();
  exportToCsv(`${filename}.csv`, [headerRow, ...dataRows]);
};

import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import ExcelJS from 'exceljs';

export class DataProvider {
  static readJson(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  }

  static readCsv(filePath: string) {
    const fileContent = fs.readFileSync(filePath);
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  }

  static async readExcel(filePath: string): Promise<unknown[][]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const rows: unknown[][] = [];
    worksheet.eachRow({ includeEmpty: false }, (row) => {
      rows.push((row.values as unknown[]).slice(1));
    });
    return rows;
  }
}

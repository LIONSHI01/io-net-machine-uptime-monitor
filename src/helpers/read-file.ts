import fs from "fs";
import csvParser from "csv-parser";

export const readCsv = (filePath: string): Promise<any[]> => {
  let output = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on("error", (err) => {
        reject(`Error reading csv file:${err.message}`);
      })
      .pipe(csvParser())
      .on("data", (row) => {
        output.push(row);
      })
      .on("end", () => {
        resolve(output);
      });
  });
};

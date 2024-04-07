import fs from "fs";

type Data = {
  [key: string]: any;
};

export function writeDataToJsonFile(data: Data, filename: string): void {
  try {
    // Convert data to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Write JSON data to file
    fs.writeFileSync(filename, jsonData);

    console.log(`Data has been written to ${filename}`);
  } catch (error) {
    console.error(`Error writing data to ${filename}:`, error);
  }
}

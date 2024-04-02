import { exec } from "child_process";

export const runCommand = (command: string) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Changed directory successfully: ${stdout}`);
  });
};

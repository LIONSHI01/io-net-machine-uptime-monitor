import { API_TOKEN, TELEGRAM_CHAT_ROOM_ID } from "./constants";
import { apiHandler } from "./helpers/api-handler";
import { checkAllMachines } from "./helpers/check-all-machines";
import { bot } from "./telegram";

const handler = apiHandler(API_TOKEN);

bot.launch();

function runTgBot() {
  bot.telegram.sendMessage(TELEGRAM_CHAT_ROOM_ID, "Monitor Started...");

  bot.command("check", (ctx) => {
    ctx.reply("Checking machines...");
    checkAllMachines(handler, true);
  });
}

async function init() {
  runTgBot();
}

async function runListener() {
  await init();
  checkAllMachines(handler, true);

  setInterval(() => checkAllMachines(handler, true), 1200000);
}

runListener();

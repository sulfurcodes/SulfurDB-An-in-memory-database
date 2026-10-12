import Store from "./store.js";
import { dispatchCommand } from "./commands.js";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { loadSnapshot, saveSnapshot } from "./persistence.js";

const store = new Store();
loadSnapshot(store);
saveSnapshot(store);

const rl = readline.createInterface({
  input: input,
  output: output,
});

rl.setPrompt("sulfurdb> ");
rl.prompt();

rl.on("line", (command) => {
  if (command.trim().toUpperCase() === "EXIT") {
    rl.close();
    return;
  }
  const response = dispatchCommand(store, command, () => saveSnapshot(store));
  console.log(response);
  rl.prompt();
});

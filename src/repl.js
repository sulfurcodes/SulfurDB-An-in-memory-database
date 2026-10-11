import Store from "./store.js";
import { dispatchCommand } from "./commands.js";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const store = new Store();

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
  const response = dispatchCommand(store, command);
  console.log(response);
  rl.prompt();
});

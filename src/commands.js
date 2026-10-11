function flip(num) {
  return num === 1 ? 0 : 1;
}

function tokenizer(expression) {
  const tokens = [];
  let currentToken = "";
  let mark = 0;
  const paddedExpression = expression + " ";

  for (let i = 0; i < paddedExpression.length; i++) {
    const char = paddedExpression[i];

    if (char === "'" || char === '"') {
      mark = flip(mark);
    }

    if (char === " " && mark === 0) {
      if (currentToken.length > 0) {
        const first = currentToken.charAt(0);
        const last = currentToken.charAt(currentToken.length - 1);
        if (
          (first === "'" && last === "'") ||
          (first === '"' && last === '"')
        ) {
          tokens.push(currentToken.substring(1, currentToken.length - 1));
        } else {
          tokens.push(currentToken);
        }
        currentToken = "";
      }
      continue;
    }
    currentToken += char;
  }
  return tokens;
}

function dispatchCommand(store, line) {
  const tokens = tokenizer(line);
  if (tokens.length === 0) {
    return "";
  }
  const command = tokens[0].toUpperCase();
  const args = tokens.slice(1);

  switch (command) {
    case "TTL":
      if (args.length !== 1) {
        return "ERR wrong number of arguments";
      }
      return store.ttl(args[0]);

    case "PERSIST":
      if (args.length !== 1) {
        return "ERR wrong number of arguments";
      }
      return store.persist(args[0]);

    case "PING":
      if (args.length !== 0) {
        return "ERR wrong number of arguments";
      }
      return store.ping();

    case "SET":
      if (args.length !== 2 && args.length !== 4) {
        return "ERR wrong number of arguments";
      }
      if (args.length === 2) {
        return store.set(args[0], args[1]);
      }
      if (args[2].toUpperCase() !== "EX") {
        return "ERR syntax: SET key value [EX seconds]";
      }
      return store.set(args[0], args[1], Number(args[3]));

    case "GET":
      if (args.length !== 1) {
        return "ERR wrong number of arguments";
      }
      return store.get(args[0]);

    case "EXISTS":
      if (args.length !== 1) {
        return "ERR wrong number of arguments";
      }
      return store.exists(args[0]);

    case "DEL":
      if (args.length !== 1) {
        return "ERR wrong number of arguments";
      }
      return store.delete(args[0]);

    default:
      return `ERR unknown command: ${command}`;
  }
}

export { dispatchCommand };

# SulfurDB

A Redis-inspired in-memory key-value store built from scratch in JavaScript.

SulfurDB is an educational project focused on understanding how key-value databases work internally, starting with core storage operations and building toward a command-driven database.

## Current Features

### Core Storage
- Store and overwrite key-value pairs in memory.
- Retrieve values by key.
- Check whether a key exists.
- Delete keys.
- Reject empty-string keys.
- Distinguish missing keys from stored empty-string values.
- Basic `PING` response.

### Command Interface
- Tokenize command-line input into arguments.
- Support quoted values containing spaces.
- Support empty quoted values.
- Dispatch commands to the storage layer.
- Accept case-insensitive command names while keeping keys case-sensitive.
- Validate command argument counts.
- Handle unknown commands.
- Interactive terminal REPL built with Node.js `readline`.
- Exit the REPL using `EXIT`.

## Supported Commands

| Command | Syntax | Description |
|---|---|---|
| `PING` | `PING` | Check whether SulfurDB responds. |
| `SET` | `SET key value` | Store a value or overwrite an existing one. |
| `GET` | `GET key` | Retrieve a value by key. |
| `EXISTS` | `EXISTS key` | Check whether a key exists. |
| `DEL` | `DEL key` | Delete a key. |
| `EXIT` | `EXIT` | Exit the interactive REPL. |

Command names are case-insensitive. Keys and values preserve their case.

## Getting Started

### Requirements

- Node.js 18 or newer recommended.
- Git, for cloning the repository.

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/sulfurcodes/SulfurDB-An-in-memory-database.git
cd SulfurDB-An-in-memory-database
```

SulfurDB currently uses Node.js built-in modules and does not require third-party runtime dependencies.

### Run the REPL

Start the interactive command-line interface:

```bash
node src/repl.js
```

Example session:

```text
sulfurdb> PING
PONG
sulfurdb> SET username "Isam Ali"
OK
sulfurdb> GET username
Isam Ali
sulfurdb> EXISTS username
true
sulfurdb> DEL username
Deleted
sulfurdb> EXISTS username
false
sulfurdb> EXIT
```

Responses shown in the example illustrate the intended interaction; exact output depends on the current Store and dispatcher implementations.

### Quoted Values

Double quotes allow values containing spaces to be passed as a single argument.

```text
sulfurdb> SET message "Hello SulfurDB"
sulfurdb> GET message
Hello SulfurDB
```

An empty quoted string can represent an empty value:

```text
sulfurdb> SET message ""
```

The tokenizer's supported escape syntax and malformed-input behavior are still being developed.

## Architecture

SulfurDB separates storage, command processing, and terminal input into distinct layers.

```text
src/
├── store.js       # In-memory key-value storage
├── commands.js    # Tokenizer and command dispatcher
└── repl.js        # Interactive command-line interface

test/
└── commands.test.js
```

### Store

The storage layer manages key-value operations independently of terminal input. Data is held in memory and is lost when the process exits.

### Command Parser and Dispatcher

The command layer converts input into tokens, validates command arguments, identifies the requested operation, and delegates storage operations to the Store instance.

### REPL

The Read-Eval-Print Loop uses Node.js `readline` to read commands, execute them through the dispatcher, display responses, and handle exit and end-of-input events.

## Development and Tests

Run the automated test suite using Node.js's built-in test runner:

```bash
node --test
```

Run the command tests directly:

```bash
node --test test/commands.test.js
```

The tests should cover supported commands, command-name casing, key case sensitivity, argument validation, unknown commands, quoted values, empty quoted values, and malformed quoting.

## Current Limitations

- Storage is in-memory only; data does not survive process restarts.
- There is no TCP server or Redis wire-protocol compatibility.
- Persistence, snapshots, and recovery are not implemented.
- Advanced data structures and expiration policies are not implemented.
- The command parser and response conventions may evolve as the project develops.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

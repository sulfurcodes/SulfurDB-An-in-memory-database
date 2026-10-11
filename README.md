# SulfurDB

A Redis-inspired in-memory key-value store built from scratch in JavaScript.

SulfurDB is an educational project exploring how key-value databases work internally. It starts with fundamental storage operations and gradually introduces command parsing, expiration, and database behavior.

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
- Support quoted values containing spaces and empty quoted values.
- Dispatch commands to the storage layer.
- Accept case-insensitive command names.
- Preserve key and value casing.
- Validate command argument counts.
- Interactive terminal REPL using Node.js `readline`.
- Exit the REPL using `EXIT`.

### Key Expiration
- Set expiration using `SET key value EX seconds`.
- Automatically remove expired keys when accessed.
- Query remaining lifetime with `TTL`.
- Remove expiration while preserving a value with `PERSIST`.
- Reset or clear expiration when overwriting an existing key.
- Use a monotonic clock for in-process expiration.
- Inject a custom clock for deterministic expiration tests.

## Supported Commands

| Command | Syntax | Description |
|---|---|---|
| `PING` | `PING` | Returns `PONG`. |
| `SET` | `SET key value` | Stores a permanent key-value pair. |
| `SET` with TTL | `SET key value EX seconds` | Stores a value with an expiration deadline. |
| `GET` | `GET key` | Retrieves a value, or `null` if missing or expired. |
| `EXISTS` | `EXISTS key` | Checks whether a key exists. |
| `DEL` | `DEL key` | Deletes a key. |
| `TTL` | `TTL key` | Returns the remaining lifetime of a key. |
| `PERSIST` | `PERSIST key` | Removes expiration from an existing key. |
| `EXIT` | `EXIT` | Exits the REPL. |

Command names are case-insensitive. Keys remain case-sensitive.

### TTL Return Values

| Return value | Meaning |
|---:|---|
| `-2` | Key does not exist or has expired. |
| `-1` | Key exists without an expiration. |
| `0` or greater | Remaining whole seconds, rounded down. |

An expired key behaves like a missing key for `GET`, `EXISTS`, `DEL`, and `TTL`.

## Getting Started

### Requirements

- Node.js 18 or newer recommended.
- Git, for cloning and version control.

### Installation

```bash
git clone https://github.com/sulfurcodes/SulfurDB-An-in-memory-database.git
cd SulfurDB-An-in-memory-database
```

SulfurDB currently uses Node.js built-in modules and does not require third-party runtime dependencies.

### Start the REPL

```bash
node src/repl.js
```

### Example Session

```text
sulfurdb> PING
PONG

sulfurdb> SET username "Isam Ali"
OK

sulfurdb> GET username
Isam Ali

sulfurdb> SET session abc123 EX 60
OK

sulfurdb> TTL session
57

sulfurdb> PERSIST session
1

sulfurdb> TTL session
-1

sulfurdb> DEL username
Deleted

sulfurdb> EXIT
```

The remaining TTL varies with elapsed time, so the displayed number is illustrative.

## Architecture

SulfurDB separates storage, command processing, and terminal interaction.

```text
src/
├── store.js       # In-memory storage and expiration logic
├── commands.js    # Tokenizer and command dispatcher
└── repl.js        # Interactive terminal interface

test/
├── store.test.js
└── commands.test.js
```

### Store

The Store maintains a `Map` for values and a separate `Map` for expiration deadlines. Expired keys are purged lazily when operations access them.

Expiration uses Node.js's monotonic performance clock. A custom clock can be injected into the Store to test expiry behavior without waiting in real time.

### Command Parser and Dispatcher

The command layer tokenizes input, validates command syntax and argument counts, and delegates operations to the Store.

### REPL

The REPL reads commands using Node.js `readline`, dispatches them, prints responses, and handles exit and end-of-input events.

## Development and Tests

Run tests with Node.js's built-in test runner:

```bash
node --test
```

Run a specific test file:

```bash
node --test test/store.test.js
node --test test/commands.test.js
```

The test suite should cover storage operations, command validation, expiration boundaries, TTL behavior, overwrite semantics, and persistence of individual keys through `PERSIST`.

Ensure these test files exist at the documented paths before using the individual commands.

## Current Limitations

- All data is in memory and is lost when the process exits.
- There is no TCP server or Redis wire-protocol compatibility.
- Disk persistence, snapshots, and recovery are not implemented.
- Advanced data structures and additional database commands are not implemented.
- The tokenizer still needs stronger malformed-quoting validation and a documented escape grammar.
- The command interface and response conventions may evolve as development continues.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

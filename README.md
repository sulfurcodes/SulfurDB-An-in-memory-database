# SulfurDB

A Redis-inspired in-memory key-value store built from scratch in JavaScript.

SulfurDB is an educational project for exploring how key-value databases work, starting with core storage operations and gradually expanding toward more advanced database features.

## Current features

- Store and overwrite key-value pairs in memory.
- Retrieve a value by key.
- Check whether a key exists.
- Delete a key.
- Reject an empty-string key.
- Return `null` when a key is missing.
- Basic `PING` response.

Data is stored in a JavaScript `Map` and is lost when the process exits. SulfurDB does not yet provide persistence, a command-line REPL, or a network protocol.

## Current API

The current version is used directly from JavaScript by creating a `Store` instance.

| Method | Current behavior |
| --- | --- |
| `ping()` | Returns `"PONG"`. |
| `set(key, value)` | Stores or overwrites a value and returns `"OK"`. Returns an error message when `key` is an empty string. |
| `get(key)` | Returns the stored value, or `null` if the key does not exist. Returns an error message when `key` is an empty string. |
| `exists(key)` | Returns `true` if the key exists, otherwise `false`. Returns an error message when `key` is an empty string. |
| `delete(key)` | Deletes a key and returns `"Deleted"`; returns `"Key does not exist"` when no key was deleted. Returns an error message when `key` is an empty string. |

The API is still evolving. Input validation and the separation between storage logic and command-response formatting may change as the project grows.

## Quick start

### Requirements

- Node.js 18 or newer recommended
- Git (optional, for cloning and version control)

### Set up locally

Clone the repository and enter the project directory:

```powershell
git clone https://github.com/sulfurcodes/SulfurDB-An-in-memory-database.git
cd SulfurDB-An-in-memory-database
```

No third-party dependencies are currently required.

### Try the current API

Create a JavaScript file or run the example from the project root:

```javascript
import Store from './src/store.js';

const db = new Store();

console.log(db.ping());                  // PONG
console.log(db.set('sulfurcodes', '19'));  // OK
console.log(db.get('sulfurcodes'));          // 19
console.log(db.exists('sulfurcodes'));       // true
console.log(db.delete('sulfurcodes'));       // Deleted
console.log(db.exists('sulfurcodes'));       // false
console.log(db.get('missing'));           // null
```

The project uses JavaScript ES modules, configured with `"type": "module"` in `package.json`.

## Development and tests

The current `tests/store_test.js` file is a manual smoke test that prints the outputs of the core methods. Run it from the project root:

```powershell
node tests/store_test.js
```

Automated tests with assertions and edge-case coverage are planned for a future development phase. The current `npm test` script is only a placeholder and will fail until a real test runner is configured.

## Roadmap

Planned features may include stronger input validation, automated tests, key expiration (TTL), a command interface, persistence, and a network server. These are not implemented in the current version.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

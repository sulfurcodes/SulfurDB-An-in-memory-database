# SulfurDB

A Redis-inspired in-memory key-value store built from scratch in Python.

## Current features

- Store and overwrite key-value pairs in memory.
- Retrieve a value by key.
- Check whether a key exists.
- Delete a key.
- Reject an empty key in `SET`.
- Distinguish a missing key from an empty-string value in existence and deletion checks.
- Basic `PING` response.

All data is held in a Python dictionary and is lost when the process exits.

## Current API

SulfurDB is currently used directly from Python; it does not yet provide a command-line REPL or a network protocol.

| Method | Current behavior |
| --- | --- |
| `PING()` | Returns `"PONG"`. |
| `SET(key, value)` | Stores or overwrites a value and returns `"OK"`. Returns an error message when the key is an empty string. |
| `GET(key)` | Returns the value, or `None` when the key does not exist. Calling without a key returns a prompt message. |
| `EXISTS(key)` | Returns the string `"1"` if the key exists, otherwise `"0"`. Calling without a key returns a prompt message. |
| `DELETE(key)` | Returns the string `"1"` if the key is deleted, otherwise `"0"`. Calling without a key returns a prompt message. |

The API is still evolving. In particular, invalid input handling and return types may change as the storage engine is separated from command-response formatting.

## Quick start

### Requirements

- Python 3.12 or newer
- Git (optional, for cloning and version control)

### Set up locally

Clone the repository and enter the project directory:

```powershell
git clone https://github.com/sulfurcodes/SulfurDB-An-in-memory-database.git
cd SulfurDB-An-in-memory-database
```

Create and activate a virtual environment in PowerShell:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install SulfurDB in editable mode with the development dependencies:

```powershell
python -m pip install -e ".[dev]"
```

### Try the current API

Run Python from the activated environment:

```python
from sulfurdb import SulfurDB

db = SulfurDB()

print(db.PING())                  # PONG
print(db.SET("username", "Isam")) # OK
print(db.GET("username"))         # Isam
print(db.EXISTS("username"))      # 1
print(db.DELETE("username"))      # 1
print(db.EXISTS("username"))      # 0
```

This is an API example, not a command-line database client.

## Development and tests

Pytest is configured in `pyproject.toml`. Run:

```powershell
python -m pytest -v
```

The current `tests/test_store.py` file is a manual smoke-test script that prints results; it does not yet contain pytest test functions and assertions. Automated behavior and edge-case tests are part of the next development phase.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

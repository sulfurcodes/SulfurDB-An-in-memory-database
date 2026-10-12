import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const dataDir = new URL("../data/", import.meta.url);
const snapshotPath = new URL("../data/snapshot.json", import.meta.url);

export function saveSnapshot(store) {
  mkdirSync(dataDir, { recursive: true });
  const snapshot = store.createSnapshot();
  writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), "utf8");
}

export function loadSnapshot(store) {
  if (!existsSync(snapshotPath)) {
    return;
  }
  const snapshot = JSON.parse(readFileSync(snapshotPath, "utf8"));
  store.loadSnapshot(snapshot);
}

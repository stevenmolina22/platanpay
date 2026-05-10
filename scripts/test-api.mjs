import { readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const host = process.env.API_BASE_URL || "http://127.0.0.1:3000";
const testDir = join(process.cwd(), "tests", "api");
const files = readdirSync(testDir)
  .filter((file) => file.endsWith(".hurl"))
  .map((file) => join(testDir, file));

const result = spawnSync("hurl", ["--test", "--variable", `host=${host}`, ...files], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);

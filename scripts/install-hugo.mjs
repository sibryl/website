import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const installerPath = fileURLToPath(
  new URL("../node_modules/hugo-extended/postinstall.js", import.meta.url),
);

const installer = spawn(process.execPath, [installerPath], {
  env: {
    ...process.env,
    HUGO_OVERRIDE_VERSION: packageJson.hugoVersion,
  },
  stdio: "inherit",
});

const exitCode = await new Promise((resolve, reject) => {
  installer.once("error", reject);
  installer.once("close", resolve);
});

if (exitCode !== 0) {
  throw new Error(`Hugo installation exited with status ${exitCode}.`);
}

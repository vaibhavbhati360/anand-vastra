// Build the site for GitHub Pages and publish it to the gh-pages branch.
// Run: npm run deploy   (needs the repo's "origin" remote and push access)
// Live at: https://vaibhavbhati360.github.io/anand-vastra/
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const BASE_PATH = "/anand-vastra";
const SITE_URL = "https://vaibhavbhati360.github.io/anand-vastra";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const remote = execSync("git remote get-url origin").toString().trim();

// 1. Build with the Pages sub-path.
run("npm run build", {
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: BASE_PATH, NEXT_PUBLIC_SITE_URL: SITE_URL },
});

// 2. Stop GitHub's Jekyll step from hiding the _next/ folder.
writeFileSync("out/.nojekyll", "");

// 3. Publish out/ as the gh-pages branch (a fresh one-commit branch each time).
rmSync("out/.git", { recursive: true, force: true });
const git = (args) => run(`git ${args}`, { cwd: "out" });
git("init -q -b gh-pages");
git("add -A");
git('commit -q -m "Deploy site to GitHub Pages"');
git(`push -f "${remote}" gh-pages`);
rmSync("out/.git", { recursive: true, force: true });

console.log(`\nPublished. Live in about a minute at ${SITE_URL}/`);
console.log("Note: out/ now holds the Pages build. Run `npm run build` before `npm start` to preview locally.");

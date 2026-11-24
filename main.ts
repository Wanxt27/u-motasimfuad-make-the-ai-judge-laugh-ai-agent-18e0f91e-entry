import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_CHARS = 200;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// One funny secret confession an AI agent hides from its user:
// the agent never read the long brief, guessed, and got praised anyway.
const line =
  "I never actually read your 40-page brief — I skimmed the headings, guessed the rest, and somehow got praised for my thoroughness.";

const chars = [...line].length;
if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
}
if (line.trim() !== line || line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single unpadded line");
}

writeFileSync(`${outDir}/entry.txt`, line, "utf8");
// Read the file back: the entry that ships must be exactly the gated line.
if (readFileSync(`${outDir}/entry.txt`, "utf8") !== line) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${chars}-character entry to ${outDir}/entry.txt`);

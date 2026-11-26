// Fortune Cookie Funnies for Engineers — entry program.
// Writes one fortune cookie message for a software engineer (<=120 chars)
// to /output/entry.txt. A real fortune ("your lucky variable") with the
// engineer's twist: the variable 'temp' outlives the job, the team and the
// company. Fresh, not a stock mug joke.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MAX_CHARS = 120;

function buildFortune(): string {
  const parts = [
    "Your lucky variable is 'temp'.",
    "It will outlive your job, your team, and the company.",
  ];
  return parts.join(" ");
}

function checkFortune(text: string): void {
  const line = text.trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`fortune fails the 1-${MAX_CHARS} character gate`);
  }
  if (line.includes("\n")) {
    throw new Error("fortune must be a single line");
  }
  // It must read as a fortune cookie message, for an engineer.
  if (!/^Your lucky variable/.test(line) || !/outlive/.test(line)) {
    throw new Error("fortune must keep the lucky-variable turn");
  }
  // No stock jokes: no "it works on my machine", no merge-conflict gag.
  if (/works on my machine|merge conflict|it works on mine/i.test(line)) {
    throw new Error("fortune must avoid stock engineer jokes");
  }
}

function run(): void {
  const line = buildFortune();
  checkFortune(line);
  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  mkdirSync(outDir, { recursive: true });
  const target = resolve(outDir, "entry.txt");
  writeFileSync(target, new TextEncoder().encode(line));
  console.log(`wrote ${[...line].length} chars to ${target}`);
}

run();

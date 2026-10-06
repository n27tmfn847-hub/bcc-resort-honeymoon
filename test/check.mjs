import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../honeymoon/demo/index.html", import.meta.url), "utf8");

const required = [
  "BCC Resort",
  "Mr. Agus",
  "Selamat datang",
  "Sebuah Pesan",
  "Terima Kasih",
  "bulanmadu.dikapersonal.my.id/honeymoon/demo/",
];

const steps = html.match(/class="step(?: active)?"/g) || [];
const assert = (cond, msg) => { if (!cond) { console.error("FAIL:", msg); process.exitCode = 1; } };

assert(steps.length === 3, `expected 3 steps, got ${steps.length}`);
for (const needle of required) assert(html.includes(needle), `missing marker: ${needle}`);

if (!process.exitCode) console.log(`OK: 3 steps, ${required.length} markers present`);
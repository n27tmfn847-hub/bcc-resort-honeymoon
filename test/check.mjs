import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../honeymoon/demo/index.html", import.meta.url), "utf8");

const required = [
  "BCC Resort",
  "Mr. Alex",
  "Welcome",
  "A Message",
  "Thank You",
  "Our Team",
  "I Made Sukra Mahardika",
  "Ni Putu Bunga Mentari",
  "I Putu Pradita Wiguna",
  "I Kadek Dwi Adnyana",
  "bulanmadu.dikapersonal.my.id/honeymoon/demo/",
];

const steps = html.match(/class="step(?: active)?"/g) || [];
const assert = (cond, msg) => { if (!cond) { console.error("FAIL:", msg); process.exitCode = 1; } };

assert(steps.length === 4, `expected 4 steps, got ${steps.length}`);
for (const needle of required) assert(html.includes(needle), `missing marker: ${needle}`);

if (!process.exitCode) console.log(`OK: 4 steps, ${required.length} markers present`);
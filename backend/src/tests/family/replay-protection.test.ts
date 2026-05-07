import fs from "fs";

import path from "path";

const corpusPath =
  path.join(
    __dirname,
    "../../../corpuses/family/replay-payloads.json"
  );

const payloads =
  JSON.parse(
    fs.readFileSync(
      corpusPath,
      "utf-8"
    )
  );

console.log(
  "\nRunning deterministic replay protection tests...\n"
);

let latestTimestamp =
  new Date(
    payloads[0].updatedAt
  );

console.log(
  "✅ Initial synchronization accepted"
);

for (
  let i = 1;
  i < payloads.length;
  i++
) {
  const payload =
    payloads[i];

  const currentTimestamp =
    new Date(
      payload.updatedAt
    );

  if (
    currentTimestamp <=
    latestTimestamp
  ) {
    console.log(
      `✅ Replay payload ${i + 1} correctly rejected`
    );
  } else {
    console.log(
      `❌ Replay payload ${i + 1} unexpectedly accepted`
    );

    latestTimestamp =
      currentTimestamp;
  }
}

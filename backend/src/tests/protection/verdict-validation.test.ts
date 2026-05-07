import fs from "fs";

import path from "path";

import {
  localScanResultSchema
} from "../../contracts/protection-engine/threat-verdict.validator";

const corpusPath =
  path.join(
    __dirname,
    "../../../corpuses/protection/invalid-verdict-payloads.json"
  );

const corpus =
  JSON.parse(
    fs.readFileSync(
      corpusPath,
      "utf-8"
    )
  );

console.log(
  "\nRunning deterministic malformed payload validation tests...\n"
);

corpus.forEach(
  (
    payload: any,
    index: number
  ) => {
    const result =
      localScanResultSchema.safeParse(
        payload
      );

    if (result.success) {
      console.log(
        `❌ Payload ${index + 1} unexpectedly passed validation`
      );
    } else {
      console.log(
        `✅ Payload ${index + 1} correctly rejected`
      );
    }
  }
);

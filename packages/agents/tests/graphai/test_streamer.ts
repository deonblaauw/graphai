import { graphDataTestRunner } from "@receptron/test_utils";
import * as agents from "@/index";

import test from "node:test";
import assert from "node:assert";

class WordStreamer {
  public onWord = (__word: string | undefined) => {};
  private message: string;

  constructor(message: string) {
    this.message = message;
  }
  public run() {
    const words = this.message.split(" ");
    const next = () => {
      setTimeout(() => {
        const word = words.shift();
        this.onWord(word);
        if (word) {
          next();
        }
      }, 200);
    };
    next();
  }
}

const theMessage = "May the force be with you.";

const graphdata_any = {
  version: 0.5,
  nodes: {
    message: {
      value: theMessage,
    },
    source: {
      agent: (message: string) => {
        return new WordStreamer(message);
      },
      inputs: [":message"],
    },
    destination: {
      agent: (streamer: WordStreamer) => {
        const words = new Array<string>();
        return new Promise((resolve) => {
          streamer.run();
          streamer.onWord = (word: string | undefined) => {
            if (word) {
              words.push(word);
            } else {
              resolve(words.join(" "));
            }
          };
        });
      },
      isResult: true,
      inputs: [":source"],
    },
  },
};

test("test streamer object", async () => {
  const result = await graphDataTestRunner(__dirname, __filename, graphdata_any, agents, () => {}, false);
  assert.deepStrictEqual(result, { destination: theMessage });
});

import rdl from "readline";
const std = process.stdout;

const block = "=";
const arrow = ">";

export class LoadService {
  constructor() {}

  load = (blockAmount: number) => {
    const blockLine: string[] = [];

    for (var i = 0; i < blockAmount * 2; i++) {
      blockLine.push(block);
    }
    blockLine.push(arrow);

    std.write(
      "\x1b[32m" + blockLine.join("") + `    ${blockAmount * 5}% Completed`
    );
    rdl.cursorTo(std, 0);
  };
}

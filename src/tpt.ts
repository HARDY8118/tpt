#!/usr/bin/env node

import { constraints } from "./constraints";
import { readFile } from "./utils";
import {
  contentLine,
  contentList,
  contentFiglet,
  contentText,
  presentation,
  contentHchart,
  contentHtree,
  contentCode,
} from "./types";
import * as utils from "./drawUtils";

export default class tpt {
  private file: string;
  private tpt: presentation;
  private _slideIndex: number;
  private _timeout: NodeJS.Timeout;

  constructor(filePath: string) {
    this.file = filePath;
    this.tpt = readFile(filePath);
    this.check();
    this._slideIndex = -1;
  }

  check() {
    if (
      this.tpt.config &&
      this.tpt.config["min-width"] &&
      this.tpt.config["min-width"] > process.stdout.columns
    ) {
      throw new Error(`Size of output window is less than minimum presentation width \n 
            "Minimum output window size required: ${this.tpt.config["min-width"]} characters\n\n`);
    }
    for (let slide of this.tpt.slides) {
      for (let item of slide.content) {
        switch (item.type) {
          case "line": {
            constraints.line.validate(item);
            break;
          }
          case "list": {
            constraints.list.validate(item);
            break;
          }
          case "figlet": {
            constraints.figlet.validate(item);
            break;
          }
          case "text": {
            constraints.text.validate(item);
            break;
          }
          case "hchart": {
            constraints.hchart.validate(item);
            break;
          }
          case "htree": {
            constraints.htree.validate(item);
            break;
          }
          case "code": {
            constraints.code.validate(item);
            break;
          }
          default: {
            throw new Error("Invalid type");
          }
        }
      }
    }
    return true;
  }

  private drawSlide() {
    const { title, content, timming } = this.tpt.slides[this._slideIndex];
    if (timming && timming.NextAfter) {
      this._timeout = setTimeout(
        () => this.nextSlide(),
        timming.NextAfter * 1000
      );
    }
    utils.clearscreen();
    for (let item of content) {
      switch (item.type) {
        case "line": {
          item = <contentLine>item;
          item.width = item.width || process.stdout.columns;
          item.style = item.style || "-";

          utils.drawLine(item);
          break;
        }
        case "list": {
          item = <contentList>item;
          item.style = item.style || "> ";
          item.margin = item.margin || 0;
          item.heading = item.heading || "";

          utils.drawList(item);
          break;
        }
        case "figlet": {
          item = <contentFiglet>item;

          utils.figletText(item);
          break;
        }
        case "text": {
          item = <contentText>item;
          item.align = item.align || "left";

          utils.text(item);
          break;
        }
        case "hchart": {
          item = <contentHchart>item;
          item.showValues =
            typeof item.showValues !== undefined ? item.showValues : true;
          item.style = item.style || "■";

          utils.hchart(item);
          break;
        }
        case "htree": {
          item = <contentHtree>item;
          item.name = item.name || "";
          item.style = item.style || {};
          item.style.spaces = item.style.spaces || 2;
          item.style.itemMid = item.style.itemMid || "├─";
          item.style.itemLast = item.style.itemLast || "└─";
          item.style.extender = item.style.extender || "│";

          utils.htree(item);
          break;
        }
        case "code": {
          item = <contentCode>item;

          utils.code(item);
          break;
        }
        default: {
          throw new Error("Invalid type");
        }
      }
    }
  }

  nextSlide() {
    if (this._slideIndex == this.tpt.slides.length) {
      process.exit(0);
    } else if (this._slideIndex == this.tpt.slides.length - 1) {
      utils.clearscreen();
      utils.text({
        type: "text",
        text: "End of Presentation\n",
        align: "left",
      });
      this._slideIndex++;
    } else {
      this._slideIndex++;
      this.drawSlide();
    }
  }

  prevSlide() {
    if (this._slideIndex > 0) {
      this._slideIndex--;
      this.drawSlide();
    }
  }
  slidesCount() {
    return this.tpt.slides.length;
  }

  public resetTimeout() {
    clearTimeout(this._timeout);
  }
}

function main(): void {
  if (process.argv.length < 3) {
    process.stdout.write("No file provided\n\n");
    process.exit(1);
  } else if (process.argv.length > 3) {
    process.stdout.write("Too many files provided\n\n");
    process.exit(1);
  } else {
    try {
      const _presentation = new tpt(process.argv[2]);

      if (_presentation) {
        if (!_presentation.check()) {
          throw new Error("Invalid slide format");
        }

        _presentation.nextSlide();
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf8");

        process.stdin.on("data", (key: string) => {
          switch (key) {
            case "\u001B\u005B\u0042": // Down
            case "\u001B\u005B\u0043": // Right
            case "\u006A": // J
            case "\u006C": {
              // L
              _presentation.resetTimeout();
              _presentation.nextSlide();
              break;
            }
            case "\u001B\u005B\u0041": // Up
            case "\u001B\u005B\u0044": // Left
            case "\u006B": // K
            case "\u0068": {
              // H
              _presentation.resetTimeout();
              _presentation.prevSlide();
              break;
            }
            case "\u0003": // Ctrl + C
            case "\u001B": // Esc
            case "\u0071": {
              // q
              _presentation.resetTimeout();
              utils.clearscreen();
              process.exit(0);
            }
          }
        });
      }
    } catch (e: any) {
      process.stderr.write(e.message);
    }
  }
}

if (require.main === module) {
  main();
}

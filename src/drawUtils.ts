import { strict as assert } from "assert";
import figlet from "figlet";
import {
  contentCode,
  contentFiglet,
  contentHchart,
  contentHtree,
  contentLine,
  contentList,
  contentText,
} from "./types";
import color from "colorts";
import highlight from "cli-highlight";

/**
 * Print a character multiple times
 * @param text character to print multiple times
 * @param count number of times to print
 */
function drawLoop(text: string, count: number) {
  assert(count > 0, "Count cannot be negative");

  while (count--) {
    process.stdout.write(text);
  }
}

/**
 * Clear output window
 */
export function clearscreen() {
  process.stdout.write("\u001b[2J\u001b[0;0H");
}

/**
 * Draw a line using specified style
 * @param width Width of line (in characters)
 * @param style Line style
 */
export function drawLine(content: contentLine) {
  assert(content.width > 0, "Width cannot be less than 0");
  assert(content.style.length > 0, "Empty line style");
  assert(
    content.style.length == 1 || content.style.length == 3,
    "Invalid line style"
  );

  if (content.style.length == 3) {
    process.stdout.write(content.style[0]);
    content.width > 2 && drawLoop(content.style[1], content.width - 2);
    process.stdout.write(content.style[2]);
  } else {
    content.width > 0 && drawLoop(content.style[0], content.width);
  }
  process.stdout.write("\n");
}

/**
 * Show bullet list
 * @param items List of items to show
 * @param heading List heading, default **none**
 * @param bulletStyle String to show as bullet
 * @param margin Margin to left of list (in characters)
 */
export function drawList(content: contentList) {
  assert(content.items.length > 0, "List can't be empty");

  process.stdout.write("\n");
  if (content.heading) {
    //Heading
    content.margin > 0 && drawLoop(" ", content.margin);
    process.stdout.write(content.heading + "\n");
  }

  // Items
  for (let item of content.items) {
    content.margin > 0 && drawLoop(" ", content.margin);
    process.stdout.write(content.style + item + "\n");
  }
}

export function figletText(content: contentFiglet) {
  assert(content.text.length > 0, "Text cannot be empty");

  process.stdout.write(figlet.textSync(content.text, content.options || {}));
  process.stdout.write("\n");
}

export function text(content: contentText) {
  assert(content.text.length > 0, "Text cannot be empty");

  if (content.style) {
    let styledText = color(content.text);

    if (content.style.backgroundColor) {
      switch (content.style.backgroundColor) {
        case "bgBlack": {
          styledText = styledText.bgBlack;
          break;
        }
        case "bgRed": {
          styledText = styledText.bgRed;
          break;
        }
        case "bgGreen": {
          styledText = styledText.bgGreen;
          break;
        }
        case "bgYellow": {
          styledText = styledText.bgYellow;
          break;
        }
        case "bgBlue": {
          styledText = styledText.bgBlue;
          break;
        }
        case "bgMagenta": {
          styledText = styledText.bgMagenta;
          break;
        }
        case "bgCyan": {
          styledText = styledText.bgCyan;
          break;
        }
        case "bgWhite": {
          styledText = styledText.bgWhite;
          break;
        }
      }
    }

    if (content.style.textColor) {
      switch (content.style.textColor) {
        case "black": {
          styledText = styledText.black;
          break;
        }
        case "red": {
          styledText = styledText.red;
          break;
        }
        case "green": {
          styledText = styledText.green;
          break;
        }
        case "yellow": {
          styledText = styledText.yellow;
          break;
        }
        case "blue": {
          styledText = styledText.blue;
          break;
        }
        case "magenta": {
          styledText = styledText.magenta;
          break;
        }
        case "cyan": {
          styledText = styledText.cyan;
          break;
        }
        case "white": {
          styledText = styledText.white;

          break;
        }
        case "gray": {
          styledText = styledText.gray;
          break;
        }
        case "grey": {
          styledText = styledText.grey;
          break;
        }
      }
    }

    if (content.style.styles) {
      for (let style of content.style.styles) {
        switch (style) {
          case "bold": {
            styledText = styledText.bold;
            break;
          }
          case "dim": {
            styledText = styledText.dim;
            break;
          }
          case "italic": {
            styledText = styledText.italic;
            break;
          }
          case "underline": {
            styledText = styledText.underline;
            break;
          }
          case "inverse": {
            styledText = styledText.inverse;
            break;
          }
          case "strikethrough": {
            styledText = styledText.strikethrough;
            break;
          }
        }
      }
    }

    content.text = styledText.toString();
  }

  if (content.align == "left") {
    process.stdout.write(content.text);
  } else if (content.align == "center") {
    drawLoop(" ", (process.stdout.columns - content.text.length) / 2);
  } else if (content.align == "right") {
    drawLoop(" ", process.stdout.columns - content.text.length);
  }
}

export function hchart(content: contentHchart) {
  assert(content.items.length > 0, "List can't be empty");

  let _maxKeySize = 0;

  // Checking item size and computing max key size
  for (let _item of content.items) {
    assert(_item.length == 2, "Item can have only key and value: " + _item[0]);
    _maxKeySize =
      _maxKeySize < (_item[0] as string).length
        ? (_item[0] as string).length
        : _maxKeySize;
  }

  for (let _item of content.items) {
    process.stdout.write((_item[0] as string).padEnd(_maxKeySize) + " │");
    drawLoop(content.style, _item[1] as number);
    content.showValues && process.stdout.write(" " + _item[1]);
    process.stdout.write("\n");
  }
}

export function htree(content: contentHtree) {
  assert(Object.keys(content.items).length > 0, "Keys cannot be empty");

  let hTreeoutput: string = content.name + "\n";

  function repeatString(str: string, n: number) {
    let repeatedStr = "";

    while (n--) {
      repeatedStr += str;
    }

    return repeatedStr;
  }

  // Recursive function to print tree structure
  function recurseDepth(obj: any, prefixSpaces = "", isLastEntry = true) {
    if (!obj) {
      return;
    } else if (typeof obj === "string") {
      hTreeoutput +=
        prefixSpaces +
        (isLastEntry ? content.style?.itemLast : content.style?.itemMid) +
        obj +
        "\n";
    } else if (Array.isArray(obj)) {
      let size = obj.length;
      for (let i = 0; i < size; i++) {
        recurseDepth(obj[i], prefixSpaces, i == size - 1);
      }
    } else if (typeof obj === "object") {
      let entries = Object.entries(obj);
      let size = entries.length;

      for (let i = 0; i < size; i++) {
        hTreeoutput +=
          prefixSpaces +
          (i == size - 1 ? content.style?.itemLast : content.style?.itemMid) +
          entries[i][0] +
          "\n";
        recurseDepth(
          entries[i][1],
          prefixSpaces +
            (i == size - 1
              ? repeatString(" ", content.style.spaces)
              : content.style?.extender +
                repeatString(" ", content.style.spaces - 1)),
          i == size - 1
        );
      }
    }
  }

  recurseDepth(content.items);

  process.stdout.write(hTreeoutput);
}

export function code(content: contentCode) {
  let options = { language: content.lang };

  process.stdout.write(highlight(content.code.join("\n"), options));
}

//checkbox
//radio

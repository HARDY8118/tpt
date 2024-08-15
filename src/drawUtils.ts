import { strict as assert } from "assert";
import figlet from "figlet";
import { contentHtree } from "./types";

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

function repeatString(str: string, n: number){
  let repeatedStr = ""

  while (n--) {
    repeatedStr+=str
  }

  return repeatedStr
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
export function drawLine(width = process.stdout.columns, style = "-") {
  assert(width > 0, "Width cannot be less than 0");
  assert(style.length > 0, "Empty line style");
  assert(style.length == 1 || style.length == 3, "Invalid line style");
  if (style.length == 3) {
    process.stdout.write(style[0]);
    width > 2 && drawLoop(style[1], width - 2);
    process.stdout.write(style[2]);
  } else {
    width > 0 && drawLoop(style[0], width);
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
export function drawList(
  items: string[],
  bulletStyle = "> ",
  margin = 0,
  heading = ""
) {
  assert(items.length > 0, "List can't be empty");
  process.stdout.write("\n");
  if (heading) {
    //Heading
    margin > 0 && drawLoop(" ", margin);
    process.stdout.write(heading + "\n");
  }

  // Items
  for (let item of items) {
    margin > 0 && drawLoop(" ", margin);
    process.stdout.write(bulletStyle + item + "\n");
  }
}

export function figletText(text: string, figletOptions: figlet.Options) {
  assert(text.length > 0, "Text cannot be empty");
  process.stdout.write(figlet.textSync(text, figletOptions));
  process.stdout.write("\n");
}

export function text(text: string, alignment = "left") {
  assert(text.length > 0, "Text cannot be empty");
  assert(
    alignment == "left" || alignment == "center" || alignment == "right",
    "Invalid value for alignment"
  );
  if (alignment == "left") {
    process.stdout.write(text);
  } else if (alignment == "center") {
  } else if (alignment == "right") {
    drawLoop(" ", process.stdout.columns - text.length);
  }
}

export function hchart(items: any[][], showValues = true, style = "■") {
  assert(items.length > 0, "List can't be empty");
  let _maxKeySize = 0;

  // Checking item size and computing max key size
  for (let _item of items) {
    assert(_item.length == 2, "Item can have only key and value: " + _item[0]);
    _maxKeySize = _maxKeySize < _item[0].length ? _item[0].length : _maxKeySize;
  }

  for (let _item of items) {
    process.stdout.write(_item[0].padEnd(_maxKeySize) + " │");
    drawLoop(style, _item[1]);
    showValues && process.stdout.write(" " + _item[1]);
    process.stdout.write("\n");
  }
}

export function htree(content: contentHtree) {
  assert(Object.keys(content.items).length > 0, "Keys cannot be empty");

  let hTreeoutput: string = content.name + "\n";

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
              : (content.style?.extender+repeatString(" ", content.style.spaces-1))),
          i == size - 1
        );
      }
    }
  }

  recurseDepth(content.items);

  process.stdout.write(hTreeoutput);
}

//checkbox
//radio

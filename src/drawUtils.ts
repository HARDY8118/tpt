import { strict as assert } from 'assert';
import figlet from 'figlet';

/**
 * Clear output window
 */
export function clearscreen() {
    process.stdout.write("\u001b[2J\u001b[0;0H");
}

/**
 * Print a character multiple times
 * @param text character to print multiple times
 * @param count number of times to print
 */
function drawLoop(text: string, count: number) {
    assert(count > 0, "Count cannot be negative")

    while (count--) {
        process.stdout.write(text);
    }
}

/**
 * Draw a line using specified style
 * @param width Width of line (in characters)
 * @param style Line style
 */
export function drawLine(width = process.stdout.columns, style = "-") {
    assert(width > 0, "Width cannot be less than 0")
    assert(style.length > 0, "Empty line style");
    assert(style.length == 1 || style.length == 3, "Invalid line style");
    if (style.length == 3) {
        process.stdout.write(style[0]);
        (width > 2) && drawLoop(style[1], width - 2);
        process.stdout.write(style[2]);
    } else {
        (width > 0) && drawLoop(style[0], width);
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
export function drawList(items: string[], bulletStyle = "> ", margin = 0, heading = "") {
    assert(items.length > 0, "List can't be empty")
    process.stdout.write("\n");
    if (heading) {
        //Heading
        (margin > 0) && drawLoop(" ", margin);
        process.stdout.write(heading + "\n");
    }

    // Items
    for (let item of items) {
        (margin > 0) && drawLoop(" ", margin);
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
    assert(alignment == "left" || alignment == "center" || alignment == "right", "Invalid value for alignment");
    if (alignment == "left") {
        process.stdout.write(text);
    } else if (alignment == "center") {

    } else if (alignment == "right") {
        drawLoop(" ", process.stdout.columns - text.length);
    }
}
//hchart
//checkbox
//radio
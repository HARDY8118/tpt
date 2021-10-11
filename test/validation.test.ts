import { ValidationError } from 'validate';
import { constraints } from '../src/constraints';

describe("Line validation", () => {
    test("No width, No style", () => {
        expect(constraints.line.validate({
            type: "line"
        })).toHaveLength(0);
    })

    test("No style", () => {
        expect(constraints.line.validate({
            type: "line",
            with: 40
        })).toHaveLength(0);
    })

    test("No width", () => {
        expect(constraints.line.validate({
            type: "line",
            style: "-"
        })).toHaveLength(0);
    })

    test("Style length =3", () => {
        expect(constraints.line.validate({
            type: "line",
            style: "abc"
        })).toHaveLength(0);
    })

    test("Style length >3", () => {
        expect(constraints.line.validate({
            type: "line",
            style: "abcd"
        })).toHaveLength(1);
    })
})

describe("List validation", () => {
    test("0 items", () => {
        expect(constraints.list.validate({
            type: "list",
            items: []
        })).toHaveLength(1);

    })

    test("0< items", () => {
        expect(constraints.list.validate({
            type: "list",
            items: ["lorem", "ipsum"]
        })).toHaveLength(0);

    })
})

describe("Figlet validation", () => {
    test("Empty text", () => {
        expect(constraints.figlet.validate({
            type: "figlet",
            text: ""
        })).toHaveLength(1);

    })

    test("No text", () => {
        expect(constraints.figlet.validate({
            type: "figlet",
        })).toHaveLength(1);
    })

    test("Valid text", () => {
        expect(constraints.figlet.validate({
            type: "figlet",
            text: "figlet text",
        })).toHaveLength(0);
    })

    test("Valid options", () => {
        expect(constraints.figlet.validate({
            type: "figlet",
            options: {
                font: "Ghost",
                width: 3
            }
        }))
    })

    test("Invalid options", () => {
        expect(constraints.figlet.validate({
            type: "figlet",
            options: {
                fonts: 3,
            }
        }))
    })
})

describe("Text validation", () => {
    test("Empty text", () => {
        expect(constraints.text.validate({
            type: "text",
            text: ""
        })).toHaveLength(1);

    })

    test("No text", () => {
        expect(constraints.text.validate({
            type: "text",
        })).toHaveLength(1);
    })

    test("Valid text", () => {
        expect(constraints.text.validate({
            type: "text",
            text: "text"
        })).toHaveLength(0);
    })
})
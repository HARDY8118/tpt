import Schema from "validate";

export const constraints = {
  line: new Schema({
    type: { type: String, required: true, enum: ["line"] },
    width: { type: Number, required: false },
    style: {
      type: String,
      length: {
        min: 0,
        max: 3,
      },
      required: false,
    },
  }),
  list: new Schema({
    type: { type: String, required: true, enum: ["list"] },
    items: {
      type: Array,
      each: {
        type: String,
      },
      length: {
        min: 1,
      },
    },
    heading: { type: String, required: false },
    margin: { type: Number, required: false },
    style: { type: String, required: false },
  }),
  figlet: new Schema({
    type: { type: String, required: true, enum: ["figlet"] },
    text: { type: String, required: true },
    options: {
      font: { type: String, required: false },
      horizontalLayout: { type: String, required: false },
      verticalLayout: { type: String, required: false },
      width: { type: Number, required: false },
      whitespaceBreak: { type: Boolean, required: false },
    },
  }),
  text: new Schema({
    type: { type: String, required: true, enum: ["text"] },
    text: { type: String, required: true },
  }),
  hchart: new Schema({
    type: { type: String, required: true, enum: ["hchart"] },
    items: {
      type: Array,
      each: {
        type: [String, Number],
      },
      length: {
        min: 1,
      },
    },
    showValues: { type: Boolean, required: false },
    style: { type: String, required: false },
  }),
  htree: new Schema(
    {
      type: { type: String, required: true, enum: ["htree"] },
      name: { type: String, required: true },
      items: {
        type: Object,
        required: true,
      },
      style: {
        type: Object,
        required: false,
        properties: {
          spaces: {
            type: Number,
          },
          itemMid: {
            type: String,
            length: { min: 0 },
          },
          itemLast: {
            type: String,
            length: { min: 0 },
          },
          extender: {
            type: String,
            length: { min: 0 },
          },
        },
      },
    },
    { strip: false }
  ),
};

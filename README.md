# tpt
Text presention program on command line using `node.js`

This program is inspired from [tpp](https://github.com/cbbrowne/tpp).

# Contents
- [Usage](#Usage)
- [Controls](#Controls)
- [Slides](#Slides)
- [Contributing](#Contributing)

# Usage
The program can be used to display presentations from using only command line.
To open a presentation use the command line utility and provide with location of presentation
```bash
tpt presentation
```


# Controls
Once presentation is started, use the following keys to navigate

| Key | Function |
|--|--|
| Down, Right | Go to next slide |
| Up, Left | Go back to previous slide |
| Esc | End presentation |


# Slides
Presentations can be created using any text editor and are defined using JSON standard.

```json
{
    "meta": {
        "author": "<author name/email/info>",
    },
    "config": {
        "min-width": 100,
    },
    "slides":[
        {
            "title":"<Slide title>",
            "content":[
                {"type":"text", "text": "content"},
                {"type":"line", "style": "-"},
            ]
            }
    ]
}
```

## Writing slides
Slides can be defined as an array of object, each object holds type and  specific properties associated with it.

Following items can be used in slides.
- [Line](###Line)
- [List](###List)
- [Figlet](###Figlet)
- [Text](###Text)


### Line
Draw line
```json
{
    "type": "line",
    "width": 50,
    "style": "-"
}
```

| Property | Required | Type | Default value | Description |
|--|--|--|--|--|
| type | &check; | String | "line" | Specifies type |
| width | &cross; | Number | &lt;terminal width&gt; | Width of line in charactters |
| | | | | Use 0 for blank line |
| style | &cross; | String | "-" | Line style using (length **1** or **3**)
| | | | | **1** Use same character throughtout |
| | | | | **3** 1st and 3rd characters on sides, 2nd in minddle |


### List
Show bullet list
```json
{
    "type": "list",
    "items" [ "item1", "item2", "item3" ]
    "style": "> ",
    "margin": 0,
    "heading": "Items"
}
```

| Property | Required | Type | Default value | Description |
|--|--|--|--|--|
| type | &check; | String | "list" | Specifies type |
| items | &check; | String[] | | List items |
| style | &cross; | String | "> " | Bullet style |
| margin | &cross; | Number | 0 | Left margin for list |
| heading | &cross; | String | "" | List heading |


### Figlet
Figlet can be used to draw large font ascii text.

Internally this program uses [figlet](https://www.npmjs.com/package/figlet) package to draw figlet.

Refer [figlet](http://www.figlet.org/) documentation for figlet options.

```json
{
    "type": "figlet",
    "text" "figlet"
    "options": {},
}
```

| Property | Required | Type | Default value | Description |
|--|--|--|--|--|
| type | &check; | String | "figlet" | Specifies type |
| text | &check; | String | | Figlet text |
| options | &cross; | Figlet Options | {} | Options for figlet text |


### Text
Show plain text

```json
{
    "type": "text",
    "text" "sample text"
}
```

| Property | Required | Type | Default value | Description |
|--|--|--|--|--|
| type | &check; | String | "text" | Specifies type |
| text | &check; | String | String | Text to display |


# Contributing
Refer to [CONTRIBUTING.md]() for instructions on how to contribute.
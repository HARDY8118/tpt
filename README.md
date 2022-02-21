# tpt
Text presention program on command line.

![TYPESCRIPT](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NODE.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Known Vulnerabilities](https://snyk.io/test/github/HARDY8118/tpt/badge.svg)

This program is inspired from [tpp](https://github.com/cbbrowne/tpp).

# Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [Controls](#Controls)
- [Slides](#Slides)
- [Contributing](#Contributing)

# Installation
The program can be installed using npm/yarn.
```bash
yarn global add textpresentation # yarn
#    OR
npm install -g textpresentation # npm
```

**OR**

Compile from source
```bash
git clone git@github.com:HARDY8118/tpt.git
cd tpt
yarn install
yarn run build
yarn link
```


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
| Down, Right, K, L | Go to next slide |
| Up, Left, J, H | Go back to previous slide |
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
            "title": "<Slide title>",
            "content": [
                {"type":"text", "text": "content"},
                {"type":"line", "style": "-"},
            ],
            "timming": {
                "NextAfter": 4
            }
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
- [Hchart](###Hchart)


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
| text | &check; | String | | Text to display |

### Hchart
Show horizontal bar chart

```json
{
    "type": "hchart",
    "items": [
        ["item1", 1],
        ["item2", 2],
        ["item3", 3]
    ],
    "showValues": true,
    "style": "■"
}
```

| Property | Required | Type | Default value | Description |
|--|--|--|--|--|
| type | &check; | String | "text" | Specifies type |
| items | &check; | [[String, Number]] | | Items and values |
| showValues | &cross; | Boolean | true | Show absolute values |
| style | &cross; | String | "■" | Chart style |

## Timming
Additionally a timming object can be provided with slide to control timming of slide. The supported properties are:

| Property | Type | Description |
| -- | -- | -- |
| NextAfter | Number | Scroll to next page after specified seconds |

# Contributing
Refer to [CONTRIBUTING.md](https://github.com/HARDY8118/tpt/blob/main/CONTRIBUTING.md) for instructions on how to contribute.

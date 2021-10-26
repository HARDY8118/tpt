import { Options } from 'figlet';

export interface contentLine {
    type: string,
    width?: number,
    style?: string
}

export interface contentList {
    type: string,
    items: string[],
    style?: string,
    margin?: 0
    heading?: string
}

export interface contentFiglet {
    type: string,
    text: string,
    options?: Options
}

export interface contentText {
    type: string,
    text: string,
}

export interface presentation {
    meta: any,
    config: any,
    slides: any
}

export interface contentHchart {
    type: string,
    items: (string|number)[][],
    showValues?: boolean,
    style?: string
}

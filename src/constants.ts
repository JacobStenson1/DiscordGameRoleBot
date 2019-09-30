import {resolve} from "path";
import * as fs from "fs";
import {readFileSync} from "fs";

export const dataLocation: string = resolve(`${__dirname}/../data/`);
export const PREFIX: string = '/';
export const TOKEN: string = JSON.parse(
    readFileSync(`${dataLocation}/token.json`).toString()
);
export const whiteListedApps: Map<string, string> = new Map(
    JSON.parse(
        readFileSync(`${dataLocation}/whitelist.json`).toString()
    )
);

process.on('beforeExit', () => {
    let exportArray: [string, string][] = [];
    Array.from(whiteListedApps)
        .forEach((keyValue: [string, string]) => {
            let game: string = keyValue[0];
            let abbreviation: string = keyValue[1];
            exportArray.push([game, abbreviation]);
        });
    fs.writeFileSync(`${dataLocation}/whitelist.json`, JSON.stringify(exportArray));
});
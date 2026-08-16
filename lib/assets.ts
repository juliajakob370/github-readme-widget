import fs from "fs";
import path from "path";

function toBase64(filePath: string) {
    const file = fs.readFileSync(filePath);
    return `data:image/png;base64,${file.toString("base64")}`;
}

export const ASSETS = {
    sleepingFrog: toBase64(path.join(process.cwd(), "public/assets/sleeping_frog.png")),
    awakeFrog: toBase64(path.join(process.cwd(), "public/assets/awake_frog.png")),
    box: toBase64(path.join(process.cwd(), "/public/assets/box.png")),
};
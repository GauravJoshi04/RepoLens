import fs from "fs/promises";
import {cloneRepository} from "./cloneService.js" ;


export async function scanRepository(repoPath) {
    const items= await fs.readdir(repoPath);

    console.log(items);
}


const fs = require("fs").promises;
import {cloneRepository} from "./cloneService.js" ;

const { repoName, repoPath } = await cloneRepository(repoUrl);

async function scanRepository(repoPath) {
    const items= await fs.readdir(repoPath);

    console.log(repoPath) ;
}

module.exports = scanRepository;
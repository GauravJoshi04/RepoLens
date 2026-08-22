import fs from "fs/promises";
import path from "path";

const ignoredDirectories = [
    ".git",
    "node_modules",
    "dist",
    "build"
];

export async function scanRepository(repoPath) {
    
    const items= await fs.readdir(repoPath);
    for(const item of items){
        
       const fullPath = path.join(repoPath ,item) ;
       const stats = await fs.stat(fullPath) ;

       if(stats.isFile()) {
        const extension = path.extname(item); // extension of file the last . of item
        console.log(item, extension);
       }
       if(stats.isDirectory()){
        // if this directory is in ignored array we don't recurse into it
        if(ignoredDirectories.includes(item)){
          continue ;
        }
        
        console.log(`${item} is Directory`);
        await scanRepository(fullPath);
       }

    }

    console.log(items); // print entire array of dir. and files 
}


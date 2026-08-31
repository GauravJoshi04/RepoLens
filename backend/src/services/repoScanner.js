import fs from "fs/promises";
import path from "path";

const ignoredDirectories = [
    ".git",
    "node_modules",
    "dist",
    "build"
];

const codeExtensions = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".cpp",
    ".c",
    ".h",
    ".html",
    ".css"
];

//repoPath  → current directory we're scanning
//rootPath  → original repository root
export async function scanRepository(repoPath , rootPath) {
    const files = [] ;

    const items= await fs.readdir(repoPath);
    for(const item of items){
        
       const fullPath = path.join(repoPath ,item) ;
       const stats = await fs.stat(fullPath) ;
       const relativePath = path.relative(rootPath , fullPath) ;
       //relativePath = file.relativePath.replaceAll("\\", "/") ; // normalize it since for windows its \\ but / is 
       if(stats.isFile()) {
        const extension = path.extname(item); // extension of file the last . of item
        // if this extension matches in code ext. list this is a code file
        if (codeExtensions.includes(extension)) {

            const content = await fs.readFile(fullPath ,'utf-8') ;
            
            files.push({
            path: fullPath,
            relativePath: relativePath ,
            type:"code",
            content: content

        })
            //console.log(`${item} -> Code file`);
        }else{
             //console.log(item, extension);
        }

        
       }
       if(stats.isDirectory()){
        // if this directory is in ignored array we don't recurse into it
        if(ignoredDirectories.includes(item)){
          continue ;
        }
        
        //cconsole.log(`${item} is Directory`);

        const childFiles = await scanRepository(fullPath ,rootPath); // recurse into dir. and push them into too
        files.push(...childFiles);
       }

    }

    //console.log(items); // print entire array of dir. and files 
    //console.log(files)  ;
    return files ;
    
}


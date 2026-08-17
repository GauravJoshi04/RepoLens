import path from "path";
import {mkdir ,rm} from "fs/promises"
import simpleGit from 'simple-git';

function getRepoName(url) {
  return url
    .trim()
    .replace(/\/+$/, "")
    .split("/")
    .pop()
    .replace(/\.git$/, "");
}

export async function cloneRepository(repoUrl){
    const git = simpleGit(); // git instance local 

    const repoName = getRepoName(repoUrl);
    
    const tempDir = path.join(process.cwd(), "temp");
    await mkdir(tempDir, { recursive: true }); // make sure our temp dir exists if not it create it !!
    
    const repoDir = path.join(tempDir ,repoName);
    console.log("Removing:", repoDir);
    await rm(repoDir, {recursive: true, force: true }); // if repo already exists delete it , if it does not return no error
    console.log("Starting clone...");
    try{
        console.log("Clone finished!");
       await git.clone(repoUrl , repoDir);
  
       return {
        repoName: repoName,
        repoPath: repoDir
    }
    }catch(err){
        console.error("CLONE ERROR:", err);
        throw err;
    }
    console.log("Cloning into:", repoDir);
    
}
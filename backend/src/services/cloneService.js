import path from "path";
import {mkdir ,rm} from "fs/promises"
import simpleGit from 'simple-git';

const git = simpleGit(); // git instance


function getRepoName(url) {
  return url
    .trim()
    .replace(/\/+$/, "")
    .split("/")
    .pop()
    .replace(/\.git$/, "");
}

export async function cloneRepository(repoUrl){

    const repoName = getRepoName(repoUrl);
    
    const tempDir = path.join(process.cwd(), "temp");
    await mkdir(tempDir, { recursive: true }); // make sure our temp dir exists if not it create it !!
    
    const repoDir = path.join(tempDir ,repoName);
    await rm(repoDir, {recursive: true, force: true }); // if repo already exists delete it , if it does not return no error
    
    try{
       await git.clone(repoUrl , repoDir);
       
       return {
        repoName: repoName,
        repoPath: repoDir
    }
    }catch(err){
    throw new Error(`Failed to clone repository: ${err.message}`);
    }
    
}
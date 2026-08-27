// takes 1 file and chunks it 

export function chunkCodeFile(file){
    //Linux/macOS → \n //    Windows  → \r\n
    const lines = file.content.split(/\r?\n/);

    const CHUNK_SIZE = 100;
    const OVERLAP = 20;

    const chunks = [] ;

    for (let start = 0; start < lines.length ; start += start + CHUNK_SIZE - OVERLAP) {
        const  end = start + CHUNK_SIZE ;

        const chunkLines = lines.slice(start, end);
        const content = chunkLines.join("\n");
        const startLine = start + 1;
        const endLine = start + chunkLines.length;
        
        chunks.push({
            content,
            relativePath: file.relativePath,
            type: file.type,
            startLine,
            endLine
        });
        
    }
     return chunks;

}
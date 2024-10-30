const fs = require('fs');
const path = require('path');

function getDirectoryStructure(dir) {
    let result = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            result.push({
                name: file + '/',
                isDir: true,
                children: getDirectoryStructure(fullPath),  // Recursively get subdirectory structure
            });
        } else {
            result.push({
                name: file,
                size: stats.size,
                dateModified: stats.mtime.toISOString(),
                isDir: false,
            });
        }
    });

    return result;
}

// Generate directory structure starting from the root folder
const structure = getDirectoryStructure('./');  // Adjust the root folder if needed

// Write the structure to a JSON file
fs.writeFileSync('directory-structure.json', JSON.stringify(structure, null, 2));

console.log('Directory structure generated.');

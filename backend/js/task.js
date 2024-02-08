
/**
 * Task 1
 */
function leafFiles(files) {

    // unsafe solution
    // let folderFiles = files.filter(file => file.name.includes('.')).map(file => file.name);


    // safer solution 
    // check if file name ends with any of the file types in the array
    let fileTypes = ['.txt', '.jpg', '.xlsx', '.zip', '.pptx', '.mp4', '.py', '.mp3'];
    let folderFiles = files.filter(file => fileTypes.some(type => file.name.endsWith(type))).map(file => file.name);

    return folderFiles;
}

/**
 * Task 2
 */
function kLargestCategories(files, k) {
    let categories = [];

    for (let file of files) {
        for (let y of file.categories) {
            if (!categories.some(c => c.name === y)) {
                categories.push({ name: y, count: 1 });
            } else {
                categories.find(c => c.name === y).count++;
            }
        }
    }

    categories.sort((a, b) => {
        if (a.count === b.count) {
            return a.name.localeCompare(b.name);
        }
        return b.count - a.count;
    });

    return categories.slice(0, k).map(c => c.name);

}

/**
 * Task 3
 */
function largestFileSize(files) {

    let parentFolders = [];
    // find the parent folders
    for (let file in files) {
        if (files[file].parent === -1) {
            parentFolders.push(files[file]);
            files.splice(file, 1);
        }
    }
    
    let largestSize = 0;
    // loop through subfolders and add their sizes
    while (parentFolders.length > 0) {
        let parent = parentFolders.pop();
        let size = parent.size;
        
        // add parent folder's children to the files array
        let children = files.filter(file => file.parent === parent.id);
        // loop through children and add their sizes
        while (children.length) {
            let child = children.pop();
            size += child.size;
            for (let file in files) {
                if (files[file].parent === child.id) {
                    children.push(files[file]);
                    files.splice(file, 1);
                }
            }
        }

        if (size > largestSize) {
            largestSize = size;
        }
    }
    


    return largestSize;
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(largestFileSize(testFiles) == 20992)

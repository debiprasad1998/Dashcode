const {getMainWindow}= require('./windowMain');
const fs  = require('fs').promises;
const path = require('path');
const {dialog,ipcMain} = require('electron');
let fileIcons = [];
(async function(){
    let iconsString = await fs.readFile(`${__dirname}/../renderer/utils/file-icon.json`,'utf8');
    if(iconsString)
    {
        fileIcons = JSON.parse(iconsString);
        
    }

})()

ipcMain.on("openDir", (event, data) => {
    let path = data.path;
    let className = data.className
    readDir(path,className,false);
  });
ipcMain.on("readFile", (event, data) => {
      readFileData(data.path,event)
  });


const openFileModel =async ()=>{
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then(async (data)=>{
        
        let dirPath = data.filePaths[0];
      
        readDir(dirPath,'.file-list',true);
       
        
       


    })
    

}
async function readDir(dirPath,className,newDir)
{
    let files = await fs.readdir(dirPath);
        formatFile(files ,dirPath).then(data=>{
            

            getMainWindow().webContents.send("files", {className:className,list:data,newDir})
        })
}
function formatFile(files,dirPath)
{
    return new Promise((resolve,reject)=>{
        let fileData=[];
        files.forEach(async (file,i)=>{
            let filePath = path.resolve(dirPath, file);
            let  stats = await fs.lstat(filePath);
             var ext = path.extname(filePath);
             
             let fileIcon = filterFileIcon(ext);
            
            fileData.push({name:file,path:filePath,isFile:stats.isFile(),imgPath:fileIcon.icon,contentType:fileIcon.mime_type})
            if(i== files.length -1)
            {
                resolve(fileData)
            }
    
        })
    })

}
const loadViewFile =async ()=>{
    let menu = await fs.readFile(`${__dirname}/../renderer/view/menu.html`,'utf-8');
    let view = await fs.readFile(`${__dirname}/../renderer/view/view.html`,'utf-8');
    getMainWindow().webContents.send('load-view',{menuHtml:menu,viewHtml:view});
}

async function readFileData(path,ipcEvent)
{
  let fileData = await fs.readFile(path,'utf-8');
  
  ipcEvent.reply('readFile', {fileData});
}
async function writeFile()
{

}

function filterFileIcon(type)
{
    let imgPath = fileIcons.find((img)=>{
        return img.type === type;
    });
    return imgPath?imgPath:{icon:'./../icon/file/code.png',mime_type:"text/plain"};
  
  
}



module.exports ={
    openFileModel,
    loadViewFile

}
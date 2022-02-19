const {Menu} = require('electron');
const { openFileModel} = require('./filesystem'); 
const {showTerminal} = require('./terminal');
let menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "Open File",
          click:()=>{openFileModel() }
        },
        {
          label: "Open Folder",
        },
        {
          label: "Save",
        }
      ],
    },
    {
      label: "Edit",
    },
    {
      label: "Window",
    },
    {
      label: "Terminal",
      click:()=>{showTerminal() }
    },
  ]);
  

  module.exports ={
      menu
  }
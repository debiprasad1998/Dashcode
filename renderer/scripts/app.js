const { ipcRenderer } = require("electron");
let activeFiles =[];
let terminalOpen=false;

ipcRenderer.on("files", (event, data) => {
   
  showFiles(data.list,data.className,data.newDir);
});
ipcRenderer.on("load-view", (event, data) => {
  loadView(data);
});
ipcRenderer.on('terminal',(event,data)=>{
  openTerminal();
})
function send() {
  ipcRenderer.send("app-event", {
    channel: "data",
    payload: "Hellow from electron side",
  });
}
function loadView(data) {
  let explorer = document
    .querySelector(".main-window")
    .querySelector(".explorer-menu");
  let mainContent = document
    .querySelector(".main-window")
    .querySelector(".editor-content");
  explorer.innerHTML = data.menuHtml;
  mainContent.innerHTML = data.viewHtml;
}


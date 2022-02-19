const { getMainWindow } = require("./windowMain");
const {ipcMain} = require('electron');
const pty = require("node-pty");
const os = require("os");
let shell = os.platform() === "win32" ? "powershell.exe" : "bash";
const showTerminal = () => {
  let ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 40,
    rows: 5,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.on("data", function (data) {
    getMainWindow().webContents.send("terminal.incomingData", data);
    console.log("Data sent");
  });
  ipcMain.on("terminal.keystroke", (event, key) => {
    ptyProcess.write(key);
  });
  getMainWindow().webContents.send("terminal", { type: "open" });
};

module.exports = {
  showTerminal,
};

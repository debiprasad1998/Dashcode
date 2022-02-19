const { getMainWindow } = require("./windowMain");


const showTerminal = () => {


  getMainWindow().webContents.send("terminal", { type: "open" });
};

module.exports = {
  showTerminal,
};

const {BrowserWindow} = require('electron');
const getMainWindow = () => {
    const ID = process.env.MAIN_WINDOW_ID * 1;
    return BrowserWindow.fromId(ID)
  }


module.exports ={
    getMainWindow

}
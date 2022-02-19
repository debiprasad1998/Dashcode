
function loadEditor(file) {
  ipcRenderer.send("readFile", { path: file.path });
  ipcRenderer.on("readFile", (event, data) => {
    var editorContainer = document.querySelector(".editorContainer");
    editorContainer.innerHTML = "";
    let options = {
      value: data.fileData,
      lineNumbers: true,
      matchBrackets: true,
      mode: file.contentType,
      theme: "midnight",
    };
    console.log(options);
    CodeMirror(editorContainer, options);
  });
}

function openTerminal() {
  let terminal = document.querySelector("#terminal");
  terminalOpen=!terminalOpen;
  terminal.style.display = terminalOpen?"block":'none';

  var term = new Terminal();
  term.setOption('theme', {
    background: "#0f192a",
    foreground: "#3e8751",
  });
  term.open(document.getElementById("terminal"));
  
  ipcRenderer.on("terminal.incomingData", (event, data) => {
    term.write(data);
  });

  term.onData((e) => {
    ipcRenderer.send("terminal.keystroke", e);
  });
}

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

  terminal.style.display = "block";
  var term = $("#terminal").terminal(
    {
      less: function (url) {
        try {
          var ext = url.match(/\.([^.]+)$/)[1];
        } catch (e) {}
        var languages = {
          js: "javascript",
          css: "css",
          py: "python",
        };
        var language = languages[ext];
        term.pause();
        $.get(url).then(function (file) {
          term.resume();
          // bug in 2.8.0 require to split the lines
          // you can use string in any other version
          // <2.8.0 and >2.8.0
          if (language) {
            term.less(
              $.terminal
                .prism(language, $.terminal.escape_brackets(file))
                .split("\n")
            );
          } else {
            term.less(file.split("\n"));
          }
        });
      },
    },
    {
      onInit: function () {
        this.echo("type [[b;#fff;]less <URL with CORS enabled>] ").echo(
          "try less https://unpkg.com/jquery.terminal/js/less.js to see the source code of less extension"
        );
      },
      name: "less",
    }
  );
}

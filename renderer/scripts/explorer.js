const showFiles = (files, parentSource, newDir) => {
  let fragment = document.querySelector(parentSource);
  if (newDir) fragment.innerHTML = "";
  files.forEach((file) => {
    let el = document.createElement("li");

    if (file.isFile) {
      el.innerHTML = `<img src="${file.imgPath}" width="15">&nbsp;<span>${file.name}</span>`;
     
      el.className = `file`;
      el.onclick = function (event) {
        event.cancelBubble = true;
        showActiveFile({ ...file});
        showFile({ ...file, className: "file" });
      };
    } else {
      let identiferName = makeid(5);
      el.innerHTML = `<img src="./../icon/file/folder.ico" width="15">&nbsp;<span>${file.name}</span><ul class="child ${identiferName}"></ul>`;

      el.className = `folder`;
      el.onclick = function (event) {
        event.cancelBubble = true;
        showFolder({ ...file, className: identiferName });
      };
    }
    fragment.appendChild(el);
  });
};
function showActiveFile(file)
{   let tabContainer = document.querySelector('.file-tab');
    if(tabContainer.innerHTML !=='')
    {
        let tabs =tabContainer.querySelectorAll('li');
        console.log(tabs);
        tabs.forEach(tab=>{
            console.log(tab.id);
        })
    }
    let el = document.createElement("li");
    let tabId = makeid(8);
    el.id =tabId
    el.innerHTML = `<a class="nav-link active" id="${tabId}" aria-current="page" href="#"><i class="las la-file-alt"></i>&nbsp;<span>${file.name}</span>&nbsp;<i class="las la-times" onclick="removeFile(${tabId})"></i></a>`;
    el.onclick = function (event) {
      event.cancelBubble = true;
      showFile({ ...file, className: "file"});
    };
    tabContainer.appendChild(el);
}
function removeFile(id)
{
    let tab = document.getElementById(id);
    console.log(tab);
}
function showFile(file) {
  
  loadEditor(file);
}
function showFolder(file) {
  let element = document.querySelector(`.${file.className}`);
  // element.className = 'active';
  if (element.innerHTML !== "") {
    element.innerHTML = "";
  } else {
    let path = file.path;
    let className = `.${file.className}`;
    ipcRenderer.send("openDir", { path, className });
  }
}

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

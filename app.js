const container = document.querySelector("#container");
const droppedList = document.querySelector("#dropped-list");
const deleteAll = document.querySelector("#delete-all");
const text = document.querySelector("#text");

// Event listeners
container.addEventListener("dragover", (e) => {
  e.preventDefault();

  container.classList.add("active");
});

container.addEventListener("dragleave", () => {
  container.classList.remove("active");
});

container.addEventListener("drop", (e) => {
  e.preventDefault();

  container.classList.remove("active");

  const file = e.dataTransfer.files[0];

  if (file) {
    openFile(file);
  }

  deleteAll.style.display = "block";
});

// Functions
function openFile(file) {
  var reader = new FileReader();

  reader.onload = function () {
    var dataURL = reader.result;
    createDroppedListItem(file, dataURL);
  };

  reader.readAsDataURL(file);
}

function createDroppedListItem(file, url) {
  const listContainer = document.createElement("div");
  listContainer.classList.add("dropped-item");

  const preview = document.createElement("div");
  preview.classList.add("preview");

  const img = document.createElement("img");

  if (file.type.startsWith("image")) {
    img.src = url;
  } else if (file.type.startsWith("audio")) {
    img.src =
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
  } else if (file.type.startsWith("video")) {
    img.src =
      "https://images.unsplash.com/photo-1532456164788-984c62717cf8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80";
  } else {
    img.src =
      "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80";
  }

  const fileInfo = document.createElement("div");
  fileInfo.classList.add("file-info");

  const fileName = document.createElement("span");
  fileName.innerText = file.name;

  const fileSize = document.createElement("span");
  fileSize.innerText = formatFileSize(file.size);

  preview.appendChild(img);

  fileInfo.appendChild(fileName);
  fileInfo.appendChild(fileSize);
  // Or
  // fileInfo.innerHTML += fileName.outerHTML + fileSize.outerHTML;

  listContainer.appendChild(preview);
  listContainer.appendChild(fileInfo);
  //   Or
  // listContainer.innerHTML += preview.outerHTML + fileInfo.outerHTML;

  listContainer.innerHTML += `<i class="fa fa-trash delete" aria-hidden="true" onclick="deleteSelectedFile(event)"></i>`;

  // append listContainer to droppedList
  droppedList.appendChild(listContainer);

  // listContainer -> preview -> fileInfo
  // preview -> img
  // fileInfo -> fileName -> fileSize

  if (droppedList.childNodes.length >= 1) {
    text.innerHTML = "";
  }

  if (droppedList.childNodes.length >= 1) {
  }
}

function formatFileSize(size) {
  const sizeInKB = size / 1024;
  const sizeInMB = sizeInKB / 1024;

  return `SIZE: ${Math.round(sizeInMB * 100 + Number.EPSILON) / 100} MB`;
}

function deleteSelectedFile(e) {
  e.target.parentNode.remove();

  if (droppedList.childNodes.length === 0) {
    reset();
  }
}

function deleteAllFiles() {
  droppedList.innerText = "";
  reset();
}

function reset() {
  text.innerHTML = "Drag an image to upload!";
  deleteAll.style.display = "none";
}

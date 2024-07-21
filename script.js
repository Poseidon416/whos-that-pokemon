const imgSelect = document.getElementById("img-view");
const input = document.getElementById("input-img");
const clear = document.getElementById("clear");

imgSelect.addEventListener(
  "click",
  (e) => {
    if (input) {
      input.click();
    }
  },
  false,
);

input.addEventListener("change", uploadImage, false);

function uploadImage(){
    let imgLink = URL.createObjectURL(input.files[0]);
    imgSelect.style.backgroundImage = `url(${imgLink})`;

    imgSelect.style.border = "2px solid #aaa";

    let children = imgSelect.children;
    for(let i = 0; i < children.length; i++) {
        children[i].style.visibility = "hidden";
    }
    
}

imgSelect.addEventListener("dragenter", dragenter, false);
imgSelect.addEventListener("dragover", dragover, false);
imgSelect.addEventListener("drop", drop, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
  
function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}


function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    input.files = e.dataTransfer.files;
    uploadImage();
}

clear.addEventListener(
    "click", 
    function () {
        input.value = null;
        imgSelect.style.backgroundImage = "none";
        imgSelect.style.border = "2px dashed #aaa";

        let children = imgSelect.children;
        for(let i = 0; i < children.length; i++) {
            children[i].style.visibility = "visible";
        }
    },
    false
);
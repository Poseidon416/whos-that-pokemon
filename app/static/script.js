const imgView = document.getElementById("img-view");
const input = document.getElementById("input-img");
const submit = document.getElementById("submit-img")
const clear = document.getElementById("clear");
const analyze = document.getElementById("analyze")

const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;

imgView.addEventListener(
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
    if(typeValidation(input.files[0])){
        let imgLink = URL.createObjectURL(input.files[0]);
        imgView.style.backgroundImage = `url(${imgLink})`;
        imgView.style.border = "2px solid #aaa";
    
        let children = imgView.children;
        for(let i = 0; i < children.length; i++) {
            children[i].style.visibility = "hidden";
        }
    }
}

function typeValidation(file){
    if(allowedExtensions.exec(file.name)) return true;
    alert("Invalid file type. Please upload a supported image.");
    clear.click();
    return false;
}

imgView.addEventListener(
    "dragover", 
    (e) => {
        e.stopPropagation();
        e.preventDefault();
        imgView.style.backgroundColor = "#3a3a3a";
        imgView.children[1].innerHTML = '<b>drop image here</b>';
        imgView.children[2].style.marginTop = '90px';
    }, 
    true
);

imgView.addEventListener(
    "dragleave", 
    (e) => {
        e.stopPropagation();
        e.preventDefault();
        imgView.style.backgroundColor = "#2a2a2a";
        imgView.children[1].innerHTML = '<b>drag and drop or click here <br> to upload image</b>';
        imgView.children[2].style.marginTop = '75px';
    }, 
    false
);

imgView.addEventListener(
    "drop", 
    (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.querySelector("form").reset();
        
        if(typeValidation(e.dataTransfer.files[0])){
            input.files = e.dataTransfer.files;
            uploadImage();
        }
    }, 
    false
);

clear.addEventListener(
    "click", 
    () => {
        document.querySelector("form").reset();
        imgView.style.backgroundImage = "none";
        imgView.style.border = "2px dashed #aaa";
        imgView.style.backgroundColor = "#2a2a2a";
        imgView.children[1].innerHTML = '<b>drag and drop or click here <br> to upload image</b>';
        imgView.children[2].style.marginTop = '75px';

        let children = imgView.children;
        for(let i = 0; i < children.length; i++) {
            children[i].style.visibility = "visible";
        }
    },
    false
);

analyze.addEventListener(
    "click",
    () => {
        if (submit) {
            submit.click();
        }
    },
    false
);

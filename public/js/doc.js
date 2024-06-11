document.addEventListener('keydown', () => {
    // Make the text bold if user presses the SHIFT button and if there is something highlighted
    if (event.keyCode == 16 && window.getSelection().toString() != "") {
        document.execCommand("bold");
    }
})






//Uploaded Image preview
let fileInputs = document.getElementsByClassName("file-input");
for (let fileInput of fileInputs) {
    fileInput.addEventListener("change", function () {
        const preview = event.target.nextElementSibling;
        const file = fileInput.files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    });
}


//Image zooming window
const images = document.getElementsByClassName('zoomable');
const preview_div = document.getElementById("div-preview");
const preview_image = document.getElementById("preview-image");
for (const image of images) {
    image.addEventListener("click", () => {
        preview_image.src = event.target.src;
        preview_div.classList.remove("d-none");
    })
}
//Close the zoomed window
function closePreview(preview) {
    preview.classList.add("d-none")
}

//Delete element function
function deleteElement(button) {
    button.parentElement.parentElement.remove();
}


//Convert youtube links to enmbed link 
let videos = document.getElementsByClassName("video-input");
for (let video of videos) {
    video.addEventListener("change", () => {
        const inputValue = event.target.value;
        const iframe = event.target.nextElementSibling;
        let link;
        if (inputValue.includes("https://youtu.be/"))
            link = inputValue.replace("https://youtu.be/", "");

        if (inputValue.includes("https://www.youtube.com/watch?v="))
            link = inputValue.replace("https://www.youtube.com/watch?v=", "");

        iframe.src = "https://www.youtube.com/embed/" + link;
    });
}


//Div act like an input, placeholder for div 
let divs = document.getElementsByClassName("div-input");
for (let div of divs) {
    div.addEventListener("focus", () => {
        if (div.textContent == "Text") div.innerHTML = "";
    });

    div.addEventListener("focusout", () => {
        if (div.textContent == "") div.innerHTML = "Text";
    });
}

//Filling the hidden input with the editable div's content 
function divContentToInput(div) {
    if (div.innerHTML != "Text") {
        const input = div.nextElementSibling;
        input.value = div.innerHTML;
    }
}

//Convert 'ol' or 'ul' list content to string format devided by ';'
const lists = document.getElementsByClassName("list-input");
function listContentToInput(list) {
    const input = list.nextElementSibling;
    const list_content = list.children;

    if (list.innerHTML == "") {
        return;
    }

    for (const li of list_content) {
        if (li.textContent != "")
            input.value += li.innerHTML + ";";
    }
}

for (const file_input of fileInputs) {
    file_input.addEventListener('change', function () {
        // Get the selected file
        const input = file_input.previousElementSibling;
        // If a file is selected, update the text input with the file name
        let name = file_input.files[0].name;

        input.value = name;
    });
}




//Filling the hidden inputs before submit
document.getElementById('storeForm').onsubmit = (event) => {
    for (const div of divs)
        divContentToInput(div);
    for (const list of lists) {
        listContentToInput(list)
    }

    //giving order indicator to every name 
    //(technically the number will not be used as positin indicator 
    //bc its prevents name merging in the request bc this way the request will get
    //every data in order automaticly) 
    let all_input = document.getElementsByClassName("doc-input");
    let i = 0;
    for (const input of all_input) {
        input.name += "_" + i;
        i++;
    }
}
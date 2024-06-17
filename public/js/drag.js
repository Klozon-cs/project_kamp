function titleBigInput(content = "") {
    return `       <div class="element-container draggable gap-big">
                        <input type="text" class="title-big-input doc-input" placeholder="Title big" name="title_big" value="${content}">
                        <div class="d-flex justify-content-center align-items-center btnDelete">
                            <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                        </div>
                    </div>`;
}

function titleMediumInput(content = "") {
    return `   <div class="element-container draggable gap-medium">
                        <input type="text" class="title-medium-input doc-input m-0" placeholder="Title medium" name="title_medium" value="${content}">
                        <div class="d-flex justify-content-center align-items-center btnDelete">
                            <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                        </div>
                </div>`;
}


function textRegularInput(content = "Text") {
    return `   <div class="element-container draggable gap-small">
                        <div contenteditable="true" class="doc-input div-input" onfocus="divPlaceholderFocus(this)" onfocusout="divPlaceholderFocusout(this)">${content}</div>
                        <input type="hidden" name="text_regular" class="doc-input" >
                        <div class="btnDelete">
                            <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                        </div>
                </div>`;
}

function listUnorderedInput(contentString = "") {
    const items = contentString.split(";");
    let list = ``;

    for (const item of items)
        list += `<li>${item}</li>`;

    if (contentString == "") list = "<li></li><li></li><li></li>";

    return `<div class="element-container draggable  gap-small" >
                    <div class="w-100">
                        <ul contenteditable="true" class="list-input">
                            ${list}
                        </ul>
                        <input type="text" name="uList" class="d-none doc-input">
                    </div>
                    <div class="btnDelete">
                        <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                    </div>
            </div>`;
}

function listOrderedInput(contentString = "") {
    const items = contentString.split(";");
    let list;

    for (const item of items)
        list += `<li>${item}</li>`;

    if (contentString == "") list = "<li></li><li></li><li></li>";

    return `  <div class="element-container draggable gap-small">
                    <div class="w-100">
                        <ol contenteditable="true" class="list-input">
                            ${list}
                        </ol>
                        <input type="text" name="oList" class="d-none doc-input">
                    </div>
                    <div class="btnDelete">
                        <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                    </div>
                </div>`;
}



function youtubeVideoInput() {
    return ` 
            <div class="element-container draggable gap-medium">
                <div class="w-100 h-100">
                    <input type="text" class="doc-input video-input" placeholder="Youtube Url" name="video" value="" onchange="onchangeLinkToEmbed(this)">
                    <iframe src="" class="" frameborder="0"></iframe>
                </div>
                <div class="d-felx justify-content-center align-items-center btnDelete">
                    <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                </div>
            </div>`;
}

function imageInput(path = "") {
    return `<div class="element-container draggable gap-medium">
                <div>
                    <input type="text" name="image_name" class="d-none doc-input">
                    <input type="file" class="doc-input file-input" accept="image/*" placeholder="Youtube Url" name="images" onchange="onchangePreview(this)" >
                    <img class="w-100 zoomable" alt="" src="${path}" onclick="onclickZoomImage(this)">
                </div>
                <div class="d-felx justify-content-center align-items-center btnDelete">
                    <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                </div>
            </div>`;
}



function renderInput(type_id) {
    let render;
    switch (type_id) {
        case 1:
            render = titleBigInput();
            break;
        case 2:
            render = titleMediumInput();
            break;
        case 3:
            render = listUnorderedInput();
            break;
        case 4:
            render = listOrderedInput();
            break;
        case 5:
            render = textRegularInput();
            break;
        case 6:
            render = youtubeVideoInput();
            break;
        case 7:
            render = imageInput();
            break;
    }
    return render;
}



const sortableList = document.getElementById('storeForm');
const scroll_div = document.getElementById('scroll_div');
let list_items = sortableList.querySelectorAll(".draggable");
let type = false; //false = list item, true = option item

for (const item of list_items) {
    dragState(item, false)
}

const options = document.getElementsByClassName('option');

for (const option of options) {
    dragState(option, true)
}


let nextSibling;
let newNode;

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    // Getting all items except currently dragging and making array of them
    let siblings = [...document.querySelectorAll(".draggable:not(.dragging)")];

    // Finding the sibling after which the dragging item should be placed
    nextSibling = siblings.find(sibling => {
        // const xCondition = e.clientX <= sibling.offsetLeft + sibling.offsetWidth / 1.5;
        const yCondition = e.clientY <= sibling.offsetTop +  (sibling.offsetHeight/1.5) - Math.ceil(scroll_div.scrollTop);
        return yCondition;
        // return xCondition && yCondition;
    });

    for (const sibling of siblings) {
        sibling.classList.remove("line");
    }
    if(sortableList.lastElementChild){
        //sortableList.lastElementChild.borderBottom ='none';
    }



    if (type) {
        if (nextSibling) {
            nextSibling.classList.add("line")
        }
        const parser = new DOMParser();

    
        //SOLVING THIS FUCKER !!!!!!!!
        let string = renderInput(parseInt(draggingItem.id));
        const doc = parser.parseFromString(string, 'text/html');

        // Extract the first element
        newNode = doc.body.firstElementChild;

        dragState(newNode, false);
    } else {
        sortableList.insertBefore(draggingItem, nextSibling);
    }
}
sortableList.addEventListener("dragover", initSortableList);

sortableList.addEventListener("dragleave", () => {
    if (nextSibling) nextSibling.classList.remove("line");
});

sortableList.addEventListener("drop", () => {
    
    if (!type) {
        return;
    } 

    if (nextSibling) {
        sortableList.insertBefore(newNode, nextSibling);
        nextSibling.classList.remove("line");
    }  
});



function dragState(node, node_type) {
    node.draggable = "true";

    node.addEventListener("dragstart", () => {
        // Adding dragging class to item after a delay
        setTimeout(() => node.classList.add("dragging"), 0);
        type = node_type;
    });

    // Removing dragging class from item on dragend event
    node.addEventListener("dragend", () => {
        node.classList.remove("dragging")
        type = !node_type;
    });
}
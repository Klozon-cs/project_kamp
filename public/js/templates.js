//the elements are ordred by their id

//types by type id
// 1 => titleBig
// 2 => titleMedium
// 3 => listUnordered
// 4 => listOrdered
// 5 => textregular
// 6 => youtubeVideo
// 7 => image 



function titleBig(content) {
	return `<h1 class="title-big">${content}</h1>`;
}

function titleMedium(content) {
	return `<h3 class="title-medium">${content}</h3>`;
}

function listUnordered(contentString) {
	const items = contentString.split(";");

	let list = ``;
	for (const item of items) {
        if(item != "" && item != "<br>")
            list += `<li>${item}</li>`;
	}
	return `<ul class="content-ul">${list}</ul>`; 
}

function listOrdered(contentString) {
	const items = contentString.split(";");
	let list = ``;
	for (const item of items) {
		if(item != "" && item != "<br>")
            list += `<li>${item}</li>`;
	}
	return `<ol class="content-ol">${list}</ol>`;
}

function textRegular(content) {
	return `<p class="text-regular" >${content}</p>`;
}

function youtubeVideo(link) {
	return ` 
    <iframe class="mb-3 mt-3" width="560" height="315" src="${link}")}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

function image(name){
    return `<img class="content-img" src="/public/uploads/${name}" alt="" onclick="onclickZoomImage(this)">`
}

function navItem(id,topic,subchapters){
    let chapters = ""
    for (const chapter of subchapters) {        
        chapters +=
        `<div class="d-flex w-100">
                <a href="/documentation/${chapter.id}" class="nav-link w-100">${chapter.name}</a>
                <input type="hidden" name="${id}" value="${chapter.id}">
                <div class="d-felx justify-content-center align-items-center btnDelete">
                    <i class="fa-solid fa-xmark fs-6 cursor-pointer" onclick="deleteElement(this)"></i>
                </div>
        </div>`
    }
    let navitem = 
    `<section>
        <input type="checkbox" name="checkbox" class="toogle" id="topic-${id}">

        <label for="topic-${id}">${topic}
            <i class="fa-solid fa-angle-right"></i>
        </label>
        <div class="toogle-div">
            <form action="/create/chapter/${id}" method="post" id="topicForm_id">

            ${chapters}
            <div class="nav-link d-flex justify-content-between" id="${id}">
                <i class="fa-solid fa-plus cursor-pointer" onclick="addChapter(this)"></i>  <button type="submit" form="topicForm_id" class="btn--save">Save</button>
            </div>
            </form>
        </div>
    </section>`
    return navitem;
}

function renderContent(page_element){
    let render;
    switch (page_element.type_id) {
        case 1:
            render = titleBig(page_element.content);
            break;
        case 2:
            render = titleMedium(page_element.content);
            break;
        case 3:
            render = listUnordered(page_element.content);
            break;
        case 4:
            render = listOrdered(page_element.content);
            break;
        case 5:
            render = textRegular(page_element.content);
            break;
        case 6:
            render = youtubeVideo(page_element.content);
            break;
        case 7:
            render = image(page_element.content);
            break;
    }
    return render;
}








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
                        <div contenteditable="true" class="doc-input div-input" onfocus="divPlaceholder(this)">${content}</div>
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


function youtubeVideoInput(link = "") {
    return ` 
    <div class="element-container draggable gap-medium">
        <div class="w-100 h-100">
            <input type="text" class="doc-input video-input" placeholder="Youtube Url" name="video" value="${link}" onchange="onchangeLinkToEmbed(this)">
            <iframe src="${link}" class="" frameborder="0"></iframe>
        </div>
        <div class="d-felx justify-content-center align-items-center btnDelete">
            <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
        </div>
    </div>`;
}

function imageInput(path = "") {
    return `<div class="element-container draggable gap-medium">
                <div>
                    <input type="text" name="image_name" class="d-none doc-input" value="${path}">
                    <input type="file" class="doc-input file-input" accept="image/*" name="images" onchange="onchangePreview(this)" >
                    <img class="w-100 zoomable" alt="" src="/public/uploads/${path}" onclick="onclickZoomImage(this)">
                </div>
                <div class="d-felx justify-content-center align-items-center btnDelete">
                    <i class="fa-solid fa-xmark" onclick="deleteElement(this)"></i>
                </div>
            </div>`;
}

function renderInput(page_element){
    let render;
    switch (page_element.type_id) {
        case 1:
            render = titleBigInput(page_element.content);
            break;
        case 2:
            render = titleMediumInput(page_element.content);
            break;
        case 3:
            render = listUnorderedInput(page_element.content);
            break;
        case 4:
            render = listOrderedInput(page_element.content);
            break;
        case 5:
            render = textRegularInput(page_element.content);
            break;
        case 6:
            render = youtubeVideoInput(page_element.content);
            break;
        case 7:
            render = imageInput(page_element.content);
            break;
    }
    return render;
}



module.exports ={
    navItem,
    renderContent,
    renderInput
};

// <!-- MUlti Image Later -->
// <!-- <input type="file" class="doc-input file-input d-none" accept="image/*" placeholder="Youtube Url">
// <div class="mb-5 image-grid">
//     <img class="image-grid-item zoomable" alt="" src="/public/img/logo.png">
//     <img class="image-grid-item zoomable" alt="" src="/public/img/unnamed.jpg">
//     <img class="image-grid-item zoomable" alt="" src="/public/img/logo.png">
//     <img class="image-grid-item zoomable" alt="" src="/public/img/unnamed.jpg">
// </div> -->

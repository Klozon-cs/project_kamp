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
		list += `<li>${item}</li>`;
	}
	return `<ul class="content-ul">${list}</ul>`; 
}

function listOrdered(contentString) {
	const items = contentString.split(";");
	let list = ``;
	for (const item of items) {
		list += `<li>${item}</li>`;
	}
	return `<ol class="content-ol">${list}</ol>`;
}

function textRegular(content) {
	return `<p class="text-regular" >${content}</p>`;
}

function youtubeVideo(link) {
	return ` 
    <iframe width="560" height="315" src="${link}")}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

function image(name){
    return `<img class="content-img" src="/public/uploads/${name}" alt="">`
}

function navItem(id,topic,subchapters){
    let chapters = ""
    for (const chapter of subchapters) {        
        chapters +=`<a href="/documentation/${chapter.id}" class="nav-link">${chapter.name}</a>`
    }
    let navitem = 
    `<section>
        <input type="checkbox" name="checkbox" class="toogle" id="topic-${id}">
        <label for="topic-${id}">${topic}
            <i class="fa-solid fa-angle-right"></i>
        </label>
        <div class="toogle-div">
            ${chapters}
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































module.exports ={
    titleBig,
    titleMedium,
    listUnordered,
    listOrdered,
    textRegular,
    youtubeVideo,
    image,
    navItem,
    renderContent
};
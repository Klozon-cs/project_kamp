//the elements are ordred by their id

//types by type id
// 1 => titleBig
// 2 => titleMedium
// 3 => listUnordered
// 4 => listOrdered
// 5 => textregular
// 6 => youtubeVideo
// 7 => image 



function titleBig(id, content) {
	return `<h1 class="title-big" id="${id}">${content}</h1>`;
}

function titleMedium(id, content) {
	return `<h3 class="title-medium" id="${id}">${content}</h3>`;
}

function listUnordered(id, contentString) {
	const items = contentString.split(";");

	let list = `<ul id="${id}">`;
	for (const item of items) {
		list += `<li>${item}</li>`;
	}
	list += "</ul>";
	return list;
}

function listOrdered(id, contentString) {
	const items = contentString.split(";");
	let list = ``;
	for (const item of items) {
		list += `<li>${item}</li>`;
	}
	return `<ol class="content-ol" id="${id}">${list}</ol>` 
}

function textRegular(id, content) {
	return `<p class="text-regular" id="${id}">${content}</p>`;
}

function youtubeVideo(id, link) {
	return ` 
    <iframe id="${id}" width="560" height="315" src="${link.replace("https://youtu.be/","https://www.youtube.com/embed/")}"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

function image(id, path){
    return `<img class="content-img" src="/public/img/unnamed.jpg" alt="">`
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

function renderContent(content){
    let render;
    switch (content.type_id) {
        case 1:
            render = titleBig(content.id, content.content);
            break;
        case 2:
            render = titleMedium(content.id, content.content);
            break;
        case 3:
            render = listUnordered(content.id, content.content);
            break;
        case 4:
            render = listOrdered(content.id, content.content);
            break;
        case 5:
            render = textRegular(content.id, content.content);
            break;
        case 6:
            render = youtubeVideo(content.id, content.content);
            break;
        case 7:
            render = image(content.id, content.content);
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
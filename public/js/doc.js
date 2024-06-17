document.addEventListener("keydown", () => {
	// Make the text bold if user presses the SHIFT button and if there is something highlighted
	if (event.keyCode == 16 && window.getSelection().toString() != "") {
		document.execCommand("bold");
	}
});

//Delete element function
function deleteElement(button) {
	button.parentElement.parentElement.remove();
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------- YOUTUBE VIDEO ---------------------------------- */

//Convert youtube links to embed link
let videos = document.getElementsByClassName("video-input");
for (let video of videos) {
	onchangeLinkToEmbed(video)
}

function onchangeLinkToEmbed(element){
	
		const iframe = element.nextElementSibling;
		const link = element.value;
		console.log("in");
		if(!link){
			iframe.src = "";
			return;
		}

		if(link.includes("https://www.youtube.com/embed/")){
			iframe.src = link;
			return;
		};

		let embed;
		if (link.includes("https://youtu.be/"))
			embed = link.replace("https://youtu.be/", "");

		if (link.includes("https://www.youtube.com/watch?v="))
			embed = link.replace("https://www.youtube.com/watch?v=", "");

		iframe.src = "https://www.youtube.com/embed/" + embed;
		element.value = "https://www.youtube.com/embed/" + embed;
	
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------------- DIV -------------------------------------- */

//Placeholder for div inputs
let divs = document.getElementsByClassName("div-input");
for (let div of divs) {
	divPlaceholderFocus(div);
	divPlaceholderFocusout(div);
}
function divPlaceholderFocus(div){

		if (div.textContent == "Text") event.target.innerHTML = "";
}

function divPlaceholderFocusout(div){
	if (div.textContent == "") event.target.innerHTML = "Text";
}
//Filling the hidden input with the editable div's content
function divContentToInput(div) {
	//Checking if there any content in the div or just the placeholder
	if (div.innerHTML != "Text") {
		const input = div.nextElementSibling;
		input.value = div.innerHTML;
	}
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------------- Ol, Ul list ------------------------------------ */

//Convert 'ol' or 'ul' list content to string format devided by ';'
function listContentToInput(list) {
	const input = list.nextElementSibling;
	const list_content = list.children;

	if (list.innerHTML == "") {
		return;
	}

	for (const li of list_content) {
		if(li.innerHTML != ""){
			console.log(li);
			//deviding with ';'
			input.value += li.innerHTML.replace('&nbsp;', ' ') + ";";}
	}
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------------- IMAGE ------------------------------------ */

//Image zooming window
const images = document.getElementsByClassName("zoomable");
const zoom_div = document.getElementById("div-preview");
const zoom_image = document.getElementById("preview-image");


function onclickZoomImage(image){
		zoom_image.src =image.src;
		zoom_div.classList.remove("d-none");
}

//Close the zoomed window
function closePreview(preview) {
	preview.classList.add("d-none");
}

// ----------- Uploaded Image preview -----------
// ----------- Fill image_name input------------
const fileInputs = document.getElementsByClassName("file-input");
for (let fileInput of fileInputs) {
	onchangePreview(fileInput)
}

function onchangePreview(fileInput){

		const hiddenInput = fileInput.previousElementSibling;
		const imagePreview = fileInput.nextElementSibling;
		const file = fileInput.files[0];

		let reader = new FileReader();

		reader.onloadend = function () {
			imagePreview.src = reader.result;
		};

		if (file) {
			//if there is a file then reads the data and load in the imagePreview in the reader.onloadend

			//making unique file names with to the selected file dateTime
			//(2024.06.15 13:09 -> 2024_06_15_13_09)
			const timeStamp = new Date().toJSON().slice(0, 16).replace(/[-T:]/g, "_");
			const newFileName = timeStamp + "_" +convertSpecialCharacters(fileInput.files[0].name);

			fileInput.files = renameFile(file, newFileName);

			//fill the hidden input with the files name (need it bc this will be saved to the database)
			hiddenInput.value = newFileName;
			reader.readAsDataURL(file);

		}
}

function renameFile(file, newFileName) {
	//copy the selected file and make a new file with the new timeStamped name
	const newFile = new File([file], newFileName, {
		type: file.type,
		lastModified: file.lastModified,
	});

	// Replace the old file with the new file in the input
	const dataTransfer = new DataTransfer();
	dataTransfer.items.add(newFile);
	return dataTransfer.files;
}

function convertSpecialCharacters(originalName) {
	return originalName.normalize("NFKD").replace(/[\u0300-\u036F]/g, "").replace(' ', '_');
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------------- FORM ------------------------------------- */

//Filling the hidden inputs before submit
document.getElementById("storeForm").onsubmit = (event) => {
	divs = document.getElementsByClassName("div-input");
	for (const div of divs){
		divContentToInput(div);
	}
	const lists = document.getElementsByClassName("list-input");
	for (const list of lists) {
		listContentToInput(list);
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
};

/* -------------------------------------------------------------------------------- */

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
		event.target.value = "https://www.youtube.com/embed/" + link;
	});
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------------- DIV -------------------------------------- */

//Placeholder for div inputs
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
const lists = document.getElementsByClassName("list-input");
function listContentToInput(list) {
	const input = list.nextElementSibling;
	const list_content = list.children;

	if (list.innerHTML == "") {
		return;
	}

	for (const li of list_content) {
		if (li.textContent != "")
			//deviding with ';'
			input.value += li.innerHTML + ";";
	}
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------------- IMAGE ------------------------------------ */

//Image zooming window
const images = document.getElementsByClassName("zoomable");
const preview_div = document.getElementById("div-preview");
const preview_image = document.getElementById("preview-image");
for (const image of images) {
	image.addEventListener("click", () => {
		preview_image.src = event.target.src;
		preview_div.classList.remove("d-none");
	});
}

//Close the zoomed window
function closePreview(preview) {
	preview.classList.add("d-none");
}

// ----------- Uploaded Image preview -----------
// ----------- Fill image_name input------------
const fileInputs = document.getElementsByClassName("file-input");
for (let fileInput of fileInputs) {
	fileInput.addEventListener("change", function () {
		const hiddenInput = fileInput.previousElementSibling;
		const imagePreview = event.target.nextElementSibling;
		const file = fileInput.files[0];

		let reader = new FileReader();

		reader.onloadend = function () {
			imagePreview.src = reader.result;
		};

		if (file) {
			//if there is a file then reads the data and load in the imagePreview in the reader.onloadend
			reader.readAsDataURL(file);

			//making unique file names with to the selected file dateTime
			//(2024.06.15 13:09 -> 2024_06_15_13_09)
			const timeStamp = new Date().toJSON().slice(0, 16).replace(/[-T:]/g, "_");
			const newFileName =
				timeStamp + "_" + convertSpecialCharacters(fileInput.files[0].name);

			fileInput.files = renameFile(file, newFileName);

			//fill the hidden input with the files name (need it bc this will be saved to the database)
			hiddenInput.value = newFileName;
		} else {
			imagePreview.src = "";
		}
	});
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
	return originalName.normalize("NFKD").replace(/[\u0300-\u036F]/g, "");
}

/* -------------------------------------------------------------------------------- */
//
//
/* ------------------------------------- FORM ------------------------------------- */

//Filling the hidden inputs before submit
document.getElementById("storeForm").onsubmit = (event) => {
	for (const div of divs) divContentToInput(div);
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

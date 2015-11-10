function dropdownNote(){
	if(document.getElementById('dropdownNotes').className=="dropdown"){
		document.getElementById('dropdownNotes').className = "dropdown open";
	}
	else if(document.getElementById('dropdownNotes').className=="dropdown open"){
		document.getElementById('dropdownNotes').className = "dropdown";
	}
}

function dropdownSetting(){
	if(document.getElementById('dropdownSettings').className=="dropdown"){
		document.getElementById('dropdownSettings').className = "dropdown open";
	}
	else if(document.getElementById('dropdownSettings').className=="dropdown open"){
		document.getElementById('dropdownSettings').className = "dropdown";
	}
}
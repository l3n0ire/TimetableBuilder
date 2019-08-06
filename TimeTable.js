var columnSize=2;

var colors =["bg-primary","bg-success","bg-danger","bg-warning","bg-info"];
var colorIndex=0;

var buttonId="";
var startIndex=0;
var endIndex=1;
var courseCode=document.getElementById("courseCode").value;
var location1=document.getElementById("location").value;
var dayIndex=0;
var formBody;

var isEdit=false;

(function(){
	resize();
	showPrint=true;

})();

// fix this later
function resize(){
	var addCourse = document.getElementById("addCourse");
	var timeTable = document.getElementById("timeTable");
	var addCourseWidth= addCourse.offsetWidth;
	var timeTableWidth = timeTable.offsetWidth;
	//alert(addCourseWidth);

	var min = 120;
	var max = 200;
	
	if(columnSize<2){
		columnSize=2;
	}
	if(addCourseWidth<min){
		while(addCourseWidth<min && columnSize<5){

		columnSize++;
		addCourse.className="col-"+(columnSize)+" bg-dark";
		timeTable.className="col-"+(12-columnSize);
		addCourseWidth= addCourse.offsetWidth;
		}

	}
	else if(addCourseWidth>max && columnSize>=3){
		columnSize--;
	
	}
	addCourse.className="col-"+(columnSize)+" bg-dark";
	timeTable.className="col-"+(12-columnSize);
	
}


function isSame(){
	//alert("this works");
	var end2 =document.getElementById("end");
	var endIndex2 = end2.selectedIndex;

	
	var day2 =document.getElementById("day");
 	var dayIndex2 = day2.selectedIndex;

	var start2 =document.getElementById("start");
	var startIndex2 = start2.selectedIndex;


 	var courseCode2 = document.getElementById("courseCode").value;
	var location2 = document.getElementById("location").value;

	if(endIndex2==endIndex && dayIndex2==dayIndex && startIndex2== startIndex && courseCode2==courseCode && location2==location1){
		return true;
	}
	else{



		return false;
	}

}

function updateStuff(){
	end =document.getElementById("end");
	endIndex = end.selectedIndex;
	
	dayIndex = document.getElementById("day").selectedIndex;
 	 
	startIndex =document.getElementById("start").selectedIndex;
	
 	courseCode = document.getElementById("courseCode").value;
	location1 = document.getElementById("location").value;
}


/*
DOM options
element properties
selectedIndex
options

options object has property
text
or you can use the property
value
*/
function addCourse(){

	
	if(!isSame()){

		if(isEdit){
		removeCourse();
		}
	end =document.getElementById("end");
	endOptions =end.options;
	
	var day =document.getElementById("day");
 	dayIndex = day.selectedIndex;
	var dayOptions =day.options;

	var start =document.getElementById("start");
	startIndex = start.selectedIndex;
	var startOptions =start.options;

	endIndex = end.selectedIndex;

 	courseCode = document.getElementById("courseCode").value;
	location1 = document.getElementById("location").value;

	



	var id="";
	endIndex=endIndex-1;
	for(var i=startIndex;i<=endIndex;i++){
		id= String(dayIndex)+String(i);
		document.getElementById(id).className=colors[colorIndex];
		
	}
	//change color
	if(colorIndex<colors.length-1)
			colorIndex=colorIndex+1;
		else
			colorIndex=0;

	id=String(dayIndex)+String(startIndex);
	

	document.getElementById(id).innerHTML = "<span id='courseCodeText'></span>"+"<span style='float:right;'> <button type='button' id='temp' class=' btn fas fa-pencil-alt' data-toggle='modal' data-target='#editCourse' onclick='edit(this,true)' style='background-color:transparent;color:white;'></button><button type='button' id='temp2' class='btn fas fa-trash-alt' data-toggle='modal' data-target='#confirm' onclick='edit(this,false)' style='background-color:transparent;color:white;'></button></span>"
	+"<br>"+"<span id='locationText'></span>"+"<br>"+"<span id='startEndTimeText'></span>";
	document.getElementById("temp").id = String(dayIndex) + String(startIndex);
	document.getElementById("temp2").id = String(dayIndex) + String(startIndex);


	document.getElementById("courseCodeText").innerHTML = courseCode;
	document.getElementById("courseCodeText").id = "cct"+String(dayIndex) + String(startIndex);

	document.getElementById("locationText").innerHTML = location1;
	document.getElementById("locationText").id = "lt"+String(dayIndex) + String(startIndex);

	document.getElementById("startEndTimeText").innerHTML = startOptions[startIndex].value+" - "+endOptions[endIndex+1].value;
	document.getElementById("startEndTimeText").value=String(startIndex)+String(endIndex+1);
	document.getElementById("startEndTimeText").id = "sett"+String(dayIndex) + String(startIndex);

}



}
function addCourseText(){
			document.getElementById("modalTitle").innerHTML="Add a Course";
			updateStuff();
}

function edit(button,isEdit2){
	isEdit=isEdit2;

	if(isEdit){
		document.getElementById("modalTitle").innerHTML="Edit Course";
		formBody =document.getElementById("formBody");
		isEdit=false;

 
	}


	buttonId = button.id;
	courseCode = document.getElementById("cct"+buttonId);
	location1 = document.getElementById("lt"+buttonId);
	startEndTime = document.getElementById("sett"+buttonId);

	startIndex=startEndTime.value.substring(0,1);
	endIndex = startEndTime.value.substring(1,2);
	dayIndex=buttonId.substring(0,1);
	endIndex= endIndex-1;

	// update text field and selections
	document.getElementById("courseCode").value=courseCode.innerHTML;
	document.getElementById("location").value=location1.innerHTML;
	document.getElementById("day").selectedIndex=dayIndex;
	document.getElementById("start").selectedIndex=startIndex;
	document.getElementById("end").selectedIndex=endIndex+1;

	updateStuff();


	


}
function removeCourse(){
	// reset the colors of the cells
	var id="";
	for(var i=startIndex;i<=endIndex;i++){
		id= String(dayIndex)+String(i);
		document.getElementById(id).className="";
	}
	// remove all elements from course block
	document.getElementById(buttonId).innerHTML="<br><br>";

	isEdit=false;

}
function resetOptions(){
	for(var i=0;i<endOptions.length;i++){
		endOptions[i].disabled=false;
	}
}

function setEnd(startIndex){
	end =document.getElementById("end");
	endOptions =end.options;
	resetOptions();
	var end =document.getElementById("end");
	var endIndex = end.selectedIndex;
	for(var i=0;i<=startIndex;i++){
		end.options[i].disabled=true;
	}
	end.selectedIndex=startIndex+1;

}
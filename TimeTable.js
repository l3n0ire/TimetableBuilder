var columnSize=2;

var colors =["bg-primary","bg-success","bg-danger","bg-warning","bg-info"];
var colorIndex=0;

var buttonId="";
var startIndex="";
var endIndex="";
var courseCode="";
var location1="";

var isEdit=false;

/*(function(){
	resize();

})();*/

// fix this later
function resize(){
	var addCourse = document.getElementById("addCourse");
	var timeTable = document.getElementById("timeTable");
	var addCourseWidth= addCourse.offsetWidth;
	var timeTableWidth = timeTable.offsetWidth;
	//alert(addCourseWidth);

	var min = 180;
	var max = 300;
	
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

	if(isEdit){
		removeCourse();
		isEdit=false;
	}

	end =document.getElementById("end");
	endOptions =end.options;
	
	var day =document.getElementById("day");
	var dayIndex = day.selectedIndex;
	var dayOptions =day.options;

	var start =document.getElementById("start");
	startIndex = start.selectedIndex;
	var startOptions =start.options;

	endIndex = end.selectedIndex;

 	courseCode = document.getElementById("courseCode");
	location1 = document.getElementById("location");


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
	

	document.getElementById(id).innerHTML = "<span id='courseCodeText'></span>"+"<button type='button' id='temp' class=' btn fas fa-pencil-alt' data-toggle='modal' data-target='#editCourse' onclick='edit(this,true)' style='background-color:transparent;color:white;'></button>"
	+"<br>"+"<span id='locationText'></span>"+ "<button type='button' id='temp2' class='btn fas fa-trash-alt' data-toggle='modal' data-target='#confirm' onclick='edit(this,false)' style='background-color:transparent;color:white;'></button>"+"<br>"+"<span id='startEndTimeText'></span>";
	document.getElementById("temp").id = String(dayIndex) + String(startIndex);
	document.getElementById("temp2").id = String(dayIndex) + String(startIndex);


	document.getElementById("courseCodeText").innerHTML = courseCode.value;
	document.getElementById("courseCodeText").id = "cct"+String(dayIndex) + String(startIndex);

	document.getElementById("locationText").innerHTML = location1.value;
	document.getElementById("locationText").id = "lt"+String(dayIndex) + String(startIndex);

	document.getElementById("startEndTimeText").innerHTML = startOptions[startIndex].value+" - "+endOptions[endIndex+1].value;
	document.getElementById("startEndTimeText").value=String(startIndex)+String(endIndex+1);
	document.getElementById("startEndTimeText").id = "sett"+String(dayIndex) + String(startIndex);





}

function edit(button,isEdit2){
	isEdit=isEdit2;

	buttonId = button.id;
	courseCode = document.getElementById("cct"+buttonId);
	location1 = document.getElementById("lt"+buttonId);
	startEndTime = document.getElementById("sett"+buttonId);

	//alert(buttonId+"\n"+courseCode.innerHTML+"\n"+location1.innerHTML+"\n"+startEndTime.value);

	startIndex=startEndTime.value.substring(0,1);
	endIndex = startEndTime.value.substring(1,2);
	dayIndex=buttonId.substring(0,1);
	endIndex= endIndex-1;


	


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
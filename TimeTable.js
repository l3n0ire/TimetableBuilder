var columnSize=2;
var end =document.getElementById("end");
var endOptions =end.options;
var colors =["bg-primary","bg-success","bg-danger","bg-warning","bg-info"];
var colorIndex=0;
(function(){
	resize();

})();

// fix this later
function resize(){
	var addCourse = document.getElementById("addCourse");
	var timeTable = document.getElementById("timeTable");
	var addCourseWidth= addCourse.offsetWidth;
	var timeTableWidth = timeTable.offsetWidth;
	//alert(addCourseWidth);

	var min = 230;
	var max = 300;
	
	if(columnSize<2){
		columnSize=2;
	}
	if(addCourseWidth<min){
		while(addCourseWidth<min){

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
	var day =document.getElementById("day");
	var dayIndex = day.selectedIndex;
	var dayOptions =day.options;

	var start =document.getElementById("start");
	var startIndex = start.selectedIndex;
	var startOptions =start.options;

	var endIndex = end.selectedIndex;

	var courseCode = document.getElementById("courseCode");
	var location = document.getElementById("location");


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
	//"<i class='fas fa-pencil-alt'></i>"
	document.getElementById(id).innerHTML = courseCode.value+"<br>"+location.value+"<br>"
	+startOptions[startIndex].value+" - "+endOptions[endIndex+1].value;



}
function resetOptions(){
	for(var i=0;i<endOptions.length;i++){
		endOptions[i].disabled=false;
	}
}

function setEnd(startIndex){
	resetOptions();
	var end =document.getElementById("end");
	var endIndex = end.selectedIndex;
	for(var i=0;i<=startIndex;i++){
		end.options[i].disabled=true;
	}
	end.selectedIndex=startIndex+1;

}
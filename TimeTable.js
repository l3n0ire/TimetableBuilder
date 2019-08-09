var columnSize=2;

var colors =["bg-primary","bg-success","bg-danger","bg-warning","bg-info"];
var colorIndex=0;

var buttonId="";
var startIndex=0;
var endIndex=1;
var courseCode=$("#courseCode").val();
var location1=$("#location").val();
var dayIndex=0;
var formBody;

var isEdit=false;

(function(){
	resize();

})();

// fix this later
function resize(){
	var addCourseWidth = $("#addCourse").prop("offsetWidth");
	var timeTableWidth = $("#timeTable").prop("offsetWidth");
	//alert(addCourseWidth);
	var min = 100;
	var max = 200;
	
	if(columnSize<2){
		columnSize=2;
	}
	if(addCourseWidth<min){
				//alert(addCourseWidth);
				//alert(columnSize);
		while(addCourseWidth<min && columnSize<5){

		columnSize++;
		$("#addCourse").removeClass();
		$("#addCourse").addClass("col-"+(columnSize)+" bg-dark");
		$("#timeTable").removeClass();
		$("#timeTable").addClass("col-"+(12-columnSize));
		addCourseWidth= $("#addCourse").prop("offsetWidth");

		}

	}
	else if(addCourseWidth>max && columnSize>=3){
		columnSize--;
	
	}
	$("#addCourse").removeClass();
	$("#addCourse").addClass("col-"+(columnSize)+" bg-dark");
	$("#timeTable").removeClass();
	$("#timeTable").addClass("col-"+(12-columnSize));
	
}


function isSame(){
	
	var endIndex2 = $("#end").prop("selectedIndex");

	
 	var dayIndex2 = $("#day").prop("selectedIndex");

	var startIndex2 = $("#start").prop("selectedIndex");

 	var courseCode2 = $("#courseCode").val();
	var location2 = $("#location").val();


	if(endIndex2==endIndex && dayIndex2==dayIndex && startIndex2== startIndex && courseCode2==courseCode && location2==location1){
		return true;
	}
	else{


		return false;
	}

}

function updateStuff(){
	end = document.getElementById("end");
	endIndex = end.selectedIndex;
	
	dayIndex = document.getElementById("day").selectedIndex;
 	 
	startIndex =document.getElementById("start").selectedIndex;
	
 	courseCode = $("#courseCode").val();
	location1 = $("#location").val();
}



$("form").on('submit', function (e) {
	//stop form submission
   e.preventDefault();
   addCourse();
   $("#editCourse").modal('hide');
   
});
/*
DOM options
element properties
selectedIndex
options

options object has property
text
or you can use the property
val()
*/
function addCourse(){
	
	
	if(!isSame()){

		if(isEdit){
		removeCourse();
		colorIndex =  colorIndex - 1;

		}
	end = document.getElementById("end");
	endOptions =end.options;
	
	var day = document.getElementById("day");
 	dayIndex = day.selectedIndex;
	var dayOptions =day.options;

	var start = document.getElementById("start");
	startIndex = start.selectedIndex;
	var startOptions =start.options;

	endIndex = end.selectedIndex;

 	courseCode = $("#courseCode").val();
	location1 = $("#location").val();

	



	var id="";
	endIndex=endIndex-1;
	for(var i=startIndex;i<=endIndex;i++){
		id= String(dayIndex)+String(i);
		$("#"+id).addClass(colors[colorIndex]);
		
	}
	//change color
	if(colorIndex<colors.length-1)
			colorIndex=colorIndex+1;
		else
			colorIndex=0;

	id=String(dayIndex)+String(startIndex);
	

	$("#"+id).html("<span id='courseCodeText'></span>"+"<span style='float:right;'> <button type='button' id='temp' class=' btn fas fa-pencil-alt' data-toggle='modal' data-target='#editCourse' onclick='edit(this,true)' style='background-color:transparent;color:white;'></button><button type='button' id='temp2' class='btn fas fa-trash-alt' data-toggle='modal' data-target='#confirm' onclick='edit(this,false)' style='background-color:transparent;color:white;'></button></span>"
	+"<br>"+"<span id='locationText'></span>"+"<br>"+"<span id='startEndTimeText'></span>");
	$("#temp").attr("id", String(dayIndex) + String(startIndex));
	$("#temp2").attr("id", String(dayIndex) + String(startIndex));


	$("#courseCodeText").html(courseCode);
	$("#courseCodeText").attr("id","cct"+String(dayIndex) + String(startIndex));

	$("#locationText").html(location1);
	$("#locationText").attr("id","lt"+String(dayIndex) + String(startIndex));

	$("#startEndTimeText").html(startOptions[startIndex].value+" - "+endOptions[endIndex+1].value);
	$("#startEndTimeText").val(String(startIndex)+String(endIndex+1));
	$("#startEndTimeText").attr("id" , "sett"+String(dayIndex) + String(startIndex));

}
isEdit=false;

}



function resetForm(){

	$("#start").prop("selectedIndex",0);
	$("#end").prop("selectedIndex",1);
	$("#day").prop("selectedIndex",0);
	$("#courseCode").val("");
	$("#location").val("");

}
function addCourseText(){
			$("#modalTitle").html("Add a Course");
			updateStuff();
			resetForm();
			isEdit=false;
}

function edit(button,isEdit2){

	isEdit=isEdit2;

	if(isEdit){
		$("#modalTitle").html("Edit Course");
		formBody = $("#formBody");

 
	}


	buttonId = button.id;
	courseCode = $("#cct"+buttonId);
	location1 = $("#lt"+buttonId);
	startEndTime = $("#sett"+buttonId);

	startIndex=startEndTime.val().substring(0,1);
	endIndex = startEndTime.val().substring(1,2);
	dayIndex=buttonId.substring(0,1);
	endIndex= endIndex-1;

	// update text field and selections
	$("#courseCode").val(courseCode.html());
	$("#location").val(location1.html());
	$("#day").prop("selectedIndex",dayIndex);
	$("#start").prop("selectedIndex",startIndex);
	$("#end").prop("selectedIndex",endIndex+1);

	updateStuff();
}
function removeCourse(){
	// reset the colors of the cells
	var id="";
	for(var i=startIndex;i<=endIndex;i++){
		id= String(dayIndex)+String(i);
		$("#"+id).removeClass();
	}
	// remove all elements from course block
	$("#"+buttonId).html("<br><br>");

	isEdit=false;

}
function resetOptions(){
	for(var i=0;i<endOptions.length;i++){
		endOptions[i].disabled=false;
	}
}

function setEnd(startIndex){
	var end =document.getElementById("end");

	endOptions =end.options;
	resetOptions();
	var endIndex = end.selectedIndex;
	for(var i=0;i<=startIndex;i++){
		end.options[i].disabled=true;
	}
	end.selectedIndex=startIndex+1;

}
var columnSize=2;

var colours =["bg-primary","bg-success","bg-danger","bg-warning","bg-info","darkOrange","blueViolet","hotPink","limeGreen","cornflowerBlue"];
var colourIndex=0;

var buttonId="";
var startIndex=0;
var endIndex=1;
var courseCode=$("#courseCode").val();
var location1=$("#location").val();
var dayIndex=0;
var currentButton;

var isEdit=false;

(function(){
	resize();

})();

function resize(){
	var addCourseWidth = $("#addCourse").prop("offsetWidth");
	var timeTableWidth = $("#timeTable").prop("offsetWidth");
	var min = 100;
	var max = 200;
	
	if(columnSize<2){
		columnSize=2;
	}
	if(addCourseWidth<min){
		
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

	var colourIndex2 = $("#colourPicker").prop("selectedIndex");



	if(endIndex2==endIndex && dayIndex2==dayIndex && startIndex2== startIndex && colourIndex2==colourIndex && courseCode2==courseCode && location2==location1){
		return true;
	}
	else{


		return false;
	}

}

function isConflict(){
	var endIndex2 = $("#end").prop("selectedIndex");
	endIndex2 = endIndex2 -1;

	
 	var dayIndex2 = $("#day").prop("selectedIndex");

	var startIndex2 = $("#start").prop("selectedIndex");

	var conflict=false;

	var i = startIndex2;

	id= String(dayIndex2)+String(i);
	while(i<=endIndex2 && $("#"+id).attr("class") == null){
		id= String(dayIndex2)+String(i);
		i++;	
	}
	conflict =  $("#"+id).attr("class") != null;
	return conflict;
}

function updateStuff(){
	end = document.getElementById("end");
	endIndex =  $("#end").prop("selectedIndex");
	
	dayIndex = $("#day").prop("selectedIndex");

 	 
	startIndex = $("#start").prop("selectedIndex");

	
 	courseCode = $("#courseCode").val();
	location1 = $("#location").val();

}

function antiUpdateStuff(){
	end = document.getElementById("end");
	startIndex=0;
	endIndex=1;
	courseCode="";
	location1="";
	dayIndex=0;


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

		}
		
	if(!isConflict()){


	
 	dayIndex = $("#day").prop("selectedIndex");

	startIndex = $("#start").prop("selectedIndex");

	endIndex = $("#end").prop("selectedIndex");

 	courseCode = $("#courseCode").val();
	location1 = $("#location").val();

	colourIndex = $("#colourPicker").prop("selectedIndex");

	antiRemoveCourse();

	



	
}
else if( isConflict()){
	$("#ttConflict").modal("show");
	if(isEdit){
		antiRemoveCourse();
	}
}

}

isEdit=false;

}



function resetForm(){

	$("#start").prop("selectedIndex",0);
	$("#end").prop("selectedIndex",1);
	$("#day").prop("selectedIndex",0);
	$("#colourPicker").prop("selectedIndex",colourIndex);
	$("#courseCode").val("");
	$("#location").val("");
	resetOptions();
}
function addCourseText(){
			$("#modalTitle").html("Add Course");
			antiUpdateStuff();
			resetForm();
			isEdit=false;
}

function edit(button,isEdit2){

	isEdit=isEdit2;

	if(isEdit){
		$("#modalTitle").html("Edit Course");

 
	}


	buttonId = button.id;
	courseCode = $("#cct"+buttonId);
	location1 = $("#lt"+buttonId);
	startEndTime = $("#sett"+buttonId);

	startIndex=startEndTime.attr("startIndex");
	endIndex = startEndTime.attr("endIndex");
	dayIndex=buttonId.substring(0,1);



		endIndex= endIndex-1;
	colourIndex = parseInt($("#"+button.id).attr("colour"));


	// update text field and selections
	$("#courseCode").val(courseCode.html());
	$("#location").val(location1.html());
	$("#day").attr("selectedIndex",dayIndex);
	$("#start").attr("selectedIndex",startIndex);
	$("#end").attr("selectedIndex",endIndex);
	$("#colourPicker").attr("selectedIndex",colourIndex);

}
function removeCourse(){
	var id=String(dayIndex)+String(startIndex);
	$("#"+id).attr("class",null);
	$("#"+id).attr("rowspan",1);
	$("#"+id).html("<br><br>");
	var counter=0;

	//alert(parseInt(startIndex)+1+"\n"+parseInt(endIndex));
	for(var i = parseInt(startIndex)+1;i<=parseInt(endIndex);i++){

		var dayIndex2=dayIndex;
		if(dayIndex>0)
			dayIndex2 = dayIndex -1;
		var id1= String(dayIndex2)+String(i);
		while($("#"+id1).length <=0 && dayIndex-1>=0){
			dayIndex2 = dayIndex2-1;
			id1 = String(dayIndex2)+String(i);
		}
		if(endIndex-startIndex>1){
		if(dayIndex-1<0){
			$("#tr"+i).after("<td id='temptd'></td>");
		}
		else{
			$("#"+id1).after("<td id='temptd'></td>");

		}
			
		$("#temptd").html("<br><br>");
		$("#temptd").attr("id",String(dayIndex)+String(i));
	}
	}
//alert(counter);



}
function fixTable(){
	
	for(var i = startIndex+1;i<endIndex;i++){
		var id1= String(dayIndex)+String(i);
		$("#"+id1).remove();
		
	}

}

function antiRemoveCourse(){

	end = document.getElementById("end");
	endOptions =end.options;
	
	var day = document.getElementById("day");
	var dayOptions =day.options;

	var start = document.getElementById("start");
	var startOptions =start.options;

	
	var id= String(dayIndex)+String(startIndex);
	$("#"+id).attr("colour",String(colourIndex));
	$("#"+id).addClass(colours[colourIndex]);
	$("#"+id).attr("rowspan",(endIndex-startIndex));

	fixTable();
		
		//change colour
	if(colourIndex<colours.length-1)
			colourIndex=colourIndex+1;
		else
			colourIndex=0;

	id=String(dayIndex)+String(startIndex);
	

	$("#"+id).html("<span id='courseCodeText'></span>"+"<span style='float:right;'> <button type='button' id='temp' class=' btn fas fa-pencil-alt noprint' data-toggle='modal' data-target='#editCourse' onclick='edit(this,true)' style='background-color:transparent;color:white;'></button><button type='button' id='temp2' class='btn fas fa-trash-alt noprint' data-toggle='modal' data-target='#confirm' onclick='edit(this,false)' style='background-color:transparent;color:white;'></button></span>"
	+"<br>"+"<span id='locationText'></span>"+"<br>"+"<span id='startEndTimeText'></span>");
	
	$("#temp").attr("id", String(dayIndex) + String(startIndex));
	$("#temp2").attr("id", String(dayIndex) + String(startIndex));


	$("#courseCodeText").html(courseCode);
	$("#courseCodeText").attr("id","cct"+String(dayIndex) + String(startIndex));

	$("#locationText").html(location1);
	$("#locationText").attr("id","lt"+String(dayIndex) + String(startIndex));

	$("#startEndTimeText").html(startOptions[startIndex].value+" - "+endOptions[endIndex].value);
	$("#startEndTimeText").attr("startIndex" , startIndex);
	$("#startEndTimeText").attr("endIndex" , endIndex);
	$("#startEndTimeText").attr("id","sett"+String(dayIndex) + String(startIndex));




}

function resetOptions(){
	var end =document.getElementById("end");
	endOptions =end.options;

	for(var i=1;i<endOptions.length;i++){
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
function printTT()
{
	//$("#addCourse").remove();
	window.print();
}
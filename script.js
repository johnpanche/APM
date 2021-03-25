//NO incluir tildes...

$(document).ready(function(){
	$('ul.tabs li a:first').addClass('active');
	$('.secciones article').hide();
	$('.secciones article:first').show();

	$('ul.tabs li a').click(function(){
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.secciones article').hide();

		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
	});
});

//////////////////////////////////////////////////////////////////
var spreadsheetUrl = "https://spreadsheets.google.com/feeds/cells/14T8fkqHfXfm6zdgJo2Cw6MiXtTU8IeRg8yZCYGDWY5M/1/public/values?alt=json-in-script&callback=doData";
var results = [];
     $.ajax({
    	  url: spreadsheetUrl,
    	  jsonp: 'doData',
    	  dataType: 'jsonp'
     });
function doData(data) {
	var entries = data.feed.entry;
    	var previousRow = 0;
    	for (var i = 0; i < entries.length; i++) {
        	var latestRow = results[results.length - 1];
	        var cell = entries[i];
	        var text = cell.content.$t;
	        var row = cell.gs$cell.row;
	        if (row > previousRow) {
            		var newRow = [];
		        newRow.push(text);
	                results.push(newRow);
			previousRow++;
        	} else {
            		latestRow.push(text);
        	}
	}
	//////////////////////////////////////////////////////////////
	for(var option in results){
		var repeat = false;
		var newOption = document.createElement("option");
		newOption.value=results[option].slice(0,1);
		newOption.innerHTML = results[option].slice(0,1);
		for(i=1;i<document.getElementById('l1').options.length;i++){
			if(document.getElementById('l1').options[i].text==newOption.innerText){
				repeat=true;
			}
		}
		if(!repeat){
			document.getElementById('l1').options.add(newOption);
		}
	}
	//////////////////////////////////////////////////////////////
}
//////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
	var option1 = document.getElementById('l1');
	var option2 = document.getElementById('l2');
	var out1 = document.getElementById('what');
	var out2 = document.getElementById('how');
    	option1.addEventListener("change", function(){
  		option2.innerHTML = "";
  		out1.value = "";
		out2.value = "";
		for(var option in results){
			if(option1.value == results[option].slice(0,1)){
				var newOption = document.createElement("option");
				newOption.innerHTML = results[option].slice(1,2);
				option2.options.add(newOption);
			}
		}	
	});
});

document.addEventListener('DOMContentLoaded', function () {
	var option2 = document.getElementById('l2');
	var out1 = document.getElementById('what');
	var out2 = document.getElementById('how');
    	option2.addEventListener("change", function(){
		for(var option in results){
			if(option2.value == results[option].slice(1,2)){
				out1.value=results[option].slice(2,3);
				out2.value=results[option].slice(3,4);
			}
		}
	});
});
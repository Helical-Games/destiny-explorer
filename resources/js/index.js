function setup(){
	//fix for typeahead
	$.fn.typeahead.Constructor.prototype.blur = function() {
	    var that = this;
	    setTimeout(function () { that.hide() }, 250);
	};
}

function getUrlParameter(variable)
{
       var query = window.location.hash.substring(1);
       var vars = query.split("&");
       vars = vars[0].split("?");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function clearUrlParamters()
{
    window.location.hash = "";
}

function navigateTo(path, target){
	
	if(target){
		window.open(path, target);
	}else{
		window.location.href = path;
	}
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerHTML);
    var footer = document.getElementsByClassName("pageFooter")[0];

    if(footer){
    	footer.classList.add("droppable");
    	footer.childNodes[1].innerHTML = "Add Page";
    }
}

function dragEnded(event){
	var footer = document.getElementsByClassName("pageFooter")[0];

    if(footer){
      footer.classList.remove("droppable");
      footer.childNodes[1].innerHTML = "Page 1";
    }
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}
(function(jQuery, undefined){
/*@cc_on _d=document;eval('var document=_d')@*/

var getAbsoluteRect = function(node){
	var	rect = node.getBoundingClientRect(),
		scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft,
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

	return {
		left : rect.left + scrollLeft,
		top : rect.top + scrollTop,
		right : rect.right + scrollLeft,
		bottom : rect.bottom + scrollTop
	};
};

var FORM_HTML = '<form id="filterable" style="width:1px; height:1px; position:absolute; top:0px; left:0px; border:0px; margin:0px; padding:0px;"> </form>';
var addForm = function(){
	var $form = $('#filterable');
	if (!$form[0]){
		$('body').append(FORM_HTML);
	}
}

var FILTER_HTML = '<div class="ft_filter ft_filter_off"> </div>';
var addFilterButton = function($cell){
	addForm();
	var cell = $cell.get(0);
	var rect = getAbsoluteRect(cell);
	var $btn = $(FILTER_HTML);
	$btn.css('left', rect.right - $btn.width())
		.css('top', rect.bottom - $btn.height());
	$('#filterable').append($btn);
};

var POP_HTML = '<div class="ft_pop"></div>';
var addPop = function($cell){
	var cell = $cell.get(0);
	var $pop = $(POP_HTML);
	var	rect = getAbsoluteRect(cell);
	var width = $pop.width();
	alert(width);
	var	left = rect.right - width,
		top = rect.bottom;
	if (left < 0){
		left = 0;
	}

	$pop.css('left', left )
		.css('top', top);
	$('#filterable').append($pop);
}

var setOptions = function($pop, options){
	if (options.sort){
		setSort($pop);
	}
	if (opsions.filter){
		setFilter($pop);
	}
};



var filterable = function(){

};

window.addFilterButton = addFilterButton;
window.addPop = addPop;

})(jQuery);
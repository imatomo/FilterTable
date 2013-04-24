(function(global, jQuery, undefined){
var	DATA_NS = 'data-ft-',
	WRAP_HTML = '<div class="tcom-wrap" style="margin:0px; padding:0px; width:100%; height:100%; position:relative;"></div>',
	FILTER_HTML = '<div class="tcom-filter" style="background-color:#ccc; width:17px; height:17px; position:absolute; bottom:0px; right:0px; background-image: url(./img/filter_off.png);"> </div>',

	_extend,
	_addPop,
	_pop,
	addFilter,
	filterTable;

_extend = function(dest, source){
	var prop;
	for (prop in source){
		dest[prop] = source[prop];
	}
	return dest;
};

_addPop = function($wrap){
	$pop = $('#pop').hide();
	return $pop;
};

_pop = function($pop){
	$pop.toggle();
};

addFilter = function($cell, options, init){
	//フィルタアイコン追加
	var $wrap = $cell.wrapInner(WRAP_HTML).children('.tcom-wrap');
	var $filter = $wrap.append(FILTER_HTML).children('.tcom-filter');
	var col = $cell.prevAll('td, th').size();
	
	var $pop = _addPop($wrap);
	
	$filter.click(function(){
		_pop($pop);
	});
};


filterTable = {
	addFilter: addFilter
};

//global変数にセット
global.filterTable = filterTable;
_extend(global, filterTable);

})(this, jQuery);

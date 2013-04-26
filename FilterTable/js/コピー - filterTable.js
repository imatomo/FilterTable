(function(global, jQuery, undefined){
var	DATA_NS = 'data-ft-',
	WRAP_HTML = '<div class="ft_wrap"></div>',
	FILTER_HTML = '<div class="ft_filter ft_filter_off		"> </div>',
	POP_HTML = '<div class="ft_pop"></div>',

	_extend,
	_addPop,
	_pop,
	addFilter,
	filterTable;

//jQuery拡張
$.fn.extend({
	extData: function(name, str){
		if (undefined === str){
			return $(this).attr('data-' + namespace + '-' + name, str);
		} else {
			return $(this).attr('data-' + namespace + '-' + name);
		}
	},

	extClosestParent: function(expr){
		var $result;
		var $node = $(this);
		while ($node){
			$result = node.parent(expr);
			if ($result){
				return $result;
			}
			$node = $node.parent();
		}
		return null;
	}
});

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
	var col = 0;

	//フィルタアイコン追加
	var $wrap = $(WRAP_HTML);
	var $filter = $(FILTER_HTML);
	var $pop = $(POP_HTML);

	var cell_height = $cell.height();
	$wrap.height(cell_height);

	var filter_top = cell_height + parseInt($cell.css('padding-bottom')) - $filter.height();
	var filter_left = $cell.width() + parseInt($cell.css('padding-right')) - $filter.width();
	$filter.css('top', filter_top);
	$filter.css('left', filter_left);


	$cell.wrapInner($wrap);
	//wrapInnerするとjQueryObjectが動作しなくなるので再取得
	$wrap = $cell.children('div.ft_wrap');
	$wrap.append($filter);

	//POP作成
	col = $cell.prevAll('td, th').size() + 1;
	var $tr = $cell.extClosestParent('tr');



//	var col = $cell.prevAll('td, th').size();
//
//	var $pop = _addPop($wrap);
//
//	$filter.click(function(){
//		_pop($pop);
//	});
};


filterTable = {
	addFilter: addFilter
};

//global変数にセット
global.filterTable = filterTable;
_extend(global, filterTable);

})(this, jQuery);

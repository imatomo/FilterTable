//(function(jQuery, undefined){
/*@cc_on _d=document;eval('var document=_d')@*/

//===============================================================
// 定数
//===============================================================//
var	
	ASC = 1,
	DESC = -1,
	CLS_BEFORE_SET = 'ft-before_set',
	PLACE_HTML = '<form id="filterable" style="width:1px; height:1px; position:absolute; top:0px; left:0px; border:0px; margin:0px; padding:0px;"> </form>',
	FILTER_HTML = '<div class="ft_filter ft_filter_off"> </div>',
	POP_HTML = '<div class="ft_pop"></div>',
	ASC_HTML = '<div class="">昇順</div>',
	DESC_HTML = '<div class="">降順</div>',
	DEFAULT_OPTIONS = {
		sort : true,
		filter : true,
		value : function(){
			return $(this).text();
		}
		
	};


//===============================================================
// 全体変数
//===============================================================//
var	setting,	//[{table_id, table_node, [{filter_id, cell_node, }]}]
	end;




//===============================================================
// 基本関数
//===============================================================//
var _getAbsoluteRect = function(node){
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

var _extend = function(dest, source){
	var prop;
	for (prop in source){
		dest[prop] = source[prop];
	}
	return dest;
};

var getSequens = (function(){
	var obj = {};
	return function(name){
		if (!obj[name]){
			obj[name] = 0;
		}
		return obj[name]++;
	};
})();

var makeMargeObj = function(dest, source){
	var prop;
	var result = {};
	for (prop in dest){
		result[prop] = dest[prop];
	}
	for (prop in source){
		result[prop] = source[prop];
	}
	return result;
};

var _addPlace = function(){
	var $place = $('#filterable');
	if (!$place[0]){
		$('body').append(PLACE_HTML);
	}
};

var _addFilterButton = function($cell){
	addForm();
	var cell = $cell.get(0);
	var rect = getAbsoluteRect(cell);
	var $btn = $(FILTER_HTML);
	$btn.addClass(CLS_BEFORE_SET);
	$('#filterable').append($btn);
	$btn.css('left', rect.right - $btn.width())
		.css('top', rect.bottom - $btn.width());
	$btn.removeClass(CLS_BEFORE_SET);
};

var _addPop = function($cell){
	var cell = $cell.get(0);
	var $pop = $(POP_HTML);
	$pop.addClass(CLS_BEFORE_SET);
	$('#filterable').append($pop);
	var	rect = getAbsoluteRect(cell);
	var width = $pop.width();
	var	left = rect.right - width,
		top = rect.bottom;
	if (left < 0){
		left = 0;
	}
	$pop.css('left', left )
		.css('top', top);
	$pop.removeClass(CLS_BEFORE_SET);
};

var _setSort = function($pop){
	$asc = $(ASC_HTML);
	$desc = $(DESC_HTML);
	$pop.append($asc);
	$pop.append($desc);
	
	//昇順関数のセット
	$asc.click(function(){
		_execSort($pop, ASC);
	});
	
	//降順関数のセット
	$desc.click(function(){
		_execSort($pop, DESC);
	});
};

var _execSort = function($pop, mode){
	
	
};


var opstions = {
	sort : true,
	filter : true,
	value : function(){
		return $(this).text();
	}
};

var _setOptions = function($pop, options){
	if (options.sort){
		_setSort($pop);
	}
	if (opsions.filter){
		_setFilter($pop);
	}
};



var _setFilter = function($cell){
	
};

var _filterableCell = function($cell, options){
	// 一意の番号をセルごとに付ける
	var index = getSequens('cell');
	
	// オプション作成
	var opts = makeMargeObj(DEFAULT_OPTIONS, options);
	
	
	
};

var _filterableTable = function($table, options){
	
};

/**
 * 要素をソートする。
 * @param {jQueryObject} ソート対象の親要素。この中で並べ替える。
 * @param {String} ソート対象となる配列jQueryオブジェクト表現。親要素.children(expr)で探す。
 * @param {String} 内容を取得するセル要素の表現。
 * @param {function} セル要素から値を取得する関数。
 * @param {int} 1:昇順, -1:降順
 * @param {function} 比較用関数（数値を返す）
 */
var domSort = function($parent, sort, base, getVal, asc, comppare, mode){
	var x, y;
	var $sortarray = $parent.children(sort).sort(function(a,b){
		x = getVal.call($(a).find(base).get(0));
		y = getVal.call($(b).find(base).get(0));
		return compare(x, y) * asc;
	});
	$parent.append($sortarray);
};


var filterable = function(){
	var options = Object.create(DEFAULT_OPTIONS);
};
//})();
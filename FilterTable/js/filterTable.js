//(function(jQuery, undefined){
/*@cc_on _d=document;eval('var document=_d')@*/

//===============================================================
// 定数
//===============================================================//
var
	CLS_BEFORE_SET = 'ft_before_set',

	DATA_FILTER_ID = 'data-ft-id',

	PLACE_HTML = '<form id="filterable" style="width:1px; height:1px; position:absolute; top:0px; left:0px; border:0px; margin:0px; padding:0px;"> </form>',
	FILTER_HTML = '<div class="ft_filter ft_filter_off"> </div>',
	POP_HTML = '<div class="ft_pop ft_pop_hidden"></div>',
	ASC_HTML = '<div class="">昇順</div>',
	DESC_HTML = '<div class="">降順</div>',
	/** デフォルトオプション */
	DEFAULT_OPTIONS = {
		sort : true,
		filter : true,
		parent : 'parent',
		value : function(){
			return $(this).text();
		},
		compare : function(x, y){
			if (x > y){
				return 1;
			} else if (x < y){
				return -1;
			}
			return 0;
		}
	};


//===============================================================
// 全体変数
//===============================================================//
/** 要素追加場所 */
var $place = null;
//フィルター管理変数
var filter_list = [];

//===============================================================
// 全体管理
//===============================================================//
var pushFilterList = function(id, parent, node, options){
	filter_list.push({
		id: id,
		parent: parent,
		node: node,
		options: options
	});
};

var getFilterList = function(){
	return filter_list;
};

//===============================================================
//基本関数
//===============================================================//
//===============================================================
// 画面要素追加関数
//===============================================================//
/** 要素追加場所追加 */
var addPlace = function(){
	if (!$('#filterable')[0]){
		$('body').append(PLACE_HTML);
	}
	return $('#filterable');
};

/** フィルターボタン追加 */
var addFilterButton = function($obj){
	var rect = getAbsoluteRect($obj.get(0));
	var $btn = $(FILTER_HTML);
	$btn.addClass(CLS_BEFORE_SET);
	$place.append($btn);
	$btn.css('left', rect.right - $btn.width())
	.css('top', rect.bottom - $btn.width());
	$btn.removeClass(CLS_BEFORE_SET);

	return $btn;
};

/** ポップ追加 */
var addPop = function($btn){
	var btn = $btn.get(0);
	var $pop = $(POP_HTML);
	$pop.addClass(CLS_BEFORE_SET);
	$place.append($pop);
	var	rect = getAbsoluteRect(btn);
	var width = $pop.width();
	var	left = rect.right - width,
		top = rect.bottom;
	if (left < 0){
		left = 0;
	}
	$pop.css('left', left )
		.css('top', top);
	$pop.removeClass(CLS_BEFORE_SET);

	$pop.attr(DATA_FILTER_ID);

	return $pop;
};

//===============================================================
//画面追加要素操作関数
//===============================================================//
var togglePop = function(ft_id){
	var $pop = $('.ft_pop[' + DATA_FILTER_ID + '=' + ft_id + ']');
	if ($pop.hasClass('ft_pop_hidden')){
		$pop.removeClass('ft_pop_hidden').addClass('ft_pop_show');
	} else {
		$('.ft_pop_show').removeClass('ft_pop_show');
		$pop.removeClass('ft_pop_show').addClass('ft_pop_hidden');
	}
};
//===============================================================
//フィルタ関数設定
//===============================================================//
/** ポップにソート関数をセット */
var setSort = function($pop, parent, children_expr, getVal, compare){
	$asc = $(ASC_HTML);
	$desc = $(DESC_HTML);
	$pop.append($asc);
	$pop.append($desc);

	//昇順関数のセット
	$asc.click(function(){
		sortCore($(parent), children_expr, getVal, compare);
	});

	//降順関数のセット
	$desc.click(function(){
		sortCore($(parent), children_expr, getVal, compare, true);
	});
};


///**
// * 要素をソートする。
// * @param {jQueryObject} ソート対象の親要素。この中で並べ替える。
// * @param {String} ソート対象となる配列jQueryオブジェクト表現。親要素.children(expr)で探す。
// * @param {String} 内容を取得するセル要素の表現。
// * @param {function} セル要素から値を取得する関数。
// * @param {int} 1:昇順, -1:降順
// * @param {function} 比較用関数（数値を返す）
// */
//var domSort = function($parent, sort, base, getVal, asc, comppare, mode){
//	var x, y;
//	var $sortarray = $parent.children(sort).sort(function(a,b){
//		x = getVal.call($(a).find(base).get(0));
//		y = getVal.call($(b).find(base).get(0));
//		return compare(x, y) * asc;
//	});
//	$parent.append($sortarray);
//};
//===============================================================
// ソート関数
//===============================================================//
var sortTableSimple = function($parent, row, col, getVal, compare, desc){
	var startRow = row - 1;
	var tmp = [];
	var $target = $parent.children('tr:gt(' + startRow + ')');
	var _compare = (function(){
		if (desc === true){
			return function(x, y){
				return -1 * compare(x, y);
			};
		} else {
			return compare;
		}
	})();

	$target.each(function(){
		var $this = $(this);
		var $cell = $this.children().eq(col);
		var val = getVal.call($cell.get(0));
		tmp.push({
			v : val,
			o : $this
		});
	});

	tmp.sort(function(x, y){
		return _compare(x.v, y.v);
	});

	var len = tmp.length;
	for (var i = 0; i < len; i++){
		$parent.append(tmp[i].o);
	}
};

//===============================================================
// フィルタ用の値取得関数
//===============================================================//
var getParent = function(parent){
	if (parent == DEFAULT_OPTIONS.parent){
		return $(this).parent().get(0);
	} else {

	}

};

//===============================================================
//テーブル分析関数
//===============================================================//
var sortAnalysis = function($trs){

	return true;
};

var analysisTbody = function($tbody){
	var result = [];
	$tbody.children('tr').each(function(){
		result.push(analysisTr($(this)));
	});
	return result;
}

var analysisTr = function($tr, prevObj){
	var length = 0;
	var $cells = $tr.children();

	var colspans = [];
	var rowspans = [];

	$tr.children().each(function(){
		var colspan = 1;
		var rowspan = 1;
		var strColspan = null;
		var strRowspan = null;

		if (obj){
			for (; obj.rowspans[length] != undefined && obj.rowspans[length] > 1; length++){
				rowspans[length] = obj.rowspans[length] - 1;
				colspans[length] = 0;
			}
		}

		var $this = $(this);
		if (strColspan = $this.attr('colspan')){
			colspan = Number(strColspan);
		}

		if (strRowspan = $this.attr('rowspan')){
			rowspan = Number(strRowspan);
		}

		colspans[length] = colspan;
		colspans[length] = rowspan;
		for (var i = 0; i < colspan; i++){
			colspans.push(0);
			rowspans.push(rowspan);
		}
		length += colspan;
	});

	return {
		length : length,
		colspans : colspans,
		rowspans : rowspans
	};
};

//===============================================================
// ユースケース関数
//===============================================================//


var addFilter = function($obj, custom_options){
	if (!$place){
		$place = addPlace();
	}
	var options = makeMargeObject(DEFAULT_OPTIONS, custom_options);
	$obj.each(function(){
		var ft_id = sequence(DATA_FILTER_ID);

		//要素にIDをセット
		var $this = $(this);
		$this.attr(DATA_FILTER_ID, ft_id);

		//ボタンを追加しIDをセット
		var $btn = addFilterButton($this);
		$btn.attr(DATA_FILTER_ID, ft_id);

		//ポップを追加しIDをセット
		var $pop = addPop($btn);
		$pop.attr(DATA_FILTER_ID, ft_id);

		//ボタン押下時の関数をセット
		$btn.click(function(){
			//togglePop
			togglePop(ft_id);
		});

		var parent = getParent.call(this, options.parent);

		//追加したフィルターをフィルター管理変数に追加
		pushFilterList(ft_id, parent, this, options);

		setSort($pop, parent, 'tr', options.value, opstions.compare);
	});

};


var filterable = function(){
	var options = Object.create(DEFAULT_OPTIONS);
};
//})();
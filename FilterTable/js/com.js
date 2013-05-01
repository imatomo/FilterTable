//(function(global){	//全体開始


//-------------------------------------------------
// 共通関数 - オブジェクト
//-------------------------------------------------//
var extend = function(dest, source){
	var prop;
	for (prop in source){
		dest[prop] = source[prop];
	}
};

var makeMargeObject = function(dest, source){
	var result = {};
	var prop = null;
	for (prop in dest){
		result[prop] = dest[prop];
	}
	for (prop in source){
		result[prop] = source[prop];
	}
	return result;
};

//-------------------------------------------------
//共通関数 - 処理
//-------------------------------------------------//
var sequence = (function(){
	var nameCache = {};
	var func = function(name){
		if (nameCache[name] === undefined){
			nameCache[name] = 0;
		} else {
			nameCache[name]++;
		}
		return nameCache[name];
	};

	func.get = function(name){
		return nameCache[name];
	};

	func.set = function(name, val){
		nameCache[name] = val;
	};

	return func;
})();

//-------------------------------------------------
//共通関数 - DOM関連
//-------------------------------------------------//
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



//-------------------------------------------------
// jQuery拡張
//-------------------------------------------------//
var jQuery_fn_extend = {
	/**
	 * 最も近い、表現に合った先祖要素を取得する
	 */
	closestParents : function(expr){
		var $result = null;
		var $target = this;
		while ($target){
			if ($result = $target.parent(expr)){
				break;
			}
			$target = $target.parent();
		}
		return $result;
	}
}
jQuery.fn.extend(jQuery_fn_extend);

//-------------------------------------------------
// jQuery関数
//-------------------------------------------------//
/**
 * 親要素内の指定した子要素を並び替え、親要素の最後に配置する。
 *
 * @param {jQueryObject} 親要素(必須)
 * @param {String} 子要素のEXPR(必須)
 * @param {function} 子要素から値を取得する関数(必須)
 * @param {function} 値を比較する関数(必須)
 * @param {boolean} 昇順ならばfalse, 降順ならばtrue.(オプション:デフォルト昇順)
 */
var sortCore = function($parent, sorted, getVal, compare, desc){
	var compareExt = null;
	if (desc){
		compareExt = function(x, y){
			return compare(x, y) * -1;
		};
	} else {
		compareExt = compare;
	}

	var $sortedArray = $parent.children(sorted).sort(function(x, y){
		return compareExt(getVal(x), getVal(y));
	});
	$parent.append($sortedArray);
};

//セルの結合考慮
var sortTableCore = function($parent, sorted, cell, getVal, compare, desc){

};

//})();	//全体終了

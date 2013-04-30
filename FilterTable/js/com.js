//(function(global){	//全体開始
//-------------------------------------------------
// 共通関数
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

var sequence = (function(){
	var nameCache = {};
	var func = function(name){
		nameCache[name] = nameCache[name] ? nameCache[name]++ : 0;
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
// jQuery拡張
//-------------------------------------------------//
jQuery.fn.extend({
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
});

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

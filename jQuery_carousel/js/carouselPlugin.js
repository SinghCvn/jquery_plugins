(function() {

    $.fn.carouselPlugin = function(options){

        var defalutes = {
            'autoChange':true,      //是否自动播放
            'autoTime':5000,        //间隔时间
            'changeHandle':true,    //左右箭头控制
            'pointNav':true,        //点控制
            'changeSpend':800       //切换时间
        };

        var ops=$.extend({},defalutes, options);

        var $box = this.find('a'),
            $ul = this.find('ul'),
            $li = $ul.find('li'),
            $arrow = this.find('.arrow');
            $prev = this.find('.prev');
            $next = this.find('.next');
            _index = 0;

        /* 用户左右箭头控制 */
        if(ops.changeHandle){
            $arrow.css("display","block");
        };
        /* 用户点控 */
        if(ops.pointNav){
            $ul.css("display","block");
        };

        /* 点控详细部分 */
        $li.on("click",function(){
            $(this).addClass("active").siblings("li").stop(true).removeClass("active");
            _index = $(this).index();
            $box.eq(_index).fadeIn(ops.changeSpend).siblings("a").stop(true).fadeOut(ops.changeSpend);
        });

        /* 自动播放 */
        function init(){
            if(ops.autoChange){
                 _index ++;
                if(_index > ($li.length-1)){
                    _index = 0;
                }
                $li.eq(_index).trigger("click");
            }

        }
        time = setInterval(init,ops.autoTime);
        this.mouseover(function(){
            clearInterval(time);
        }).mouseleave(function(){
            time = setInterval(init,ops.autoTime);
        });

        /* 左右键头控制 */
        $prev.click(function(){
            var i = $(this).parent().find('ul .active').index();
            var l = $li.length;
            if( i > 0 && i <= l ){
                $li.eq(i-1).click();
            }else if( i == 0 ){
                $li.eq(l-1).click();
            }
        });
        $next.click(function(){
            var i = $(this).parent().find('ul .active').index();
            var l = $li.length;
            if( i >= 0 && i <= l-2 ){
                $li.eq(i+1).click();
            }else if( i == l-1 ){
                $li.eq(0).click();
            }
        });

    };

})();
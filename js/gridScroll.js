(function($) {
  $.fn.GridScroll = function(){
        var options ={
                flag: 0,
                parent: $(this).parent(),
                dataMaskWidth: ($(this).parent().width() * 7) / 100,
                dataWidthFull: $(this).parent().width(),
                dataLeft: $(this).parent().width() -  $(this).width(),
                dataWidht: $(this).width(),
                duration: 0,
                currentItem: 0,
                durationNm: 0, 
                start: 0,
                leftMargin: $(this).parent().offset().left,
            };
            
            options.currentItem = options.dataLeft;
            options.currentItem = -options.dataLeft;
            options.parent.append(options.mask);
            var deviceAgent = navigator.userAgent.toLowerCase();
            var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
            if (agentID) {
               options.parent.addClass('touch-grid');
               return false;
            }

            options.parent.mousemove(function(e){

                    if(e.clientX - options.leftMargin < options.dataMaskWidth && options.dataWidthFull < options.dataWidht && options.start == 1){
                        if(options.flag != 1){
                            options.start = 1;
                            startAnimate($(this).find('.masonry-grid'), 0);
                        }
                        else{
                            return false;
                        }
                    }
                    else if((e.clientX - options.leftMargin > (options.dataWidthFull - options.dataMaskWidth)) && options.dataWidthFull < options.dataWidht){
                        if(options.flag != 1){
                            options.start = 1;
                            startAnimate($(this).find('.masonry-grid'), options.dataLeft);
                        }else{
                            return false;
                        }
                    }
                    else if(options.flag = 1){  
                        $(this).find('.masonry-grid').stop();
                        options.flag = 0;
                        options.duration = 0;
                    }
            })
            function startAnimate(box, anim){  
                    options.flag = 1;
                    options.currentItem = options.currentItem - options.dataLeft;    
                    if(options.currentItem > options.dataWidthFull){
                        options.duration =  Math.round(options.currentItem / options.dataWidthFull );
                        options.currentItem = options.currentItem;
                    }else{
                        options.duration =  Math.round(options.dataWidthFull / options.currentItem);
                        options.currentItem = options.currentItem;
                    }
                    options.duration = options.duration * 900; // options.durationNm;
                    options.currentItem = 0;

                    box.animate({
                        'transform': 'translateX('+anim+'px)'
                    },{
                        duration: options.duration,
                        step: function(){
                            options.currentItem++;
                        }
                    });
            }


    return this;
  };
})(jQuery);

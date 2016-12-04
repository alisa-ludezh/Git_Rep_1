(function($) {
  $.fn.GridScroll = function(){
        var options ={
                flag: 0,
                parent: $(this).parent(),
                dataMaskHeight: ($(this).parent().height() * 7) / 100,
                dataHeightFull: $(this).parent().height(),
                dataLeft: $(this).parent().height() -  $(this).height(),
                dataHeight: $(this).height(),
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

                    if(e.clientY - options.leftMargin < options.dataMaskHeight && options.dataHeightFull < options.dataHeight && options.start == 1){
                        if(options.flag != 1){
                            options.start = 1;
                            startAnimate($(this).find('.masonry-grid'), 0);
                        }
                        else{
                            return false;
                        }
                    }
                    else if((e.clientY - options.leftMargin > (options.dataHeightFull - options.dataMaskHeight)) && options.dataHeightFull < options.dataHeight){
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
                    if(options.currentItem > options.dataHeightFull){
                        options.duration =  Math.round(options.currentItem / options.dataHeightFull );
                        options.currentItem = options.currentItem;
                    }else{
                        options.duration =  Math.round(options.dataHeightFull / options.currentItem);
                        options.currentItem = options.currentItem;
                    }
                    options.duration = options.duration * 900; // options.durationNm;
                    options.currentItem = 0;

                    box.animate({
                        'transform': 'translateY('+anim+'px)'
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

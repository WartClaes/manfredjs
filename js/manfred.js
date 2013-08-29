/*! Manfred v0.1 | (c) 2013 Turboturbo

    TODO
    - center content in screen
    - place content where clicked
    + iframed content
    + dynamic sizing cfr content width/height
    + sizing with data attributes
    + overrule dynamic sizing with general width/height properties
    + titles on a link as caption
    + youtube integration
*/
(function ($) {
    $.fn.manfred = function(options) {
    	var settings = $.extend({
    			speed : 200,
                delay : 200,
                scroll : false,
                escClose : true,
                bgclose: true,
                bgcolor: "#888888",
                bgopacity: '60',
                width: 400,
                height: 'auto',
                autoSize: true
        	}, options ),
            backgroundColor = convertHex(settings.bgcolor, settings.bgopacity),
    		el = $('<div />').attr('id','manfred').css({
                    'display' : 'none', 
                    'background' : backgroundColor
                }).html('<div id="manfred-content"></div>'),
    		target = this.attr('href'),
            $this = this;
        
        function convertHex(hex,opacity){
            hex = hex.replace('#','');
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);

            result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
            return result;
        }

        function getContent(target){
            if($this.hasClass('iframe')) {
                return {
                    'html': $('<iframe />').attr('src',target).css({
                        'width': settings.width,
                        'height': settings.height
                    })
                };
            }
            if($this.hasClass('youtube')){
                var vidWidth = settings.width;
                
                if(settings.autoSize)
                    vidWidth = settings.width/1.33333;

                return {
                    'html': $('<iframe />').attr({
                        'src': target,
                        'width': settings.width,
                        'height': vidWidth,
                        'frameborder': 0,
                        'allowfullscreen': 'allowfullscreen'
                    })
                }
            }
            if($(target).length) {
                return {
                    'html': $(target).html(),
                    'width': $(target).width(), 
                    'height': $(target).height()
                };
            }
            return {
                'html': target
            };
        }
    
        function openManfred(){
            // Hide flash
            $('object,embed').css('visibility','hidden');
    
            if(settings.scroll) $('body').css('overflow','hidden');
    
            el.fadeIn(settings.speed, function() {
                $('input:first', el).focus();
            });
        
            // Close overlay with close button
            el.delegate('#close-manfred', 'click', function(event) {
                closeManfred();
                event.preventDefault();
            });
    
            // Close overlay with Esc key
            if(settings.escape){
                $(document).keyup(function(e) {
                    if (e.keyCode == 27) { // Esc
                        closeManfred();
                    }
                });
            }

            el.on('click', function(e) { 
                if( e.target !== this ) {
                    return;
                }
                if(settings.bgclose) closeManfred();
            });
        }
    
        function updateManfred(content){
            var $manfredContent = $('#manfred-content'),
                w = content.width,
                h = content.height;

            if(typeof w === 'undefined' && settings.autoSize) w = settings.width;
            if(typeof h === 'undefined' && settings.autoSize) h = settings.height;

            if(typeof $this.attr('data-manfred-width') !== 'undefined') w = $this.attr('data-manfred-width');
            if(typeof $this.attr('data-manfred-height') !== 'undefined') h = $this.attr('data-manfred-height');
            
            $manfredContent.html(content.html).css({
                'width' : w,
                'height' : h
            }).append('<a href="#close" id="close-manfred"><img src="img/close.png" /></a>');
        }
    
        function closeManfred(){
            el.delay(settings.delay).fadeOut(settings.speed,function() {
                // Show flash
                $('object,embed').css('visibility','visible');
                if(settings.scroll) $('body').css('overflow','auto');
            });
        }
    
    	// init
    	$('body:first').append(el);
    
        this.bind('click', function(event){
            $this = $(this);
            event.preventDefault();
            updateManfred(getContent($this.attr('href')));
            openManfred();
        });
        
        return this;
    };
}(jQuery));
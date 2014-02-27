/*! Manfred v0.1 | (c) 2013 Turboturbo

    TODO
    - place content where clicked => iframe etc.
    - add a kitten
    - check for rgba color
    + center content in screen
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
                autosize: true,
                bgclose: true,
    			bgcolor: "#888888",
                bgopacity: '60',
                delay : 200,
                escape : true,
                height: 'auto',
                kitten: false,
                position: 'center',
                scroll : false,
                speed : 200,
                width: 400
        	}, options),
            backgroundColor = settings.bgcolor;
    		target = this.attr('href'),
            $this = this;

        // Check if background color is hex
        if(settings.bgcolor.indexOf('#') > -1){
            var backgroundColor = convertHex(settings.bgcolor, settings.bgopacity);
        }

        var $el = $('<div />').attr('id', 'manfred').css({
                    'display' : 'none', 
                    'background' : backgroundColor
                }).html('<div id="manfred-content"></div>');
            
        
        function convertHex(hex,opacity){
            // Convert hex value to rgba value for transparent background color.

            hex = hex.replace('#','');
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);

            result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
            return result;
        }

        function getContent(target){
            // If Manfred is iframe, create the iframe wrapper and dimensions
            if($this.hasClass('iframe')) {
                return {
                    'html': $('<iframe />').attr('src', target).css({
                        'width': settings.width,
                        'height': settings.height
                    })
                };
            }
            // If Manfred is youtube, iframe the youtube video and set the 4:3 dimensions according to the width
            if($this.hasClass('youtube')){
                var vidWidth = settings.width;
                
                if(settings.autosize)
                    vidHeight = settings.width/1.33333;

                return {
                    'html': $('<iframe />').attr({
                        'src': target,
                        'width': settings.width,
                        'height': vidHeight,
                        'frameborder': 0,
                        'allowfullscreen': 'allowfullscreen'
                    })
                }
            }

            // If the target exists somewhere in the page, return it
            if($(target).length) {
                return {
                    'html': $(target).html(),
                    'width': $(target).width(), 
                    'height': $(target).height()
                };
            }

            // Final step, set text as content
            return {
                'html': target
            };
        }
    
        function openManfred(){
            // Hide all flash items. Just to be sure
            if(settings.hideFlash) $('object,embed').css('visibility','hidden');
        
            // Allow scroll or not
            if(settings.scroll) $('body').css('overflow','hidden');
            
            // open Manfred, focus on first input element
            $el.fadeIn(settings.speed, function() {
                $('input:first', $el).focus();
            });

            // Center Manfred in screen
            positionManfred();
        
            // Close overlay with close button
            $el.delegate('#close-manfred', 'click', function(event) {
                closeManfred();
                event.preventDefault();
            });
    
            // Close overlay with Esc key
            if(settings.escape){
                $(document).keyup(function(e) {
                    if (e.keyCode == 27) {
                        closeManfred();
                    }
                });
            }

            // Activate background close
            $el.on('click', function(e) { 
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

            if(typeof w === 'undefined' && settings.autosize) w = settings.width;
            if(typeof h === 'undefined' && settings.autosize) h = settings.height;

            if(typeof $this.attr('data-manfred-width') !== 'undefined') w = $this.attr('data-manfred-width');
            if(typeof $this.attr('data-manfred-height') !== 'undefined') h = $this.attr('data-manfred-height');
            
            $manfredContent.html(content.html).css({
                'width' : w,
                'height' : h
            }).append('<a href="#close" id="close-manfred"><img src="img/close.png" /></a>');
        }

        function positionManfred(){
            if(!settings.position){
                return false;
            }

            var windowheight = $(window).height(),
                elHeight = $('#manfred-content').outerHeight(),
                diff = windowheight - elHeight;

            if(windowheight > elHeight && settings.position == 'center') {

                $('#manfred-content').css('margin-top', diff / 2);
            }
        }
    
        function closeManfred(){
            $el.delay(settings.delay).fadeOut(settings.speed,function() {
                // Show flash
                $('object, embed').css('visibility', 'visible');
                if(settings.scroll) $('body').css('overflow', 'auto');
            });
        }
    
    	// init
    	$('body:first').append($el);
    
        this.bind('click', function(event){
            event.preventDefault();

            $this = $(this);

            // Update overlay content
            updateManfred(getContent($this.attr('href')));

            // Open overlay
            openManfred();
        });

        $(window).resize(function(){
            centerManfred();
        });
        
        return this;
    };
}(jQuery));
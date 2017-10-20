(function ($, undefined) {
    var
        def = {
            stuckClass: 'isStuck'
        }
        , doc = $(document), anim = false;

    $.fn.TMStickUp = function (opt) {
        opt = $.extend(true, {}, def, opt)

        $(this).each(function () {
            var $this = $(this)
                , posY=$this.offset().top+$this.outerHeight()
                , isStuck = true
                , clone = $this.clone().appendTo($this.parent()).addClass(opt.stuckClass)
                , height=$this.outerHeight()
                , stuckedHeight = clone.outerHeight()
                , opened=$.cookie&&$.cookie('panel1')==='opened'
                , tmr


            var scrollTop = stuckedHeight;//doc.scrollTop()
            //console.log('scrollTop:' + scrollTop);
            //console.log('posY:' + posY);
            //console.log('height:' + height);

                clone
                    .stop()
                    .css({ visibility: 'visible' })
                //.animate({
                //    top: 0
                //    , marginTop: opened ? 50 : 0
                //}, {})

                isStuck = true

            $(window).resize(function () {
                clearTimeout(tmr)
                //console.log(isStuck);
                //if (isStuck) {
                //    clone.css({ top: 0, visibility: 'visible' })
                //    $this.css({ top: 0, visibility: 'hidden' })
                //} else {
                //    clone.css({ top: 0, visibility: 'hidden' })
                //    $this.css({ top: 0, visibility: 'visible' })
                //}
                clone.css({top: isStuck ? 0 : -stuckedHeight, visibility: isStuck ? 'visible' : 'hidden'})
                tmr = setTimeout(function () {
                    posY = $this.offset().top//+$this.outerHeight()
                    height = $this.outerHeight()
                    stuckedHeight = clone.outerHeight()
                    opened = $.cookie && $.cookie('panel1') === 'opened'

                    //clone.css({top: isStuck ? 0 : -stuckedHeight})
                    clone.css({ top: 0 })
                }, 10)
            }).resize()

            clone.css({
                position: 'fixed'
                , width: '100%'
                ,zIndex: 1000
            })

            $this
                .on('rePosition', function (e, d) {
                    isStuck = true;
                    if (isStuck)
                        clone.animate({ marginTop: d }, { easing: 'swing' })
                    if (d === 0)
                        opened = false
                    else
                        opened = true
                    opened = true
                })

            doc
                .on('scroll', function () {

                    //var scrollTop = stuckedHeight;//doc.scrollTop()
                    ////console.log('scrollTop:' + scrollTop);
                    ////console.log('posY:' + posY);
                    ////console.log('height:' + height);

                    //if (scrollTop >= posY && !isStuck) {
                    //    clone
                    //        .stop()
                    //        .css({visibility: 'visible'})
                    //        //.animate({
                    //        //    top: 0
                    //        //    , marginTop: opened ? 50 : 0
                    //        //}, {})

                    //    isStuck = true
                    //}

                    //if (scrollTop < posY + height && isStuck) {
                    //    if ($('.search-form_toggle').length > 0) {
                    //        if ($(window).width() > 767) {
                    //            var o_stuck = $('.search-form_toggle'),
                    //                f_stuck = $('.search-form');

                    //            //if (!anim && o_stuck.hasClass('active')) {
                    //            //    anim = true;
                    //            //    o_stuck.removeClass('active');
                    //            //    f_stuck.removeClass('on').slideUp();
                    //            //    anim = false;
                    //            //}
                    //        }
                    //    }

                    //    $('.sf-menu ul').css('display', 'none');
                    //    clone.css({ visibility: 'hidden' })
                    //    //clone
                    //    //    .stop()
                    //    //    .animate({
                    //    //        top: -stuckedHeight
                    //    //        , marginTop: 0
                    //    //    }, {
                    //    //        duration: 0
                    //    //        , complete: function () {
                    //    //            clone.css({visibility: 'hidden'})
                    //    //        }
                    //    //    });

                    //    isStuck = false;

                    //}
                })
                .trigger('scroll')
        })
    }
})(jQuery)

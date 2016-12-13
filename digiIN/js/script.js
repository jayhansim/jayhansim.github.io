/*
 *@Title: DBS DIGIBANK Custom Plugins
 *@Author: Redford Sumcad
 *@Description: Custom javascript plugins created for specific usage of DIGI BANK.
 *@Date Started: 1 May 2015
*/
$(function(){function g(){var b=$.isDevice();b?(a.unbind(".megamenuscroll"),$("#headerMenu").removeAttr("style").removeClass("navbar-white")):$.megaMenuInit("megamenuscroll")}var a=$(window),b=$("body"),c=$.isDevice(),d=$("#footer"),f=($("#headerMenu"),"components/header.html");footerPage="components/footer.html",(b.hasClass("body-mobile-error")||b.hasClass("sub-directory"))&&(f="../components/headerEmail.html",footerPage="../components/footerEmail.html"),$("#headerMenu").load(f,function(){var a=$("#digiMenu");$(".mega-menu .collapse").on("show.bs.collapse hide.bs.collapse",function(a){a.preventDefault()}),$("#mobMenu").on("click",function(a){a.preventDefault();var c=$($(this).data("target"));c.toggleClass("in"),c.hasClass("in")?(b.addClass("mdl-body"),b.append('<div class="modal-backdrop  in"></div>'),setTimeout(function(){c.addClass("animate-menu")},100)):(c.removeClass("animate-menu"),$(".modal-backdrop.in").remove(),b.removeClass("mdl-body"))}),c&&$(document).on("touchstart click",".mdl-body",function(c){"navbar-toggle"!=c.target.className&&"menu-link"!=c.target.className&&(a.removeClass("in"),$(".modal-backdrop").remove(),b.removeClass("mdl-body"))}),$.setActiveMenuLink(),$(this).hasClass("menu-white")&&($("#digiMenu .navbar-nav").addClass("nav-white"),$(".navbar-header .navbar-brand").addClass("navbar-brand-white"))}),$("#kasistoChat").load("components/chat.html",function(){$(this).removeClass("hide"),$.loadImageInit(),$.enableChat()}),d.load(footerPage),g(),a.resize(function(){g()}),$.inputOpacityInit("header .email input"),$(".btn-callus").on("click",function(){$("body").scrollTo("#callId")}),$.radioCheckFirefoxInit()}),function(a){function e(b,c){var d=a(".mob-purple"),e=a("#faqBox");a(b).hide().filter(':containIgnoreCase("'+c+'")').show(),d.find(".txt-error").hide(),d.each(function(b){var c=a(this),d=c.find(".inside-content-box:visible").length,f=c.find(".inside-content-box").length;0==d?(c.find(".count").html("(0)"),0==c.find(".txt-error").length?c.append('<label class="txt-error">No results found!</label>'):c.find(".txt-error").show()):(c.find(".count").html("("+d+")"),d==f?e.find(".clearfix").show():e.find(".clearfix").hide())})}var b=768,c=360;a.enableChat=function(){function p(a,b){switch(a){case 414:b-=382;break;case 375:b-=291;break;case 320:b-=197}window.scroll(0,b)}function q(b){a(window).unbind(".kasistoChatResize"),r()}function r(){f&&a("section,footer,header,nav").show()}function s(){f&&setTimeout(function(){a("section,footer,header,nav").hide()},400)}function w(a){d?a.style.height="30px":a.style.height="26px",a.style.height=a.scrollHeight+"px",a.scrollHeight>55?e.addClass("line-ht-threeRow"):a.scrollHeight>35&&a.scrollHeight<50?e.addClass("line-ht-twoRow"):e.removeClass("line-ht-twoRow line-ht-threeRow")}function x(){a("head meta[name=viewport]").remove(),a("head").prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />')}function z(){var b=a(window).height(),d=a("#mdlKasistoChat .chat-box-bottom").outerHeight()+a("#mdlKasistoChat .chat-box-title").outerHeight();c.css("height",b-d)}function A(a){if(""!=a){var d=C("chat-content");chatTpl='<div class="chat-reply-box clearfix '+d+'"><div class="chat-reply">\t<span class="arrowright"></span>\t<p class="chat-msg"></p>\t</div></div>',c.append(chatTpl),c.find(".chat-reply-box:last .chat-msg").text(a).html(),c.scrollTop(c[0].scrollHeight),b.removeAttr("style").val("")}}function B(a){if(""!=a){var d=C("chat-reply-box");chatTpl='<div class="chat-content clearfix '+d+'">\t<div class="chat-question">\t\t<span class="arrowleft"></span>\t<p class="chat-msg"></p>\t</div></div>',setTimeout(function(){c.append(chatTpl),c.find(".chat-content:last .chat-msg").html(a).text(),c.scrollTop(c[0].scrollHeight),b.removeAttr("style").val(""),G()},1e3)}}function C(b){var c="";return a("#chatBody>div").last().hasClass(b)&&(c="mTop-16"),c}function D(){var a=C("chat-reply-box");chatTpl='<div class="chat-content clearfix '+a+'">\t<div class="chat-question">\t\t<span class="arrowleft"></span>\t\t<p><strong>I\'m sorry</strong>, we are experiencing some technical difficulties. Please try again later.</p>\t</div></div>',setTimeout(function(){c.append(chatTpl),c.scrollTop(c[0].scrollHeight),b.removeAttr("style").val(""),G()},1e3)}function F(b){requestData={vpa_request:{text:{data:b},custom_context_in:{data:'{"userInfo":{"token":"NOTOKEN","userId":"PWEB"}}'},user_context:{user_id:"PWEB"}}},a.ajax({url:"/kai/api/v1/vpa",type:"POST",dataType:"json",xhrFields:{withCredentials:!0},contentType:"application/json; charset=utf-8",data:JSON.stringify(requestData),success:function(a){if("undefined"==typeof a.responseText)D();else{var b=a.responseText;a.responseText.search("href")>0&&(b=b.replace(/href=/g,'target="_blank" href=')),a.responseText.search("{{live-chat}}")>0&&(b=b.replace(/{{live-chat}}/g,"")),B(b)}},error:function(a,b,c){console.log(a),console.log(b),console.log(c),D()},headers:E})}function G(){sessionStorage.setItem("chatHistory",encodeURI(a("#chatBody").html()))}function H(){return decodeURI(sessionStorage.getItem("chatHistory"))}var b=a("#chatContent"),c=a("#chatBody"),e=a("#btnChat"),f=a.isRealDevice(),g=a("#kasistoMsg"),h=a("#mdlKasistoChat"),i=a("#btnKasisto"),j=a("#mdlKasistoChat .close"),k=a("body"),l=H();if("null"==l?setTimeout(function(){F("Hi")},1e3):c.html(l),a("#kasistoMsg,#btnKasisto").on("click",function(){g.removeClass("bounceIn").fadeOut("slow"),h.modal("show")}),f){a(window).one("scroll",function(){g.addClass("fadeOut")});var m=a.isIOSDevice();if(m){var n=a(window).width(),o=a(window).height();b.on("keyup focus",function(a){p(n,o)})}}else b.on("focus",function(){a(this).removeAttr("placeholder")}).on("blur",function(){a(this).attr("placeholder","Ask your Virtual Assistant")});setTimeout(function(){i.show(),setTimeout(function(){g.addClass("bounceIn")},1500)},3e3),h.on("shown.bs.modal",function(){d?(x(),a(this).find(".modal-dialog").removeClass("slideOutDown").addClass("slideInUp"),s()):(k.addClass("bg-blur"),a(this).find(".modal-dialog").removeClass("slideOutDown slideInUp").addClass("fadeIn")),h.css("padding-right",0),z(),a(window).bind("resize.kasistoChatResize",function(){z()}),c.scrollTop(c[0].scrollHeight),f&&(a(".modal-backdrop.in").remove(),i.hide(),c.off().on("touchstart",function(){b.blur()})),a.isAndroidKarbonn()}),d?j.on("click",function(){a("#mdlKasistoChat .modal-dialog").animate({height:"0%"},200,function(){a("#mdlKasistoChat .modal-dialog").removeAttr("style"),q(),h.modal("hide")}),r(),i.show()}):(h.on("hidden.bs.modal",function(){k.removeClass("bg-blur"),r(),i.show()}),j.on("click",function(){h.modal("hide"),r()})),e.on("click",function(c){var d=a.trim(b.val());d.length>0&&(A(d),F(d)),e.removeClass("line-ht-twoRow line-ht-threeRow"),b.focus(),c.preventDefault()}),a("#questionBox li>a").on("click",function(b){var c=a(this).text();A(c),F(c),b.preventDefault()});var t="keypress";f&&(t="keyup"),b.on(t,function(d){var g=a.trim(a(this).val());13==(d.keyCode||d.which)?f?""!=g&&w(this):(""!=g&&(A(g),F(g)),b.val("").removeAttr("style"),e.removeClass("line-ht-twoRow line-ht-threeRow"),c.scrollTop(c[0].scrollHeight),d.preventDefault()):""!=g?w(this):b.val("").removeAttr("style")});var E={"Content-Type":"application/json;charset=UTF-8",T328JSS382RN:"067f592e-0f3e-48d5-9004-9c114255a15f"}},a.setActiveMenuLink=function(){var b=window.location,c=b.pathname.substring(b.pathname.lastIndexOf("/")+1,b.pathname.lastIndexOf("."));a('.menu-link[data-link="'+c+'"]').addClass("active")},a.radioCheckFirefoxInit=function(){if(navigator.userAgent.indexOf("Firefox")!=-1){var b=a("input[type=radio]");a(b).after("<label></label>")}},a.getScrollbarWidth=function(){var b,c,d;return"visible"==a("body").css("overflow-y")?void 0===d&&(b=a('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),c=b.children(),d=c.innerWidth()-c.height(99).innerWidth(),b.remove()):d=0,d},a.isDevice=function(){var c=!1;$window=a(window);var d=a.getScrollbarWidth();return $window.outerWidth()+d<b&&(c=!0),c};var d=a.isDevice();a.fn.scrollTo=function(b,c,d){"function"==typeof c&&2==arguments.length&&(d=c,c=b);var e=a.extend({scrollTarget:b,offsetTop:50,duration:500,easing:"swing"},c);return this.each(function(){var b=a(this),c="number"==typeof e.scrollTarget?e.scrollTarget:a(e.scrollTarget),f="number"==typeof c?c:c.offset().top+b.scrollTop()-parseInt(e.offsetTop);b.animate({scrollTop:f},parseInt(e.duration),e.easing,function(){"function"==typeof d&&d.call(this)})})},a.extend(a.expr[":"],{containIgnoreCase:function(a,b,c,d){return(a.textContent||a.innerText||"").toLowerCase().indexOf((c[3]||"").toLowerCase())>=0}}),a.megaMenuInit=function(b){function l(){i.removeClass("navbar-hidden").stop().animate({top:0},{queue:!1,duration:k}),f=!0}function m(){i.addClass("navbar-hidden").stop().animate({top:-i.outerHeight()},{queue:!1,duration:k}),a(".dropdown.open .dropdown-toggle",a(".navbar")).dropdown("toggle"),f=!1}if(a("#headerMenu").length>0){var c=a(window),d=null,e=a("#headerMenu").outerHeight(),f=!0,i=(c.height(),a(document),a(".navbar")),k=300;c.bind("scroll."+b,function(){var a=c.scrollTop(),b=a-d;if(d=a,0==a)setTimeout(function(){i.addClass("animate").removeClass("navbar-white")},500);else if(i.removeClass("animate"),b<0){if(f)return;l(),i.addClass("navbar-white")}else if(b>0){if(!f)return;if(a>=e){if(!f)return;m()}}})}},a.calculateHeight=function(b){if(!d){var c=-1;setTimeout(function(){a(b).each(function(){c=c>a(this).height()?c:a(this).height()}),a(b).each(function(){a(this).css("min-height",c)})},150)}},a.inputOpacityInit=function(b){var c=a(b);c.on("focus",function(){a(this).parents(".email").addClass("clear-opacity")}),c.on("blur",function(){a(this).parents(".email").removeClass("clear-opacity")})},a.clientSearchInit=function(b,c){a(b).keyup(function(){var b=a("#faqBox");if(0==a.trim(a(this).val()).length){var d=b.find(".clearfix");d.length>0&&d.show()}e(c,a(this).val())})},a.showSearchText=function(a,b){e(a,b)},a.mobileToggleInit=function(b,c){var e=a(b);d?e.on("click",function(){a(this).find(c).stop().slideToggle(400),a(this).find(".chevron").toggleClass("up")}):e.unbind("click")},a.loadImageInit=function(){function c(a){a?e(b,"mobile-src"):e(b,"desktop-src")}function e(b,c){b.each(function(b){var d=a(this);d.attr("src",d.attr(c)).addClass("img-opacity")})}var b=a(".img-src");b.length>0&&(c(d),$window.bind("resize.loadImageSrc",function(){d=a.isDevice(),c(d)}))},a.headerImgAutoScaleInit=function(b,d){$window=a(window);var e=$window.height();e>c&&(a(d).css("height",$window.outerHeight()),$window.bind("resize."+b,function(){a(window).outerHeight()>c&&a(d).css("height",$window.outerHeight())}))},a.countBoxVisible=function(b){var c=a(b+" .inside-content-box:visible").length;0!=c&&a(b+" .count").html("("+c+")")},a.createDealsMobileInit=function(b){var c="",d="";a(".deal-box[mobile-position]").each(function(b,c){var e=a(".deal-box[mobile-position="+(b+1)+"]").prop("outerHTML");d+=e}),c+='<div class="col-md-4 col-sm-4">'+d+"</div>";var e=a("#mobileDeals");e.html(c).promise().done(function(){e.find("[mob-href]").each(function(b,c){var d=a(this),e=d.attr("mob-href");d.attr("href",e)}),e.find("[mob-id]").each(function(b,c){var d=a(this),e=d.attr("mob-id");d.attr("id",e)})}),"function"==typeof b&&b.call(this)},a.isRealDevice=function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent)},a.isAndroidDevice=function(){var a=navigator.userAgent.toLowerCase(),b=a.indexOf("android")>-1;return b},a.isAndroidKarbonn=function(){function f(a){a.attr("readonly","readonly"),a.attr("disabled","true"),setTimeout(function(){a.blur(),a.removeAttr("readonly"),a.removeAttr("disabled")},100)}var b=navigator.userAgent.toLowerCase(),c=b.indexOf("karbonn")>-1;if(c){var d=a(".chat-box"),e=a(".chat-box-bottom");a("#chatContent").on("focusin",function(){e.css({position:"relative"}),d.css({overflow:"scroll","padding-bottom":"260px"}),d.addClass("androidFix").scrollTop(d.height()+100).removeClass("androidFix")}),a("#chatBody").on("touchstart",function(){e.css({position:"absolute"}).blur(),d.css({"padding-bottom":"0"})}),a("#chatBody").on("touchend",function(){f(e)})}},a.isIOSDevice=function(){return/webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)},a.surveyQuestionInit=function(){function b(b){b.closest("ul").closest("li").find(".sub-question").each(function(b,c){var d=a(c).closest("li").find('input[type="checkbox"]');d.length>0&&d.is(":not(:checked)")&&a(c).hide()})}function c(){var b=0;return a(".questionnaire-box").find('>li[data-required="true"]').each(function(c,d){var e=a(this),f=a(d).find('input[type="checkbox"]:checked').length,g=a(d).find('input[type="radio"]:checked').length;f>0||g>0?(b++,e.removeClass("tofill")):e.addClass("tofill")}),b}function e(b){a("html, body").animate({scrollTop:b})}function f(){var b=0,c=!1,d=a('input[data-validate="true"]:checked');if(d.length>0){var e=d.closest("li").find(".sub-question"),f=e.find('input[type="checkbox"]:checked').length,g=e.find('input[type="radio"]:checked').length;f>0||g>0?(b++,d.removeClass("toFillYesNo")):d.addClass("toFillYesNo"),c=b>0}else c=!0;return c}a('input[type="radio"], input[type="checkbox"]').on("change",function(){var c=a(this);if(c.is(":checked")){var d=c.closest("li").find(".sub-question:first");c.is(":checkbox")?b(c):c.closest("ul").closest("li").find(".sub-question").hide(),d.length>0&&(d.is(":visible")||(d.show(),d.find('input[type="text"]:first').focus()))}else c.is(":checkbox")&&c.closest("li").find(".sub-question").hide()}),a('#answerTopThree input[type="checkbox"]').on("change",function(){a('#answerTopThree input[type="checkbox"]:checked').length>=3?a('#answerTopThree input[type="checkbox"]:not(:checked)').attr("disabled","disabled"):a('#answerTopThree input[type="checkbox"]:not(:checked)').removeAttr("disabled")}),a("#notAwareOptionCb").on("change",function(){var b=a('#notAwareOptionId input[type="checkbox"]:not("#notAwareOptionCb")');a(this).is(":checked")?b.removeAttr("checked").attr("disabled","disabled"):b.removeAttr("disabled")}),a("#btnSubmit").on("click",function(b){var d=a(".questionnaire-box").find('>li[data-required="true"]').length,g=c(),h=f();if(d==g)if(h)a("#questionForm").submit();else{var i=a(".toFillYesNo:first").offset().top-(a("#headerMenu").height()+50);e(i)}else{var i=a(".questionnaire-box").find(">li.tofill:first").offset().top-(a("#headerMenu").height()+50);e(i)}b.preventDefault()})}}(jQuery);


// Start of infobar javascript
$(function(){

    /*!
    *  @Author: Redford Sumcad
    *  @Description: Initialize menu hiding and showing functionality on scroll of the page.
    *  @Param: fnName - Name of the function, To easily know what to unbind in the future.
    */
    // $.megaMenuInit = function(fnName){
        
    //     if ($('#headerMenu').length >0) {
    //         var $window = $(window),
    //         _previousScrollTop = null,
    //         _hideOffset =$('#headerMenu').outerHeight(), // height of the snapbar
    //         _visible = true,
    //         _windowHeight = $window.height(),
    //         $document = $(document),
    //         _navBar = $('.navbar'),
    //         _displayBot = true,
    //         speed = 300;
            
            
            
    //         //Event binding on scroll to show/hide the megamenu
    //         $window.bind("scroll."+fnName,function () {
    //             var scrollTop = $window.scrollTop(),
    //             scrollDelta = scrollTop - _previousScrollTop;
    //             _previousScrollTop = scrollTop;
                
    //             if (scrollTop <= 60) {
    //                 // setTimeout(function(){_navBar.addClass('animate').removeClass('navbar-white');},200);
    //                 _navBar.addClass('animate').removeClass('navbar-white');
    //                 if ($('body').hasClass('infobar-show')) {
    //                     setTimeout(function(){_navBar.removeAttr('style')},200);
    //                 }
    //                 // console.log('haha');
    //             }else {
    //                 _navBar.removeClass('animate');
    //                 if (scrollDelta < 0) {
    //                     if (_visible) {return;}
    //                     //if (scrollTop <= _hideOffset || _displayBot) { //Logic to show the megamenu when scroll reach the bottom of the page.
    //                         showNavBar();
    //                         _navBar.addClass('navbar-white');
    //                     //}
    //                 }else if (scrollDelta > 0) {
    //                     if (!_visible) {return;}
    //                     if (scrollTop >= _hideOffset) {
    //                         if (!_visible) {return;}
    //                         hideNavBar();
    //                     }
    //                 }
    //             }
    //         });

    //         //Show the mega menu
    //         function showNavBar(){
    //             _navBar.removeClass('navbar-hidden').stop().animate({
    //                 top: 0
    //             }, {
    //                 queue: false,
    //                 duration: speed
    //             });
    //             _visible = true;
    //         }

    //         //Hide the mega menu
    //         function hideNavBar() {
    //             _navBar.addClass('navbar-hidden').stop().animate({
    //                     top: - _navBar.outerHeight()
    //             }, {
    //                 queue: false,
    //                 duration: speed
    //             });
    //             $('.dropdown.open .dropdown-toggle', $('.navbar')).dropdown('toggle');
    //             _visible = false;
    //         }
    //     }
    // }

    // insert message here
    var infobarMessage = "Scheduled maintenance on 8 Dec 16 from 6am - 9am. Sorry for inconvenience.";

    // change Cookie name
    var cookieName = "infobar";


    if (!$.cookie(cookieName)) {

        $('body').prepend('<div class="infobar barclose"><div class="container"><div class="infobar-content"><p>' + infobarMessage + '</p></div><div class="infobar-close"><a href="#" id="infobar-close"></a></div></div></div>').delay(0).queue(function(){
            $('.infobar').removeClass('barclose');
        });
        $('body').addClass('infobar-show');


        // setTimeout(function(){
        // $('.popup-ebook').fancybox({
        //   width: 820,
        //   height: 480,
        //   minHeight: 480,
        //   padding: 8,
        // }).trigger('click');
        // }, 15000);

        // $.cookie('infobar', '1', {expires: 7});
      }

    

    $('#infobar-close').on('click', function(e){
        $(this).closest('.infobar').addClass('barclose');
        $('body').removeClass('infobar-show');
        $('.navbar').css('top', 0);
        e.preventDefault();
    });
}(jQuery));
/*
 *@Title: DBS DIGIBANK Custom Plugins
 *@Author: Redford Sumcad
 *@Description: Custom javascript plugins created for specific usage of DIGI BANK.
 *@Date Started: 1 May 2015
*/
$(function(){
	var $window = $(window),
		$body = $('body'),
		isMobileDevice = $.isDevice(),
		footer = $('#footer'),
		headerMenu = $('#headerMenu'),
		lang = $('html').attr('lang'),
		headerPage = lang === 'en'? '../resources/components/header.html': '../resources/components/header-id.html',
		footerPage = lang === 'en'? '../resources/components/footer.html': '../resources/components/footer-id.html',
		enLink = $('#lang-en'),
		idLink = $('#lang-id'),
		page = $('body').data('page');

		

		if ($body.hasClass('body-mobile-error') || $body.hasClass('sub-directory')) {
			headerPage="../components/headerEmail.html";
			footerPage = "../components/footerEmail.html";
		}

	function checkPage(){
		if (lang === 'en') {
			if (page === 'faq-results') {
				$('#lang-en').attr( 'href', 'faq-search-results.html');
				$('#lang-id').attr( 'href', '../id/faq-search-results.html');
			} else {
				$('#lang-en').attr( 'href', $('#nav-' + page).attr('href'));
				$('#lang-id').attr( 'href', $('#nav-' + page).data('lang'));
			}
		} else if (lang === 'id') {
			if (page === 'faq-results') {
				$('#lang-en').attr( 'href', '../en/faq-search-results.html');
				$('#lang-id').attr( 'href', 'faq-search-results.html');
			} else {
				$('#lang-en').attr( 'href', $('#nav-' + page).data('lang'));
				$('#lang-id').attr( 'href', $('#nav-' + page).attr('href'));
			}
		};
	};


	$('#headerMenu').load(headerPage,function(){
		var digiMenu = $('#digiMenu');
		checkPage();
		$('.mega-menu .collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
			e.preventDefault();
		});
		$('#mobMenu').on('click', function(e) {
			e.preventDefault();
			var elem = $($(this).data('target'));
			elem.toggleClass('in');
			if(elem.hasClass('in')){
				$body.addClass('mdl-body');
				// $body.append('<div class="modal-backdrop  in"></div>');
				setTimeout(function(){
					elem.addClass('animate-menu');	
				},100);
			}else{
				elem.removeClass('animate-menu');
				// $('.modal-backdrop.in').remove();
				$body.removeClass('mdl-body');
			}
		});
		
		//On click of the overlay modal will be removed.
		if (isMobileDevice) {
			
			$(document).on('touchstart click','.mdl-body',function(e){
				//Dont hide on click of links
				if (e.target.className != 'navbar-toggle' && e.target.className !=  'menu-link'){
					digiMenu.removeClass('in');
					// $('.modal-backdrop').remove();
					$body.removeClass('mdl-body');
				}
			});
		}
		$.setActiveMenuLink();
		
		if ($(this).hasClass('menu-white')) {
			$('#digiMenu .navbar-nav').addClass('nav-white');
			$('.navbar-header .navbar-brand').addClass('navbar-brand-white');
		}
	});
	//enable Chat
	$('#kasistoChat').load("components/chat.html",function(){
		$(this).removeClass('hide');
		$.loadImageInit();
		$.enableChat();
	});
	
	footer.load(footerPage, function(){
		checkPage();
	});
	refreshMegaMenu();
	$window.resize(function(){
		refreshMegaMenu();
	});
	

	$.inputOpacityInit('header .email input');
	
	$('.btn-callus').on('click',function(){
		$('body').scrollTo('#callId');
	});
	
	
	//$.footerGapInit();
	//$('.btn-askus').on('click',function(){
	//	$('body').scrollTo('#askId');
	//});
	
	
	/*!
	*  @Author: Redford Sumcad
	*  @Description: Initialize Megamenu in desktop version, remove the event in mobile device.
	*/
	function refreshMegaMenu(){
		var isDevice = $.isDevice();
		if( !(isDevice)) {
			$.megaMenuInit('megamenuscroll');
		}else{
			$window.unbind('.megamenuscroll');
			$('#headerMenu').removeAttr('style').removeClass('navbar-white');
		}
	}
	$.radioCheckFirefoxInit();
});


(function ($) {
	var $ipadWidth = 768,
		$iphoneSixHt = 360;
	
	/*
    *@Title: Kasist Chat
    *@Author: Redford
    *@Description: Enable Kasisto Chat
    * The first mobile web chat that works in all browsers and devices of IOS/android.
    */
	$.enableChat = function(){
		var inputField = $('#chatContent'),
		chatBody = $('#chatBody'),
		btnSend = $('#btnChat'),
		isRealDevice = $.isRealDevice(),
		kasistoIntroMsg = $('#kasistoMsg'),
		mdlChat = $('#mdlKasistoChat'),
		btnKasisto = $('#btnKasisto'),
		btnClose = $('#mdlKasistoChat .close'),
		pageBody = $('body');
		
		
		
		var isThereChatHistory = getChatHistory();
		if (isThereChatHistory == 'null') {
			setTimeout(function(){getChatAjax('Hi');},1000); //give some delay and hit the first ajax call
		}else{
			chatBody.html(isThereChatHistory);
		}
		
		
		$('#kasistoMsg,#btnKasisto').on('click',function(){
			kasistoIntroMsg.removeClass('bounceIn').fadeOut('slow');
			mdlChat.modal('show');
		});
		
		if (!isRealDevice) {
			inputField.on('focus',function(){
				$(this).removeAttr('placeholder');
			}).on('blur',function(){
				$(this).attr('placeholder','Ask your Virtual Assistant');
			});
		}else{
			$(window).one('scroll',function(){
				kasistoIntroMsg.addClass('fadeOut');
			});
			var isIos = $.isIOSDevice();
			if (isIos) {
				var _width= $(window).width(),
				_height= $(window).height();
				inputField.on('keyup focus',function(e){
					scrollFocusDevice(_width,_height);
				});
			}
		}
		
		setTimeout(function(){
			btnKasisto.show();
			setTimeout(function(){
				kasistoIntroMsg.addClass('bounceIn');
			},1500);
		},3000);
		
		//Show modal chat in mobile/desktop
		mdlChat.on('shown.bs.modal', function () {
			if (isMobileDevice) {
				zoomDisable();
				$(this).find('.modal-dialog').removeClass('slideOutDown').addClass('slideInUp');
				hideMobileContent();
			}else{
				pageBody.addClass('bg-blur');
				$(this).find('.modal-dialog').removeClass('slideOutDown slideInUp').addClass('fadeIn');
			}
			mdlChat.css('padding-right',0);
			resizeChatBox();
			$(window).bind("resize.kasistoChatResize", function(){
				resizeChatBox();
			});
			
			chatBody.scrollTop(chatBody[0].scrollHeight);
			if (isRealDevice) {
				$('.modal-backdrop.in').remove();
				btnKasisto.hide();
				chatBody.off().on('touchstart',function(){
					inputField.blur();
				});
			}
			$.isAndroidKarbonn();
		});
		
		//Hide modal chat in mobile/desktop
		if (isMobileDevice) {
			btnClose.on('click',function(){
				$('#mdlKasistoChat .modal-dialog').animate({
						height: "0%"
					}, 200, function() {
						$('#mdlKasistoChat .modal-dialog').removeAttr('style');
						hideChatMdl();
						mdlChat.modal('hide');
				});
				showMobileContent();
				btnKasisto.show();
			});
		}else{
			mdlChat.on('hidden.bs.modal', function () {
				pageBody.removeClass('bg-blur');
				showMobileContent();
				btnKasisto.show();
			});
			btnClose.on('click',function(){
				mdlChat.modal('hide');
				showMobileContent();
			});
		}
		function scrollFocusDevice(_width,_height){
			switch(_width){
				case 414:
					//Iphone 6 Plus
					_height= _height - (271 +111);
					break;
				case 375:
					//iphone 6
					_height= _height - (254 +37); //324 291
					break;
				case 320:
					//Lower versions of iphone
					_height= _height - (253-56);
					break;
			}
			//console.log(_height);
			window.scroll(0,_height);
		}
		function hideChatMdl(args) {
			$(window).unbind('.kasistoChatResize');
			showMobileContent();
		}
		function showMobileContent(){
			if (isRealDevice) {
				$('section,footer,header,nav').show();
			}
		}
		function hideMobileContent(){
			if (isRealDevice) {
				setTimeout(function(){
					$('section,footer,header,nav').hide();
				},400);
			}
		}
		btnSend.on('click',function(e){
			var _val = $.trim(inputField.val());
			if (_val.length >0) {
				appendChat(_val);
				getChatAjax(_val);
			}
			btnSend.removeClass('line-ht-twoRow line-ht-threeRow');
			inputField.focus();
			e.preventDefault();
		});
		
		$('#questionBox li>a').on('click',function(e){
			var _val= $(this).text();
			appendChat(_val);
			getChatAjax(_val);
			e.preventDefault();
		});
		
		var _txtBoxEvent = "keypress";
		if (isRealDevice) {
			_txtBoxEvent='keyup';
		}
		
		inputField.on(_txtBoxEvent,function(e){
			//$(window).scrollTop(window.outerHeight);
			var _val =$.trim($(this).val());
			if ((e.keyCode || e.which) == 13) {
				if (!isRealDevice) {
					if (_val!='') {
						appendChat(_val);
						getChatAjax(_val);
					}
					inputField.val('').removeAttr('style');
					btnSend.removeClass('line-ht-twoRow line-ht-threeRow');
					//btnHide();
					chatBody.scrollTop(chatBody[0].scrollHeight);
					e.preventDefault();
				}else{
					if (_val!='') {
						autoGrow(this);
					}
				}
			}else{
				if (_val!='') {
					autoGrow(this);
				}else{
					inputField.val('').removeAttr('style');
				}
			}
			
		});
		function btnShow() {
			if (isMobileDevice){
				btnSend.show();
			}
		}
		function btnHide() {
			if (isMobileDevice){
				btnSend.hide();
			}
		}
		function autoGrow(element) {
			
			if (isMobileDevice){
				//element.style.height = "28px";
				element.style.height = "30px";
			}else{
				element.style.height = "26px";
			}
			element.style.height = (element.scrollHeight)+"px";
			
			if (element.scrollHeight > 55) {
				btnSend.addClass('line-ht-threeRow');
			}else if (element.scrollHeight > 35 && element.scrollHeight < 50) {
				btnSend.addClass('line-ht-twoRow');
			}else{
				btnSend.removeClass('line-ht-twoRow line-ht-threeRow');
			}
		}
		function zoomDisable(){
			$('head meta[name=viewport]').remove();
			$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />');
		  }
		function zoomEnable(){
		  $('head meta[name=viewport]').remove();
		  $('head').prepend('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">');
		}
		function resizeChatBox(){
			var windowHt = $(window).height();
			var topBotHt = $('#mdlKasistoChat .chat-box-bottom').outerHeight() + $('#mdlKasistoChat .chat-box-title').outerHeight();
			chatBody.css('height',(windowHt - topBotHt));
		}
		
		function appendChat(_val){
			if (_val != '') {
				var mTop16= spacingCheck('chat-content');
				chatTpl = '<div class="chat-reply-box clearfix '+mTop16+'">'+
						'<div class="chat-reply">'+
						'	<span class="arrowright"></span>'+
						'	<p class="chat-msg"></p>'+
						'	</div>'+
						'</div>';
						
				chatBody.append(chatTpl);
				chatBody.find('.chat-reply-box:last .chat-msg').text(_val).html();
				chatBody.scrollTop(chatBody[0].scrollHeight);
				inputField.removeAttr('style').val('');
			}
		}
		function appendKasistoChat(_val){
			if (_val != '') {
				var mTop16= spacingCheck('chat-reply-box');
				chatTpl = '<div class="chat-content clearfix '+mTop16+'">'+
						'	<div class="chat-question">'+
						'		<span class="arrowleft"></span>'+
						'	<p class="chat-msg"></p>'+
						'	</div>'+
						'</div>';
						
				setTimeout(function(){
					chatBody.append(chatTpl);
					chatBody.find('.chat-content:last .chat-msg').html(_val).text();
					chatBody.scrollTop(chatBody[0].scrollHeight);
					inputField.removeAttr('style').val('');
					setChatHistory();
				},1000);
			}
		}
		function spacingCheck(lastMsgBox){
			var mTop16= '';
			if ($('#chatBody>div').last().hasClass(lastMsgBox)) {
				mTop16= 'mTop-16';
			}
			return mTop16;
		}
		function showServerError(){
			var mTop16= spacingCheck('chat-reply-box');
				chatTpl = '<div class="chat-content clearfix '+mTop16+'">'+
						'	<div class="chat-question">'+
						'		<span class="arrowleft"></span>'+
						'		<p><strong>I\'m sorry</strong>, we are experiencing some technical difficulties. Please try again later.</p>'+
						'	</div>'+
						'</div>';
				setTimeout(function(){
					chatBody.append(chatTpl);
					chatBody.scrollTop(chatBody[0].scrollHeight);
					inputField.removeAttr('style').val('');
					setChatHistory();						
				},1000);
		}
		var _headers = {
			'Content-Type':'application/json;charset=UTF-8',
			'T328JSS382RN':'067f592e-0f3e-48d5-9004-9c114255a15f'
		}
		function getChatAjax(question){
			requestData = {
				"vpa_request": {
					"text":{
						"data":question 
					},
					"custom_context_in":{ 
						"data":"{\"userInfo\":{\"token\":\"NOTOKEN\",\"userId\":\"PWEB\",\"deviceId\":\"WEB\"}}"
					},
					"user_context":{
						"user_id":"PWEB"
					}
				}
			}

			
			$.ajax({
				//url:"https://lbs-d06569da-d1b7-46af-95a8-e9f61f9a6b7d.kitsys.net/LolaServer/web",
				//url: "https://10.91.53.200:61443/LolaServer/web",
				//url: "https://dbsassistant-sit.dbsbank.in:61443/LolaServer/web",
				//url:"https://dbsassistant-uat.dbsbank.in/LolaServer/web",
				url: "/LolaServer/vpa",
				type: "POST",
				dataType: "json",
				xhrFields: { withCredentials: true },
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(requestData),
				success: function(data){
					if (typeof data.responseText === 'undefined') {
						showServerError();
					}else{
						var _newData = data.responseText;
						if (data.responseText.search('href')>0) {
							_newData = _newData.replace(/href=/g,'target="_blank" href=');
						}
						
						if (data.responseText.search('{{live-chat}}')>0) {
							_newData = _newData.replace(/{{live-chat}}/g,'');
						}
						appendKasistoChat(_newData);
					}
				},
				error: function(request, type, errorThrown){
					console.log(request);
					console.log(type);
					console.log(errorThrown);
					showServerError();
				},
				headers: _headers
			});
		}
		
		function setChatHistory(){
			sessionStorage.setItem('chatHistory', encodeURI($('#chatBody').html()));
		}
		function getChatHistory(){
			return decodeURI(sessionStorage.getItem('chatHistory'));
		}
	}
	
	/*
    *@Title: Menu Links
    *@Author: Redford
    *@Description: Set the active states of menus in the header
    */	
	$.setActiveMenuLink = function(){
		//set header active link
		var loc = window.location;
		var fileName = loc.pathname.substring(loc.pathname.lastIndexOf('/') +1, loc.pathname.lastIndexOf('.'));
		$('.menu-link[data-link="'+fileName+'"]').addClass('active');
	}	
	/*
    *@Title: Radio & Checkbox Firefox
    *@Author: Neeraj
    *@Description: Initialize radio and checkbox in firefox
    */
	$.radioCheckFirefoxInit = function(){
		if(navigator.userAgent.indexOf("Firefox") != -1){
			var radio = $('input[type=radio]');
			//var checkbox = $('input[type=checkbox]');       
			$(radio).after('<label></label>');
			//$(checkbox).after('<label></label>');
		}
	}
		
	/*!
	*  @author: Redford Sumcad
	*  @Description: Get the width of scrollbars in different browsers
	*/
	$.getScrollbarWidth = function() {
		var parent, child, width;
		if($('body').css('overflow-y') == "visible"){
			if(width===undefined) {
			  parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
			  child=parent.children();
			  width=child.innerWidth()-child.height(99).innerWidth();
			  parent.remove();
			}
		}else{
			width=0;
		}
	   return width;
	};
	
	/*!
	*  @author: Redford Sumcad
	*  @Description - Device checker, it will return true if its a device else it will return false
	*/
	$.isDevice = function(){
		var isMobile= false;
		$window = $(window);
		
		var scrollbarWidth = $.getScrollbarWidth();
		
		if (($window.outerWidth()+ scrollbarWidth) < $ipadWidth ) {
			isMobile = true;
		}
		return isMobile;
	}
	var isMobileDevice = $.isDevice();
	
	/*!
	*
	*  @Author:Timothy A. Perez
	*  @Modified by: Redford Sumcad
	*  @Description: scrolling animation on according to the element.
	*  @Param: target - Refers to the element to be scrolled
	*  		   options - Additional properties
	*  		   callback - After it scroll to the element this will be called
	*  @Usage:
	*  		$('body').scrollTo('#target');
	*		$('#content').scrollTo(500);
	*		$('body').scrollTo('#post-5',{duration:'slow', offsetTop : '50'});
	*/
	$.fn.scrollTo = function( target, options, callback ){
	  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
	  var settings = $.extend({
		scrollTarget  : target,
		offsetTop     : 50,
		duration      : 500,
		easing        : 'swing'
	  }, options);
	  return this.each(function(){
		var scrollPane = $(this);
		var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
		var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
		scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
			if (typeof callback == 'function') { callback.call(this); }
		});
	  });
	}
	
	/*!
	*
	*  @Author:Redford Sumcad
	*  @Description: Jquery extend containIgnoreCase function to match any text in uppercase or lower case
	*/
	$.extend($.expr[':'], {
		'containIgnoreCase': function(elem, i, match, array) {
		  return (elem.textContent || elem.innerText || '').toLowerCase()
			  .indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});
	
	/*!
	*  @Author: Redford Sumcad
	*  @Description: Initialize menu hiding and showing functionality on scroll of the page.
	*  @Param: fnName - Name of the function, To easily know what to unbind in the future.
	*/
	$.megaMenuInit = function(fnName){
		
		if ($('#headerMenu').length >0) {
			var $window = $(window),
			_previousScrollTop = null,
			_hideOffset =$('#headerMenu').outerHeight(), // height of the snapbar
			_visible = true,
			_windowHeight = $window.height(),
			$document = $(document),
			_navBar = $('.navbar'),
			_displayBot = true,
			speed = 300;
			
			
			
			//Event binding on scroll to show/hide the megamenu
			$window.bind("scroll."+fnName,function () {
				var scrollTop = $window.scrollTop(),
				scrollDelta = scrollTop - _previousScrollTop;
				_previousScrollTop = scrollTop;
				
				if (scrollTop ==0) {
					setTimeout(function(){_navBar.addClass('animate').removeClass('navbar-white');},500)
				}else{
					_navBar.removeClass('animate');
					if (scrollDelta < 0) {
						if (_visible) {return;}
						//if (scrollTop <= _hideOffset || _displayBot) { //Logic to show the megamenu when scroll reach the bottom of the page.
							showNavBar();
							_navBar.addClass('navbar-white');
						//}
					}else if (scrollDelta > 0) {
						if (!_visible) {return;}
						if (scrollTop >= _hideOffset) {
							if (!_visible) {return;}
							hideNavBar();
						}
					}
				}
			});
			//Show the mega menu
			function showNavBar(){
				_navBar.removeClass('navbar-hidden').stop().animate({
					top: 0
				}, {
					queue: false,
					duration: speed
				});
				_visible = true;
			}
			//Hide the mega menu
			function hideNavBar() {
				_navBar.addClass('navbar-hidden').stop().animate({
						top: - _navBar.outerHeight()
				}, {
					queue: false,
					duration: speed
				});
				$('.dropdown.open .dropdown-toggle', $('.navbar')).dropdown('toggle');
				_visible = false;
			}
		}
	}
	/*!
	*  @Author: Redford Sumcad
	*  @Description: Auto height any element to be in equal.
	*  @Param: element - Refers to the div/containers to have equal height.
	*/
	$.calculateHeight = function(element){
        if( !(isMobileDevice)) {
			var maxHeight = -1;
			//Give delay to re draw the elements before setting the heights.
			setTimeout(function(){
				$(element).each(function() {
					maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
				});
				$(element).each(function() {
					$(this).css('min-height',maxHeight);
				});
			},150);

		}
    }
	
	/*!
	*  @Author: Redford Sumcad
	*  @Description: Input text box opacity styling, On focus it will be more visible.
	*  @Param: element - Refers to the textbox/textarea elements.
	*/
	$.inputOpacityInit = function(element){
		var _element = $(element);
		_element.on('focus',function(){
			$(this).parents('.email').addClass('clear-opacity');
		});
		_element.on('blur',function(){
			$(this).parents('.email').removeClass('clear-opacity');
		});
	}

	/*!
	*  @Author: Redford Sumcad
	*  @Description: Enable client side search in htmls
	*  @Param: inputElem - refers to the textbox element
	*  		   contentElem - Element to show/hide which contains the search results
	*/
	
	$.clientSearchInit = function(inputElem,contentElem){
		$(inputElem).keyup(function() {
			var faqBox = $('#faqBox');
			if($.trim($(this).val()).length == 0){
				var clearfix = faqBox.find('.clearfix');
				if(clearfix.length > 0){
					clearfix.show();
				}
			}
			searchTextInit(contentElem, $(this).val());
			
		});
    }
	/*!
	*  @author: Redford Sumcad
	*  @Description: On form submit text search item will be filtered and showed.
	*  @Param: contentElem - Element to show/hide which contains the search results
	*  		   searchText - The text you are searching.
	*/
	$.showSearchText = function(contentElem,searchText){
		searchTextInit(contentElem,searchText);
    }
	/*!
	*  @author: Redford Sumcad
	*  @Description: clientSearchInit and showSearchtText Helper
	*  @Param: contentElem - Element to show/hide which contains the search results
	*  		   searchText - The text you are searching.
	*/
	function searchTextInit(contentElem,searchText){
		var boxElem = $('.mob-purple');
		var faqBox = $('#faqBox');
		$(contentElem)
			.hide()
			.filter(':containIgnoreCase("' + searchText + '")')
			.show();
		boxElem.find('.txt-error').hide();
		boxElem.each(function(obj){
			var _this = $(this),
			visibleBox = _this.find(".inside-content-box:visible").length,
			totalBox = _this.find(".inside-content-box").length;
			
			if(visibleBox == 0){
				_this.find('.count').html('('+0+')');
				if(_this.find('.txt-error').length == 0){
					_this.append('<label class="txt-error">No results found!</label>');
				}else{
					_this.find('.txt-error').show();
				}
			}else{
				_this.find('.count').html('('+visibleBox+')');
				if (visibleBox == totalBox) {
					faqBox.find('.clearfix').show();
				}else{
					faqBox.find('.clearfix').hide();	
				}
				
			}
		});
	}
	/*!
	*  @author: Redford Sumcad
	*  @Description: For mobile toggle event on show and hide for the menu
	*  @Param - mobileElem: Element to apply the click event
	*  			mobileContentElem: Element that hide/show on toggle.
	*/
	$.mobileToggleInit = function(mobileElem,mobileContentElem){
		var mobileToggle = $(mobileElem);
		if(isMobileDevice) {
			mobileToggle.on('click',function(){
				$(this).find(mobileContentElem).stop().slideToggle(400);
				$(this).find('.chevron').toggleClass('up');
			});
		}else{
			mobileToggle.unbind("click");
		}
	}
	
	/*!
	*	@author: Redford Sumcad
	*	@Description - Desktop/mobile image src loading. This is to optimize network loading in devices, 
	* 				To make sure that desktop images (1400px +) should not be loaded in device as it will be heavy for device to load.
	* 				Media queries cannot be use because height should be dynamic on window resize.
	*/
	$.loadImageInit = function(){
		var imgSrcElem = $('.img-src');
		if (imgSrcElem.length >0) {
			loadImageFn(isMobileDevice);
			
			$window.bind("resize.loadImageSrc",function(){
				isMobileDevice = $.isDevice();
				loadImageFn(isMobileDevice);
			});
		}
		
		function loadImageFn(isMobileDevice) {
			if(isMobileDevice) {
				loadImage(imgSrcElem,'mobile-src');
			}else{
				loadImage(imgSrcElem,'desktop-src');
			}
		}
		function loadImage(imgSrcElem,imgVersion){
			imgSrcElem.each(function(obj){
				var _this = $(this);
				_this.attr('src',_this.attr(imgVersion)).addClass('img-opacity');
			})
		}
	}
	
	
	/*!
	*  @author: Redford Sumcad
	*  @Description: On resize of the window, image will auto scale.
	*  @Param: fnName - Name of the function, To easily know what to unbind in the future.
	*  		   imageElem - Element which auto scale 
	*/
	$.headerImgAutoScaleInit = function(fnName,imageElem){
		$window = $(window);
		var height = $window.height();
		if (height > $iphoneSixHt) { //not in landscape height of iphone 6
			$(imageElem).css('height',$window.outerHeight());
			$window.bind("resize."+fnName,function(){
				if ($(window).outerHeight()>$iphoneSixHt) {
					$(imageElem).css('height',$window.outerHeight());
				}
			});
		}
	}
	/*!
	*  @author: Redford Sumcad
	*  @Description: On resize of the window, image will auto scale.
	*  @Param: fnName - Name of the function, To easily know what to unbind in the future.
	*  		   imageElem - Element which auto scale will be applicable
	*/
	$.countBoxVisible = function(elem){
		var count = $(elem+' .inside-content-box:visible').length;
		if (count != 0) {
			$(elem +' .count').html('('+count+')');
		}
	}
	
	/*!
	*  @author: Redford Sumcad
	*  @Description: Create the mobile version of deals.
	*/
	$.createDealsMobileInit = function(callback){
		var _finalHtml = '';
		var _mobileHtml = '';
		$('.deal-box[mobile-position]').each(function(i,o) {
			var content = $('.deal-box[mobile-position='+(i+1)+']').prop('outerHTML');
			_mobileHtml+= content;
			//if ((i+1)%2 == 0) {
			//	_finalHtml+= '<div class="col-md-4 col-sm-4">'+_mobileHtml+'</div>';
			//	_mobileHtml="";
			//}
		});
		_finalHtml+= '<div class="col-md-4 col-sm-4">'+_mobileHtml+'</div>';
		var mobileDeals = $('#mobileDeals');
		mobileDeals.html(_finalHtml).promise().done(function(){
			mobileDeals.find('[mob-href]').each(function(i,o) {
				 var _this = $(this);
				 var newHref = _this.attr('mob-href');
				 _this.attr('href',newHref);
			});
			mobileDeals.find('[mob-id]').each(function(i,o) {
				 var _this = $(this);
				 var newHref = _this.attr('mob-id');
				 _this.attr('id',newHref);
			});
		});
		if (typeof callback == 'function') { callback.call(this); }
	}
	/*!
	*  @author: Redford Sumcad
	*  @Description: Check if its real device
	*/
	$.isRealDevice = function(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	/*!
	*  @author: Redford Sumcad
	*  @Description: Check if its Android device
	*/
	
	$.isAndroidDevice = function(){
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		return isAndroid;
	}
	/*!
	*  @author: Redford Sumcad
	*  @Description: Fixed position css are not properly working in Android Karbonn Titanium Device. 
	*/
	$.isAndroidKarbonn = function(){
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("karbonn") > -1;
		if(isAndroid){
			var chatBoxBody = $('.chat-box');
			var textarea = $('.chat-box-bottom');
			$('#chatContent').on('focusin',function(){
				textarea.css({
					'position':'relative'
				});
				chatBoxBody.css({ 'overflow':'scroll','padding-bottom':'260px'});
				chatBoxBody.addClass('androidFix').scrollTop(chatBoxBody.height() + 100).removeClass("androidFix");
			});
			$('#chatBody').on('touchstart',function(){
				textarea.css({
					'position':'absolute'
				}).blur();
				chatBoxBody.css({ 'padding-bottom':'0'});
			});
			$('#chatBody').on('touchend',function(){
				hideKeyboard(textarea);
				
			});
			
			
		}
		function hideKeyboard(element) {
			element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
			element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
			setTimeout(function() {
				element.blur();  //actually close the keyboard
				// Remove readonly attribute after keyboard is hidden.
				element.removeAttr('readonly');
				element.removeAttr('disabled');
			}, 100);
		}
	}
		
	/*!
	*  @author: Redford Sumcad
	*  @Description: Check if its IOS device
	*/
	$.isIOSDevice = function(){
		return /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
	}
	
	/*!
	*  @author: Redford Sumcad
	*  @Description: Enable surveys functionality
	*/
	$.surveyQuestionInit = function(){
		$('input[type="radio"], input[type="checkbox"]').on("change",function(){
			var _this = $(this);
			if (_this.is(':checked')) {
				var subQuestion = _this.closest('li').find('.sub-question:first');
				if (_this.is(':checkbox')) {
					checkBoxShowHide(_this);
				}else{
					_this.closest('ul').closest('li').find('.sub-question').hide();
				}
				
				if(subQuestion.length > 0){
					if (!subQuestion.is(":visible")) {
						subQuestion.show();
						subQuestion.find('input[type="text"]:first').focus();
					}
				}
			}else{
				if (_this.is(':checkbox')) {
					_this.closest('li').find('.sub-question').hide();
				}
			}
		});
		function checkBoxShowHide(_this){
			
			_this.closest('ul').closest('li').find('.sub-question').each(function(o,j){
					var checkbox = $(j).closest('li').find('input[type="checkbox"]');
					if(checkbox.length>0){
						if (checkbox.is(':not(:checked)')) {
							 $(j).hide();
						}
					}
					
			});
			
		}
		$('#answerTopThree input[type="checkbox"]').on('change',function(){
			if ($('#answerTopThree input[type="checkbox"]:checked').length >=3) {
				  $('#answerTopThree input[type="checkbox"]:not(:checked)').attr('disabled','disabled');
			}else{
				$('#answerTopThree input[type="checkbox"]:not(:checked)').removeAttr('disabled');
			}
		});
		
		$('#notAwareOptionCb').on('change',function(){
			var cbGroup = $('#notAwareOptionId input[type="checkbox"]:not("#notAwareOptionCb")')
			if($(this).is(':checked')){
				cbGroup.removeAttr('checked').attr('disabled','disabled');
			}else{
				cbGroup.removeAttr('disabled');
			}
		});
		function getQuestionFilled(){
			var questionFilled = 0;
			$('.questionnaire-box').find('>li[data-required="true"]').each(function(i,o){
				var _this= $(this);
				var checkboxCount =$(o).find('input[type="checkbox"]:checked').length;
				var radioCount =$(o).find('input[type="radio"]:checked').length;
				if (checkboxCount> 0 || radioCount>0) {
					questionFilled++;
					_this.removeClass('tofill');
				}else{
					_this.addClass('tofill');
				}
			});
			return questionFilled;
		}
		function validateVisibleTextBox() {
			var count = 0;
			var validated = false;
			$('.questionnaire-box').find('>li[data-required="true"] input[type="text"]:visible').each(function(i,o){
				if($.trim($(o).val()).length ==0){
					count++
				}
			});
			if (count ===0) {
				validated =true;
			}else{
				validated =false;
			}
			
			return validated;
		}
		function scrollToError(scrollPos) {
			$('html, body').animate({
				scrollTop: scrollPos
			});
		}
		
		function isFilledYesNoSection(){
			var questionFilled = 0;
			var isFilled = false;
				var _this = $('input[data-validate="true"]:checked')
				if (_this.length>0) {
					var subSection = _this.closest('li').find('.sub-question');
					var checkboxCount =subSection.find('input[type="checkbox"]:checked').length;
					var radioCount =subSection.find('input[type="radio"]:checked').length;
					
					if (checkboxCount > 0 || radioCount>0) {
						questionFilled++;
						_this.removeClass('toFillYesNo');
						
					}else{
						_this.addClass('toFillYesNo');
					}
					if (questionFilled>0) {
						isFilled=true;
					}else{
						isFilled=false;
					}
				}else{
					isFilled=true;
				}
				return isFilled;
		}
		
		$('#btnSubmit').on('click',function(e){
			var questionCount = $('.questionnaire-box').find('>li[data-required="true"]').length;
			var filledCount = getQuestionFilled();
			var isYesNoFilled = isFilledYesNoSection();
			//var checkVisibleTextbox = validateVisibleTextBox();
			
			if (questionCount==filledCount ) {
				//if (checkVisibleTextbox) {
					if (isYesNoFilled) {
						//window.location.href="survey-confirmation.html";
						$( "#questionForm").submit();
					}else{
						var scrollPos =  $('.toFillYesNo:first').offset().top -  ($('#headerMenu').height() + 50);
						scrollToError(scrollPos);
					}
				//}else{
				//	var getInvalidInput =  $('.questionnaire-box').find('>li[data-required] input[type="text"]:visible').filter(function(){return this.value==''});
				//	var scrollPos =  $(getInvalidInput[0]).offset().top -  ($('#headerMenu').height() + 50);
				//	scrollToError(scrollPos);
				//	$(getInvalidInput[0]).focus();
				//}
			}else{
				var scrollPos = $('.questionnaire-box').find('>li.tofill:first').offset().top -  ($('#headerMenu').height() + 50);
				scrollToError(scrollPos);
			}
			e.preventDefault();
		});
		
	}


	//

	$('.screenVA, .screenPFM, .screenSoftToken, .dePhone, .safetyPhone').css('opacity','0');

	if ($('body').hasClass('features')) {
		$('.screenSoftToken').on('inview', function(event, isInView) {
			if (isInView && $('.debitCard').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend')) {
				$('.screenSoftToken').delay(500).queue(function(){
					$(this).addClass('animated fadeInLeft');
				});
			};	
		});

		$('.screenVA').on('inview', function(event, isInView) {
			if (isInView) {
				$(this).addClass('animated fadeInRight');
			}
		});

		$('.screenPFM').on('inview', function(event, isInView) {
			if (isInView) {
				$(this).addClass('animated fadeInLeft');
			}
		});
	};

	if($('body').hasClass('home')) {
		$('.dePhone').on('inview', function(event, isInView) {
			if (isInView) {
				$(this).addClass('animated fadeIn');
			}
		});

		$('.safetyPhone').on('inview', function(event, isInView) {
			if (isInView) {
				$(this).addClass('animated fadeInLeft');
			}
		});
	};
	
	
}(jQuery));


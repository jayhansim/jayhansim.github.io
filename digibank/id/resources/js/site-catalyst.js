/*Last modified by Rajeev 13th NOV - Sitecatalyst Phase2 - FullPage*/
var debug=1;
$(document).ready(function () {

//Product Info Component        
 if ($(".sub-nav-ul.productInfo").length == 0) 
 {
 var smeFlag=getSegMent();
"console" in window && console.log("Site name"+smeFlag);
   if (smeFlag.indexOf('sme') > -1) { // Added condtion as its not applicable for SME sites
		if (debug) {
            "console" in window && console.log('inside SME Site');
        }
        } else {
		if (debug) {
            "console" in window && console.log('inside else Site');
        }
    return;
        }
 } else {
		var selectedTab = "";
		var urlPathName = window.location.pathname;
		var level_name = urlPathName.match(/\/((\w+\-*\_*\w*\-*\_*\w*\-*\_*\w*\-*\_*\w*))\/((\w+\-*\_*\w*\-*\_*\w*\-*\_*\w*\-*\_*\w*)).page/);
		level_name = level_name[1];
		var tab_var = $(".sub-nav-ul.productInfo li.active").text();
		
		//On Click of the tabs highlighted 
		$(".sub-nav-ul.productInfo li").click(function (eventObject) 
		{
			selectedTab = $(this).text();
			pageTabSwitch(level_name+ "|" + selectedTab);
		});
		
		if(selectedTab == "")
		{
			var tab_var_productInfo = $(".sub-nav-ul.productInfo li.active").text();
			if(tab_var_productInfo != "")
			{
				selectedTab = tab_var_productInfo;
			}
		}
		
		//if an expandable tab(+) is clicked on within the red boxes
		$('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (eventObject) {
                var $this = $(this),
                target = $this.attr('data-target')
				$(target).hasClass('in') ?  pageTabSwitch(level_name+ "|" + selectedTab + "|"  + $(this).next('.large').text()) : null
        })
		       
	}	
/*Starts- Added for Currency Converter--(22-07-2014)*/
    $("#firstCurrencyInput").one("keypress", function() {
        var titleText = $('span.seo-title').text();
        if (debug) {
            "console" in window && console.log('Currency Converter-->' + titleText);
        }
        if (!titleText) {
            titleText = "Currency Convertor";
            if (debug) {
                "console" in window && console.log('inside !titleText' + titleText);
            }
        }
        var ieFlag = false;
        if ($("#secondCurrencyInput").val()) {
            var secondCurrencyInput = $("#secondCurrencyInput").val();
            if (secondCurrencyInput.indexOf("Transfer Amount") > -1) {
                ieFlag = false;
            } else {
                ieFlag = true;
            }
        } else {
            ieFlag = true;
        }
        if (ieFlag) {
            if (debug) {
                "console" in window && console.log('Inside for the first Time' + titleText);
            }
            setCurrencyConerterTracking(titleText);
        }
    });
    $("#secondCurrencyInput").one("keypress", function() {
        var titleText = $('span.seo-title').text();
        if (!titleText) {
            titleText = "Currency Convertor";
        }
        var ieFlag = false;
        if ($("#firstCurrencyInput").val()) {
            var firstCurrencyInput = $("#firstCurrencyInput").val();
            if (firstCurrencyInput.indexOf("Transfer Amount") > -1) {
                ieFlag = false;
            } else {
                ieFlag = true;
            }
        } else {
            ieFlag = true;
        }
        if (ieFlag) {
            if (debug) {
                "console" in window && console.log('Inside for the first Time' + titleText);
            }
            setCurrencyConerterTracking(titleText);
        }
    });
    /*Ends- Added for Currency Converter--(22-07-2014)*/
    /* Starts FAQ Tracking */
    $('div.faq').each(function() {
        var group = $(this);
        $('button', group).each(function() {
            var button = $(this);
            button.live('click', function() {
                if ($(this).hasClass("collapsed")) {
                    if ($(this).next('span').text()) {
                        if (debug) {
                            "console" in window && console.log('FAQ Tracking' + $(this).next('span').text());
                        }
                        setFAQTracking($(this).next('span').text());
                    }
                }
            });
        });
    });
    /* Ends FAQ Tracking */
    /* Starts Frequent Forms Download Tracking */
    $(".frequently-used-forms .doc-link a").click(function() {
        var formTitle = $(".frequently-used-forms h2").text();
        if ($(this).text()) {
            if (!formTitle) {
                formTitle = "Frequently Used Forms";
            }
            if (debug) {
                "console" in window && console.log('Frequently Used Forms Tracking' + $(this).text() + "FormTitle" + formTitle);
            }
            setFrequentlyUsedFormsDownloadTracking($(this).text(), formTitle);
        }
    });
    /* Ends Frequent Forms Download Tracking */
	/*Added for Products Tracking*/
	 var defaultSelectedProducts="";
/*$('.product-browser .tabbed-nav li.active').each(function() {
defaultSelectedProducts = $(this).text();
});*/
	var selectedProduct=""; 
	 $(".product-browser .tabbed-nav li").click(function(eventObject) {
        if ($(this).text()) {
		selectedProduct=$(this).text();
            if (debug) {
                "console" in window && console.log('Page Tab Tracking' + $(this).text());
            }
            pageTabSwitch($(this).text());
        }
    });
	if(!selectedProduct&&defaultSelectedProducts){
	 if (debug) {
                "console" in window && console.log('Page Tab Tracking for the First Time)' );
            }
	pageTabSwitch(defaultSelectedProducts);
	}
	/*Added for Products Tracking*/
    /* Starts Day2DayListTracking */
    $(".product-details ul li span a").click(function() {
        if ($(this).text()) {
            if (debug) {
                "console" in window && console.log('Day2DayListTracking' + $(this).text());
            }
            Day2DayListTracking($(this).text());
        }
    });
	$("div.free-text-block-en ul li div span a").click(function (eventObject) 
		{
			  if (debug) {
                "console" in window && console.log('inside link Tracking' + $(this).text());
            }
			   Day2DayListTracking($(this).text());
		});

			$("div.tabbed-content ul li div span a").click(function (eventObject) 
		{
			  if (debug) {
                "console" in window && console.log('inside link Tracking' + $(this).text());
            }
			   Day2DayListTracking($(this).text());
		});
			//Added for english taiwan tracking
$("div.free-text-block-cn ul li div span a").click(function (eventObject) 
		{
			  if (debug) {
                "console" in window && console.log('inside link Tracking' + $(this).text());
            }
			   Day2DayListTracking($(this).text());
		});
    /* Ends Email US Form Tracking */
    $(".tabbed-nav li.active").click(function(eventObject) {
        if ($(this).text()) {
            if (debug) {
                "console" in window && console.log('Page Tab Tracking' + $(this).text());
            }
            pageTabSwitch($(this).text());
        }
    });
    //Starts -Internal Campaign Tracking HomePage
    $('div.landing-page-hero-content a').each(function() {
        var $this = $(this),
            aHref = $this.attr('href'); //get the value of an attribute 'href'
        //get the value of an attribute 'href'
        if (aHref && !isURLWithPID(aHref) && isURLValidForPID(aHref)) {
            var strBank = "dbs";
           var strSegment = getSegMent();
            var strMarket =  getCountry();
            var strCurrentSection = "homepage";
            var strPlacement = "homepagebanner";
            var strCampaignName = cleanText($this.find('div.seo-carousel-title').text());
            var strCTAName = cleanText($this.find(' p.intro-text b').text());
            aHref = formatURLWithPID(aHref, strBank, strMarket, strSegment, strCampaignName, strCurrentSection, strPlacement, strCTAName);
            if (debug) {
                "console" in window && console.log('Internal Campaign Tracking href(HomePage)-->' + aHref);
            }
            $this.attr('href', aHref); //set the value of an attribute 'href'
        }
    });
    //Ends -Internal Campaign Tracking HomePage
    //Starts -Added for Day2Day Section Tracking
    $('.promo-hero-block .carousel-inner .item').each(function() {
        var $this = $(this),
            aHref = $this.attr('href'); //get the value of an attribute 'href'
		  "console" in window && console.log('inside promo hero carosel' + aHref);
        //get the value of an attribute 'href'
        var strBank = "dbs";
           var strSegment = getSegMent();
            var strMarket =  getCountry();
        var strCurrentSection = "daytoday";
        var strPlacement = "sectionbanner";
        var strCampaignName = cleanText($this.find('.seo-carousel-title > a').text());
        if (strCampaignName.length == 0) {
            strCampaignName = cleanText($this.find('h2 > a').text());
        }
        var strCTAName = cleanText($this.find('a.pull-right').text());
        var strURL = location.href;
        if (strCTAName) {
            $(this).find('a').each(function() {
                aHref = $(this).attr('href');
				 "console" in window && console.log('inside promo hero carosel before if' );
                if (!isURLWithPID(aHref) && isURLValidForPID(aHref)) {
					 "console" in window && console.log('inside promo hero carosel inside if' );
                    aHref = formatURLWithPID(aHref, strBank, strMarket, strSegment, strCampaignName, strCurrentSection, strPlacement, strCTAName);
                    if (debug) {
                        "console" in window && console.log('inside if condition --> PID' + aHref);
                    }
                             //set the value of an attribute 'href'
                $(this).attr('href', aHref);
				 "console" in window && console.log('inside promo hero carosel inside if after setting href' );
				  }
				   "console" in window && console.log('inside promo hero carosel outsideif' );
            });
        }
    });
    //Ends -Added for Day2Day Section Tracking
    //Starts -Added for Related Products Section Tracking
    $('div.related-products .product-preview a').each(function() {
        var $this = $(this),
            aHref = $this.attr('href'); //get the value of an attribute 'href'
        //get the value of an attribute 'href'
        //if (aHref && !isURLWithPID(aHref)) {
        if (aHref && !isURLWithPID(aHref) && isURLValidForPID(aHref)) {
            var strBank = "dbs";
             var strSegment = getSegMent();
            var strMarket =  getCountry();
            var strCurrentSection = "services-insurance-commercialgeneralinsurance";
			var strCurrentSectionFromBreabCrumb=$('div.seo-div-breadcrumb').text();
			var currentSectionFromBC="";
			if(strCurrentSectionFromBreabCrumb){
				var res = strCurrentSectionFromBreabCrumb.split(">");
				for (var i = 0; i < res.length; i++) {
					var tempVaribale=res[i];
					tempVaribale=tempVaribale.replace(/\s/g, '');
					tempVaribale=tempVaribale.toLowerCase();
					if(i==res.length-1){
					currentSectionFromBC+=tempVaribale;
					}else{
					currentSectionFromBC+=tempVaribale+"-";					
					}
				}
			}
			if(currentSectionFromBC){
			strCurrentSection=currentSectionFromBC;
			}
			   if (debug) {
                "console" in window && console.log('Current Section from BC' + currentSectionFromBC);
            }			
            var strPlacement = "relatedproductssection";
            var strCampaignName = "relatedproductlinks";
            var strCTAName = cleanText($this.find('h3').text());
            aHref = formatURLWithPID(aHref, strBank, strMarket, strSegment, strCampaignName, strCurrentSection, strPlacement, strCTAName);
            if (debug) {
                "console" in window && console.log('Internal Campaign Tracking href(Releated Products)-->' + aHref);
            }
            $this.attr('href', aHref); //set the value of an attribute 'href'
        }
    });
    //Ends -Added for Related Products Section Tracking	
		
});

//Tabbed Content Component - Page Tabs Switch 

	$(".tabbed-content .hidden-phone.tabbed-nav.tabs li").click(function (eventObject) {
		var $selectedLi = $(this);
		var category = $selectedLi.text();
		pageTabSwitch(category);
	});

 
//Article Discovery Block Component Tabs Switch
$(".article-discovery-block .article li").click(function (eventObject) {
	var $selectedLi = $(this);
	var category = $selectedLi.text();
	var urlPathName = window.location.pathname;
	var level_name = urlPathName.match(/\/((\w+\-*\_*\w*\-*\_*\w*\-*\_*\w*))\/((\w+\-*\_*\w*\-*\_*\w*\-*\_*\w*)).page/);
	level_name = level_name[1];	
	pageTabSwitch(level_name +"|"+category);
});

//Article detail page - ArticleAction component
$(".article-actions a.call-to-action").click(function (eventObject) {
  var $selectedLink = $(this);
  var actionText = $selectedLink.text();
  if(actionText.toLowerCase().indexOf('pdf') != -1)
  {	
	downloadClick($('.clearfix.article-summary h1').text());
  }
});

//Article browser component Tabs Switch - landing Page
$(".article-browser .tabbed-nav.article li").click(function (eventObject) {
	var $selectedLi = $(this);
	var category = $selectedLi.text();
	pageTabSwitch(category);
});
/*Added for SME BY Muthamil- Starts*/
function formatURLWithPID(releavantPageURL, strBank, strMarket, strSegment, strCampaignName, strCurrentSection, strPlacement, strCTAName) {
    //?pid=dbs_tw_sme_relatedproductslinks_daytoday-waystobank-onlinebankingideal_relatedproductssection_entrepreneursaccount
    var SEPERATOR = "_";
    var CONSTANT = "?pid=";
    return releavantPageURL + CONSTANT + strBank + SEPERATOR + strMarket + SEPERATOR + strSegment + SEPERATOR + strCampaignName + SEPERATOR + strCurrentSection + SEPERATOR + strPlacement + SEPERATOR + strCTAName;
}
function isNotEmpty(inputString) {
    if (inputString.value.length == 0) {
        return false;
    }
    return true;
}
function cleanText(inputString) {
    return inputString.replace(/([~!@#$%^&*\-()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '');
}
function isURLValidForPID(strURL) {
	 "console" in window && console.log('calling getSegMent');
	 "console" in window && console.log('inside isURLValidForPID strURL-->' + strURL);
var smeFlag=getSegMent();
"console" in window && console.log('calling getSegMent' + smeFlag);
"console" in window && console.log('inside isURLExternal strURL-->' + strURL);
if (smeFlag.indexOf('sme') > -1) {
	"console" in window && console.log('segment is sme' + smeFlag);
   if (strURL.indexOf('https://') !== -1 || strURL.indexOf('http://') !== -1) {
       if (debug) {
           "console" in window && console.log('inside isURLExternal strURL-->' + strURL);
       }
		"console" in window && console.log('inside https if' + smeFlag);
        return false;
   } else {
		"console" in window && console.log('inside else' + smeFlag);
       return true;
   }
	}else {
	"console" in window && console.log('Skipping for Treasures');
       return false;
   }
}
function isURLWithPID(strURL) {
    return strURL.indexOf("?pid=") > -1;
}

function getCountry(){
	return "id";
	}
	function getSegMent() { 

			var urlPathName = window.location.pathname;
			var segmentName = urlPathName.match(/\/((\w+\-*\_*\w*\-*\_*\w*\-*\_*\w*)).*/);		
			if(segmentName[1] == "in" || segmentName[1] == "id"){
			segmentName = segmentName[0].split("/")[2];
			}else{
				segmentName = segmentName[1];
			}
			
			if(segmentName.indexOf('treasures-private-client') != -1)
			{		
				segmentName = 'tpc';
			}else if(segmentName.indexOf('private-banking') != -1)
			{		
				segmentName = 'private-bank';
			}else if(segmentName.indexOf('personal') != -1)
			{		
				segmentName = 'personal';
			}else if(segmentName.indexOf('treasures') != -1)
			{		
				segmentName = 'treasures';
			}else if(segmentName.indexOf('sme') != -1)
			{		
				segmentName = 'sme';
			}
				

	
	"console" in window && console.log('segment'+segmentName);
	   		return segmentName;
	}
/*Added for SME BY Muthamil- Ends*/
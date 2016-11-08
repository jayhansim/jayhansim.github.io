$(function(){
    
    var lang = $('html').attr('lang'),
        jsonURL = lang === 'en' ? '../resources/data/faq-indo.json' : '../resources/data/faq-indo-bahasa.json';


    $.clientSearchInit("#searchBox",".inside-content-box");

    $('#faqSearch').on('click',function(){
        window.location='faq-search-results.html?search='+$('#searchBox').val()+'';
        e.preventDefault();
    });

    
    
    
    $.ajax({
        url: jsonURL,
        method:"GET",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success:function(json){
            var html ='';
            var showChar = 250;
            $.each(json.Data.Content, function (key, data) {
                                      
                html = '<div  class="lbl-content-box mob-purple"> '+
                '        <h4>'+data.ProductCategory+' <span class="count">('+data.Count+')</span></h4>'+
                '        <div class="row">';
                
                //Generate the categories Content
                $.each(data.ProductData,function(index,prodData){
                    var _answer  = prodData.answer;
                    var  preText ='';
                    html+='<div class="inside-content-box col-md-4 col-sm-4"> '+
                        '     <label><span class="title">'+prodData.question+'</span><span class="chevron"></span></label> '+
                        '     <div class="mob-content-box"><div class="faq-full-content hide">'+_answer+'</div><div class="hidden-xs faq-preview-content">';
                    
                    if (_answer.length > showChar) {
                        preText = _answer.replace(/(<([^>]+)>)/ig,"").substr(0, showChar);
                        //preText = html_substr(_answer, showChar)    ;
                        
                        html+= preText+'...</div><p class="hidden-xs"><a href="#" class="see-more">more <span class="icons arrow-left-small"></span></a></p>';
                    }else{
                        html+=_answer+'</div>';
                    }
                       
                    html+='</div></div>';
                    if ((index+1)%3 == 0) {
                        html+='<div class="clearfix"></div>';
                    }
                });
                
                html+='</div></div>';
                $('#faqBox').append(html);
                
            });
           
            //Toggle function  
            $('.see-more').on('click',function(e){
                var _this = $(this),
                parent = _this.parents('.mob-content-box'),
                fullContent = parent.find('.faq-full-content'),
                previewContent = parent.find('.faq-preview-content');
                
                if (fullContent.hasClass('hide')) {
                    fullContent.removeClass('hide');
                    previewContent.hide();
                    _this.remove();
                    
                }
                e.preventDefault();
            });
            
            $.mobileToggleInit('.mob-toggle-box .inside-content-box','.mob-content-box');
    
        },
        error: function (xhr, status, error){
           console.log(error + " - ajax not fetch" + status);
        },
        timeout:10000 
    });


    function html_substr( str, count ) {

        var div = document.createElement('div');
        div.innerHTML = str;
        
        walk( div, track );
        
        function track( el ) {
            if( count > 0 ) {
                var len = el.data.length;
                count -= len;
                if( count <= 0 ) {
                    el.data = el.substringData( 0, el.data.length + count );
                }
            } else {
                el.data = '';
            }
        }
        
        function walk( el, fn ) {
            var node = el.firstChild;
            do {
                if( node.nodeType === 3 ) {
                    fn(node);
                } else if( node.nodeType === 1 && node.childNodes && node.childNodes[0] ) {
                    walk( node, fn );
                }
            } while( node = node.nextSibling );
        }
        return div.innerHTML;
    }
});


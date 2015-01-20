function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function getUserData()
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var userData = {};

    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');

        if(!userData[sParameterName[0]]) userData[sParameterName[0]] = [];
        userData[sParameterName[0]].push(sParameterName[1]);
    }

    _.each(userData, function(item, index) {
      userData[index] = userData[index].join(',');
      userData[index] = unescape(userData[index]);
      userData[index] = userData[index].replace(/\+/g, ' ');
    });

    if(typeof userData['salary'] != 'undefined') {
        userData['min_salary'] = (userData['salary'] + '').replace(/(.*)RM/, '').split('-')[0];
    }

    return userData;
}

var cookie_utm_src = typeof utmcsr != "undefined" ? utmcsr : '';
var cookie_utm_medium = typeof utmcmd != "undefined" ? utmcmd : '';
var cookie_utm_campaign = typeof utmccn != "undefined" ? utmccn : '';

var utm_source = getQueryVariable('utm_source') ? getQueryVariable('utm_source'): cookie_utm_src;
var utm_medium = getQueryVariable('utm_medium') ? getQueryVariable('utm_medium'): cookie_utm_medium;
var utm_term = getQueryVariable('utm_term') ? getQueryVariable('utm_term'): '';
var utm_content = getQueryVariable('utm_content') ? getQueryVariable('utm_content'): '';
var utm_campaign = getQueryVariable('utm_campaign') ? getQueryVariable('utm_campaign'): cookie_utm_campaign;

var JAPP = {
    config: {
        servers: {
            get_default: function() {
                return 'https:' == document.location.protocol ? this.prod : this.dev;
            },
            dev: {
                api_key: 'b43fd3fb4d6ffc1b3470593e3e6a7b16-us5',
                url: 'http://dev.formapp.ly/api/save/submission',
                campaigns: {
                    smart_search_2: '54acdeebdaaf453e7b8b4568',
                    call_me_back: '5493767ca57d69714e8b4567'
                }
            },
            prod: {
                api_key: 'b43fd3fb4d6ffc1b3470593e3e6a7b16-us5',
                url: 'https://apply.imoney.my/api/save/submission',
                campaigns: {
                    smart_search_2: '54acdeebdaaf453e7b8b4568',
                    call_me_back: '5493767ca57d69714e8b4567'
                }
            }
        }
    },
    createSubmissionWithProduct: function(product, callback, callback_params) {
        var params = getUserData();
        params['campaign_id'] = this.config.servers.get_default().campaigns.smart_search_2;
        params['product_name'] = product.name;
        params['nid'] = product.nid;

        submitToJapp(params, callback, callback_params);

        return false;
    }
};

function submitPreferToTalk(form, callback) {
    var params = {
        'campaign_id': JAPP.config.servers.get_default().campaigns.call_me_back,
        'NAME': $(form).find("input[name='name']").val(),
        'EMAIL': $(form).find("input[name='email']").val(),
        'PHONE': $(form).find("input[name='phone']").val(),
    };

    submitToJapp(params, function(error, eventName, params) {
        if(eventName == 'beforeSend') {
            $(form).find('button').html('Saving...').attr('disabled', 'disabled');
        }
        if(eventName == 'complete') {
            $(form).find('button').html('Done!');
            if(typeof callback == 'function') callback(null, form, 'done');
        }
    });

    return false;
}

function submitToJapp(params, callback, callback_params) {
    if(!params) return;
    
    var seoData = {
        'UTSOURCE'  : utm_source,
        'UTMEDIUM'  : utm_medium,
        'UTTERM'    : utm_term,
        'UTCONTENT' : utm_content,
        'UTCAMPAIGN': utm_campaign
    }

    params = _.defaults(params, seoData);

    var data = {
        apikey: JAPP.config.servers.get_default().api_key,
           merge_vars: params
    }

    jQuery.ajax({
        type: "POST",
        url: JAPP.config.servers.get_default().url,
        data: data,
        dataType: 'jsonp',
        beforeSend: function () {
            if(typeof callback == 'function') callback(null, 'beforeSend', params, callback_params);
        }
    }).complete(function () {
        if(typeof callback == 'function') callback(null, 'complete', params, callback_params);
    });
}
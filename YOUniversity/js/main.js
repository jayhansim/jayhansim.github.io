$(document).ready(function(){

  // newsletter signup
  $('#newsletterSignUp').submit(function(e){

    var data = {
      ajax : 'true',
      apikey : 'ec610f63ed8de9882a845729476d9f42-us9',
      id : '82d33dcd55',
      email_address: $('#newsletterName').val(),
      output: 'jsonp',
      double_optin: 'false',
      update_existing : 'true',
      merge_vars : {
        'EMAIL' : $('#newsletterName').val()
      }
    };

    $.ajax({
      type : 'POST',
      url : 'http://us9.api.mailchimp.com/1.3/?method=listSubscribe',
      data : data,
      dataType : 'jsonp',
      beforeSend : function(){
        $('#btn-newsletterSubmit').text('Submitting...');
      }
    }).complete(function(){
      $('.input-group').fadeOut(function(){
        $('#newsletterSignUp').append('<h5>Thanks for signing up! :D</h5>').hide().fadeIn();
      });
    });

    e.preventDefault();
  });
});

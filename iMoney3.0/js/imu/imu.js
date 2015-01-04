var socketManager = {
  socket: null,
  init: function() {
    this.socket = io.connect('http://128.199.118.214:8080');
  }
}

var IMUTrack = function(data) {
  var that = this;
  this.language = jQuery('html').attr('lang');
  this.url = window.location.href;
  this.useragent = navigator.userAgent;

  _.each(data, function(item, key) {
    that[key] = item;
  })
}

var userManager = {
  data: {
    id: null,
    tracks: []
  },
  init: function() {
    this.data.id = jQuery.cookie('userId');
  },
  identifyUser: function() {
    var that = this;
    this.data.keywords = this.getPageKeywords();

    socketManager.socket.json.send({
      type: 'track',
      data: that.data
    });
  },
  setUser: function(data) {
    this.data = data;
    jQuery.cookie('userId', this.data.id, { expires: 365, path: '/' });
  },
  getPageKeywords: function() {
    var keywords = [];
    if(jQuery('meta[name="keywords"]') && jQuery('meta[name="keywords"]').attr('content')) {
      keywords = jQuery('meta[name="keywords"]').attr('content').split(',');
    }

    return keywords;
  },
  trackEvent: function(category, action, label) {
    if(typeof this.data.tracks == 'undefined') this.data.tracks = [];

    this.data.tracks.push({
      category: category,
      action: action,
      label: label
    });

    socketManager.socket.json.send({
      type: 'identify',
      data: this.data
    });
  },
  track: function(data) {
    if(typeof this.data.tracks == 'undefined') this.data.tracks = [];

    this.data.tracks.push(data);

    socketManager.socket.json.send({
      type: 'track',
      data: this.data
    });
  }
};

jQuery(function() {
  "use strict";

  socketManager.init();
  userManager.init();

  socketManager.socket.on('connect', function () {
    var imuTrack = new IMUTrack({
      action: 'user-visit'
    });

    //console.log(imuTrack);
    userManager.track(imuTrack);

    socketManager.socket.on('track', function(data) {
      userManager.setUser(data);
    });

    socketManager.socket.on('disconnect', function() {
      console.log('Disconnected from IMU');
    });
  });

  $('select.imu-track').change(function() {
    if (typeof userManager == 'undefined') return;

    var imuTrack = new IMUTrack({
      region: $(this).data('region'),
      action: $(this).data('action'),
      vertical: $(this).data('vertical'),
      value: $(this).val()
    });

    //iMoney event tracker
    userManager.track(imuTrack);

  });

  $('button.imu-track, a.imu-track').click(function() {
    imuTrackEvent.apply(this, arguments);
  });
  
  $('input.imu-track[type=text]').blur(function() {
    imuTrackEvent.apply(this, arguments);
  });

  var imuTrackEvent = function() {
    if (typeof userManager == 'undefined') return;

    var dataval = $(this).data('value');
    if(dataval.length > 0 && dataval.charAt(0) == '$') {
      dataval = eval(dataval);
    }

    var imuTrack = new IMUTrack({
      region: $(this).data('region'),
      action: $(this).data('action'),
      vertical: $(this).data('vertical'),
      value: dataval
    });

    console.log(imuTrack);

    //iMoney event tracker
    userManager.track(imuTrack);
  }
});

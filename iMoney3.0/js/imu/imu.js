var socketManager = {
    socket: null,
    init: function () {
        this.socket = io.connect('https://im.imoney.my');
    }
}

var IMUTrack = function (data) {
    var that = this;
    this.timestamp = new Date().getTime();
    this.language = jQuery('html').attr('lang');
    this.url = window.location.href;
    this.useragent = navigator.userAgent;
    this.synced = false; //synced with server flag

    _.each(data, function (item, key) {
        that[key] = item;
    });
}

var IMUTrackFactory = (function () {
    var storeKey = 'imu';
    var fallbackStorage = [];

    return {
        getAll: function() {
            if(!store.enabled)
                return fallbackStorage;

            return store.get(storeKey);
        },
        getAllUnsynced: function() {
            return _.where(this.getAll(), {synced: false});
        },
        setIsSynced: function(timestamp, flag) {
            var list = this.getAll();

            _.each(list, function(item, index) {
                if(item.timestamp == timestamp) {
                    list[index].synced = flag;
                }
            });

            if(!store.enabled)
                fallbackStorage = _.clone(list);
            else
                store.set(storeKey, list);

            //Also delete from track list upon sync success
            this.removeSynced();
        },
        add: function(imuTrack) {
            var list = this.getAll() || [];
            list.push(imuTrack);

            if(!store.enabled)
                fallbackStorage = _.clone(list);
            else
                store.set(storeKey, list);
        },
        removeSynced: function(timestamp) {
            if(timestamp) {
                list = _.reject(this.getAll(), function(item){ return item.timestamp == timestamp; });
            }
            else {
                list = _.reject(this.getAll(), function(item){ return item.synced == true });
            }

            if(!store.enabled)
                fallbackStorage = _.clone(list);
            else
                store.set(storeKey, list);
        }
    };

})();

var userManager = {
    data: {
        id: null,
        tracks: IMUTrackFactory.getAllUnsynced()
    },
    init: function () {
        this.data.id = jQuery.cookie('userId');
    },
    identifyUser: function () {
        var that = this;
        this.data.keywords = this.getPageKeywords();

        socketManager.socket.json.send({
            type: 'track',
            data: that.data
        });
    },
    setUser: function (data) {
        this.data = data;
        jQuery.cookie('userId', this.data.id, {expires: 365, path: '/'});
    },
    getPageKeywords: function () {
        var keywords = [];
        if (jQuery('meta[name="keywords"]') && jQuery('meta[name="keywords"]').attr('content')) {
            keywords = jQuery('meta[name="keywords"]').attr('content').split(',');
        }

        return keywords;
    },
    track: function (data) {
        if (typeof this.data.tracks == 'undefined') this.data.tracks = [];

        this.data.tracks.push(data);
        IMUTrackFactory.add(data);

        socketManager.socket.json.send({
            type: 'track',
            data: this.data
        });

        console.log({'region': data.region, 'vertical': data.vertical, 'subject': data.subject, 'action': data.action, 'description': data.description, 'value': data.value});
    }
};

function imuInit(target) {
    //Handle only specified target
    if(target) {
        $(target).each(function () {
            imuHandler().handle(this);
        });

        return;
    }

    //Handle all
    $('*[data-imu-track]').each(function (item) {
        var children = $(this).data('imu-track');

        $(this).find(children).each(function () {
            imuHandler().handle(this);
        });
    });
}

jQuery(function () {
    "use strict";

    socketManager.init();
    userManager.init();

    socketManager.socket.on('connect', function () {
        var imuTrack = new IMUTrack({
            subject: 'User',
            action: 'Visit'
        });

        //console.log(imuTrack);
        userManager.track(imuTrack);

        socketManager.socket.on('track', function (data) {
            if(!data) return;
            userManager.setUser(data);
            //Updated synced tracks
            _.each(data.synced, function(timestamp, index) {
                IMUTrackFactory.setIsSynced(timestamp, true);
            });
        });

        socketManager.socket.on('disconnect', function () {
            console.log('Disconnected from IMU');
        });
    });

    $('select.imu-track').change(function () {
        if (typeof userManager == 'undefined') return;

        var imuTrack = new IMUTrack({
            region: $(this).data('region'),
            subject: $(this).data('subject'),
            action: $(this).data('action'),
            description: $(this).data('description'),
            vertical: $(this).data('vertical'),
            value: $(this).val()
        });

        //iMoney event tracker
        userManager.track(imuTrack);

    });

    $('button.imu-track, a.imu-track').click(function () {
        imuTrackEvent.apply(this, arguments);
    });

    $('input.imu-track[type=text]').blur(function () {
        imuTrackEvent.apply(this, arguments);
    });

    imuInit();

    var imuTrackEvent = function () {
        if (typeof userManager == 'undefined') return;

        var dataval = $(this).data('value');
        if (dataval.length > 0 && dataval.charAt(0) == '$') {
            dataval = eval(dataval);
        }

        var imuTrack = new IMUTrack({
            region: $(this).data('region'),
            subject: $(this).data('subject'),
            action: $(this).data('action'),
            description: $(this).data('description'),
            vertical: $(this).data('vertical'),
            value: dataval
        });

        //iMoney event tracker
        userManager.track(imuTrack);
    }
});

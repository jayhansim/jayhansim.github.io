var imuHandler = function (element) {
    "use strict";

    return ({
        handle: handle
    });

    function handle(element) {
        if ($(element).is(':checkbox')) return handleCheckbox(element);
        if ($(element).is(':radio')) return handleCheckbox(element);
        if ($(element).is(':submit')) return handleSubmit(element);
        if ($(element).is(':button')) return handleButton(element);
        if ($(element).is('a')) return handleButton(element);
        if ($(element).is('select')) return handleSelect(element);

        if ($(element).attr('type')) {
            if ($(element).is(':input') && ['text', 'email', 'tel'].indexOf($(element).attr('type').toLowerCase()) !== -1) return handleText(element);
        }
    }

    function handleCheckbox(element) {
        $(element).change(function () {
            var imuTrack = new IMUTrack({
                region: getData('region', element),

                subject: getData('subject', element, 'user'),
                action: getData('action', element, ($(element).is(":checked") ? 'click' : 'unclick')),
                description: getData('description', element, 'checkbox'),

                vertical: getData('vertical', element),
                value: getData('value', element, $(element).val())
            });

            userManager.track(imuTrack);
        });
    }

    function handleText(element) {
        $(element).blur(function () {
            var imuTrack = new IMUTrack({
                region: getData('region', element),

                subject: getData('subject', element, 'user'),
                action: getData('action', element, 'input'),
                description: getData('description', element, 'text'),

                vertical: getData('vertical', element),
                value: $(element).val()
            });

            userManager.track(imuTrack);
        });
    }

    function handleSelect(element) {
        $(element).change(function () {
            var value = $(element).val();
            if(_.isArray(value)) {
                value = value.map(function(item) {
                    return $(element).find("option[value='" + item + "']").text();
                }).join(',');
            }

            var imuTrack = new IMUTrack({
                region: getData('region', element),
                
                subject: getData('subject', element, 'user'),
                action: getData('action', element, 'input'),
                description: getData('description', element, 'select'),

                vertical: getData('vertical', element),
                value: value
            });

            userManager.track(imuTrack);
        });
    }

    function handleButton(element) {
        $(element).click(function () {
            var imuTrack = new IMUTrack({
                region: getData('region', element),

                subject: getData('subject', element, 'user'),
                action: getData('action', element, 'click'),
                description: getData('description', element, 'button'),

                vertical: getData('vertical', element, guessVertical($(element).text())),
                value: getData('value', element, $(element).text().trim())
            });

            userManager.track(imuTrack);
        });
    }

    function handleSubmit(element) {
        $(element).click(function () {
            var imuTrack = new IMUTrack({
                region: getData('region', element),

                subject: getData('subject', element, 'user'),
                action: getData('action', element, 'submit'),
                description: getData('description', element, 'submit'),

                vertical: getData('vertical', element, guessVertical($(element).text())),
                value: getData('value', element, $(element).text())
            });

            userManager.track(imuTrack);
        });
    }

    function getData(dataAttr, element, defaultData) {
        //Element's data has first priority
        var data = $(element).data(dataAttr);
        if (data) return data;

        //Look for data in the element's parents
        var parents = $(element).parents('*[data-' + dataAttr + ']');
        if (parents.length) return $(parents[0]).data(dataAttr);

        return defaultData.charAt(0).toUpperCase() + defaultData.slice(1);
    }

    function guessVertical(text) {
        text = text + ''; //force string
        var guessedVertical = null;

        var verticals = {
            'home loan': 'home loan',
            'personal loan': 'personal loan',
            'credit card': 'credit card',
            'debit card': 'debit card',
            'car loan': 'car loan',
            'business loan': 'business loan',
            'islamic fixed deposit': 'islamic fixed deposit',
            'fixed deposit': 'fixed deposit',
            'gold investment': 'gold investment',
            'share trading': 'share trading',
            'unit trust': 'unit trust',
            'retirement': 'retirement',
            'medical insurance': 'medical insurance',
            'accident insurance': 'accident insurance',
            'travel insurance': 'travel insurance',
            'mobile plan': 'mobile plan',
            'card': 'credit card',
            'article': 'article',
            'learning centre': 'article',
            'infographics': 'infographics'
        };

        _.each(verticals, function (vertical, keywords) {
            if (guessedVertical) return;
            if (text.toLowerCase().indexOf(keywords) != -1) guessedVertical = vertical;
        });

        return guessedVertical ? guessedVertical : 'All';
    }
};
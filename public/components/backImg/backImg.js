app.directive('backImg', function () {
    function link(scope, element, attrs) {
        if (!scope.imgs) return
        var url;

        if (typeof scope.imgs == 'string')
            url = scope.imgs
        else {
            url = (scope.imgs.length > 0) ? scope.imgs[0].src : false;
        }

        url = (attrs.format == 'large') ? url.replace('-medium', '') : url

        if (url) {
            var obj = {
                'background-image': 'url(' + url + ')',
                'background-size': 'cover',
                'background-position': '50% 50%'
            }
            if (url.style)
                obj = Object.assign({
                    'border-color': url.style.split(':')[1],
                    'background': url.style.split(':')[1]
                }, obj)
            element.css(obj);
        }

    };

    return {
        scope: { format: '&format', imgs: '=backImg' },
        link: link
    }
})

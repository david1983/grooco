app.directive('fadeInElement', function ($timeout, $window) {
    function link(scope, element, attrs) {        
        element.addClass('js-fade-element-hide');        
        handleFade(element);
        $window.addEventListener('scroll', function(){
            handleFade(element)
        })
    }
    return {
        link: link
    }
});

function handleFade(element) {

    var elementTopToPageTop = $(element).offset().top;
    var windowTopToPageTop = $(window).scrollTop();
    var windowInnerHeight = window.innerHeight;
    var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
    var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
    var distanceFromBottomToAppear = 20;

    if (elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('js-fade-element-show');
    }
    else if (elementTopToWindowBottom < 0) {
        $(element).removeClass('js-fade-element-show');
        $(element).addClass('js-fade-element-hide');
    }

}
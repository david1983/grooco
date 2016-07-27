app.directive('fadeInElement', function ($timeout, $window) {
    function link(scope, element, attrs) {        
        element.addClass('js-fade-element-hide');
        $timeout(function(){
            handleFade(element);
        },500)        
        
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
    var distanceFromBottomToAppear = 10;

    if (elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('js-fade-element-show');
    }
    else if (elementTopToWindowBottom < 0) {
        $(element).removeClass('js-fade-element-show');
        $(element).addClass('js-fade-element-hide');
    }

}
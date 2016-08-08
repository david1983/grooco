/**
 *  in order to integrate this refills with Angular, a directive was needed.
 *  The difference between directive and component is that using a directive
 *  is possible to manually change the DOM through the element object injected in the link function.
 *  Directives are often used when there is the need to integrate external libraries.
 */

app.directive('fadeInElement', function ($timeout, $window) {
    function link(scope, element, attrs) {        
        element.addClass('fade-in-element');
        $timeout(function(){
            handleFade(element);
        },500)        
        
        $window.addEventListener('scroll', function(){ handleFade(element)})
        $window.addEventListener('resize', function(){ handleFade(element)})
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
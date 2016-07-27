app.component('cards', {
    templateUrl: '/components/card/card.tmpl.html',
    controller: function ($sce) {
        this.$onChanges = function (changesObj) {            
            if (changesObj.products && typeof changesObj.products.currentValue != 'undefined') {                
                this.products = changesObj.products.currentValue.map(function (i) {
                    i.name = i.name.replace(/\&amp\;lt\;br\&amp\;gt\;/g, '<br>').replace(/&amp;/g, '&').replace(/&#039;/g, '\'')
                    i.summary = i.summary.replace(/\&amp\;lt\;br\&amp\;gt\;/g, '<br>').replace(/&amp;/g, '&')
                    i.summary = (i.summary != 'null') ? i.summary : ''                    
                    i.summaryHTML = $sce.trustAsHtml(i.summary);
                    console.log(i.summaryHTML)
                    return i;
                });
                this.HTMLvalidation = true;
            }

        }

    },
    bindings: {
        products: '<'
    }
})
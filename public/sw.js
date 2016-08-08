//sw-toolbox is a library that allow the easy handling of service worker routes
importScripts("/sw-toolbox.js");

toolbox.options.debug = false;
toolbox.precache(['/']);

/*
toolbox-fastest serve the fastest route possible between the cache and the network
 if the network is the latest the cache is updated i background.
 */

//cache all the static content of the website
toolbox.router.get('/(.*)',toolbox.fastest);

//cache the fonts on gstatic.com
toolbox.router.get('/(.*)',toolbox.fastest,{
         cache: {
      name: 'gstatic',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /\.gstatic\.com$/
});

//cache google apis
toolbox.router.get('/(.*)',toolbox.fastest,{
         cache: {
      name: 'gapis',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /\.googleapis\.com$/
});

//cache categories pictures from pexels.com
toolbox.router.get('*',toolbox.fastest,{
    cache: {
        name: 'images',
        maxEntries: 500,
        maxAgeSeconds: 86400
    },
    origin: /\.pexels\.com$/
});

//cache products pictures from cloudfront.net
toolbox.router.get('*',toolbox.fastest,{
    cache: {
        name: 'products',
        maxEntries: 1000,
        maxAgeSeconds: 86400
    },
    origin: /\.cloudfront\.net$/
});

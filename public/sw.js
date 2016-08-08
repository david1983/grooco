importScripts("/sw-toolbox.js");

toolbox.options.debug = false;
toolbox.precache(['/']);

toolbox.router.get('/(.*)',toolbox.fastest);
toolbox.router.get('/(.*)',toolbox.fastest,{
         cache: {
      name: 'gstatic',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /\.gstatic\.com$/
});

toolbox.router.get('/(.*)',toolbox.fastest,{
         cache: {
      name: 'gapis',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /\.googleapis\.com$/
});

toolbox.router.get('*',toolbox.fastest,{
    cache: {
        name: 'images',
        maxEntries: 500,
        maxAgeSeconds: 86400
    },
    origin: /\.pexels\.com$/
});

toolbox.router.get('*',toolbox.fastest,{
    cache: {
        name: 'products',
        maxEntries: 1000,
        maxAgeSeconds: 86400
    },
    origin: /\.cloudfront\.net$/
});

importScripts("/sw-toolbox.js");

toolbox.options.debug = true;
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
      name: 'jquery',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /\.jquery\.com$/
});

toolbox.router.get('/(.*)',toolbox.fastest,{
         cache: {
      name: 'gapis',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /\.googleapis\.com$/
});

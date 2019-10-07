let cacheName = 'artplaces-v01';
let filesToCache = [
'./',
'./index.html',
'../src/index.js',
'../src/index.css',
'../src/serviceWorker.js',
'../src/App.js',
'../src/App.css',
'./*.jpg',

]

self.addEventListener('install', function(e){


    e.waitUntil(
       caches.open(cacheName).then(function(cache){
           return cache.addAll(filesToCache);
       }).catch(function(err){
           console.log("There is nothing to install " + err)
       }) 
    );
})

self.addEventListener('activate', function(e){

    self.skipWaiting();

    e.waitUntil(
        // remove old caches
        caches.keys()
            .then(function(cachesNames){
                return Promise.all(
                    cachesNames.filter(function(oneCache){
                        return oneCache.startsWith('rest') &&
                        oneCache != cacheName;
                    }).map(function(oneCache){
                        return caches.delete(oneCache);
                    })
                )
            }).catch(function(err){
                console.log("Servise Worker is not activated" + err)
            })
    );
})


self.addEventListener('fetch', function(e){
    
    // Fixing Bug in Chrome https://github.com/josephfrazier/Reported-Web/commit/3f67dfe3eabdf45bbd3e49c172d8dca7017fe5b8
    const { request } = e;
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
        return;
    }

    e.respondWith(

        caches.match(e.request)
        .then(function(response){
            if (response) {
                return response
            } 
            // else {
            //    return fetch(e.request);
            //}
             
            // Saving visited URLs, followed by bitsofcode https://www.youtube.com/watch?v=BfL3pprhnms&feature=youtu.be and
            // https://developers.google.com/web/fundamentals/primers/service-workers/

            var requestClone = e.request.clone();

            return fetch(requestClone)

                .then(function(response){

                    if(!response || response.status !== 200 || response.type !== "basic"){
                        return response;
                    }

            var responseClone = response.clone();

            caches.open(cacheName)
                .then(function(cache){
                    cache.put(e.request, responseClone);
                    return response; 
                });

            return response;

            }).catch(function(err){
                console.log("Fail to clone the response" + err)
            })
        }).catch(function(err){
            console.log("Fail to fetch the response" + err)
        })
    )
})



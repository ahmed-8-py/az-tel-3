



const CACHE_NAME = "az-newapp-cache-v1";
const urlsToCache = [
     // ضع كل ملفاتك المهمة هنا ليتم تخزينها في الكاش
  "/",
"/g-m.png",
  "/index.html",
"/logo.png",
"/logocart.png",
"/logocrcl.ico",
"/manifest.json",
"/privacy.html",

  "/style.css"
                    
  
    
    
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// تفعيل Service Worker وتنظيف الكاش القديم
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// التقاط طلبات الشبكة وإرجاع الملفات من الكاش عند عدم وجود الإنترنت
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

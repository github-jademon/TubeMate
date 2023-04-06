const CACHE_NAME = "asdf"; // 캐쉬 이름을 설정합니다.

const FILES_TO_CACHE = [
  "/", // 캐쉬할 페이지 or 파일 들을 설정합니다.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

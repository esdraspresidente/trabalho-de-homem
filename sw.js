/* Service worker do Trabalho de Homem.
 *
 * Por que rede primeiro: o app é um index.html só, e cada commit muda ele.
 * Com cache primeiro, o celular ficaria preso na versão antiga até alguém
 * limpar o cache. Rede primeiro pega sempre a última versão e só usa o
 * cache quando não tem internet (aí o app ao menos abre a tela).
 *
 * Só arquivos do próprio site entram no cache. Chamadas ao Supabase e às
 * bibliotecas de PDF passam direto: dado de cliente não fica guardado no
 * aparelho fora do controle do app.
 */
const CACHE = 'tdh-v1';
const BASE = ['./', './index.html', './manifest.json', './simbolo.svg', './icon-192.png', './icon-512.png', './favicon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});

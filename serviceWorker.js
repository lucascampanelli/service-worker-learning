// Lista de arquivos para armazenar no cache
const ARQUIVOS_DO_CACHE = ["./offline.html", "./style.css"];

// Nome do cache
const NOME_CACHE = "cache-estatico";



// Adicionando uma nova função no evento de instalação do ServiceWorker
self.addEventListener("install", (evento) => {
    console.log("[ServiceWorker] Instalando.")
    
    // Adicionar uma promise (inserção de novo cache) que o ServiceWorker deverá aguardar
    evento.waitUntil(

        // Obtém o cache com o nome definido em "NOME_CACHE"
        caches.open(NOME_CACHE).then((cache) => {
            console.log("[ServiceWorker] Armazenando a página de offline em cache.")

            // Adiciona os arquivos (a partir de URLs relativas) ao cache de páginas
            return cache.addAll(ARQUIVOS_DO_CACHE);
        })

    );

    // Tornando o SericeWorker imediatamente ativo
    self.skipWaiting();
});



// Adicionando uma nova função no evento de fetch (quando o app faz um requisição na rede)
self.addEventListener("fetch", (evento) => {
    console.log("[ServiceWorker] Fetch ", evento.request.url);

    // Se a requisição foi realizada por algum lugar que não seja o navegador
    if(evento.request.mode !== "navigate")
        return;

    // Responde a requisição do fetch
    evento.respondWith(

        // Realiza uma requisição para a request realizada no navegador e verifica se há exceção
        fetch(evento.request).catch(() => {
            
            // Abre o cache de páginas estáticas da aplicação
            return caches.open(NOME_CACHE).then((cache) => {

                // Retorna a página que contenha "offline.match" nos registros do cache
                return cache.match("offline.html");

            });

        })
    );

});
// Registrando o Service Worker

// Se existir o ServiceWorker no navegador
if("serviceWorker" in navigator){

    // Adicionar uma nova função no evento "load" do navegador (quando tudo foi completamente carregado)
    window.addEventListener("load", () => {

        // Registra o script do ServiceWorker
        navigator.serviceWorker.register("/serviceWorker.js").then((registro) => {
            console.log("Service Worker registrado. ", registro)
        })

    })

}
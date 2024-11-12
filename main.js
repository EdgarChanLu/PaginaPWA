if ('serviceWorker' in navigator) {
    console.log('Si tiene sw');

    navigator.serviceWorker.register ('/sw.js')
                        .then (res => console.log('serviceWorker cargado correctamente', res))
                        .catch (err => console.log('serviceWorker no se pudo registrar', err));
} else {
    console.log ('No se localiza el sw');
}
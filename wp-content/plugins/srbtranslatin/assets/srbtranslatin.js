(function () {
    const cirButtonId = 'cirilica'; // ID dugmeta za ćirilicu
    const latButtonId = 'latinica'; // ID dugmeta za latinicu

    // Funkcija za promenu pisma
    function applyScript(alphabet) {
        document.documentElement.setAttribute('data-pismo', alphabet);
        localStorage.setItem('pismo', alphabet);
        location.reload(); // Osvežavanje stranice
    }

    // Proveri postojeće pismo iz localStorage-a i postavi ga
    const savedAlphabet = localStorage.getItem('pismo');
    if (savedAlphabet) {
        document.documentElement.setAttribute('data-pismo', savedAlphabet); // Postavi pismo
        // Nema potrebe za location.reload() prilikom inicijalnog učitavanja
    }

    // Postavljanje event listenera na dugmad
    document.addEventListener('DOMContentLoaded', () => {
        const cirButton = document.getElementById(cirButtonId);
        const latButton = document.getElementById(latButtonId);

        if (cirButton) {
            cirButton.addEventListener('click', () => applyScript('cirilica'));
        }

        if (latButton) {
            latButton.addEventListener('click', () => applyScript('latinica'));
        }
    });
})();
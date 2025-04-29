document.addEventListener('DOMContentLoaded', () => {
/*
* Táblázat szerkeszthetősége 
*/
const tables = document.getElementsByClassName('editableTable');
const MIN_LENGTH = 5;
const MAX_LENGTH = 100;

// Minden táblához eseményfigyelőt adunk
for (let table of tables) {
    table.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'TD') {
            const oldText = target.innerText;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = oldText;
            target.innerHTML = '';
            target.appendChild(input);
            input.focus();

            input.addEventListener('blur', function () {
                const newText = input.value.trim();
                if (newText.length < MIN_LENGTH || newText.length > MAX_LENGTH) {
                    target.style.backgroundColor = 'red'; // pirosra színezi, ha nem megfelelő a hossz
                    alert(`A szöveg hossza ${MIN_LENGTH} és ${MAX_LENGTH} karakter között kell legyen!`);
                    target.innerText = oldText; // visszaállítja az eredeti szöveget
                } else {
                    target.style.backgroundColor = ''; // visszaállítja az alap színt
                    target.innerText = newText || oldText;
                }
            });
        }
    });
};

/**
 * Táblázatban való keresés
 */

const szuroMezo = document.getElementById('szuro-mezo');
const adatTablazatok = document.getElementsByClassName('editableTable');

szuroMezo.addEventListener('input', szurTablazat);

function szurTablazat() {
    console.log("teszt");
    
    const szuroSzoveg = szuroMezo.value.toLowerCase();
    for (let adatTablazat of adatTablazatok) {
        const sorok = adatTablazat.getElementsByTagName('tr');

        for (let i = 0; i < sorok.length; i++) {
            const cellak = sorok[i].getElementsByTagName('td');

            for (let j = 0; j < cellak.length; j++) {
                const cella = cellak[j];
                if (cella) {
                    const szoveg = cella.textContent.toLowerCase();
                    if (szoveg.includes(szuroSzoveg) && szuroSzoveg !== "") {
                        cella.style.backgroundColor = "yellow"; // találat
                    } else {
                        cella.style.backgroundColor = ""; // alap háttér
                    }
                }
            }
        }
    }
};

});
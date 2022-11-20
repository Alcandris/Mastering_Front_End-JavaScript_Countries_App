//Ennoncé:
// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all) - ok

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console. - ok

// 3 - Passer les données à une variable - ok

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP-ok

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données - ok
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)-ok

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays -ok

//****************Variables ****************/
const container = document.querySelector(".countries-container");
const rangeValue = document.getElementById("rangeValue");
const inputRange = document.getElementById("inputRange");
const inputSearch = document.getElementById("inputSearch");
const btnSort = document.querySelectorAll(".btnSort");

let filtre = ""; //valeur du champs de recherche
let sortMethod = "maxToMin";
let numberOfCountries = rangeValue.textContent;
let countryArray = [];
//****************Fonctions ****************/

//Rapatriement de la Bdd
async function fecthCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countryArray = data));
  console.log(countryArray);
}
//Filtre le tableau en fonction du champ de recherche
function filterText(arr) {
  let arrayFiltered = arr.filter(function (pays) {
    return pays.translations.fra.common.toLowerCase().includes(filtre);
  });
  return arrayFiltered;
}

//Affichage des pays en fonction du flitre
function countryDisplay() {
  let tempArray = filterText(countryArray) //tri le tableau selon la recherche
    .sort((a, b) => {
      //tri
      if (sortMethod === "maxToMin") {
        //tri décroissant
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        //tri croissant
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        //tri alphabetique
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, numberOfCountries); //coupe le tableau en fonction du nombre demandé
  container.innerHTML = tempArray
    .map((country) => {
      //création des cartes
      return `
    <div class="card">
         <img src=${country.flags.svg} alt="drapeau ${
        country.translations.fra.common
      }">
        <h2>${country.translations.fra.common}</h2>
        <h3>Capitale : ${country.capital}</h3>
        <h3>Population : ${country.population.toLocaleString()}</h3>

    </div>
    `;
    })
    .join(""); //supprime , de la page
}

//****************Ecoutes****************

//change le nombre affiché en fonction de l'input range
inputRange.addEventListener("input", (e) => {
  rangeValue.textContent = e.target.value;
  numberOfCountries = rangeValue.textContent;
  countryDisplay();
});

//au chargement de la page, charge la bdd dans la variable countryArray (lance la fonction fetch une seule fois)
//affiche également les pays sans recherche
window.addEventListener("load", async () => {
  await fecthCountry();
  countryDisplay();
});

//Ecoute de la valeur recherchée et l'atttribut a la variable filtre
inputSearch.addEventListener("input", () => {
  filtre = inputSearch.value.toLowerCase();
  countryDisplay();
});

//correction = limite le nombre de lignes//solution perso
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countryDisplay();
  });
});

//solution perso

//Tri Alphabétique
//fonction fléchée
// const triAlpha = () => {
//   countryArray.sort(function (a, b) {
//     let x = a.translations.fra.common.toLowerCase(); //on s'assure que les chaines de czrzctere soient en minuscules
//     let y = b.translations.fra.common.toLowerCase();
//     if (x < y) {
//       // si x<y, alors function(a,b) vaut -1 ==> x sera classé avant y
//       return -1;
//     }
//     if (x > y) {
//       // si x>y, alors function(a,b) vaut 1 ==> x sera classé apres y
//       return 1;
//     }
//     return 0; // si x=y, alors function(a,b) vaut 0 ==> les places sont inchangées
//   });
// };

//tri croissant

// const triMinToMax = () => {
//   countryArray.sort(function (a, b) {
//     return a.population - b.population;
//   });
// };

//tri décroissant

// const triMaxToMin = () => {
//   countryArray.sort(function (a, b) {
//     return b.population - a.population;
//   });
// };

// //Lancement de la fonction du tri alphabetique
// alpha.addEventListener("click", () => {
//   triAlpha();
//   countryDisplay();
// });
// //Lancement de la fonction du tri croissant
// minToMax.addEventListener("click", () => {
//   triMinToMax();
//   countryDisplay();
// });
// //Lancement de la fonction du tri décroissant
// maxToMin.addEventListener("click", () => {
//   triMaxToMin();
//   countryDisplay();
// });

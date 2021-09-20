
// appel localStorage

let elmtStorage = JSON.parse(localStorage.getItem("panier"));

// controle si localStorage existe sinon creer le localStorage

if (localStorage.getItem("panier")) {
  console.log(elmtStorage);
} else {
  let createCart = [];
  localStorage.setItem("panier", JSON.stringify(createCart));
}


// table dams le quel sera insérer le html

let table = document.getElementById("tab_panier")

// boucle pour creer une ligne de tableau pour chaque élément dans le panier

for (let i = 0; i < elmtStorage.length; i++) {
  // article dans le panier localStorage
  
  const itemId= elmtStorage[i].id;
  const itemName= elmtStorage[i].name;
  const itemPrice= elmtStorage[i].price;
  const itemPhoto= elmtStorage[i].photo;

  // prix total du panier

  var totalPrice = 0;
  elmtStorage.forEach((elmtStorage) => {
    totalPrice += elmtStorage.price;
  });

  // creation elements html

  let rowItem = document.createElement('tr');
    rowItem.setAttribute("class", "align-middle");

  let cellName = document.createElement('td');
    cellName.textContent = itemName;
  let cellDelete = document.createElement('td');
  let btnDelete = document.createElement('button');
    btnDelete.textContent = "X";
    btnDelete.addEventListener("click", () => deleteFurniture(i))
  let cellPrice = document.createElement('td');
    cellPrice.textContent = itemPrice+".00 €";
  let cellPhoto = document.createElement('td');
  let photoElemt = document.createElement('img');
    photoElemt.setAttribute("src", itemPhoto);
    photoElemt.setAttribute("class", "img-fluid photoArticle"); 
    photoElemt.setAttribute("alt", "photo de l'appareil "+itemName); 

  table.appendChild(rowItem)
  rowItem.appendChild(cellDelete)
  cellDelete.appendChild(btnDelete)
  rowItem.appendChild(cellName)
  rowItem.appendChild(cellPrice)
  rowItem.appendChild(cellPhoto)
  cellPhoto.appendChild(photoElemt)

  // fonction retirer du panier l'article

  deleteFurniture = (i) => {
    elmtStorage.splice(i, 1);
    localStorage.clear();
    localStorage.setItem("panier", JSON.stringify(elmtStorage));
    window.location.reload();
  }; 
} 

// affiche prix total / panier vide  dans html
// creer button commande si le panier n'est pas vide

let rowTotal = document.createElement('tr');
let cellTotal= document.createElement('td');
  cellTotal.setAttribute("class", "totalPrixPanier");
  cellTotal.setAttribute("colspan", "4");

let rowCommande = document.createElement('tr');
let cellCommande= document.createElement('td');
  cellCommande.setAttribute("colspan", "4");
 
let btnCommande= document.createElement('button');
  btnCommande.textContent = "Commander";
  btnCommande.setAttribute("class", "btn btn-dark btn-lg m-3");
  btnCommande.addEventListener("click", () => afficheForm("containerCommande"))

// affiche prix sinon panier vide

if (totalPrice) {
  cellTotal.textContent = "Total du panier : "+totalPrice+".00 €";
}else{
  cellTotal.textContent = "Panier vide";
  rowCommande.setAttribute("style", "display:none;");
}

// insertion html 

table.appendChild(rowTotal)
rowTotal.appendChild(cellTotal)
table.appendChild(rowCommande)
rowCommande.appendChild(cellCommande)
cellCommande.appendChild(btnCommande)

// ecoute le button de validation du formulaire

document.getElementById("btnCommandeValidate").addEventListener("click", () => checkForm())

// fonction pour afficher le formulaire au clic sur le button 

function afficheForm(container) {
  let contCommande = document.getElementById(container)

  if ((contCommande.style.display != 'block')) { 
    contCommande.style.display = 'block';
  } else { 
    contCommande.style.display = 'none'; 
  }  
}

function checkForm() {

  // variable de suivi de controle controle

  let suiviCheckForm = "";

  // check regex

  let regexNumber = /[0-9]/;
  let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let regexSymbols = /[§!@#$%^&*().?":{}|<>]/;
  let regexBlank = /^[\s]/;

  // liste input formulaire

  let inputLastName = document.getElementById("nom");
  let inputFirstName = document.getElementById("prenom");
  let inputEmail = document.getElementById("email");
  let inputAdress = document.getElementById("adresse");
  let inputCity = document.getElementById("ville");

  // Test du nom
  if (
    regexNumber.test(inputLastName.value) == true ||
    regexSymbols.test(inputLastName.value) == true ||
    regexBlank.test(inputLastName.value) == true ||
    inputLastName.value == ""
    ) {
      inputLastName.style.backgroundColor = "#FF7878";
      suiviCheckForm = "error";
  } else {
      inputLastName.style.backgroundColor = "#8CFF87";
  }

  // Test du prenom
  if (
      regexNumber.test(inputFirstName.value) == true ||
      regexSymbols.test(inputFirstName.value) == true ||
      regexBlank.test(inputFirstName.value) == true ||
      inputFirstName.value == ""
      ) {
        inputFirstName.style.backgroundColor = "#FF7878";
        suiviCheckForm = "error";
  } else {
        inputFirstName.style.backgroundColor = "#8CFF87";
  }

  // Test mail
  if (
    regexEmail.test(inputEmail.value) == false ||
    regexBlank.test(inputEmail.value) == true ||
    inputEmail.value == ""  
    ) {
      inputEmail.style.backgroundColor = "#FF7878";
      suiviCheckForm = "error";
  } else {
    inputEmail.style.backgroundColor = "#8CFF87";
  }

  // Test adresse
  if (
      regexSymbols.test(inputAdress.value) == true ||
      regexBlank.test(inputAdress.value) == true ||  
      inputAdress.value == ""  
      ) {
        inputAdress.style.backgroundColor = "#FF7878";
        suiviCheckForm = "error";
  } else {
    inputAdress.style.backgroundColor = "#8CFF87";
  }

  // Test ville
  if (
      regexSymbols.test(inputCity.value) == true ||
      regexNumber.test(inputCity.value) == true ||  
      regexBlank.test(inputCity.value) == true ||  
      inputCity.value == ""  
      ) {
        inputCity.style.backgroundColor = "#FF7878";
        suiviCheckForm = "error";
  } else {
    inputCity.style.backgroundColor = "#8CFF87";
  }

  if (suiviCheckForm == "error") {
    alert("Attention certaines données ne peuvent être validées");
  }
  // Si le formulaire est validé
  else {

    // creation objet contact
    let contact = {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAdress.value,
      city: inputCity.value,
      email: inputEmail.value
    };

    // creation tableau avec les id des articles du panier
    let products = [];
    elmtStorage.forEach((articlePanier) => {
      products.push(articlePanier.id);
    });

    // creation objet à envoyer (contact formulaire + tableau id)
    let commandeOrder = {
      contact,
      products
    };

    // declaration des element à envoyer puis envoi

    let url = "http://localhost:3000/api/cameras/order";
    let postForm = JSON.stringify(commandeOrder);
    sendRequest (postForm, url);
    localStorage.clear();
  }
}

// fonction de la requete XHR

function sendRequest(data, url) {
  let request = new XMLHttpRequest();
  request.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
      sessionStorage.setItem("order", this.response);
      window.location = "./commande.html";
    } else {
      console.log("defaut");
    }
  };

  request.open('POST', url);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(data);
  console.log(request.response);
};

// lecture de l'url, puis recupere l'id (?id=)
const urlId = window.location.search;
const urlSearchId = new URLSearchParams(urlId);
const id = urlSearchId.get("id");

// cible l'article avec son id puis envois les infos vers function lecture
fetch("http://127.0.0.1:3000/api/cameras/"+id)
    .then(response => response.json())  
    .then(response => lecture(response))

    .catch(function (err) {
        console.log("fetch Error")
    });


// fonction d'affichage des infos sur la page

function lecture(info) {

    // intègre les infos dans variables
    let name = info.name;
    let price = info.price/100;
    let description = info.description;
    let img = info.imageUrl;
    let articleOptions = info.lenses;

    // creer select avec id
    let select = document.createElement('select');      
      select.setAttribute("id", "select_option_article");

    // creer label pour select (invisible sur page avec css)
    let labelSelect = document.createElement('label');
      labelSelect.setAttribute("for","select_option_article");
      labelSelect.setAttribute("class","hidden");
      labelSelect.innerHTML = "label";

    // creer option pour le select avec boucle pour le nombre d'éléments
    for (i = 0; i < articleOptions.length; i++) {
        select.options[select.options.length] = new Option (articleOptions[i], articleOptions[i]);
    }

    // <select> des options lentilles
    let infoOptions = document.getElementById("element_info_lenses");

    // affiche les infos dans le fichiers produit.html
    infoOptions.appendChild(select)
    infoOptions.appendChild(labelSelect)
    document.getElementById("product_name").innerText = name;
    document.getElementById("element_photo").innerHTML = "<img src='"+img+"' alt=\"photo de le l'appareil "+name+"\" class='img-fluid' />";
    document.getElementById("element_info_description").innerHTML = description;
    document.getElementById("element_info_price").innerHTML = price+".00 €";

    let btnPanier = document.getElementById("AddPanier_btn");
      btnPanier.addEventListener("click", () => ajoutPaner())

    // Création des elements item dans session.storage pour transmettre vers fonction ajoutPaner()
    let infoArticleObj = {
        "name" : name,
        "price" : price,
        "description" : description,
        "img" : img
    };
    sessionStorage.setItem(id, JSON.stringify(infoArticleObj));

    // controle si un panier existe => initialisation panier
    if (localStorage.getItem("panier")) {
        console.log("Panier utilisateur existant dans le local storage");
    } else {
        console.log("Création d'un panier utilisateur dans le local storage");
        //Le panier est un tableau de produits
        let panierinit = [];
        localStorage.setItem("panier", JSON.stringify(panierinit));
    };
}


// fonction d'ajout au panier

function ajoutPaner() {

    // recupere info du sessionStorage
    mySessionStorage = JSON.parse(sessionStorage.getItem(id));
    let SessionStorage_name = mySessionStorage.name;
    let SessionStorage_price = mySessionStorage.price;
    let SessionStorage_img = mySessionStorage.img;

    // let option_lentille = document.getElementById("select_option_article").value;   // Pour envoyer option

    // appel le localstorage, ajoute element puis met a jour le localstorage
    let myPanier = JSON.parse(localStorage.getItem("panier"));

    myPanier.push({
        "id" : id,
        "name" : SessionStorage_name,
        "price" : SessionStorage_price,
        "photo" : SessionStorage_img
       // "lentille" : option_lentille  // Pour envoyer option
    });

    localStorage.setItem("panier", JSON.stringify(myPanier));
    alert("Appareil "+SessionStorage_name+" ajouté au panier avec succes");
}

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
    for (
        i = 0; i < articleOptions.length; i++) {
        select.options[select.options.length] = new Option (articleOptions[i], articleOptions[i]);
    }

    // <select> des options lentilles
    let infoOptions = document.getElementById("element_info_lenses");

    // affiche les infos dans le fichiers produit.html
    infoOptions.appendChild(select)
    infoOptions.appendChild(labelSelect)
    document.getElementById("product_name").innerText = name;
    document.getElementById("element_photo").innerHTML = "<img src='"+img+"' alt='photo du "+name+"' class='img-fluid' />";
    document.getElementById("element_info_description").innerHTML = description;
    document.getElementById("element_info_price").innerHTML = price+".00 €";
}
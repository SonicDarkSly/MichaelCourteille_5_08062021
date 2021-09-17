
//APPEL API AVEC FETCH
fetch("http://127.0.0.1:3000/api/cameras")
    .then(response => response.json())  
    .then(response => lecture(response))

    .catch(function (err) {
        console.log("fetch Error")
    });

// fonction d'affichage des infos sur la page

function lecture(info) {

  // creation elements html dans div cible (container)

  let container = document.getElementById("containerListe");

  // boucle pour cibler tous les elements de la base de données

  for (i = 0; i <= info.length; i++) {

    // creation elements html pour chaque element

    let article = document.createElement('article');
      article.setAttribute("id", info[i]._id);
      article.setAttribute("class", "bg-white text-center p-2 m-2 rounded border border-secondary");

    let img = document.createElement('img');
      img.setAttribute("src", info[i].imageUrl);
      img.setAttribute("class", "img-fluid photoListe"); 
      img.setAttribute("alt", "photo de l'appareil "+info[i].name); 
       
    let div = document.createElement('div');

    let h2 = document.createElement('h2');
      h2.textContent = info[i].name;

    let p_price = document.createElement('p');
      p_price.textContent = info[i].price/100+".00 €";

    let p_link = document.createElement('p');

    let a = document.createElement('a');
      a.setAttribute("href", "produit.html?id="+info[i]._id); 
      a.textContent = "En savoir plus";

    // affiche le html

    container.appendChild(article)
    article.appendChild(img) 
    article.appendChild(div)
    div.appendChild(h2)
    div.appendChild(p_price)
    article.appendChild(p_link)
    p_link.appendChild(a)
    
  }
}


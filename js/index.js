
//APPEL API AVEC FETCH
fetch("http://127.0.0.1:3000/api/cameras")
    .then(response => response.json())  
    .then(response => lecture(response))

    //.then(response2 => console.table(response2)) //affiche tableau dans console
    
    //SI PROBLEME API
    .catch(function (err) {
        console.log("fetch Error")
    });


function lecture(info) {

  let container = document.getElementById("containerListe");

  for (i = 0; i <= info.length; i++) {

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

    container.appendChild(article)
    article.appendChild(img) 
    article.appendChild(div)
    div.appendChild(h2)
    div.appendChild(p_price)
    article.appendChild(p_link)
    p_link.appendChild(a)
    
  }
  
}


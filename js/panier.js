// Controle si un localStorage existe

if (localStorage.getItem("panier")) {

    let elmtStorage = JSON.parse(localStorage.getItem("panier"));

    let table = document.getElementById("tab_panier")

    for (let i = 0; i < elmtStorage.length; i++) {

        // article dans le panier localStorage

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

        // fonction retirer du panier

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

    if (totalPrice) {
       cellTotal.textContent = "Total du panier : "+totalPrice+".00 €";
     }else{
       cellTotal.textContent = "Panier vide";
       rowCommande.setAttribute("style", "display:none;");
    }
    table.appendChild(rowTotal)
    rowTotal.appendChild(cellTotal)
    table.appendChild(rowCommande)
    rowCommande.appendChild(cellCommande)
    cellCommande.appendChild(btnCommande)
}else{
    alert("localStorage error\n--------------\nPanier inexistant");
}

// affiche le formulaire au clic sur le button //

function afficheForm(container) {
  let contCommande = document.getElementById(container)

  if ((contCommande.style.display != 'block')) { 
    contCommande.style.display = 'block';
  } else { 
    contCommande.style.display = 'none'; 
  }  
}


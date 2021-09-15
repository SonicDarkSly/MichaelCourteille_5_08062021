let container = document.getElementById("containerListe");


//APPEL API AVEC FETCH
fetch("http://127.0.0.1:3000/api/cameras")
    .then(response => response.json())  
    .then(response => lecture(response))
    //.then(response2 => console.table(response2))
    //SI PROBLEME API
    .catch(function (err) {
        console.log("fetch Error")
    });


function lecture(info) {
    for (i = 0; i <= info.length; i++) { 
       container.innerHTML += `
       <article id='${info[i]._id}' class='bg-light text-center'>
         <img src='${info[i].imageUrl}' class='img-fluid photoListe' alt='photo ${info[i].name}' />
         <div>
           <h2>${info[i].name}</h2>
           <p>${info[i].price/100}.00 €</p>
         </div>
         <p><a href='pages/produit.html?id=${info[i]._id}'> En savoir plus</a></p>
       </article>`
      }
}
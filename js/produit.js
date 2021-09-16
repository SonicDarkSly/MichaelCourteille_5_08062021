const urlId = window.location.search;
const urlSearchId = new URLSearchParams(urlId);
const id = urlSearchId.get("id");

fetch("http://127.0.0.1:3000/api/cameras/"+id)
    .then(response => response.json())  
    .then(response => lecture(response))

    .catch(function (err) {
        console.log("fetch Error")
    });

function lecture(info) {
    let name = info.name;
    let price = info.price/100;
    let description = info.description;
    let img = info.imageUrl;

    document.getElementById("product_name").innerText = name;
    document.getElementById("element_photo").innerHTML = "<img src='"+img+"' alt='photo' class='img-fluid' />";
    document.getElementById("element_info_description").innerHTML = "<span class='description_article_titre'>Description</span> : <span class='description_article'>"+description+"</span>";
    document.getElementById("element_info_price").innerHTML = "Prix : <span>"+price+".00 €</span>";
}
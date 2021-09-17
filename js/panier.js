if (localStorage.getItem("panier")) {
    let elmtStorage = JSON.parse(localStorage.getItem("panier"));

    for (let i = 0; i < elmtStorage.length; i++) {

    const itemId= elmtStorage[i].idA;
    const itemName= elmtStorage[i].name;
    const itemPrice= elmtStorage[i].price;
    const itemQuantity = elmtStorage[i].quantity;

    document.getElementById("test").innerHTML += `
    <table>
      <tr>
        <td>id</td>
        <td>name</td>
        <td>quantite</td>
      </tr>
      <tr>
        <td>`+itemId+`</td>
        <td>`+itemName+`</td>
        <td>`+itemQuantity+`</td>
      </tr>
    </table>
    `;
   } 

    
}else{
    alert("aucun element dans le panier");
}
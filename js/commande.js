let sessionOrder = sessionStorage.getItem("order");

// Controle si sessionStorage existe sinon redirect sur index.html

if (sessionOrder != null) {
  console.log("sessionStorage [order] valide");
  confirmationCommande();
}else{
  document.location.href="index.html"; 
}

// Récupération des informations pour affichage sur la page de commande 

function confirmationCommande () {

      let order = JSON.parse(sessionStorage.getItem("order"));

      // retour backend

      let nom = order.contact.lastName;
      let prenom = order.contact.firstName;
      let adresse = order.contact.address;
      let ville = order.contact.city;
      let adresseComplette = adresse+", "+ville;
      let mailAdresse = order.contact.email;
      let refCommande = order.orderId;

      // Calculer le montant total de la commande

      let priceOrder = 0;
      let showTotal = order.products;
      showTotal.forEach((element) => {
        priceOrder += element.price / 100;
      });

       // affichage sur la page html

      document.getElementById("prenom").innerHTML = nom.toUpperCase();
      document.getElementById("nom").innerHTML = prenom.toUpperCase();
      document.getElementById("adresse").innerHTML = adresseComplette;
      document.getElementById("contact").innerHTML = mailAdresse;
      document.getElementById("commandePrix").innerHTML = priceOrder+".00 €";
      document.getElementById("commandeId").innerHTML = refCommande;

      sessionStorage.clear();

      console.log("elements html insérés");
      console.log("sessionStorage supprimer");

};
// Récupération des informations pour affichage sur la page de commande 

confirmationCommande = () => {
    if (sessionStorage.getItem("order") != null) {
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
    }  
  };
  
  confirmationCommande();
  
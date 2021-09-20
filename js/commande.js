// Récupération des informations pour affichage sur la page de commande 

confirmationCommande = () => {
    if (sessionStorage.getItem("order") != null) {
      let order = JSON.parse(sessionStorage.getItem("order"));

      // retour backend, info client

      document.getElementById("prenom").innerHTML = order.contact.firstName;
      document.getElementById("nom").innerHTML = order.contact.lastName;

      // Calculer le montant total de la commande

      let priceOrder = 0;
      let showTotal = order.products;
      showTotal.forEach((element) => {
        priceOrder += element.price / 100;
      });

      // retour backend, info id commande

      document.getElementById("commandePrix").innerHTML = priceOrder;
      document.getElementById("commandeId").innerHTML = order.orderId;

      sessionStorage.clear();
    }  
  };
  
  confirmationCommande();
  
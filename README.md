# DCIPPROJECT

Le projet a été réalisé à l'aide du framework [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.
Au niveau des tâches réalisées: parti initialement sur AngularJS, je me suis rabattu sur Angular avec Node.js
1) Le formulaire
  -Choix des questions et affichage conditionnel en fonction de la question choisie
  -Contrôle sur l'email requis, ainsi que sa validité
  -Contrôle sur le numéro de Tahiti avec le 'Pattern' défini dans la spécification.
  -Rajout de messages d'erreurs qui s'affichent au moment de l'envoi si la condition 'required' ou autre n'est pas remplie. Je n'ai pas eu le temps d'effectuer un reset
  propre de l'affichage et des messages d'erreurs, en effet après un premier submit, en changeant la valeur de l'option, les messages d'erreurs restent.
2) API
  -J'ai créé un service injecté dans le component-form.
  -J'ai créé un autre serveur pour réceptionner le résultat de la requête de type POST, qui est sur l'adresse http://localhost:3000/
  -Le formulaire via le bouton 'Envoyer' possède la fonction qui effectue la requête POST.
  -Selon le statut du code de la réponse de la requête, on peut récupérer les valeurs du formulaire dans le body.
3) BDD
  -J'ai utilisé MySQL pour le stockage des données, via sql server.
  -Si le statut du code de la réponse est égal à 200, alors je fais l'insertion en BDD de la donnée réceptionnée par la requête.

## Development server

-Lancer un terminal à la racine du répertoire DICPPROJECT, et lancer 'ng serve' pour le serveur, et se rendre sur `http://localhost:4200/`.
-Via un terminal, se placer à la racine du répertoire DICPPROJECT/server, et taper la commande node server. Une indication 'serveur runing in 3000' indique que le serveur
est bien démarré et peut recevoir des requêtes HTTP.
-Installer MySQL pour Windows

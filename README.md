# DCIPPROJECT

Ce projet, est un formulaire permettant de faciliter l'utilisateur pour avoir des informations auprès de la DICP, en remplissant un formulaire, qui envoie une notification mail au service dédié en fonction de la question choisie, et de traiter plus facilement les demandes, qui sont stockées en base de données.

# Outils

Le projet a été réalisé à l'aide du framework [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.
1) Front-End: Angular
2) Base de données: MySQL
3) Back-End: Node.js
4) SMTP Mail: https://mailtrap.io

# SOMMAIRE

Au niveau des tâches réalisées: parti initialement sur AngularJS, je me suis rabattu sur Angular avec Node.js

Temps passé:
-Mardi 18/05/2021 début d'après midi: documentation sur Angular et AngularJS, début développement du formulaire avec AngularJS
-Mercredi 19/05/2021: suite à des questions posées à Matthieu BOSC, confusion entre Angular et AngularJS, déplacement du formulaire sur Angular, pour utiliser Node.js
-Jeudi 20/05/2021: fin du formulaire, codage de l'API pour poster les données sur un serveur, stockage des données reçues par le serveur sur une base de données
-Vendredi 21/05/2021 fin de matinée: réalisation de l'envoi de mail via le serveur suite à la réception de la requête, via un fake mail

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

## Installation

1) Lancer un terminal à la racine du répertoire dicpproject, et lancer 'ng serve' pour le serveur, et se rendre sur `http://localhost:4200/`. (l'url est indiqué à la suite du succès de la commande 'ng serve')
Si l'erreur suivante 'An unhandled exception occurred: Cannot find module '@angular-devkit/build-angular/package.json'' subvient, lancer 'npm update', puis ensuite 'ng serve'.
2) Via un terminal, se placer à la racine du répertoire dicpproject/server, et taper la commande node server. Une indication 'serveur runing in 3000' indique que le serveur
est bien démarré et peut recevoir des requêtes HTTP.

3) Installer MySQL pour Windows via https://dev.mysql.com/downloads/installer/ et choisir (mysql-installer-community-8.0.25.0.msi)

4) Lancer l'éxecutable et valider tout le temps les informations, il faudra juste choisir pour le type d'installation 'SQL Server'

5) Via la recherche Windows, lancer MySQL 8.0 Command Line Client

6) Créer la base de données via la commande 'create database timeline;' puis se placer dessus via 'use timeline;'

7) Créer un utilisateur 'create user 'timeline'@'localhost' identified by 'password';' puis lui fournir les droits 'grant all on timeline.* to 'timeline'@'localhost';'

8) Créer la table qui va stocker les données du formulaire: 
'create table dicpquestion (
id INT,
owner VARCHAR(255),
date DATE,
selectquestion VARCHAR(40),
useremail VARCHAR(200),
tahitinumber VARCHAR(6),
commentary LONGBLOB,
filedeclaration LONGBLOB);'

La table est bien créée si l'on voit 'Query OK, 0 rows affected'. La commande 'show tables;' permet de voir si la table est bien présente dans notre base de données.

9) Une fois fait, se placer à la racine de dicpproject/server et taper 'npm install --save-exact express@4.17.1 cors@2.8.5 mysql@2.18.1'

10) Sur le même terminal, au même emplacement, relancer le serveur avec la commande 'node server', si l'erreur suivante 'Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client' est rencontrée,alors il faut aller sur le terminal MySQL et taper 'ALTER USER 'timeline'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';' et sur le terminal où l'erreur a été rencontrée,lancer à nouveau 'node server'

## Utilisation

1) Lancer l'URL 'http://localhost:4200/' , et naviguer sur le formulaire grâce au choix de questions. (L'affichage est conditionnel pour certains champs selon la question choisie).

2) Ouvrir l'url 'https://mailtrap.io/signin' et se logger avec les informations suivantes: Email: dciptest0@gmail.com / Password: Dcip0test!
Cette url permet de voir les emails reçus pour le service concerné. L'adresse gmail possède le même mot de passe.

3) Remplir le formulaire pour le cas 'Justificatif DICP', si l'on renseigne un Numéro Tahiti incorrect, ou vide, le bouton 'Envoyer' affichera les erreurs. Les données du formulaire sont envoyées
s'il n'y a plus d'erreurs.

4) Pour consulter si la donnée a bien été stockée sur la base de données, via MySQL 8.0 Command Line Client, taper 'use timeline;' , puis faire un 'SELECT * FROM dicpquestion;'

## Commentaires

1) Ayant rajouté des validators required via une fonction, je n'ai pas eu le temps de réussir à gérer correctement l'affichage des erreurs. En effet, si l'on se place par exemple sur la question 'Justificatif DICP', et que l'on
change la valeur de la question sans rien remplir, par la question 'Contentieux'. Si on fait 'Envoyer' sans rien remplir, le 'Numéro Tahiti' qui est censé être obligatoire, n'affiche pas de message. Le changement de valeur me laissait l'erreur affichée,
j'ai souhaité faire un refresh en faisant un setErrors pour les validators, sauf que je n'ai pas réussi à le réinitialiser. Afin de réussir à tester tous les cas d'envoi sans erreur, il ne faut pas switcher de question pour aboutir aux tests.
Cette problématique peut permettre d'envoyer une donnée vide. C'est en effet le défaut que je n'ai pas eu le temps de résoudre.

2) Par manque de temps, il y a des contrôles et des gestions d'erreur qui ne sont pas assez abouti, tel que les commandes à effectuer au moment des résultats de requêtes selon le résultat.

3) Au niveau de la table que j'ai créé, j'ai mis en dur l'ID par manque de temps, car il aurait fallut que je définisse un objet pour le formulaire, comportant l'ID, et qui soit auto-incrémenté, via la récupération du MAX sur la table, que l'on peut obtenir via un GET.

4) Clairement, au niveau sécurité des requêtes, je pense qu'il me manque beaucoup de choses, tel que l'encode/décodage de la donnée (decodeURIComponent ou encodeURIComponent). La gestion du fichier envoyé.

5) La fonction server.js pourrait avoir des fonctions plus propres et génériques. L'utilisation des services pourrait être plus générique.

6) L'envoi de mail est fonctionnel, par contre, est mal géré sans doute des notions d'authentification, ainsi que la gestion de la pièce-jointe.

7) Le bouton d'envoi n'est pas celui attendu.

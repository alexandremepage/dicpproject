# DCIPPROJECT

Ce projet, est un formulaire permettant de faciliter l'utilisateur pour avoir des informations auprès de la DICP, en remplissant un formulaire, qui envoie une notification mail au service dédié en fonction de la question choisie, et de traiter plus facilement les demandes, qui sont stockées en base de données.

# Outils

Le projet a été réalisé à l'aide du framework [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.
Front-End: Angular
Base de données: MySQL
Back-End: Node.js

# SOMMAIRE

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

## Installation

1) Lancer un terminal à la racine du répertoire DICPPROJECT, et lancer 'ng serve' pour le serveur, et se rendre sur `http://localhost:4200/`.

2) Via un terminal, se placer à la racine du répertoire DICPPROJECT/server, et taper la commande node server. Une indication 'serveur runing in 3000' indique que le serveur
est bien démarré et peut recevoir des requêtes HTTP.

3) Installer MySQL pour Windows via https://dev.mysql.com/downloads/installer/ et choisir (mysql-installer-community-8.0.25.0.msi)

4) Lancer l'éxecutable et valider tout le temps les informations, juste, choisir le type d'installation SQL Server

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

9) Une fois fait, se placer à la racine de DICPPROJECT/server et taper 'npm install --save-exact express@4.17.1 cors@2.8.5 mysql@2.18.1'

10) Sur le même terminal, au même emplacement, relancer le serveur avec la commande 'node server', si l'erreur suivante 'Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client' est rencontrée,alors il faut aller sur le terminal MySQL et taper 'ALTER USER 'timeline'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';' et sur le terminal où l'erreur a été rencontrée,lancer à nouveau 'node server'

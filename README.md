# punto

Le punto est une application permettant de jouer au jeux du punto, il est codé en vue.js pour le frontend avec un serveur express en backend. Le punto est relier à trois bdd (sqlite, mysql, mongodb).

## Setup and run bdd 

```sh
docker compose up
```

## init node 

```sh
cd app
npm install
cd ../api
npm install
```

## Run api and app

```sh
cd app
npm run dev

cd api
npm start
```

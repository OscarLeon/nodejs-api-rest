// Importamos las librerias para uso en el codigo
var express = require("express");
var http = require("http");
var cors = require("cors");
var app = express();

// Habiliatamos para que pueda emitir respuesta desde cualquier origen
app.use(cors());
app.set("port", process.env.PORT || 9990);

// Peticion GET para la informacion de los personajes de StarWars
app.get("/api/characters/:character", (req, res) => {
  let characterObjectJson = null;
  let characterName = req.params.character;
  let pathCharacter = "./api/characters/";
  let tagJson = ".json";
  let joinUrlCharacter = "";
  switch (characterName) {
    case "luke":
    case "darth-vader":
      joinUrlCharacter += `${pathCharacter}`;
      joinUrlCharacter += `${characterName}`;
      joinUrlCharacter += `${tagJson}`;
      characterObjectJson = require(joinUrlCharacter);
      res.status(200).send(characterObjectJson);
      break;
    default:
      res.status(404).send("No se encuentra informacion del personaje");
      break;
  }
});

// Mensaje de Bienvenida en Ruta Raiz
app.get("/", (req, res) => {
  res.status(200).send("Welcome to API REST for BCI Front End");
});

// Levantamos el servidor
http.createServer(app).listen(app.get("port"), () => {
  console.log("Server started at http://localhost:" + app.get("port"));
});

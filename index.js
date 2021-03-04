const express = require("express");
const handlebars = require("express-handlebars");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const produtos = [
  {
    id: "10",
    descricao: "Computador",
    quantidade: "1",
    preco: "2000",
  },
  {
    id: "11",
    descricao: "Notebook",
    quantidade: "1",
    preco: "4000",
  },
];

app.get("/", (req, res) => {
  res.send(produtos);
});

app.get("/cadproduto", (req, res) => {
  res.render("cadproduto");
});

app.post("/adicionaproduto", (req, res) => {
  const texto = req.body;
  if (texto.length == 0) res.render("produto", { msg: "Produto Inválido" });
  else {
    produtos.push(texto);
    res.render("produto", { msg: "Inclusão Concluída com Sucesso" });
  }
});

app.get("/alteraproduto", (req, res) => {
  res.render("alteraprodutog", { msg: produtos });
});

app.get("/altera/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const texto = produtos[id];
  console.info("Info1 " + texto);
  res.render("formaltera", { mid: id, msg: texto });
});

app.post("/leitura/:id", (req, res) => {
  const mensagem = req.body.texto;
  const id = parseInt(req.params.id);
  if (mensagem.length == 0) res.render("produto", { msg: "Mensagem Inválida" });
  else {
    produtos[id] = mensagem;
    res.render("produto", { msg: "Alteração Concluída com Sucesso" });
  }
});

app.get("/delproduto", (req, res) => {
  res.render("removeproduto", { msg: produtos });
});

app.get("/remove", (req, res) => {
  const id = parseInt(req.params.id);
  produtos.splice(id, 1);
  res.render("produto", { msg: "Remoção Realizada com Sucesso" });
});

app.listen(port);

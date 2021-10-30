const express = require("express");
const router = express.Router();

const listaPaises = [
  {
    Nome: "Canada",
    Descobrimento: "1497",
  },
  {
    Nome: "Irlanda",
    Descobrimento: "1.600 a.C.",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota paises operante" });
});

router.get("/listapaises", (req, res) => {
  res.status(200).json(listaPaises);
});

router.get("/paisesindex/:Nome", (req, res) => {
  const pais = req.params.Nome;
  const index = listaPaises.findIndex((item) => item.Nome === Nome);
  if (index == -1) {
    res.status(204);
    return;
  }
  res.status(200).json({ index: index });
}); //corrigir

router.post("/cadastropais", (req, res) => {
  const pais = req.body;

  if (!pais.Nome) {
    res.status(400).json({ message: "Nome do país vazio" });
    return;
  }
  if (!pais.Descobrimento) {
    res.status(400).json({ message: "Ano do descobrimento vazio" });
    return;
  }
  listaPaises.push(pais);
  res.json({ message: "Cadastrado com sucesso!" });
});

router.put("/atualizarpais/:id", (req, res) => {
  const pais = req.body;
  const id = req.params.id - 1;
  listaPaises[id] = pais;
  res.status(200).json({ message: "Atualizado com sucesso!" });
});

router.delete("/deletarpais/:id", (req, res) => {
  const id = req.params.id - 1;
  delete listaPaises[id];
  res.json({ message: "Deletado com sucesso!" });
});

module.exports = router;
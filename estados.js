const express = require("express");
const router = express.Router();

const listaEstados = [
  {
    Estado: "Inglaterra",
    Nome: "Yorksheire",
    Fundacao: "Segunda guerra",
    Populacao: "5.000.000",
    Area: "15.000 km²",
  },
  {
    Estado: "Brasil",
    Nome: "São Paulo",
    Fundacao: "1532",
    Populacao: "46.649.132",
    Area: "248.219.481km²",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({ message: "Rota Estados operante" });
});

router.get("/listaestados", (req, res) => {
  res.status(200).json(listaEstados);
});

router.get("/estadosindex/:Nome", (req, res) => {
  const Nome = req.params.Nome;
  const index = listaEstados.findIndex((item) => item.Nome === Nome);
  if (index == -1) {
    res.status(204);
    return;
  }
  res.status(200).json({ index: index });
}); //corrigir

router.post("/cadastroestado", (req, res) => {
  const estado = req.body;

  if (!estado.Pais) {
    res
      .status(400)
      .json({ message: "Nome do Pais do Estado cadastrado não pode ser vazio!" });
    return;
  }
  if (!estado.Nome) {
    res
      .status(400)
      .json({ message: "Nome do Estado cadastrado não pode ser vazio!" });
    return;
  }
  if (!estado.Fundacao) {
    res
      .status(400)
      .json({ message: "Ano de fundação cadastrado não pode ser vazio!" });
    return;
  }
  if (!estado.Populacao) {
    res
      .status(400)
      .json({ message: "População do Estado cadastrado não pode ser vazio!" });
    return;
  }
  if (!estado.Area) {
    res
      .status(400)
      .json({ message: "Área do Estado cadastrado não pode ser vazio!" });
    return;
  }
  listaEstados.push(estado);
  res.json({ message: "Cadastrado com sucesso!" });
});

router.put("/atualizarestado/:id", (req, res) => {
  const estado = req.body;
  const id = req.params.id - 1;
  listaEstados[id] = estado;
  res.status(200).json({ message: "Atualizado com sucesso!" });
});

router.delete("/deletarestado/:id", (req, res) => {
  const id = req.params.id - 1;
  delete listaEstados[id];
  res.json({ message: "Deletado com sucesso!" });
});

module.exports = router;

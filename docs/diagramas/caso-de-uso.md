# Diagrama de Caso de Uso — EPIGuard

Dois atores, oito casos de uso principais. Base para o diagrama de classes (CP5) e para os diagramas de sequência dos fluxos de Entrega e Alerta (CP5).

```mermaid
flowchart LR
  Tecnico(["👷 Técnico de Segurança"])
  Colaborador(["🦺 Colaborador"])

  subgraph Sistema["Sistema EPIGuard"]
    direction TB
    UC1(("Login"))
    UC2(("Cadastrar\nColaborador"))
    UC3(("Cadastrar\nEPI"))
    UC4(("Registrar\nEntrega"))
    UC5(("Registrar\nDevolução"))
    UC6(("Consultar\nHistórico"))
    UC7(("Ver Alertas\nde Vencimento"))
    UC8(("Ver\nDashboard"))
  end

  Tecnico --> UC1
  Tecnico --> UC2
  Tecnico --> UC3
  Tecnico --> UC4
  Tecnico --> UC5
  Tecnico --> UC6
  Tecnico --> UC7
  Tecnico --> UC8
  Colaborador --> UC1
  Colaborador --> UC4
  Colaborador --> UC6
```

> Para o entregável do CP4 (imagem no README/documentação), renderize este bloco mermaid num visualizador (GitHub renderiza `.md` com mermaid automaticamente) ou exporte como PNG para `docs/diagramas/caso-de-uso.png`.

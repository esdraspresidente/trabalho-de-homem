# Trabalho de Homem

App de gestão do serviço de marido de aluguel: orçamentos, serviços, agenda,
prestadores (terceirizados) e clientes. É instalável no celular como app.

Publicado pelo GitHub Pages a partir da branch `main`, na raiz.

## Onde ficam os dados

O app usa o mesmo projeto Supabase do Diligências (`ggyngtqknonwnohbzkyj`),
mas **só em tabelas próprias, com prefixo `tdh_`**.

O motivo é o comportamento dos outros apps:

- o Diligências lê a tabela `demandas` inteira, sem filtro;
- o Fullfin importa toda demanda com status `pago`.

Gravar serviço de marido de aluguel ali misturaria os dois negócios.

A estrutura do banco, comentada, está em `previmater-ops/_sql/tdh_01_estrutura.sql`.

### Acesso

As tabelas só abrem para um login: a função `is_tdh()` no banco confere o
usuário. Qualquer outro login entra e vê as tabelas vazias, e o app avisa
"sem acesso".

### Contato com o Diligências

O contato acontece só em dois pontos:

- **Bloqueios:** cada dia de serviço cria um bloqueio no seu nome, com 1h de
  folga antes e 1h depois. Quem cria é um trigger no banco, então o bloqueio
  nunca fica desatualizado. O motivo aparece só como "Trabalho de Homem",
  sem cliente nem endereço.
- **Leitura:** a agenda deste app mostra as suas diligências e os seus
  bloqueios, para avisar de conflito. Ela só lê, e pega apenas data, hora,
  descrição e local.

## Regras de dinheiro

- **Preço sugerido de cada item:** material × (1 + margem) + mão de obra,
  arredondado de 5 em 5. É a conta que fechou o orçamento 653.
- **Custo interno** (ajudante, alimentação): não aparece para o cliente e
  não soma no total. Entra só no cálculo do lucro.
- **Lucro do serviço:** valor cobrado − material − repasses.
- **Numeração dos orçamentos:** sequência no banco, a partir do 654. O
  rascunho não consome número; o número sai na emissão e nunca se repete.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O app inteiro |
| `sw.js` | Service worker. Busca na rede primeiro, para o celular pegar sempre a última versão |
| `manifest.json` | Dados para instalar no celular |
| `simbolo.svg` | Símbolo da logo, usado no app e no PDF |
| `icon-*.png`, `favicon.png`, `apple-touch-icon.png` | Ícones gerados a partir do símbolo |

O que ficou combinado e ainda não foi feito está em `BACKLOG.md`.

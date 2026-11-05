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

## Retornos (acompanhamento de contatos)

Todo cliente é também um contato que pode ser chamado de volta: status
(novo, conversando, orçamento enviado, fechado, perdido, adormecido),
origem, próximo contato e "não quer mais contato". Nome deixou de ser
obrigatório: basta nome **ou** WhatsApp.

As regras automáticas ficam no banco (`previmater-ops/_sql/tdh_02_followup.sql`),
não no app, para valerem igual de qualquer tela:

- orçamento enviado → retorno em 2 dias; aprovado → limpa o retorno;
- recusado, perdido ou adormecido → volta para a fila em 150 dias;
- serviço executado → pós-venda em 75 dias;
- data escolhida à mão ganha da automática.

Os prazos se mudam em Configurações. Todo dia às 07:30 a function
`tdh-followup` manda por e-mail os atrasados e os de hoje (sem ninguém,
não manda).

## Regras de dinheiro

- **Preço sugerido de cada item:** material × (1 + margem) + mão de obra,
  arredondado de 5 em 5. É a conta que fechou o orçamento 653.
- **Custo interno** (ajudante, alimentação): não aparece para o cliente e
  não soma no total. Entra só no cálculo do lucro.
- **Lucro do serviço:** valor cobrado − material − repasses.
- **Numeração dos orçamentos:** sequência no banco, a partir do 654. O
  rascunho não consome número; o número sai na emissão e nunca se repete.

## Importar orçamento (montado no Claude)

Em Orçamentos → "Importar orçamento", você cola o JSON que o Claude gera na
conversa, confere a prévia e importa. Sempre entra como **rascunho**: o
número só sai quando você emitir, depois de conferir.

Cliente é achado pelo WhatsApp (só dígitos, com DDD). Se não existir, é
cadastrado. Cliente existente não é sobrescrito: só os campos vazios dele
são completados. Se algo falhar no meio, nada fica gravado pela metade.

Formato (`tdh-orcamento-v1`). Só `itens[].titulo` e nome **ou** WhatsApp do
cliente são obrigatórios; o resto cai no padrão das Configurações.

```json
{
  "formato": "tdh-orcamento-v1",
  "cliente": { "nome": "", "whatsapp": "41999999999", "documento": "",
               "endereco": "", "bairro": "", "cidade": "", "origem": "" },
  "orcamento": { "local_servico": "", "subtitulo": "", "validade_dias": 15,
                 "garantia_dias": 90, "entrada_valor": 0,
                 "observacoes_internas": "" },
  "itens": [
    { "tipo": "servico", "titulo": "", "descricao_cliente": "",
      "tempo_estimado_min": 90, "material_custo": 0, "mao_obra": 0,
      "margem_material_pct": 15, "preco_cliente": 0 },
    { "tipo": "custo_interno", "titulo": "Ajudante", "mao_obra": 150 }
  ]
}
```

`preco_cliente` vazio = preço sugerido pela regra do app. Preenchido = vale
o valor combinado na conversa.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O app inteiro |
| `sw.js` | Service worker. Busca na rede primeiro, para o celular pegar sempre a última versão |
| `manifest.json` | Dados para instalar no celular |
| `simbolo.svg` | Símbolo da logo, usado no app e no PDF |
| `icon-*.png`, `favicon.png`, `apple-touch-icon.png` | Ícones gerados a partir do símbolo |

O que ficou combinado e ainda não foi feito está em `BACKLOG.md`.

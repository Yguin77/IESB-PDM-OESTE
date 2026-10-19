**RotinaIESB — Relatório de Entrega (Atividade Integradora)**
Programação para Dispositivos Móveis — Prof. Marcelo Alves Farias — IESB

## 1. Comando utilizado para criar o projeto

```
npx create-expo-app@latest RotinaIESB --template blank
```

Em seguida, as dependências específicas da Aula 06:

```
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## 2. Prints do funcionamento

**2.1 Tela vazia (primeira execução)**
![Tela vazia](./RotinaIESB/assets/vazia.png)

**2.2 Tela com itens cadastrados**
![Tela com itens](./RotinaIESB/assets/itens.png)

**2.3 Após fechar e reabrir o app**
![Tela com itens](./RotinaIESB/assets/AbrindooAPP.png)

## 3. Mapa dos useEffect (App.js)

| useEffect | Linha | Responsabilidade |
|---|---|---|
| #1 — Carregar | 45 | Executa uma única vez, na montagem do app (dependências `[]`). Lê o AsyncStorage com `getItem(STORAGE_KEY)` e usa `JSON.parse` para preencher `compromissos`. |
| #2 — Salvar | 67 | Executa sempre que `compromissos` muda (dependências `[compromissos, carregado]`). Usa `JSON.stringify` e `AsyncStorage.setItem(STORAGE_KEY, ...)`. Tem guarda `if (!carregado) return` pra não sobrescrever dados antes do carregamento inicial terminar. |

Chave de armazenamento:
```
const STORAGE_KEY = '@rotina_iesb_compromissos';
```

## 4. Arquivos criados

**components/**
- `CompromissoInput.js` — campo de texto e botão de adicionar. Props: `value`, `onChangeText`, `onAdd`, `labels`.
- `CompromissoList.js` — lista de compromissos com opção de remoção. Props: `itens`, `onDelete`, `tituloLista`, `listaVazia`.

**labels.js**

| Constante | Uso |
|---|---|
| tituloApp | Título exibido no cabeçalho |
| subtituloApp | Subtítulo do cabeçalho |
| placeholderCompromisso | Texto de exemplo no campo de input |
| botaoAdicionar | Texto do botão de cadastro |
| tituloLista | Título da seção de lista |
| listaVazia | Mensagem exibida quando não há compromissos |
| mensagemCampoVazio | Alerta ao tentar adicionar texto vazio |
| mensagemErroSalvar | Alerta de erro ao salvar no AsyncStorage |
| mensagemErroCarregar | Alerta de erro ao carregar do AsyncStorage |

---
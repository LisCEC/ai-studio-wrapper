# ai-studio-wrapper

Este repositório contém um app estático que embute o app do AI Studio e oferece um formulário para coletar respostas dos usuários.

O app principal é index.html. Ele tenta embutir:
https://ai.studio/apps/drive/1hf3Hg1xhZibpHA8GssMiXZWd0xwyFzs2

Se o domínio bloquear embeds (X-Frame-Options/CSP), o site mostrará um botão para abrir em nova aba.

Salvar respostas
Para salvar respostas, forneça um endpoint que aceite POST com JSON (ou outro formato configurado).

Opções rápidas:
1) Formspree (rápido)
   - Crie uma conta em https://formspree.io e obtenha o endpoint.
   - Copie config.example.js para config.js e ajuste endpoint. Não comite config.js.

2) Google Apps Script + Google Sheets (grátis, eu te mostro como)
   - Use o script `Code.gs` (fornecido no README abaixo) para receber POST e gravar em uma planilha.
   - Publique como Web App e cole a URL em config.js.

3) Seu endpoint serverless (recomendado para produção)
   - Implemente um endpoint que aceite POST JSON e salve em DB/Sheet/email.

Publicação em GitHub Pages
1. Crie/receba o repositório em LisCEC/ai-studio-wrapper.
2. Vá em Settings -> Pages -> Branch: main (root) e salve.
3. O site ficará em: https://LisCEC.github.io/ai-studio-wrapper/

Google Apps Script (exemplo)
- Crie uma nova Google Sheet.
- Em Extensões -> Apps Script, crie um projeto e adicione o conteúdo do arquivo `Code.gs` (abaixo).
- Faça Deploy -> New deployment -> Web app. Em "Who has access", escolha "Anyone" (ou conforme necessidade).
- Copie a URL do web app e coloque em config.js -> endpoint.

Exemplo mínimo de config.js:
```js
const FORM_CONFIG_GLOBAL = {
  endpoint: 'https://script.google.com/macros/s/SEU_DEPLOY_ID/exec',
  method: 'POST',
  stringify: (obj) => JSON.stringify(obj)
};
```

Segurança
- Não coloque segredos no config.js em repositórios públicos. Prefira um endpoint server-side com credenciais guardadas.

Se quiser, eu:
- Posso re-tentar criar/pushar os arquivos depois que você autorizar novamente (se você aceitar o diálogo de permissão do GitHub).
- Ou posso te guiar passo a passo para criar o repositório e subir os arquivos localmente (com comandos).


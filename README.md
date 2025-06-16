# Painel de Gestão e Automação Judicial

## Descrição

Este projeto é uma solução full-stack para gerenciamento de processos judiciais, simulando um painel de controle para uma vara judicial. Ele permite o cadastro, acompanhamento, análise estatística e geração automatizada de documentos (alvarás em PDF) de processos judiciais. O sistema é modular, escalável e preparado para integrações futuras, como notificações automáticas e webhooks.

## Tecnologias Utilizadas

- **Front-end:**  
  - React  
  - Vite  
  - TailwindCSS  
  - Chart.js, Recharts (gráficos)  
  - Firebase (autenticação e Firestore)  
  - EmailJS (envio de e-mails)

- **Back-end:**  
  - Node.js  
  - Express  
  - PostgreSQL (opcional, para persistência)  
  - Firebase Admin SDK  
  - Integração com microserviço Java via linha de comando

- **Microserviço Java:**  
  - Java 17+  
  - Maven  
  - OpenPDF (geração de PDF)  
  - Gson (serialização JSON)

- **Infraestrutura:**  
  - Deploy do front-end na Vercel  
  - Backend rodando localmente ou em servidor próprio

## Funcionalidades Principais

- Cadastro e autenticação de usuários (com diferentes perfis)
- Cadastro, listagem, exclusão e análise de processos judiciais
- Geração automática de documentos PDF (alvará) via microserviço Java
- Visualização de estatísticas e gráficos dos processos
- Integração com e-mail e WhatsApp para notificações (via webhooks)
- Interface moderna, responsiva e fácil de usar

## Estrutura de Diretórios

```
/painel-judicial
├── /backend
│   ├── /src
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   ├── processos.json
│   └── package.json
│
├── /frontend
│   ├── /src
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── /java-document-generator
    ├── /src/main/java/com/tjma/generator/
    │   └── Main.java
    └── pom.xml
```

---

## 1. Backend

### Pré-requisitos

- Node.js >= 18
- Java 17 (para rodar o microserviço)

### Instalação e Execução

```bash
cd backend
npm install
# Em desenvolvimento:
npm run dev
# Em produção:
npm start
```

O servidor estará disponível em `http://localhost:3001`

---

## 2. Front-end

### Pré-requisitos

- Node.js >= 18

### Instalação e Execução

```bash
cd frontend
npm install
npm run dev
```

O front-end estará disponível em `http://localhost:5173`

---

## 3. Microserviço Java (Geração de PDF)

### Pré-requisitos

- Java 17+
- Maven

### Compilação

```bash
cd java-document-generator
mvn clean package
```

O JAR será gerado em `target/document-generator-1.0-SNAPSHOT.jar`.

---

## 4. Uso

1. Inicie o backend e o microserviço JAR estará pronto após o build.
2. Inicie o frontend.
3. No Dashboard, use o botão **"Gerar Alvará"** para qualquer processo — o documento PDF será gerado e baixado automaticamente.

---

## 5. Observações

- **Integração futura:** O backend está preparado para receber webhooks e automações (veja comentários no código).
- **Facilmente extensível:** Estrutura modular.

---

## 6. Comandos Úteis

- Backend: `npm run dev` (hot reload), `npm start` (produção)
- Frontend: `npm run dev`
- Java: `mvn clean package`

---

## 7. Contato

Projeto fictício para fins de demonstração.
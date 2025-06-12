# Painel de Gestão e Automação Judicial

Uma aplicação full-stack simulando um painel de controle para uma vara judicial, composta por:

- **Front-end:** React + Vite + TailwindCSS
- **Back-end:** Node.js + Express
- **Microserviço:** Java (Geração de PDF via linha de comando)

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
# Plataforma de Dados Ambientais - INPP

**Candidato:** Alisson Joaquim Lara de Oliveira
**Vaga:** Perfil 1 – Desenvolvimento de Plataforma de Dados Ambientais
**Avaliadora:** Dr.ª Flávia Gonçalves Fernandes (DITIC/INPP)

Este repositório contém a solução do teste prático focado em manipulação, processamento e visualização de séries temporais do Pantanal.

A solução foi projetada como uma **aplicação front-end reativa (Single Page Application)**, visando demonstrar habilidades na construção de painéis de dados (dashboards) interativos e robustos.

---

## 🚀 Instruções de Execução

O projeto foi desenvolvido utilizando **Node.js** e o gerenciador de pacotes **pnpm** para maior velocidade e eficiência.

### 1. Pré-requisitos

Certifique-se de ter o Node.js e o pnpm instalados na sua máquina.

### 2. Instalação

Clone este repositório, navegue até a pasta do projeto e instale as dependências:

```bash
pnpm install
```

### 3. Execução do Dashboard (Desenvolvimento)

Para iniciar o servidor local e visualizar a aplicação:

```bash
pnpm run dev

```

Acesse no navegador: `http://localhost:5173/`

---

## 🛠️ Justificativa das Escolhas Técnicas

Para simular o ambiente de uma plataforma de dados moderna, a stack foi cuidadosamente selecionada:

- **Vue 3 (Composition API) + Vite:** Escolhidos pela altíssima performance e facilidade em lidar com reatividade em dashboards de dados. O Vite garante um build instantâneo.
- **TypeScript:** Essencial para garantir a tipagem rigorosa dos dados ambientais (ex: garantindo o manuseio correto de tipos `number | null`), prevenindo erros em tempo de execução.
- **Tailwind CSS v4:** Utilizado para criar uma interface limpa, responsiva e de fácil manutenção, sem a necessidade de arquivos CSS gigantescos e difíceis de rastrear.
- **Chart.js (`vue-chartjs`):** Padrão da indústria para visualização de dados no front-end. Leve, interativo e com excelente renderização no canvas.
- **Vitest:** Framework de testes nativo do ecossistema Vite.

---
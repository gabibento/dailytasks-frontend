# DailyTasks - Frontend  

Bem-vindo ao repositório do **frontend** do **DailyTasks**, uma aplicação de listas de tarefas (*To-Do List*) com funcionalidades de CRUD, desenvolvida com **React**, **Vite** e **Material-UI** para aprendizado e prática no desenvolvimento de interfaces dinâmicas e responsivas.  

🔗 [Repositório do Backend](https://github.com/gabibento/taskplan-backend)  

🔗 **Acesse o Projeto em Funcionamento:** [DailyTasks](https://task-manager-nsc1-git-main-gabriellas-projects-bb68f8bb.vercel.app/)  

---

## 📋 Sobre o Projeto  

O **DailyTasks** é uma aplicação de gerenciamento de tarefas desenvolvida para aprimorar habilidades em desenvolvimento web full-stack. O frontend fornece uma interface amigável para os usuários interagirem com o sistema, conectado ao backend via **API REST** com autenticação baseada em JWT.  

---

## 🚀 Funcionalidades  

### Funcionalidades Principais  
- **Cadastro de Usuários:** Permite que novos usuários criem suas contas diretamente no sistema.  
- **Login:** Autenticação com credenciais para obter um token JWT e acessar funcionalidades protegidas.  
- **Logout:** Finaliza a sessão do usuário de forma segura.  
- **Criação de Tarefas:** Adicione novas tarefas com título, categoria, prioridade e data de vencimento.  
- **Visualização de Tarefas:** Exibe a lista de todas as tarefas registradas pelo usuário autenticado.  
- **Edição de Tarefas:** Permite modificar as informações das tarefas existentes.  
- **Filtragem de Tarefas:** Filtre as tarefas por categoria, prioridade ou status (concluída/não concluída).  
- **Busca de Tarefas:** Encontre tarefas específicas pelo título.  
- **Classificação de Tarefas:** Organiza as tarefas em seções como "Vencidas", "Hoje" e "Próximas", baseando-se na data de vencimento e priorizando tarefas importantes.  

---

## 🛠️ Tecnologias Utilizadas  

### Frontend  
- **React:** Biblioteca JavaScript para criação de interfaces de usuário.  
- **Vite:** Ferramenta de build rápida para desenvolvimento com React.  
- **Axios:** Biblioteca para requisições HTTP, facilitando a comunicação com o backend.  
- **Material-UI:** Biblioteca de componentes estilizados, garantindo uma interface moderna e responsiva.  
- **React Router:** Gerenciamento de rotas para navegação entre páginas.  

---

## 📂 Estrutura do Projeto  

```plaintext  
src  
├── components         # Componentes reutilizáveis da aplicação  
│   ├── pages          # Páginas principais (Login, Signup, Home)  
│   ├── tasks          # Componentes específicos para tarefas (lista, formulários, etc.)  
│   └── ui             # Componentes gerais e funcionais (HeaderBar, Logout, Search, etc)
├── hooks              # Hooks customizados para lógica de estado e funcionalidades  
├── services           # Configuração de comunicação com o backend 
└── main.jsx           # Arquivo principal de inicialização do React  

```  

## 💬 Feedback e Contribuição  

Obrigada por visitar este repositório! Feedbacks e sugestões são bem-vindos. Se você deseja contribuir:  
1. Faça um *fork* do repositório.  
2. Crie uma *branch* para sua melhoria (`git checkout -b minha-melhoria`).  
3. Envie um *pull request* com suas alterações.  

---

## Autor  

<div align="left">  
  <a href="https://github.com/gabibento">  
    <img alt="Gabriella Maurea Bento" src="https://avatars.githubusercontent.com/u/143539144?v=4" width="115" style="border-radius:50%">  
  </a>  
  <br>  
  <sub><b>Gabriella Maurea Bento</b></sub><br>  
</div>  

---

## 📝 Licença  

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.  

---

Se houver algo mais para ajustar, é só falar! 😊

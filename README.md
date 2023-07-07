# sistema-vagas

## Requisitos iniciais:
- Ter Python, pip e yarn instalados

## Como rodar o sistema localmente:
- Clone o repositorio

  ### Executar Backend:
  - Entre no diretorio  [vaga](https://github.com/eliabevces/sistema-vagas/tree/main/vaga "vaga dir")
  - Execute os seguintes comandos para instalar as dependencias:
  ``` cmd
    pip install -r requirements.txt
    pip install django-cors-headers
  ```
  
  - Execute o seguinte comando para a criação do banco de dados local:
  ```
    python manage.py migrate
  ```
  
  - Por ultimo execute o seguinte comando para rodar o servidor localmente:
  ```cmd
    python manage.py runserver
  ```

  ### Executar Frontend:
  - Entre no diretorio  [frontend](https://github.com/eliabevces/sistema-vagas/tree/main/frontend "frontend dir")
  - Execute o seguinte comando para instalar as dependencias:
  ``` cmd
    yarn
  ```
  
  - Por ultimo execute o seguinte comando para executar o Frontend:
  ```cmd
    yarn dev
  ```
## Funcionamento do sistema:
- Com ambas partes do sistema rodando entre na url [http://localhost:5173](http://localhost:5173 "url Home")
![imagem Home](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_home.png "img home")

- A partir da Home é possivel cadastrar uma empresa ou um candidato
![imagem cad emp](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_nova_emp.png "img cad emp")
![imagem cad cand](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_novo_cand.png "img cad cand")

- Apos o cadastro é possivel logar e acessar a area privada do usuario logado (empresa ou candidato)
![imagem login](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_login.png "img login")
![imagem priv cand](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_priv_candidato.png "img priv cand")
![imagem priv emp](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_priv_emp.png "img priv emp")

- Na área do candidato é possivel ver a listagem de vagas disponiveis e se inscrever
![imagem insc](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_inscrição.png "img insc")

- Na área da empresa é possivel criar vagas, listar vagas da empresa, editar vagas, excluir vagas e ver mais detalhes da vaga
![imagem nova vaga](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_nova_vaga.png "img nova vaga")
![imagem list vaga](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_list_vagas_emp.png "img list vaga")
![imagem edit vaga](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_editar_vaga.png "img edit vaga")
![imagem info vaga](https://github.com/eliabevces/sistema-vagas/blob/main/imgs_sistema/tela_info_vaga.png "img info vaga")


# Olympus - Hackathon2K26

A organização das Olimpíadas Internas do Instituto Federal Catarinense (IFC) – Campus Araquari envolve o gerenciamento de diversas informações, como torneios, equipes, modalidades, partidas, horários, locais, árbitros, resultados, classificações e notícias. O controle dessas informações pode gerar dificuldades logísticas, conflitos de horários e problemas na comunicação com os participantes. Nesse contexto, o projeto propõe o desenvolvimento de uma aplicação web que auxilie na gestão e organização das Olimpíadas Internas do Campus Araquari, buscando centralizar as informações e facilitar tanto a administração quanto o acompanhamento das competições.

Integrantes: Vilmar Michels Filho, Igor Gabriel Decker, Vitor Avanzi Lipinski, Davi Augusto Ramos.

## Requisitos funcionais

Os requisitos abaixo descrevem as funcionalidades presentes na versão atual da aplicação Vue. A numeração RF001 a RF015 foi mantida, com descrições ajustadas ao comportamento implementado.

### Cadastros, acesso e competições

- **RF001 - Manter times:** permitir cadastrar, consultar, editar e excluir times, com nome, cor, escudo, pontuação geral e vínculo com o torneio.
- **RF002 - Manter modalidades:** permitir cadastrar, consultar, editar e excluir modalidades, com nome, descrição, imagem, duração dos jogos, local e vínculo com o torneio.
- **RF003 - Manter turmas:** permitir cadastrar, consultar, editar e excluir turmas, com curso técnico, ano, série e vínculos com time e torneio.
- **RF004 - Manter árbitros:** permitir cadastrar, consultar, editar e excluir árbitros, com nome, login, senha e vínculo com o torneio. Impedir a exclusão de árbitros com jogos atribuídos.
- **RF005 - Gerenciar jogos:** permitir consultar as partidas e editar modalidade, data, horário, status e times participantes pelo painel administrativo. O local exibido utiliza o cadastro da modalidade, com local específico quando disponível na agenda pública.
- **RF006 - Autenticar usuários:** permitir login e logout de administradores e árbitros usando as contas da base existente e direcionar cada perfil ao respectivo painel.
- **RF007 - Registrar participação:** vincular times aos jogos por posição no confronto e registrar pontuação e resultado de cada participante.
- **RF008 - Atribuir arbitragem:** associar cada jogo ao árbitro responsável por meio de `cod_arbitro`, inclusive na geração das partidas.
- **RF009 - Restringir acesso por perfil:** proteger as rotas administrativas e o painel do árbitro. Administradores gerenciam os cadastros e partidas; árbitros podem concluir somente os jogos atribuídos a eles. Notícias exigem revalidação da sessão e do proprietário do torneio no cadastro.
- **RF010 - Consultar jogos por modalidade:** apresentar os próximos jogos da modalidade escolhida no torneio, com confronto, data, horário e status, em ordem cronológica.
- **RF011 - Consultar agenda por time:** listar as próximas partidas agendadas de cada time, em ordem cronológica, com filtros por torneio, modalidade e time; informar também quando um time não tiver jogos futuros.
- **RF012 - Exibir classificação geral:** apresentar posição, nome e pontuação geral dos times do torneio selecionado, em ordem decrescente de `pontuacaogeral_time`.
- **RF013 - Detectar conflitos:** identificar jogos do torneio no mesmo local e data com períodos sobrepostos, considerando o horário inicial e a duração cadastrada da modalidade.
- **RF014 - Apresentar e tratar conflitos:** destacar os conflitos no painel, permitir ignorar um alerta durante a execução da tela ou abrir a edição de um jogo para ajustar seus dados.
- **RF015 - Consultar horários por dia:** apresentar ao administrador os dias do torneio e as partidas da data selecionada, em ordem de horário, com times, modalidade, local e status.
- **RF016 - Gerenciar torneios:** permitir cadastrar, consultar, editar e excluir torneios, com nome, período, status e administrador responsável, usando o fluxo de dados gerais, modalidades, times, turmas e árbitros.
- **RF017 - Validar composição do torneio:** exigir oito times, entre 23 e 24 turmas, pelo menos uma modalidade e um árbitro para gerar os jogos. Cada time deve ter duas ou três turmas de anos distintos; somente um time pode ter duas turmas.
- **RF018 - Gerar partidas e chaveamento:** gerar jogos eliminatórios e seus participantes para o torneio ou modalidade, atribuindo horários e árbitros e vinculando as fases seguintes às partidas anteriores.
- **RF019 - Oferecer painel ao árbitro:** mostrar os jogos atribuídos ao usuário autenticado, com confronto, modalidade, horário, local, status e placar, e permitir abrir o editor quando os dois times estiverem definidos.
- **RF020 - Registrar placar e concluir partidas:** permitir ao administrador ou árbitro responsável informar pontuações numéricas não negativas, impedir empate ao concluir uma partida eliminatória, marcar o jogo como finalizado e encaminhar o vencedor à partida seguinte do chaveamento.

### Notícias das Olimpíadas

- **RF021 - Listar notícias publicamente:** disponibilizar `/noticias` sem exigir login, com imagem opcional, título, resumo, data de publicação e identificação do torneio, em ordem da mais recente para a mais antiga.
- **RF022 - Filtrar notícias:** permitir escolher um torneio ou consultar todos, mantendo esse filtro independente da seleção usada nas outras áreas e mostrando mensagem quando não houver resultados.
- **RF023 - Ler notícia completa:** disponibilizar `/noticias/:id` com título, resumo, autor, data, torneio e conteúdo organizado em parágrafos. Renderizar o conteúdo como texto simples e apresentar mensagem quando o identificador for inválido ou a notícia não existir.
- **RF024 - Cadastrar notícias:** permitir ao administrador publicar pelo painel em `/administradores#noticias`, somente para torneios de sua propriedade. Gerar ID e data de publicação e obter o autor da sessão autenticada.
- **RF025 - Validar conteúdo das notícias:** exigir título de 5 a 120 caracteres, resumo de 10 a 300 e conteúdo de 30 a 20.000, desconsiderando espaços nas extremidades; exigir a seleção de um torneio válido.
- **RF026 - Adicionar imagem opcional:** aceitar JPEG, PNG ou WebP de até 1 MiB, validar o arquivo, mostrar pré-visualização e permitir remover ou substituir a imagem. Quando houver imagem, exigir descrição acessível de até 200 caracteres; a leitura deve continuar disponível sem imagem ou quando ela falhar.
- **RF027 - Compartilhar notícias durante a navegação:** adicionar as publicações à coleção reativa em memória de `src/data/noticias.js`, tornando-as imediatamente disponíveis nas telas públicas e administrativas da mesma execução.
- **RF028 - Identificar dados demonstrativos:** oferecer seis notícias fictícias, sinalizadas como demonstrativas, com imagens ilustrativas quando presentes. Publicações cadastradas pelo administrador devem ser diferenciadas desses exemplos.

### Interface e comportamento dos dados

- **RI001 - Navegação:** oferecer acessos públicos à agenda, notícias e demais páginas, além da opção Notícias no painel administrativo, inclusive antes de selecionar um torneio.
- **RI002 - Responsividade:** adaptar as telas públicas de notícias, leitura e formulário administrativo a celulares e desktops, preservando hierarquia dos textos, campos legíveis e controles acessíveis.
- **RI003 - Login em pop-up:** abrir o diálogo de login pelos acessos do cabeçalho, da Home e do rodapé, incluindo mobile, mantendo também a rota `/login`.
- **RI004 - Estado em memória:** manter os dados de domínio em coleções reativas, como os demais cadastros. Ao recarregar a página, as alterações e notícias novas voltam à base inicial. As notícias não usam `localStorage`, backend ou sincronização entre abas; a sessão de login e a seleção administrativa conservam o comportamento já existente do projeto.

### Escopo efetivamente desenvolvido

RF001 a RF028 e RI001 a RI004 descrevem o escopo atual da demonstração no frontend. A aplicação usa dados locais e validações no cliente.

O projeto não possui tela de cadastro de administradores, registro de faltas ou observações de participantes, cadastro separado de funções de arbitragem, nem desempate do ranking por quantidade de primeiros, segundos e terceiros lugares. O ranking utiliza os pontos cadastrados; a conclusão das partidas atualiza placar, resultado e chaveamento. O módulo de notícias permite cadastro e consulta, sem edição ou exclusão de publicações.


## Dificuldades

* O grupo do projeto Olympus, passou por dificuldades nas maiores das vezes na questão de programação em sí, pela questão cujo durante o desenvolvimento do projeto ambos integrantes tiveram de fazer varias pesquisas para conseguir desenvolver todas as funcionalidades planejadas. Oque acabou causando certo atraso na finalização do projeto.
* Além disto, o grupo também passou por certas dificuldades no github, onde em certos momentos o merge de feats mesmo sem conflitos acabava sobrepondo outros codigos. Mas com o tempo a equipe conseguiu entender melhor esta questão e ter mais cuidado nisto.
## Divisões

As atividades foram dividas parcialmente entre os integrantes do grupo onde alguns membros acabaram focando mais na parte que tem mais familiarização do que outros, mas todos ajudaram um pouco em cada parte.

*  **Vitor A. Lipinski:** *Criação da maior parte do Figma(especificamente do figma/design mobile) e Design no site; também programou página 'Sobre Nós' e ajudou em algumas partes das funcionalidades do site como auxiliar.*
* **Vilmar M. Filho:** *Fez a organização do Projects/Issues do GitHub, dando cada membro suas especificas tarefas e problemas a serem resolvidos; auxilio e criação de parte do wireframe de PC; programação geral do site.*
* **Igor G. Decker:** *Criação de algumas páginas do Figma para computador; criação do banco de dados do site; programação geral do site.*
* **Davi A. Ramos:** *Criação/Revisão do Figma; programação geral do site(especificamente nas funcionalidades).*

[Especificações das Divisões(oque cada membro do grupo fez)](https://docs.google.com/document/d/1uLNRYwNz7tLLhPXr-oq22KwHoScqz3P4u8M1Hq0ZoE8/edit?usp=sharing)
## Nota que o grupo atribuiria a sí

Olhando a apresentação a um todo, achamos que a apresentação/grupo merece um **8**

* *Definimos esta nota, pois por mais que na apresentação tenha faltado uma funcionalidade do site(que seria administração de jogos), ainda sim continhamos suas informações no site, e jogos adicionados. Ou seja, tinhamos quase 100% dos jogos terminados e estaria pronto para ser adicionado, mas devido imprevistos ocorrerram atrasos que acabaram atrasando a criação da página de controle de jogos.*

* *Entretanto, acredito que olhando o site a um todo, ele está muito bem funcional, tendo funcionando o ranking de times, banner interativo, sistema de login funcional(para administradores), administração de modalidades, administração de turmas, administração de times, entre outros.*

* *Logo acredito, que levando em conta tudo que existe de funcional no site a nota aplicada para ele deveria ser **8**.*

## Notícias das Olimpíadas

A área pública está em `/noticias`, com filtro por torneio e leitura completa de cada publicação. No painel administrativo, a opção **Notícias** (`/administradores#noticias`) permite cadastrar textos e uma imagem opcional com pré-visualização.

As seis notícias iniciais são fictícias e sinalizadas como demonstrativas. O cadastro usa a autenticação existente e permite publicar somente nos torneios do administrador. As notícias usam a coleção reativa em memória de `src/data/noticias.js`, seguindo o padrão dos demais cadastros. Publicações novas aparecem durante a navegação, mas são reiniciadas ao recarregar a página.

## Deploy Surge

[Link](https://olympus-hackathon2k26.surge.sh)

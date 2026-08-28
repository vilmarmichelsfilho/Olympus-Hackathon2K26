
# Olympus - Hackathon2K26

A organização das Olimpíadas Internas do Instituto Federal Catarinense (IFC) – Campus Araquari envolve o gerenciamento de diversas informações, como equipes, modalidades, partidas, horários, locais, árbitros, resultados e classificações. O controle dessas informações pode gerar dificuldades logísticas, conflitos de horários e problemas na comunicação com os participantes. Nesse contexto, o projeto propõe o desenvolvimento de uma aplicação web que auxilie na gestão e organização das Olimpíadas Internas do Campus Araquari, buscando centralizar as informações e facilitar tanto a administração quanto o acompanhamento das competições.

Integrantes: Vilmar Michels Filho, Igor Gabriel Decker, Vitor Avanzi Lipinski, Davi Augusto Ramos.

## Funcionalidades

* RF001 - Manter Times: O sistema deve permitir manter os times informando: cod_time, nome_time, cor_time, escudo_time e pontuacaogeral_time.
* RF002 - Manter Modalidades: O sistema deve permitir manter as modalidades informando: cod_modalidade, nome_modalidade e descricao_modalidade.
* RF003 - Manter Turmas: O sistema deve permitir manter as turmas informando: cod_turma, nome_turma e ano_turma.
* RF004 - Manter Árbitros: O sistema deve permitir manter os árbitros informando: cod_arbitro e nome_arbitro.
* RF005 - Manter Jogos: O sistema deve permitir manter os jogos informando: cod_jogo, status_jogo, horario_jogo, local_jogo e fase_jogo.
* RF006 - Manter Administradores: O sistema deve permitir manter os usuários administradores informando: cod_adm, nome_adm, login_adm e senha_adm.
* RF007 - Registrar Participação: O sistema deve permitir vincular os times aos jogos (entidade associativa participa), registrando: pontuacao_time, resultado_time, faltas_time e observacao_time.
* RF008 - Registrar Arbitragem: O sistema deve permitir vincular árbitros aos jogos (entidade associativa arbitra), registrando: funcao_arbitro e observacao_arbitro.
* RF009 - Restrição de Acesso: O sistema deve garantir que apenas administradores autenticados possam criar, alterar ou excluir dados de Times, Modalidades, Turmas, Árbitros, Jogos e Participações.
* RF010 - Tabela por Modalidade: O sistema deve gerar tabelas com todos os jogos de uma modalidade específica, ordenadas pelo horário das partidas.
* RF011 - Tabela por Time: O sistema deve gerar tabelas com todos os jogos de um time específico, ordenadas pelo horário das partidas.
* RF012 - Classificação Geral: O sistema deve gerar uma tabela com a classificação geral dos times, ordenada pela pontuacaogeral_time, utilizando como critério de desempate a quantidade de primeiros, segundos e terceiros lugares.
* RF013 - Detecção de Conflitos: O sistema deve identificar automaticamente horários de jogos conflitantes.
* RF014 - Alerta Visual de Conflito: O sistema deve destacar em vermelho os horários de jogos que apresentarem conflito no painel.
* RF015 - Quadro Geral de Horários: O sistema deve gerar um quadro de horários exclusivo para administradores, cruzando dados de times, árbitros e modalidades em cada jogo para auxiliar na prevenção de sobreposições.

### Funcionalidades Efetivamente Desenvolvidas
* RF001; RF002; RF003; RF005; RF006; RF009; RF010; RF011; RF012; RF013; RF014, RF015.


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
## Deploy Surge

[Link](https://olympus-hackathon2k26.surge.sh)


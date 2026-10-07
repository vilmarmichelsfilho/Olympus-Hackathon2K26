import { reactive } from 'vue'

export const noticiasIniciais = [
  {
    id: 1,
    titulo: 'Abertura das Olimpíadas reúne as equipes do campus',
    resumo: 'Uma cerimônia simbólica marca o início da edição demonstrativa de 2026.',
    conteudo:
      'Na programação fictícia desta demonstração, as equipes se reuniram para a abertura das Olimpíadas IFC Araquari 2026. A atividade apresentou as modalidades e destacou a participação dos estudantes.\n\nA organização reforçou o respeito entre os participantes e o cuidado com os espaços do campus. Os jogos coletivos, individuais e eletrônicos fazem parte da programação apresentada neste exemplo.\n\nEsta notícia é um dado demonstrativo e não corresponde a um comunicado oficial.',
    imagem: null,
    imagemAlt: '',
    autor: 'Redação demonstrativa Olympus',
    data_publicacao: '2026-06-20T09:00:00-03:00',
    cod_torneio: 1,
    demonstrativa: true,
  },
  {
    id: 2,
    titulo: 'Futsal movimenta a primeira rodada das Olimpíadas',
    resumo: 'Partidas fictícias destacam o trabalho em equipe e o apoio das torcidas.',
    conteudo:
      'A primeira rodada de futsal da edição demonstrativa de 2026 trouxe confrontos entre equipes do campus. Neste cenário fictício, a Quadra B recebeu estudantes e torcedores ao longo da programação.\n\nOs jogos valorizaram a cooperação entre os participantes e a atuação dos responsáveis pela arbitragem. Os resultados oficiais de um torneio real devem ser consultados na área de jogos e classificação.\n\nA fotografia é ilustrativa. O relato foi criado exclusivamente para demonstrar o sistema de notícias.',
    imagem: '/images/imagem-modalidades/futsal-foto.jpg',
    imagemAlt: 'Fotografia ilustrativa da modalidade futsal',
    autor: 'Redação demonstrativa Olympus',
    data_publicacao: '2026-06-21T17:30:00-03:00',
    cod_torneio: 1,
    demonstrativa: true,
  },
  {
    id: 3,
    titulo: 'Voleibol ganha destaque na programação da semana',
    resumo: 'A cobertura demonstrativa apresenta a participação das equipes na Quadra A.',
    conteudo:
      'Na cobertura fictícia das Olimpíadas de 2026, as partidas de voleibol reuniram equipes e torcidas na Quadra A. A programação foi organizada para permitir a participação das turmas em diferentes modalidades.\n\nA comunicação entre os jogadores e o respeito às decisões da arbitragem foram os temas escolhidos para este exemplo editorial. Nenhum placar desta notícia deve ser interpretado como um resultado oficial.\n\nA imagem é ilustrativa e este conteúdo faz parte dos dados demonstrativos do projeto.',
    imagem: '/images/imagem-modalidades/volei-foto.jpg',
    imagemAlt: 'Fotografia ilustrativa da modalidade voleibol',
    autor: 'Redação demonstrativa Olympus',
    data_publicacao: '2026-06-24T16:00:00-03:00',
    cod_torneio: 1,
    demonstrativa: true,
  },
  {
    id: 4,
    titulo: 'Encerramento celebra a participação dos estudantes',
    resumo: 'A edição fictícia de 2026 termina com uma homenagem às equipes e à organização.',
    conteudo:
      'O encerramento da edição demonstrativa de 2026 reuniu participantes para celebrar a colaboração durante o torneio. Neste relato fictício, estudantes, árbitros e responsáveis pela organização receberam agradecimentos pela participação.\n\nA proposta das Olimpíadas é incentivar a convivência e a prática de atividades esportivas. A classificação do sistema permanece independente deste conteúdo editorial de exemplo.\n\nEsta notícia não representa uma cerimônia real nem uma divulgação oficial de vencedores.',
    imagem: null,
    imagemAlt: '',
    autor: 'Redação demonstrativa Olympus',
    data_publicacao: '2026-06-27T18:00:00-03:00',
    cod_torneio: 1,
    demonstrativa: true,
  },
  {
    id: 5,
    titulo: 'Planejamento da edição de 2027 começa com as turmas',
    resumo:
      'Uma notícia fictícia apresenta as primeiras atividades de preparação do próximo torneio.',
    conteudo:
      'A edição de 2027 aparece como planejada na base demonstrativa do projeto. Neste exemplo de notícia, a organização iniciou conversas com representantes das turmas para preparar a próxima programação.\n\nAs datas cadastradas para o torneio vão de 19 a 27 de junho de 2027. O comunicado fictício orienta os participantes a acompanhar futuras informações sobre equipes, modalidades e horários.\n\nEste conteúdo serve para testar notícias vinculadas a outro torneio e não confirma inscrições ou atividades oficiais.',
    imagem: null,
    imagemAlt: '',
    autor: 'Redação demonstrativa Olympus',
    data_publicacao: '2026-10-05T10:00:00-03:00',
    cod_torneio: 2,
    demonstrativa: true,
  },
  {
    id: 6,
    titulo: 'Atletismo integra a preparação para as Olimpíadas de 2027',
    resumo: 'O exemplo editorial apresenta a modalidade prevista na base do próximo torneio.',
    conteudo:
      'O atletismo está vinculado ao torneio de 2027 nos dados demonstrativos do Olympus. Esta notícia fictícia apresenta a modalidade como parte da preparação da próxima edição.\n\nNeste exemplo, a organização pretende divulgar orientações sobre participação e uso da pista em comunicados posteriores. A notícia não define regras, inscrições ou horários de provas reais.\n\nA fotografia é ilustrativa. Todas as informações editoriais deste registro foram criadas para demonstração.',
    imagem: '/images/imagem-modalidades/atletismo-foto.jpg',
    imagemAlt: 'Fotografia ilustrativa da modalidade atletismo',
    autor: 'Redação demonstrativa Olympus',
    data_publicacao: '2026-10-06T14:00:00-03:00',
    cod_torneio: 2,
    demonstrativa: true,
  },
]

// Mesmo padrão dos demais cadastros: uma coleção compartilhada em memória.
export const noticias = reactive(noticiasIniciais.map((noticia) => ({ ...noticia })))

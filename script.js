const $ = s => document.querySelector(s);
const H = document.documentElement;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sl = ms => new Promise(r => setTimeout(r, ms));
const sh = a => {
  a = [...a];
  for (let i = a.length - 1; i; i--) {
    const j = Math.random() * (i + 1) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const LS = {
  get(k, d) {
    try {
      const v = JSON.parse(localStorage.getItem(k));
      return v == null ? d : v;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }
};

const L = [
  { n: 'Iniciante', i: '🐣', c: 'var(--l0)', t: 'var(--t0)', d: 'Primeiros passos' },
  { n: 'Intermediário', i: '🚀', c: 'var(--l1)', t: 'var(--t1)', d: 'Já manjo um pouco' },
  { n: 'Avançado', i: '🔥', c: 'var(--l2)', t: 'var(--t2)', d: 'Desafio de verdade' },
  { n: 'Gênio', i: '🧠', c: 'var(--l3)', t: 'var(--t3)', d: 'Só para lendas' }
];

const C = [
  { n: 'Web', i: '🌐', k: 'var(--a)', q: [['Qual tag HTML cria um link?', '<a>', '<link>', '<href>', '<url>', 0], ['O que o CSS controla?', 'A aparência da página', 'O banco de dados', 'O servidor', 'A rede', 0], ['Qual método adiciona um item ao fim de um array em JS?', 'push()', 'pop()', 'shift()', 'slice()', 1], ['O que faz display:flex?', 'Organiza itens num eixo flexível', 'Esconde o elemento', 'Cria animação', 'Importa fonte', 1], ['Qual palavra-chave declara variável de bloco em JS?', 'let', 'var', 'def', 'dim', 2], ['O que retorna typeof null em JS?', '"object"', '"null"', '"undefined"', '"number"', 3], ['Qual tag define o título principal da página?', '<h1>', '<title>', '<head>', '<main>', 0], ['Qual propriedade CSS muda a cor do texto?', 'color', 'font-style', 'text-align', 'border', 1], ['O que faz o método addEventListener?', 'Reage a eventos como cliques', 'Cria uma tag nova', 'Salva no servidor', 'Muda a fonte', 2], ['Qual atributo descreve uma imagem para leitores de tela?', 'alt', 'src', 'href', 'id', 2], ['O que é o DOM?', 'Representação da página em árvore de objetos', 'Um servidor web', 'Um banco de dados', 'Uma biblioteca CSS', 3], ['O que é uma Promise em JavaScript?', 'Valor que estará disponível no futuro', 'Uma variável constante', 'Um tipo de loop', 'Um seletor CSS', 3], ['Qual linguagem estrutura e dá significado ao conteúdo de uma página web?', 'HTML', 'CSS', 'JavaScript', 'Python', 0], ['Qual código de status HTTP indica que o recurso não foi encontrado no servidor?', '404 Not Found', '200 OK', '301 Moved Permanently', '500 Internal Server Error', 1], ['Como o cabeçalho CORS protege uma aplicação web?', 'Impede que scripts de uma origem acessem recursos de outra sem permissão', 'Criptografa o tráfego entre cliente e servidor', 'Bloqueia ataques DDoS', 'Armazena tokens de autenticação no servidor', 2], ['No HTTP/3, qual protocolo substitui o TCP para reduzir o tempo de estabelecimento de conexão?', 'QUIC', 'SCTP', 'UDP simples', 'TLS 1.3', 3]] },
  { n: 'Hardware', i: '🖥️', k: 'var(--o)', q: [['Qual peça é o “cérebro” do computador?', 'CPU', 'Fonte', 'Gabinete', 'Cooler', 0], ['A memória RAM é…', 'Volátil', 'Permanente', 'Óptica', 'Magnética', 0], ['O SSD usa qual tecnologia?', 'Memória flash', 'Disco giratório', 'Fita magnética', 'Laser', 1], ['Para que serve a GPU?', 'Processar gráficos', 'Alimentar a placa', 'Resfriar a CPU', 'Guardar arquivos', 1], ['Qual unidade mede a frequência da CPU?', 'GHz', 'dB', 'mAh', 'DPI', 2], ['O que é thermal throttling?', 'Queda de clock por calor', 'Aumento de voltagem', 'Troca de pasta térmica', 'Overclock automático', 3], ['Qual componente guarda arquivos de forma permanente?', 'HD ou SSD', 'RAM', 'Cooler', 'Fonte', 0], ['Qual conector liga um monitor e transmite imagem e som?', 'HDMI', 'USB-A', 'RJ-45', 'P2', 1], ['O que a placa-mãe faz?', 'Conecta todos os componentes', 'Só guarda arquivos', 'Só resfria a CPU', 'Só gera energia', 2], ['O que é a BIOS/UEFI?', 'Firmware que inicia o hardware', 'Antivírus da placa', 'Sistema de arquivos', 'Driver de vídeo', 2], ['Qual a vantagem do NVMe sobre o SATA?', 'Velocidade muito maior', 'Funciona sem energia', 'Nunca esquenta', 'Dispensa a placa-mãe', 3], ['O que é um núcleo (core) de CPU?', 'Unidade que executa instruções', 'Tipo de cooler', 'Slot de memória', 'Porta de rede', 3], ['Qual a função do barramento PCIe?', 'Interligar componentes rápidos como placas de vídeo e SSDs NVMe ao chipset/CPU', 'Conectar a CPU aos registradores primários', 'Distribuir energia da fonte ATX à placa-mãe', 'Controlar o acesso à cache L1', 2], ['O que caracteriza o problema de cache coherency em sistemas multiprocessados NUMA?', 'Falha de sincronização quando vários núcleos alteram a mesma linha de cache', 'Diferença de clock entre a RAM e a cache L3', 'Atraso do pipelining em escritas simultâneas', 'Esgotamento da tabela de páginas na MMU', 3]] },
  { n: 'Redes', i: '📡', k: 'var(--c)', q: [['Qual protocolo carrega páginas com segurança?', 'HTTPS', 'FTP', 'SMTP', 'SSH', 0], ['O que é um endereço IP?', 'Identificador na rede', 'Senha do roteador', 'Tipo de cabo', 'Navegador', 0], ['Qual serviço traduz nomes de sites em IPs?', 'DNS', 'DHCP', 'NAT', 'VPN', 1], ['Qual equipamento liga redes diferentes?', 'Roteador', 'Switch', 'Hub', 'Repetidor', 1], ['Quantos bits tem um endereço IPv4?', '32', '64', '128', '16', 2], ['Qual a porta padrão do HTTPS?', '443', '80', '21', '25', 3], ['Qual cabo é comum em redes locais?', 'Ethernet (RJ-45)', 'HDMI', 'P2', 'VGA', 0], ['O que é Wi-Fi?', 'Rede sem fio', 'Cabo de fibra', 'Tipo de IP', 'Antivírus', 1], ['O que é largura de banda?', 'Capacidade de transmissão de dados', 'Cor do cabo', 'Tamanho do roteador', 'Nome da rede', 2], ['O que é ping?', 'Tempo de resposta entre dispositivos', 'Velocidade de download', 'Tipo de senha', 'Endereço MAC', 2], ['O que o DHCP faz?', 'Distribui IPs automaticamente', 'Traduz nomes em IPs', 'Criptografa dados', 'Bloqueia sites', 3], ['Qual camada do modelo OSI cuida do roteamento por IP?', 'Rede', 'Física', 'Aplicação', 'Enlace', 3], ['Qual o objetivo principal do protocolo BGP?', 'Trocar rotas entre Sistemas Autônomos na Internet', 'Mapear endereços MAC para IP na rede local', 'Garantir a entrega ordenada de pacotes UDP', 'Criar túneis criptografados de VPN', 2], ['No handshake de três vias do TCP, se o cliente envia SYN com sequência x, qual ACK o servidor devolve no SYN-ACK?', 'x + 1', 'x', 'x - 1', '0', 3]] },
  { n: 'Segurança', i: '🛡️', k: 'var(--d)', q: [['O que é phishing?', 'Golpe para roubar dados', 'Vírus de hardware', 'Tipo de firewall', 'Backup na nuvem', 0], ['Qual senha é mais forte?', 'T!g3r#9vQ2x', '12345678', 'senha', 'meunome', 0], ['O que faz um firewall?', 'Filtra o tráfego de rede', 'Acelera a internet', 'Cria backups', 'Troca senhas', 1], ['2FA significa…', 'Verificação em duas etapas', 'Dois firewalls', 'Duas senhas iguais', 'Dupla criptografia', 1], ['O que faz um ransomware?', 'Sequestra arquivos por resgate', 'Espiona teclas', 'Acelera o PC', 'Bloqueia anúncios', 2], ['O que é um ataque DDoS?', 'Sobrecarga para derrubar um serviço', 'Roubo de senha por e-mail', 'Invasão física', 'Troca de DNS local', 3], ['Qual é uma boa prática de segurança?', 'Atualizar o sistema regularmente', 'Usar a mesma senha em tudo', 'Clicar em links desconhecidos', 'Desligar o antivírus', 0], ['O que é um backup?', 'Cópia de segurança dos dados', 'Um vírus', 'Um tipo de senha', 'Um firewall', 1], ['O que é criptografia?', 'Embaralhar dados para protegê-los', 'Apagar arquivos', 'Acelerar a rede', 'Fazer backup', 2], ['O que é engenharia social?', 'Manipular pessoas para obter acesso', 'Hackear com código pesado', 'Montar redes sociais', 'Criar firewalls', 2], ['O que é um ataque de SQL injection?', 'Inserir comandos maliciosos em consultas', 'Sobrecarregar a rede', 'Roubar o cabo', 'Clonar o cartão', 3], ['O que caracteriza uma função de hash?', 'Sentido único: não se reverte', 'Devolve o texto original', 'Precisa de chave pública', 'Só funciona em imagens', 3], ['Qual a principal diferença entre criptografia simétrica e assimétrica?', 'A simétrica usa a mesma chave para cifrar e decifrar; a assimétrica usa um par de chaves', 'A simétrica usa duas chaves e a assimétrica só uma', 'A simétrica serve só para senhas', 'A assimétrica não pode ser revertida', 1], ['O que é uma vulnerabilidade de buffer overflow?', 'Escrever mais dados do que o bloco de memória suporta, sobrescrevendo a memória vizinha', 'Injetar comandos SQL não tratados', 'Redirecionar tráfego DNS para um servidor malicioso', 'Executar scripts não autorizados no navegador da vítima', 2], ['Como o ASLR dificulta a execução de exploits?', 'Randomiza as posições de memória de executáveis e bibliotecas a cada execução', 'Criptografa a pilha com chaves aleatórias na compilação', 'Impede o carregamento de DLLs sem assinatura', 'Torna a Heap não executável por hardware', 3]] },
  { n: 'Inteligência Artificial', i: '🤖', k: 'var(--b)', q: [['IA significa…', 'Inteligência Artificial', 'Internet Avançada', 'Interface Analógica', 'Input Automático', 0], ['Qual destes é um assistente de IA?', 'Claude', 'Paint', 'Bloco de Notas', 'Calculadora', 0], ['Machine Learning é…', 'Aprender padrões a partir de dados', 'Programar cada regra à mão', 'Montar robôs', 'Formatar discos', 1], ['O que é um prompt?', 'Instrução dada à IA', 'Tipo de chip', 'Erro de rede', 'Senha de IA', 1], ['Redes neurais se inspiram em…', 'Neurônios do cérebro', 'Cabos de rede', 'Circuitos de TV', 'Ondas de rádio', 2], ['O que é overfitting?', 'Modelo que decora o treino', 'Modelo muito lento', 'Falta de dados', 'Excesso de RAM', 3], ['Qual tarefa a IA costuma fazer bem?', 'Reconhecer padrões em imagens', 'Sentir emoções reais', 'Gerar energia elétrica', 'Consertar hardware sozinha', 0], ['O que é um chatbot?', 'Programa que conversa com pessoas', 'Tipo de vírus', 'Placa de rede', 'Jogo de tabuleiro', 1], ['O que é treinar um modelo?', 'Ajustar o modelo com dados', 'Instalar o programa', 'Formatar o PC', 'Trocar o processador', 2], ['Qual hardware acelera muito o treino de IA?', 'GPU', 'Mouse', 'Impressora', 'Webcam', 2], ['O que são “alucinações” em modelos de linguagem?', 'Respostas falsas ditas com confiança', 'Falhas de energia', 'Imagens borradas', 'Travamentos de tela', 3], ['O que é um token em modelos de linguagem?', 'Pedaço de texto processado pelo modelo', 'Senha de acesso', 'Moeda digital', 'Tipo de GPU', 3], ['Qual a função de uma função de ativação numa rede neural?', 'Introduzir não linearidade para aprender padrões complexos', 'Definir o número de camadas ocultas', 'Limpar os dados de entrada', 'Converter Python em C++', 1], ['O que é a arquitetura Transformer?', 'Rede baseada em auto-atenção que processa sequências em paralelo', 'Rede convolucional para imagens médicas', 'Árvore de decisão para dados estruturados', 'Técnica de aprendizado por reforço para jogos', 2], ['O que é o exploding gradient e como mitigá-lo?', 'Gradientes acumulam e geram atualizações gigantes dos pesos; usa-se gradient clipping', 'Gradiente perto de zero; resolve-se com Dropout', 'A rede decora o treino; resolve-se com Batch Normalization', 'A matriz de covariância perde posto; resolve-se com PCA', 3]] },
  { n: 'Games', i: '🎮', k: 'var(--y)', q: [['Qual console é da Nintendo?', 'Switch', 'PlayStation', 'Xbox', 'Steam Deck', 0], ['Em desempenho gráfico, FPS é…', 'Quadros por segundo', 'Fases por sessão', 'Força por skill', 'Filtro de pixel', 0], ['Qual linguagem a Unity usa?', 'C#', 'Python', 'PHP', 'Ruby', 1], ['O que é um NPC?', 'Personagem não jogável', 'Jogador profissional', 'Placa de vídeo', 'Modo online', 1], ['O que é ray tracing?', 'Simulação realista de luz', 'Mapa do jogo', 'Anti-cheat', 'Compressão de textura', 2], ['O que é tick rate num servidor?', 'Atualizações por segundo', 'Ping do jogador', 'Resolução de tela', 'Nível do jogador', 3], ['O que é um respawn?', 'Voltar ao jogo após ser derrotado', 'Salvar o jogo', 'Trocar de fase', 'Mudar de console', 0], ['O que é um sprite?', 'Imagem 2D de um elemento do jogo', 'Um servidor', 'Um tipo de áudio', 'Uma placa de vídeo', 1], ['Qual engine famosa pertence à Epic Games?', 'Unreal Engine', 'Godot', 'Unity', 'GameMaker', 2], ['O que é um game loop?', 'Ciclo que atualiza e desenha o jogo', 'Fase repetida', 'Tipo de inimigo', 'Sistema de loja', 2], ['O que é frame time?', 'Tempo para renderizar um quadro', 'Duração da partida', 'Ping médio', 'Tempo de loading', 3], ['O que é delta time em jogos?', 'Tempo entre dois quadros', 'Tempo total de jogo', 'Latência do servidor', 'Duração da fase', 3], ['Qual termo se refere às regras e ao comportamento físico do mundo do jogo?', 'Engine / Física', 'Sprite', 'Pixel art', 'Scripting', 0], ['Qual o objetivo do occlusion culling na renderização 3D?', 'Não renderizar objetos escondidos atrás de outros', 'Melhorar as texturas próximas', 'Suavizar serrilhados', 'Simular a luz em tempo real', 1], ['Como funciona o algoritmo A* (A-Star) na IA de jogos?', 'Combina Dijkstra com uma heurística para achar o caminho mais curto', 'Busca aleatória até achar o objetivo', 'Calcula todas as trajetórias e escolhe a de menor memória', 'Usa física de corpos rígidos para desviar de obstáculos', 2], ['Qual o papel de um compute shader no pipeline de renderização?', 'Executar cálculos genéricos em paralelo na GPU, fora das etapas fixas de gráficos', 'Processar vértices e transformações da malha', 'Definir a cor final de cada pixel', 'Gerenciar draw calls na CPU', 3]] },
  { n: 'Programação', i: '💻', k: 'var(--p)', q: [['O que é um algoritmo?', 'Sequência de passos para resolver um problema', 'Um tipo de hardware', 'Uma linguagem de marcação', 'Um banco de dados', 0], ['Qual estrutura repete um bloco de código?', 'Laço (loop)', 'Comentário', 'Variável', 'Importação', 0], ['O que faz um if?', 'Executa código se a condição for verdadeira', 'Repete para sempre', 'Declara uma função', 'Apaga variáveis', 1], ['Qual destas é uma linguagem de programação?', 'Python', 'HTML', 'CSS', 'Markdown', 1], ['O que é recursão?', 'Função que chama a si mesma', 'Loop sem condição', 'Erro de sintaxe', 'Tipo de variável', 2], ['Qual a complexidade da busca binária numa lista ordenada?', 'O(log n)', 'O(n)', 'O(n²)', 'O(1)', 3], ['O que é uma variável?', 'Espaço que guarda um valor', 'Um erro de sintaxe', 'Um tipo de loop', 'Uma pasta', 0], ['O que o Git faz?', 'Controla versões do código', 'Compila programas', 'Hospeda e-emails', 'Cria imagens', 1], ['O que é uma função?', 'Bloco de código reutilizável', 'Um erro', 'Um arquivo de imagem', 'Um tipo de dado', 2], ['O que é debugar?', 'Encontrar e corrigir erros', 'Escrever comentários', 'Instalar programas', 'Compilar código', 2], ['O que é programação orientada a objetos?', 'Organizar o código em objetos com dados e métodos', 'Programar só com loops', 'Usar apenas funções', 'Escrever sem variáveis', 3], ['Qual o resultado de 2 + 3 * 4 na maioria das linguagens?', '14', '20', '24', '9', 3], ['Qual a complexidade de pior caso do QuickSort?', 'O(n²)', 'O(1)', 'O(log n)', 'O(n log n)', 2], ['O que é uma closure em linguagens como JavaScript e Python?', 'Função que mantém acesso às variáveis do escopo onde nasceu, mesmo após a função pai retornar', 'Interromper o thread até uma promessa ser resolvida', 'Converter métodos privados em públicos', 'Liberar memória imediatamente pelo Garbage Collector', 3]] }
];

// modo troll
let TR = LS.get('lq-tr', false), dodge = 0, sure = false;
const pick = a => a[Math.random() * a.length | 0];
const T_SURE = ['Tem certeza? Eu não teria... 🤔', 'Hmm, escolha corajosa. Muito corajosa. 😏', 'O Google está rindo daqui. 😂', 'Última chance de desistir! ⏳'];
const T_OK = ['Acertou por sorte, né? 🍀', 'Calma, não vai se achar o gênio agora. 😎', 'Até relógio quebrado acerta duas vezes por dia. ⏰', 'Deve ter colado. 🕵️'];
const T_BAD = ['Nem o ChatGPT salvaria essa. 🤡', 'Quase! Quase nada, na verdade. 😅', 'Anotei seu nome na lista de quem precisa estudar. 📝', 'Essa doeu até em mim. 💀'];

function setTroll(on) {
  TR = on;
  LS.set('lq-tr', on);
  H.classList.toggle('tr', on);
  $('#tr').setAttribute('aria-pressed', on);
  $('#tr').setAttribute('aria-label', on ? 'Desligar modo troll' : 'Ligar modo troll');
  if (on) [330, 247, 330, 247].forEach((f, i) => setTimeout(() => beep(f, .12, .08), i * 110));
}

let lastDodge = 0;
['pointerenter', 'pointerdown'].forEach(t => $('#cf').addEventListener(t, e => {
  const b = $('#cf'), mouse = e.pointerType === 'mouse';
  if (!TR || dodge >= 3 || b.disabled || S.done || H.classList.contains('rm')) return;
  if (mouse !== (t === 'pointerenter')) return;
  dodge++;
  lastDodge = Date.now();
  const w = innerWidth < 600 ? 60 : 120, h = innerWidth < 600 ? 40 : 30;
  b.style.transform = `translate(${((Math.random() * 2 * w) - w) | 0}px, ${((Math.random() * 2 * h) - h) | 0}px) rotate(${((Math.random() * 20) - 10) | 0}deg)`;
}));

const S = { c: 0, l: 0, qs: [], i: 0, ok: 0, sel: -1, done: false };
let A = LS.get('lq-acc', {}), U = LS.get('lq-u', ''), P = LS.get('lq-p', {});
if (!A[U]) U = '';

// áudio
let ac, mus = false, tm;
function beep(f, d, v = .07) {
  if (!mus || !ac) return;
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = 'square';
  o.frequency.value = f;
  g.gain.value = v;
  g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d);
  o.connect(g);
  g.connect(ac.destination);
  o.start();
  o.stop(ac.currentTime + d);
}

function music(on) {
  clearInterval(tm);
  mus = on;
  $('#mu').textContent = on ? '🔊' : '🔇';
  if (!on) return;
  try {
    ac = ac || new AudioContext();
    ac.resume();
  } catch (e) {
    return;
  }
  let n = 0;
  const N = [262, 330, 392, 523, 392, 330, 294, 370, 440, 587, 440, 370];
  tm = setInterval(() => beep(N[n++ % N.length], .2, .035), 250);
}

// tema e acessibilidade
function theme() {
  setTheme(H.dataset.theme === 'dark' ? 'light' : 'dark', true);
}

document.querySelectorAll('[data-p]').forEach(c => {
  c.checked = !!P[c.dataset.p];
  H.classList.toggle(c.dataset.p, c.checked);
  c.onchange = () => {
    P[c.dataset.p] = c.checked;
    H.classList.toggle(c.dataset.p, c.checked);
    LS.set('lq-p', P);
  };
});

const mq = matchMedia('(prefers-color-scheme:dark)');
function setTheme(t, save) {
  H.dataset.theme = t;
  $('#th').textContent = t === 'dark' ? '☀️' : '🌙';
  $('#th').setAttribute('aria-label', t === 'dark' ? 'Mudar para o modo claro' : 'Mudar para o modo escuro');
  if (save) LS.set('lq-t', t);
}
setTheme(LS.get('lq-t', '') || (mq.matches ? 'dark' : 'light'));
if (mq.addEventListener) mq.addEventListener('change', e => {
  if (!LS.get('lq-t', '')) setTheme(e.matches ? 'dark' : 'light');
});

// navegação
let demoId = 0;
function go(id) {
  document.querySelectorAll('.v').forEach(e => e.classList.toggle('on', e.id === id));
  scrollTo(0, 0);
  demoId++;
  if (id === 'home') demo();
  if (id === 'menu') menu();
}

const tot = a => Object.values(a.best || {}).reduce((s, v) => s + v, 0);
const rank = () => Object.values(A).map(a => [a.e, a.n, tot(a)]).sort((x, y) => y[2] - x[2]);

function menu() {
  const r = rank();
  $('#rk').innerHTML = r.length
    ? r.slice(0, 10).map(([e, n, p], i) => `<li class="${e === U ? 'me' : ''}">${['🥇', '🥈', '🥉'][i] || (i + 1) + 'º'} ${esc(n)} — ${p} pts</li>`).join('')
    : '<li style="list-style:none;margin-left:-26px">Ninguém no ranking ainda. Seja o primeiro! 🚀</li>';
  const pos = r.findIndex(x => x[0] === U) + 1;
  $('#rkn').textContent = U ? `Você está em ${pos}º lugar com ${tot(A[U])} pts.` : 'Entre ou cadastre-se para pontuar no ranking.';
  usr();
}

function usr() {
  const a = A[U];
  $('#usr').textContent = a ? '👤 ' + a.n : '👤 Entrar';
  $('#out').hidden = !a;
}

function reg() {
  if (!U) {
    mode(true);
    $('#regd').showModal();
  }
}

let isReg = true;
function seePw(show) {
  const i = $('#pw'), b = $('#eye');
  show = typeof show === 'boolean' ? show : i.type === 'password';
  i.type = show ? 'text' : 'password';
  b.textContent = show ? '🙈' : '👁️';
  b.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
  b.setAttribute('aria-pressed', show);
}

function mode(r) {
  isReg = r;
  seePw(false);
  $('#at').textContent = r ? 'Criar conta' : 'Entrar';
  $('#nm').hidden = $('#nml').hidden = !r;
  $('#nm').required = r;
  $('#asb').textContent = r ? 'Cadastrar' : 'Entrar';
  $('#amt').textContent = r ? 'Já tenho conta' : 'Criar conta nova';
  $('#pw').autocomplete = r ? 'new-password' : 'current-password';
  $('#ae').textContent = '';
}

async function hash(p, s) {
  try {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s + p));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    let h = 5381;
    for (const c of s + p) h = (h * 33 ^ c.charCodeAt(0)) >>> 0;
    return '' + h;
  }
}

async function auth(e) {
  e.preventDefault();
  const em = $('#em').value.trim().toLowerCase(), pw = $('#pw').value, err = m => { $('#ae').textContent = m; };
  if (pw.length < 6) return err('A senha precisa ter pelo menos 6 caracteres.');
  if (isReg) {
    const n = $('#nm').value.trim();
    if (!n) return err('Informe seu nome.');
    if (A[em]) return err('Este e-mail já está cadastrado. Toque em “Já tenho conta”.');
    const s = Math.random().toString(36).slice(2);
    A[em] = { n, e: em, s, h: await hash(pw, s), best: {} };
  } else {
    const a = A[em];
    if (!a || a.h !== await hash(pw, a.s)) return err('E-mail ou senha incorretos.');
  }
  U = em;
  LS.set('lq-acc', A);
  LS.set('lq-u', U);
  $('#af').reset();
  $('#regd').close();
  usr();
  menu();
}

function logout() {
  U = '';
  LS.set('lq-u', '');
  go('menu');
}

$('#cats').innerHTML = C.map((c, i) => `<button class="card" style="--k:${c.k}" onclick="pickCat(${i})"><div class="ic">${c.i}</div><h3>${c.n}</h3><small>5 perguntas aleatórias</small></button>`).join('');
$('#lvi').innerHTML = L.map(l => `<div class="chip" style="--k:${l.c};--t:${l.t}"><span style="font-size:26px">${l.i}</span>${l.n}</div>`).join('');
$('#lvs').innerHTML = L.map((l, i) => `<button class="card" style="--k:${l.c};--t:${l.t}" onclick="start(S.c,${i})"><span class="em">${l.i}</span><h3>${l.n}</h3><small>${l.d}</small></button>`).join('');

function pickCat(i) {
  S.c = i;
  $('#lt').textContent = C[i].i + ' ' + C[i].n;
  go('level');
}

// quiz
const seen = {};
function start(c, l, fresh) {
  S.c = c;
  S.l = l;
  S.i = 0;
  S.ok = 0;
  const sn = seen[c] = seen[c] || new Set();
  S.qs = sh(C[c].q.map(q => [q, Math.abs(q[5] - l) + Math.random() * .9 + (fresh && sn.has(q[0]) ? 10 : 0)]).sort((a, b) => a[1] - b[1]).slice(0, 5).map(x => x[0]));
  S.qs.forEach(q => sn.add(q[0]));
  go('quiz');
  show();
}

function show() {
  const q = S.qs[S.i];
  S.sel = -1;
  S.done = false;
  S.o = sh([[q[1], 1], [q[2], 0], [q[3], 0], [q[4], 0]]);
  $('#pc').textContent = `${L[S.l].i} ${C[S.c].n} · Pergunta ${S.i + 1} de 5`;
  $('#qt').textContent = q[0];
  $('#fb').innerHTML = '';
  sure = false;
  dodge = 0;
  $('#cf').style.transform = '';
  $('#cf').textContent = 'Confirmar';
  $('#cf').disabled = true;
  $('#cf').hidden = false;
  $('#nx').hidden = true;
  $('#nx').disabled = true;
  bar(S.i);
  $('#op').innerHTML = S.o.map((o, i) => `<button class="opt" onclick="sel(${i})" aria-pressed="false"><b>${'ABCD'[i]}</b>${esc(o[0])}</button>`).join('');
}

function bar(n) {
  const p = n / 5 * 100;
  $('#pb').style.width = p + '%';
  $('#pg').setAttribute('aria-valuenow', p);
}

function sel(i) {
  if (S.done) return;
  S.sel = i;
  [...$('#op').children].forEach((b, j) => {
    b.classList.toggle('sel', j === i);
    b.setAttribute('aria-pressed', j === i);
  });
  $('#cf').disabled = false;
  beep(660, .08);
}

function confirmA() {
  if (S.sel < 0 || S.done || Date.now() - lastDodge < 400) return;
  if (TR && !sure) {
    sure = true;
    $('#cf').style.transform = '';
    $('#cf').textContent = 'Tenho certeza! 😤';
    $('#fb').innerHTML = `<div class="fb">${pick(T_SURE)}</div>`;
    beep(220, .15, .08);
    return;
  }
  S.done = true;
  const b = [...$('#op').children], hit = S.o[S.sel][1];
  b.forEach((x, j) => {
    x.disabled = true;
    x.classList.remove('sel');
    if (S.o[j][1]) x.classList.add('good');
    else if (j === S.sel) x.classList.add('bad');
  });
  if (hit) {
    S.ok++;
    beep(784, .25, .09);
    $('#fb').innerHTML = `<div class="fb">✔ <strong>Resposta correta!</strong> ${TR ? pick(T_OK) : 'Mandou bem! 🎉'}</div>`;
  } else {
    if (TR) [247, 233, 220, 196].forEach((f, i) => setTimeout(() => beep(f, .3, .09), i * 280));
    else beep(150, .4, .09);
    $('#fb').innerHTML = `<div class="fb">✖ <strong>Ops!</strong> A resposta certa era: ${esc(S.o.find(o => o[1])[0])}${TR ? '<br>' + pick(T_BAD) : ''}</div>`;
  }
  bar(S.i + 1);
  $('#cf').hidden = true;
  $('#cf').disabled = true;
  $('#nx').hidden = false;
  $('#nx').disabled = false;
  $('#nx').textContent = S.i < 4 ? 'Próxima →' : 'Ver resultado 🏁';
  $('#nx').focus();
}

function next() {
  if (!S.done) return;
  S.done = false;
  S.i < 4 ? (S.i++, show()) : end();
}

function end() {
  const pts = S.ok * 10 * (S.l + 1), p = S.ok / 5;
  let pos = 0, rec = false;
  if (U) {
    const b = A[U].best, k = S.c + '-' + S.l;
    if (pts > (b[k] || 0)) {
      b[k] = pts;
      rec = true;
      LS.set('lq-acc', A);
    }
    pos = rank().findIndex(x => x[0] === U) + 1;
  }
  $('#rm2').textContent = p === 1 ? '🏆 Perfeito! Você é lenda da tecnologia!' : p >= .8 ? '🎉 Mandou muito bem!' : p >= .6 ? '👍 Bom resultado! Mais uma rodada e você chega lá.' : p >= .4 ? '🙂 Está no caminho. Que tal tentar de novo?' : '💪 Todo gênio começou do zero. Revise e volte!';
  if (TR) $('#rm2').textContent = p >= .6 ? 'Uau, acertou. Tem alguém soprando as respostas? 🕵️' : 'Nem precisa ver a nota... mas vou mostrar mesmo assim. 🤡';
  $('#rs').textContent = S.ok + '/5';
  $('#rd').textContent = `${C[S.c].n} · ${L[S.l].n} · ${pts} pontos${U ? (rec ? ' · novo recorde! 🌟' : ' · sem novo recorde') : ''}`;
  $('#rp').innerHTML = U ? `🏅 Sua posição no ranking: <strong>${pos}º</strong> (${tot(A[U])} pts)` : 'Quer pontuar no ranking? <button class="btn alt" onclick="reg()">Entrar ou cadastrar</button>';
  go('result');
  if (p >= .6) [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, .2, .08), i * 130));
}

function nextQuiz() {
  start(S.c, S.l, true);
}

// "vídeo" da home: quiz simulado em loop
const D = [
  ['Qual tag HTML cria um link?', ['<a>', '<p>', '<div>', '<img>'], 0, 0],
  ['O que significa CPU?', ['Cartão de vídeo', 'Unidade central de processamento', 'Fonte de energia', 'Memória RAM'], 1, 3],
  ['Qual porta padrão do HTTPS?', ['21', '80', '443', '25'], 2, 2],
  ['O que é phishing?', ['Backup na nuvem', 'Tipo de cabo', 'Golpe para roubar dados', 'Console da Nintendo'], 2, 0]
];

async function demo() {
  const id = ++demoId, el = $('#demo');
  let k = 0;
  const ok = () => id === demoId;
  while (ok()) {
    const [q, o, r, p] = D[k++ % D.length];
    el.innerHTML = '<h2 class="big">Vamos começar?</h2>';
    await sl(1800);
    if (!ok()) return;

    el.innerHTML = `<div class="dq">${esc(q)}</div><div class="dopts">${o.map((t, i) => `<div class="dopt" style="animation-delay:${i * 0.35}s"><b>${'ABCD'[i]}</b>${esc(t)}</div>`).join('')}</div><div class="dres"></div>`;
    await sl(2400);
    if (!ok()) return;

    const ch = el.querySelectorAll('.dopt');
    ch[p].classList.add('sel');
    await sl(1000);
    if (!ok()) return;

    ch[p].classList.remove('sel');
    ch[r].classList.add('good');
    if (p !== r) ch[p].classList.add('bad');

    el.querySelector('.dres').textContent = p === r ? '✔ Acertou! 🎉' : '✖ Ops! Quase lá…';
    await sl(2600);
  }
}

// decoração
['🎮', '💾', '</>', '🕹️', '⚡', '🧩', '👾', '{ }', '🚀', '★'].forEach((s, i) => {
  const e = document.createElement('span');
  e.className = 'fl';
  e.textContent = s;
  e.setAttribute('aria-hidden', 'true');
  e.style.cssText = `left:${((i * 37 + 8) % 92)}%;top:${((i * 53 + 10) % 85)}%;animation-delay:${-i * 1.3}s`;
  document.body.append(e);
});

usr();
mode(true);
demo();
setTroll(TR);
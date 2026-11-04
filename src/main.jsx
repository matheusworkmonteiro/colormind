import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  ScanLine,
  WandSparkles,
  Eye,
  BookOpen,
  ChartNoAxesCombined,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Download,
  Trash2,
  CircleHelp,
  Menu,
  X,
  Palette,
  Activity,
  Lightbulb,
  FileCheck2,
  GraduationCap,
  Clock3,
} from "lucide-react";
import "./style.css";

const initialItems = [
  {
    id: 1,
    title: "Gráfico de Ciências — Cadeia alimentar",
    subject: "Ciências",
    date: "Hoje, 09:42",
    risk: "Alto",
    issues: 3,
    type: "Gráfico",
    detail:
      "A distinção entre produtores e consumidores depende principalmente das cores verde e vermelho.",
  },
  {
    id: 2,
    title: "Mapa do Brasil — Regiões",
    subject: "Geografia",
    date: "Ontem, 15:18",
    risk: "Médio",
    issues: 2,
    type: "Mapa",
    detail:
      "Duas regiões apresentam tons semelhantes e não possuem rótulos suficientemente destacados.",
  },
  {
    id: 3,
    title: "Atividade de Matemática — Frações",
    subject: "Matemática",
    date: "Ontem, 11:06",
    risk: "Baixo",
    issues: 1,
    type: "Folha de exercícios",
    detail:
      "O contraste geral é bom; recomenda-se acrescentar padrões às áreas coloridas.",
  },
];
const navGroups = [
  {
    label: "ESPAÇO DE TRABALHO",
    items: [
      { id: "inicio", label: "Visão geral", icon: LayoutDashboard },
      {
        id: "scanner",
        label: "Scanner inteligente",
        icon: ScanLine,
        tag: "NOVO",
      },
      { id: "conversor", label: "Adaptar atividade", icon: WandSparkles },
      { id: "simulador", label: "Simulador visual", icon: Eye },
    ],
  },
  {
    label: "RECURSOS",
    items: [
      { id: "biblioteca", label: "Biblioteca inclusiva", icon: BookOpen },
      { id: "relatorios", label: "Indicadores", icon: ChartNoAxesCombined },
      { id: "estudantes", label: "Perfis de estudantes", icon: Users },
    ],
  },
];
const riskClass = (r) =>
  r === "Alto" ? "high" : r === "Médio" ? "medium" : "low";

function App() {
  const [page, setPage] = useState("inicio");
  const [mobileNav, setMobileNav] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [simType, setSimType] = useState("normal");
  const [subject, setSubject] = useState("Ciências");
  const [grade, setGrade] = useState("5º ano");
  const [goal, setGoal] = useState(
    "Identificar e comparar informações em gráficos",
  );
  const [generated, setGenerated] = useState(null);
  const [profileName, setProfileName] = useState("Estudante de demonstração");
  const [profileType, setProfileType] = useState("Deuteranopia");
  const [profileNotes, setProfileNotes] = useState(
    "Pode confundir informações diferenciadas apenas por verde e vermelho.",
  );
  const [savedProfiles, setSavedProfiles] = useState([
    {
      name: "Estudante de demonstração",
      type: "Deuteranopia",
      grade: "5º ano",
      notes:
        "Pode confundir informações diferenciadas apenas por verde e vermelho.",
    },
  ]);
  const [toast, setToast] = useState("");
  const filteredItems = useMemo(
    () =>
      items.filter(
        (i) =>
          (filter === "Todos" || i.risk === filter) &&
          i.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [items, filter, search],
  );
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };
  const runScan = () => {
    if (!file) {
      notify("Envie um arquivo para iniciar a análise.");
      return;
    }
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const name = file.name.toLowerCase();
      const likelyHigh =
        /graf|cadeia|vermelho|verde|mapa|cores|color|atividade/.test(name);
      const result = {
        risk: likelyHigh ? "Alto" : "Médio",
        score: likelyHigh ? 38 : 64,
        issues: [
          {
            level: "high",
            title: "Informações diferenciadas apenas por cores",
            desc: "Use também rótulos, símbolos, texturas ou padrões para que o significado não dependa exclusivamente da cor.",
          },
          {
            level: "medium",
            title: "Verifique o contraste entre texto e fundo",
            desc: "Priorize texto escuro em fundo claro ou o inverso. Evite informações importantes em tons próximos.",
          },
          {
            level: "medium",
            title: "Elementos gráficos precisam de identificação",
            desc: "Inclua legenda textual, rótulos diretos e formas distintas para linhas ou categorias.",
          },
        ],
        note:
          file.type === "application/pdf"
            ? "O arquivo PDF foi recebido. Nesta versão demonstrativa, a análise é uma triagem guiada e não faz leitura semântica automática das páginas."
            : "Arquivo de imagem recebido. A triagem abaixo apresenta recomendações preventivas; valide cada sugestão com o material original.",
      };
      setScanResult(result);
      setItems((prev) => [
        {
          id: Date.now(),
          title: file.name,
          subject: "Material enviado",
          date: "Agora",
          risk: result.risk,
          issues: 3,
          type: file.type === "application/pdf" ? "PDF" : "Imagem",
          detail: result.issues[0].desc,
        },
        ...prev,
      ]);
      setScanning(false);
    }, 900);
  };
  const saveAdaptation = () => {
    if (!scanResult) {
      notify("Faça uma análise primeiro.");
      return;
    }
    notify("Sugestões de adaptação preparadas para revisão.");
    setPage("conversor");
  };
  const generateActivity = () => {
    setGenerated({
      title: `${subject}: atividade acessível`,
      subject,
      grade,
      goal,
      steps: [
        "Observe os dados e leia os rótulos de cada categoria.",
        "Compare as informações usando cores, símbolos e padrões diferentes.",
        "Explique sua resposta por escrito ou oralmente.",
      ],
      access: [
        "Não depender apenas das cores para comunicar informações.",
        "Usar contraste nítido e tipografia legível.",
        "Disponibilizar legenda e instruções em texto.",
      ],
    });
    notify("Atividade criada! Revise e personalize antes de aplicar.");
  };
  const exportReport = () => {
    const body = [
      "COLORMIND — RELATÓRIO DE TRIAGEM DE ACESSIBILIDADE",
      "",
      `Arquivo: ${file?.name || "Demonstração"}`,
      `Risco indicativo: ${scanResult?.risk || selected?.risk || "Não analisado"}`,
      "",
      "Observação: resultado demonstrativo, não equivale a avaliação clínica ou laudo de acessibilidade.",
      "",
      ...(scanResult?.issues || []).map(
        (x, i) => `${i + 1}. ${x.title}\n${x.desc}`,
      ),
    ].join("\n");
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio-colormind.txt";
    a.click();
    URL.revokeObjectURL(url);
    notify("Relatório exportado.");
  };
  const addProfile = () => {
    if (!profileName.trim()) {
      notify("Informe um nome ou identificador.");
      return;
    }
    setSavedProfiles((prev) => [
      ...prev,
      { name: profileName, type: profileType, grade, notes: profileNotes },
    ]);
    notify("Perfil salvo nesta sessão.");
  };
  const pageTitle = {
    inicio: "Visão geral",
    scanner: "Scanner inteligente",
    conversor: "Adaptar atividade",
    simulador: "Simulador visual",
    biblioteca: "Biblioteca inclusiva",
    relatorios: "Indicadores de acessibilidade",
    estudantes: "Perfis de estudantes",
  }[page];
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Palette size={22} />
            <span />
          </div>
          <div>
            <div className="brand-name">
              Color<span>Mind</span>
            </div>
            <div className="brand-sub">ACESSIBILIDADE EM CORES</div>
          </div>
          <button
            className="mobile-close icon-btn"
            onClick={() => setMobileNav(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="workspace">
          <div className="workspace-icon">CM</div>
          <div className="workspace-text">
            <strong>Minha escola</strong>
            <small>Espaço de trabalho</small>
          </div>
          <ChevronRight size={15} className="muted" />
        </div>
        {navGroups.map((g) => (
          <div className="nav-group" key={g.label}>
            <div className="nav-label">{g.label}</div>
            {g.items.map((n) => (
              <button
                key={n.id}
                className={`nav-item ${page === n.id ? "active" : ""}`}
                onClick={() => {
                  setPage(n.id);
                  setMobileNav(false);
                }}
              >
                <n.icon size={18} />
                <span>{n.label}</span>
                {n.tag && <em>{n.tag}</em>}
              </button>
            ))}
          </div>
        ))}
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">
              <Lightbulb size={17} />
            </div>
            <strong>Inclusão começa no planejamento</strong>
            <p>Pequenos ajustes podem remover grandes barreiras.</p>
            <button onClick={() => setPage("biblioteca")}>
              Explorar boas práticas <ArrowUpRight size={14} />
            </button>
          </div>
          <button
            className="nav-item"
            onClick={() =>
              notify(
                "Configurações demonstrativas: nenhuma integração externa ativa.",
              )
            }
          >
            <Settings size={18} />
            <span>Configurações</span>
          </button>
          <div className="user-profile">
            <div className="avatar">PR</div>
            <div className="user-text">
              <strong>Professora</strong>
              <small>Educadora</small>
            </div>
            <button
              className="icon-btn"
              onClick={() => notify("Perfil de demonstração")}
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </aside>
      {mobileNav && (
        <div className="nav-scrim" onClick={() => setMobileNav(false)} />
      )}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu icon-btn"
              onClick={() => setMobileNav(true)}
            >
              <Menu size={20} />
            </button>
            <span className="crumb">ColorMind</span>
            <ChevronRight size={15} />
            <strong>{pageTitle}</strong>
          </div>
          <div className="topbar-right">
            <div className="searchbox">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar materiais..."
              />
            </div>
            <button
              className="icon-btn notification"
              onClick={() => notify("Você está em dia!")}
              aria-label="Notificações"
            >
              <Bell size={18} />
              <i />
            </button>
            <div className="avatar">PR</div>
          </div>
        </header>
        <div className="content">
          {page === "inicio" && (
            <>
              <div className="welcome-row">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" /> AMBIENTE DE EDUCAÇÃO
                    INCLUSIVA
                  </div>
                  <h1>
                    Bom dia, professora! <span className="wave">✳</span>
                  </h1>
                  <p className="subtitle">
                    Vamos tornar suas atividades mais acessíveis, uma cor de
                    cada vez.
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setPage("scanner");
                    setScanResult(null);
                  }}
                >
                  <Plus size={17} /> Analisar atividade
                </button>
              </div>
              <section className="hero-card">
                <div className="hero-copy">
                  <div className="hero-pill">
                    <Sparkles size={13} /> SEU ESPAÇO DE INCLUSÃO
                  </div>
                  <h2>
                    Uma atividade acessível
                    <br />
                    abre espaço para todos.
                  </h2>
                  <p>
                    Identifique possíveis barreiras visuais e descubra formas
                    práticas de adaptar seus materiais pedagógicos.
                  </p>
                  <button
                    className="btn btn-white"
                    onClick={() => setPage("scanner")}
                  >
                    Começar análise <ChevronRight size={16} />
                  </button>
                  <div className="hero-foot">
                    <ShieldCheck size={15} /> Ferramenta de apoio ao
                    planejamento docente
                  </div>
                </div>
                <div className="hero-art">
                  <div className="orbit orbit1" />
                  <div className="orbit orbit2" />
                  <div className="art-card card-back">
                    <div className="tiny-bars">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="art-line" />
                    <div className="art-line short" />
                  </div>
                  <div className="art-card card-front">
                    <div className="art-card-top">
                      <span>ATIVIDADE</span>
                      <span className="tiny-check">
                        <CheckCircle2 size={13} />
                      </span>
                    </div>
                    <div className="art-title-line" />
                    <div className="art-chart">
                      <i className="bar-a" />
                      <i className="bar-b" />
                      <i className="bar-c" />
                      <i className="bar-d" />
                    </div>
                    <div className="art-legend">
                      <i />
                      <span />
                      <i />
                      <span />
                    </div>
                    <div className="art-bottom">
                      <CheckCircle2 size={14} /> <span>Mais acessível</span>
                    </div>
                  </div>
                  <div className="floating-dot dot-a">✓</div>
                  <div className="floating-dot dot-b">
                    <Eye size={18} />
                  </div>
                  <div className="floating-label">Cor + símbolo + texto</div>
                </div>
              </section>
              <div className="section-heading">
                <div>
                  <h3>Seu painel de acessibilidade</h3>
                  <p>Acompanhe os materiais analisados neste espaço.</p>
                </div>
                <button
                  className="text-link"
                  onClick={() => setPage("relatorios")}
                >
                  Ver indicadores <ArrowUpRight size={15} />
                </button>
              </div>
              <div className="stats-grid">
                <Stat
                  icon={FileCheck2}
                  color="purple"
                  label="Materiais analisados"
                  value={items.length}
                  trend="nesta sessão"
                />
                <Stat
                  icon={AlertTriangle}
                  color="orange"
                  label="Precisam de atenção"
                  value={items.filter((i) => i.risk === "Alto").length}
                  trend="risco alto indicado"
                />
                <Stat
                  icon={ShieldCheck}
                  color="green"
                  label="Baixo risco"
                  value={items.filter((i) => i.risk === "Baixo").length}
                  trend="com boas práticas"
                />
                <Stat
                  icon={Activity}
                  color="blue"
                  label="Perfis de apoio"
                  value={savedProfiles.length}
                  trend="cadastrados localmente"
                />
              </div>
              <div className="lower-grid">
                <section className="panel recent-panel">
                  <div className="panel-head">
                    <div>
                      <h3>Materiais recentes</h3>
                      <p>Últimas triagens realizadas</p>
                    </div>
                    <button
                      className="icon-btn"
                      onClick={() => setPage("scanner")}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="filter-row">
                    {["Todos", "Alto", "Médio", "Baixo"].map((f) => (
                      <button
                        key={f}
                        className={`filter-chip ${filter === f ? "selected" : ""}`}
                        onClick={() => setFilter(f)}
                      >
                        {f === "Todos" ? "Todos os riscos" : f}
                      </button>
                    ))}
                  </div>
                  <div className="material-list">
                    {filteredItems.slice(0, 4).map((it) => (
                      <button
                        className="material-row"
                        key={it.id}
                        onClick={() => {
                          setSelected(it);
                          setPage("relatorios");
                        }}
                      >
                        <div
                          className={`file-icon ${it.type === "Mapa" ? "map" : "graph"}`}
                        >
                          <FileText size={19} />
                        </div>
                        <div className="material-info">
                          <strong>{it.title}</strong>
                          <small>
                            {it.subject} <span>·</span> {it.date}
                          </small>
                        </div>
                        <span className={`risk-badge ${riskClass(it.risk)}`}>
                          <i />
                          {it.risk}
                        </span>
                        <ChevronRight size={16} className="row-chevron" />
                      </button>
                    ))}
                    {filteredItems.length === 0 && (
                      <div className="empty-state">
                        Nenhum material encontrado.
                      </div>
                    )}
                  </div>
                  <button
                    className="panel-footer-link"
                    onClick={() => setPage("relatorios")}
                  >
                    Ver todos os materiais <ChevronRight size={15} />
                  </button>
                </section>
                <section className="panel quick-panel">
                  <div className="panel-head">
                    <div>
                      <h3>Acesso rápido</h3>
                      <p>Ferramentas para o dia a dia</p>
                    </div>
                    <div className="quick-spark">
                      <Sparkles size={17} />
                    </div>
                  </div>
                  <QuickAction
                    icon={ScanLine}
                    title="Analisar uma atividade"
                    desc="Encontre barreiras visuais antes da aula."
                    onClick={() => setPage("scanner")}
                    color="purple"
                  />
                  <QuickAction
                    icon={WandSparkles}
                    title="Adaptar um material"
                    desc="Veja estratégias para tornar o conteúdo acessível."
                    onClick={() => setPage("conversor")}
                    color="orange"
                  />
                  <QuickAction
                    icon={Eye}
                    title="Simular percepção de cores"
                    desc="Explore diferentes formas de perceber as cores."
                    onClick={() => setPage("simulador")}
                    color="blue"
                  />
                  <div className="tip-box">
                    <div>
                      <Lightbulb size={18} />
                    </div>
                    <p>
                      <strong>Dica inclusiva</strong>
                      <br />
                      Não use a cor como único recurso para transmitir uma
                      informação. Combine-a com texto, formas ou padrões.
                    </p>
                  </div>
                </section>
              </div>
            </>
          )}
          {page === "scanner" && (
            <>
              <PageIntro
                eyebrow="ANÁLISE PREVENTIVA"
                title="Scanner inteligente"
                desc="Envie uma atividade e receba uma triagem orientativa de possíveis barreiras relacionadas ao uso de cores."
              />
              <div className="scanner-layout">
                <section className="panel upload-panel">
                  <div className="panel-head">
                    <div>
                      <h3>Enviar material pedagógico</h3>
                      <p>Selecione um arquivo para começar.</p>
                    </div>
                    <div className="upload-icon">
                      <Upload size={19} />
                    </div>
                  </div>
                  <label className={`dropzone ${file ? "has-file" : ""}`}>
                    <input
                      type="file"
                      accept=".pdf,image/*,.png,.jpg,.jpeg,.webp"
                      onChange={(e) => {
                        setFile(e.target.files?.[0] || null);
                        setScanResult(null);
                      }}
                    />
                    <div className="drop-icon">
                      {file ? <FileCheck2 size={26} /> : <Upload size={25} />}
                    </div>
                    <strong>
                      {file ? file.name : "Arraste seu arquivo para cá"}
                    </strong>
                    <p>
                      {file
                        ? `${(file.size / 1024).toFixed(0)} KB · pronto para analisar`
                        : "ou clique para procurar no computador"}
                    </p>
                    <span className="file-types">
                      PDF, PNG, JPG ou WEBP · até 15 MB
                    </span>
                    {file && (
                      <button
                        type="button"
                        className="remove-file"
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                          setScanResult(null);
                        }}
                      >
                        <Trash2 size={14} /> Remover arquivo
                      </button>
                    )}
                  </label>
                  <div className="privacy-note">
                    <ShieldCheck size={17} />
                    <span>
                      O arquivo é processado nesta demonstração no seu
                      navegador. Não há envio para um servidor.
                    </span>
                  </div>
                  <button
                    className="btn btn-primary full-btn"
                    onClick={runScan}
                    disabled={!file || scanning}
                  >
                    {scanning ? (
                      <>
                        <span className="spinner" /> Analisando material...
                      </>
                    ) : (
                      <>
                        <ScanLine size={17} /> Iniciar triagem
                      </>
                    )}
                  </button>
                  <p className="small-note">
                    A análise atual é demonstrativa e baseada em recomendações
                    preventivas; não substitui uma auditoria automatizada
                    completa.
                  </p>
                </section>
                <section className="panel scan-guide">
                  <div className="panel-head">
                    <div>
                      <h3>O que será verificado?</h3>
                      <p>Lista de verificação preventiva</p>
                    </div>
                    <div className="guide-check">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                  <GuideItem
                    n="01"
                    title="Dependência de cores"
                    desc="Informações comunicadas somente por vermelho, verde ou outras cores."
                  />
                  <GuideItem
                    n="02"
                    title="Contraste visual"
                    desc="Legibilidade de textos, símbolos e elementos sobre o fundo."
                  />
                  <GuideItem
                    n="03"
                    title="Gráficos e legendas"
                    desc="Categorias, linhas e áreas sem rótulos ou padrões alternativos."
                  />
                  <GuideItem
                    n="04"
                    title="Sugestões de adaptação"
                    desc="Recomendações para acrescentar texto, símbolos e formas."
                  />
                  <div className="guide-disclaimer">
                    <CircleHelp size={16} />
                    <span>
                      Uma triagem não confirma nem diagnostica daltonismo.
                      Revise o material e considere as necessidades de cada
                      estudante.
                    </span>
                  </div>
                </section>
              </div>
              {scanResult && (
                <section className="panel result-panel">
                  <div className="result-top">
                    <div>
                      <div className="eyebrow">RESULTADO DA TRIAGEM</div>
                      <h2>Análise orientativa concluída</h2>
                      <p>{file?.name}</p>
                    </div>
                    <span
                      className={`risk-badge large ${riskClass(scanResult.risk)}`}
                    >
                      <i />
                      {scanResult.risk} risco indicativo
                    </span>
                  </div>
                  <div className="result-score">
                    <div className="score-ring">
                      <span>{scanResult.score}</span>
                      <small>/100</small>
                    </div>
                    <div>
                      <strong>Indicador ilustrativo de atenção</strong>
                      <p>
                        Quanto menor o valor, maior a prioridade de revisão
                        sugerida nesta demonstração. Não é uma medida validada.
                      </p>
                    </div>
                  </div>
                  <div className="analysis-note">
                    <AlertTriangle size={17} />
                    {scanResult.note}
                  </div>
                  <div className="issue-grid">
                    {scanResult.issues.map((x, i) => (
                      <div className="issue-card" key={x.title}>
                        <div className={`issue-number ${x.level}`}>
                          0{i + 1}
                        </div>
                        <div>
                          <strong>{x.title}</strong>
                          <p>{x.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="result-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={exportReport}
                    >
                      <Download size={16} /> Exportar relatório (.txt)
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={saveAdaptation}
                    >
                      <WandSparkles size={16} /> Ver como adaptar
                    </button>
                  </div>
                </section>
              )}
            </>
          )}
          {page === "conversor" && (
            <>
              <PageIntro
                eyebrow="DESIGN PEDAGÓGICO ACESSÍVEL"
                title="Adaptar atividade"
                desc="Monte uma atividade com alternativas que não dependam exclusivamente da percepção das cores."
              />
              <div className="converter-grid">
                <section className="panel form-panel">
                  <div className="panel-head">
                    <div>
                      <h3>Assistente de criação</h3>
                      <p>Conte o que você quer ensinar.</p>
                    </div>
                    <div className="upload-icon orange">
                      <WandSparkles size={19} />
                    </div>
                  </div>
                  <label className="field-label">
                    Componente curricular
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option>Ciências</option>
                      <option>Matemática</option>
                      <option>Geografia</option>
                      <option>Arte</option>
                      <option>Língua Portuguesa</option>
                      <option>História</option>
                    </select>
                  </label>
                  <label className="field-label">
                    Ano escolar
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                    >
                      <option>1º ano</option>
                      <option>2º ano</option>
                      <option>3º ano</option>
                      <option>4º ano</option>
                      <option>5º ano</option>
                      <option>6º ano</option>
                      <option>7º ano</option>
                      <option>8º ano</option>
                      <option>9º ano</option>
                      <option>Ensino Médio</option>
                    </select>
                  </label>
                  <label className="field-label">
                    Objetivo de aprendizagem
                    <textarea
                      rows="3"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="Descreva o que os estudantes deverão aprender..."
                    />
                  </label>
                  <div className="inline-tip">
                    <Lightbulb size={17} />
                    <span>
                      As sugestões são um ponto de partida: adapte linguagem,
                      complexidade e formato à sua turma.
                    </span>
                  </div>
                  <button
                    className="btn btn-primary full-btn"
                    onClick={generateActivity}
                  >
                    <Sparkles size={17} /> Criar proposta acessível
                  </button>
                </section>
                <section className="panel preview-panel">
                  <div className="preview-label">
                    <span className="live-dot" /> PRÉVIA DA ATIVIDADE
                  </div>
                  {generated ? (
                    <div className="generated-activity">
                      <div className="worksheet-head">
                        <div className="worksheet-mark">CM</div>
                        <div>
                          <strong>{generated.title}</strong>
                          <small>
                            {generated.grade} · {generated.subject}
                          </small>
                        </div>
                      </div>
                      <div className="worksheet-section">
                        <span className="worksheet-kicker">OBJETIVO</span>
                        <p>{generated.goal}</p>
                      </div>
                      <div className="sample-chart">
                        <div className="sample-bar-row">
                          <span>Categoria A</span>
                          <div>
                            <i
                              style={{ width: "82%", background: "#7765c5" }}
                            />
                          </div>
                          <b>82</b>
                        </div>
                        <div className="sample-bar-row">
                          <span>Categoria B</span>
                          <div>
                            <i
                              style={{
                                width: "55%",
                                background:
                                  "repeating-linear-gradient(135deg,#f0a44b 0 5px,#fff0d8 5px 8px)",
                              }}
                            />
                          </div>
                          <b>55</b>
                        </div>
                        <div className="sample-bar-row">
                          <span>Categoria C</span>
                          <div>
                            <i
                              style={{
                                width: "34%",
                                background:
                                  "repeating-linear-gradient(90deg,#399c87 0 3px,#c5e9df 3px 7px)",
                              }}
                            />
                          </div>
                          <b>34</b>
                        </div>
                        <div className="sample-legend">
                          <span>
                            <i className="legend-purple" /> A · sólido
                          </span>
                          <span>
                            <i className="legend-orange" /> B · diagonal
                          </span>
                          <span>
                            <i className="legend-green" /> C · listrado
                          </span>
                        </div>
                      </div>
                      <div className="worksheet-section">
                        <span className="worksheet-kicker">ETAPAS</span>
                        {generated.steps.map((s, i) => (
                          <div className="step-line" key={s}>
                            <span>{i + 1}</span>
                            {s}
                          </div>
                        ))}
                      </div>
                      <div className="access-list">
                        <strong>
                          <ShieldCheck size={16} /> Recursos de acessibilidade
                        </strong>
                        {generated.access.map((a) => (
                          <p key={a}>
                            <CheckCircle2 size={14} />
                            {a}
                          </p>
                        ))}
                      </div>
                      <button
                        className="btn btn-secondary full-btn"
                        onClick={() => {
                          const blob = new Blob(
                            [
                              `${generated.title}\nAno: ${generated.grade}\nObjetivo: ${generated.goal}\n\nEtapas:\n${generated.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nAcessibilidade:\n${generated.access.map((a) => "- " + a).join("\n")}`,
                            ],
                            { type: "text/plain;charset=utf-8" },
                          );
                          const u = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = u;
                          a.download = "atividade-acessivel-colormind.txt";
                          a.click();
                          URL.revokeObjectURL(u);
                          notify("Atividade exportada.");
                        }}
                      >
                        <Download size={16} /> Exportar proposta
                      </button>
                    </div>
                  ) : (
                    <div className="preview-empty">
                      <div className="preview-paper">
                        <div />
                        <div />
                        <div />
                        <div className="preview-bars">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div />
                        <div />
                      </div>
                      <h3>Sua atividade vai aparecer aqui</h3>
                      <p>
                        Preencha os campos ao lado para gerar uma proposta com
                        orientações de acessibilidade.
                      </p>
                    </div>
                  )}
                </section>
              </div>
              <div className="panel principles-panel">
                <h3>Princípios de adaptação</h3>
                <div className="principle-row">
                  <Principle
                    icon={Palette}
                    title="Cor + outro código"
                    desc="Combine cores com rótulos, símbolos, texturas ou formatos."
                  />
                  <Principle
                    icon={Eye}
                    title="Contraste adequado"
                    desc="Garanta distinção suficiente entre texto, fundo e elementos."
                  />
                  <Principle
                    icon={BookOpen}
                    title="Instruções claras"
                    desc="Ofereça legendas, nomes e descrições textuais."
                  />
                </div>
              </div>
            </>
          )}
          {page === "simulador" && (
            <>
              <PageIntro
                eyebrow="EXPERIÊNCIA VISUAL"
                title="Simulador de percepção de cores"
                desc="Explore como uma paleta de cores pode mudar sob diferentes simulações visuais."
              />
              <div className="panel simulator-panel">
                <div className="simulator-controls">
                  <div>
                    <h3>Escolha uma simulação</h3>
                    <p>Use o controle para comparar a mesma composição.</p>
                  </div>
                  <select
                    value={simType}
                    onChange={(e) => setSimType(e.target.value)}
                  >
                    <option value="normal">Visão de cores padrão</option>
                    <option value="protanopia">Simulação de protanopia</option>
                    <option value="deuteranopia">
                      Simulação de deuteranopia
                    </option>
                    <option value="tritanopia">Simulação de tritanopia</option>
                    <option value="achromatopsia">
                      Simulação em escala de cinza
                    </option>
                  </select>
                </div>
                <div className={`sim-art ${simType}`}>
                  <div className="sim-banner">
                    <div>
                      <span>EXEMPLO DE ATIVIDADE</span>
                      <h2>Explore os dados!</h2>
                      <p>Compare as três categorias do gráfico.</p>
                    </div>
                    <div className="sim-badge">
                      <Eye size={23} />
                    </div>
                  </div>
                  <div className="sim-content">
                    <div className="sim-chart">
                      <div className="sim-chart-head">
                        <strong>Resultados por categoria</strong>
                        <small>Quantidade de respostas</small>
                      </div>
                      <div className="sim-bars">
                        <div className="sim-bar-item">
                          <div
                            className="sim-bar purple"
                            style={{ height: "75%" }}
                          />
                          <b>Categoria A</b>
                          <small>75</small>
                        </div>
                        <div className="sim-bar-item">
                          <div
                            className="sim-bar orange"
                            style={{ height: "48%" }}
                          />
                          <b>Categoria B</b>
                          <small>48</small>
                        </div>
                        <div className="sim-bar-item">
                          <div
                            className="sim-bar green"
                            style={{ height: "62%" }}
                          />
                          <b>Categoria C</b>
                          <small>62</small>
                        </div>
                      </div>
                      <div className="sim-legend">
                        <span>
                          <i className="purple" /> A — círculo
                        </span>
                        <span>
                          <i className="orange" /> B — triângulo
                        </span>
                        <span>
                          <i className="green" /> C — quadrado
                        </span>
                      </div>
                    </div>
                    <div className="sim-palette-card">
                      <strong>Paleta de cores</strong>
                      <p>Mesmo conjunto, diferentes percepções</p>
                      <div className="swatches">
                        <i className="swatch-purple" />
                        <i className="swatch-orange" />
                        <i className="swatch-green" />
                        <i className="swatch-red" />
                        <i className="swatch-blue" />
                      </div>
                      <div className="contrast-example">
                        <span>Texto de exemplo</span>
                        <b>AB 123</b>
                      </div>
                      <small>
                        O texto e os rótulos ajudam a preservar o significado.
                      </small>
                    </div>
                  </div>
                </div>
                <div className="sim-warning">
                  <AlertTriangle size={17} />
                  <p>
                    <strong>Importante:</strong> este recurso é uma simulação
                    ilustrativa por filtros de cor, não uma reprodução clínica
                    da percepção visual. As experiências individuais variam.
                  </p>
                </div>
                <div className="panel principles-panel">
                  <h3>Boas práticas para materiais coloridos</h3>
                  <div className="principle-row">
                    <Principle
                      icon={CheckCircle2}
                      title="Nomeie as categorias"
                      desc="Não dependa apenas de uma legenda por cores."
                    />
                    <Principle
                      icon={Activity}
                      title="Varie formas e padrões"
                      desc="Use marcadores, linhas e texturas diferentes."
                    />
                    <Principle
                      icon={ShieldCheck}
                      title="Teste o contraste"
                      desc="Verifique a leitura em tela e na impressão."
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {page === "biblioteca" && (
            <>
              <PageIntro
                eyebrow="REPERTÓRIO DOCENTE"
                title="Biblioteca inclusiva"
                desc="Boas práticas rápidas para planejar materiais com menor dependência de cores."
              />
              <div className="library-grid">
                <LibraryCard
                  icon={ChartNoAxesCombined}
                  tag="GRÁFICOS"
                  title="Gráficos que comunicam além da cor"
                  desc="Use rótulos diretos, marcadores diferentes e padrões de preenchimento para distinguir categorias."
                  items={[
                    "Rotule cada barra ou linha.",
                    "Use estilos de linha diferentes.",
                    "Mantenha uma legenda textual clara.",
                  ]}
                />
                <LibraryCard
                  icon={Palette}
                  tag="MATERIAIS VISUAIS"
                  title="Contraste e legibilidade"
                  desc="Facilite a leitura de textos, instruções, mapas e materiais projetados."
                  items={[
                    "Evite texto sobre fundos complexos.",
                    "Não use apenas vermelho e verde.",
                    "Teste em escala de cinza.",
                  ]}
                />
                <LibraryCard
                  icon={GraduationCap}
                  tag="PLANEJAMENTO"
                  title="Uma atividade, múltiplas pistas"
                  desc="Combine pistas visuais e textuais para apoiar diferentes formas de acesso à informação."
                  items={[
                    "Associe ícone e palavra.",
                    "Descreva cores importantes.",
                    "Ofereça alternativas de resposta.",
                  ]}
                />
                <LibraryCard
                  icon={FileText}
                  tag="CHECKLIST"
                  title="Antes de imprimir ou projetar"
                  desc="Uma revisão rápida para encontrar barreiras antes que a atividade chegue à turma."
                  items={[
                    "A informação continua clara sem cor?",
                    "Contraste e tamanho são legíveis?",
                    "Legenda e instruções estão explícitas?",
                  ]}
                />
              </div>
              <div className="library-banner">
                <div className="library-banner-icon">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <strong>Quer adaptar uma atividade agora?</strong>
                  <p>
                    Use o assistente para gerar uma proposta inicial com
                    princípios de acessibilidade.
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setPage("conversor")}
                >
                  Criar atividade <ChevronRight size={15} />
                </button>
              </div>
            </>
          )}
          {page === "relatorios" && (
            <>
              <PageIntro
                eyebrow="ACOMPANHAMENTO"
                title="Indicadores de acessibilidade"
                desc="Visão geral das triagens desta sessão. Estes números descrevem apenas os dados de demonstração e arquivos analisados aqui."
              />
              <div className="stats-grid report-stats">
                <Stat
                  icon={FileCheck2}
                  color="purple"
                  label="Materiais na lista"
                  value={items.length}
                  trend="total da sessão"
                />
                <Stat
                  icon={AlertTriangle}
                  color="orange"
                  label="Risco alto"
                  value={items.filter((i) => i.risk === "Alto").length}
                  trend="revisão prioritária"
                />
                <Stat
                  icon={Activity}
                  color="blue"
                  label="Risco médio"
                  value={items.filter((i) => i.risk === "Médio").length}
                  trend="vale revisar"
                />
                <Stat
                  icon={ShieldCheck}
                  color="green"
                  label="Risco baixo"
                  value={items.filter((i) => i.risk === "Baixo").length}
                  trend="manter boas práticas"
                />
              </div>
              <div className="report-grid">
                <section className="panel chart-panel">
                  <div className="panel-head">
                    <div>
                      <h3>Distribuição por risco</h3>
                      <p>Materiais listados nesta sessão</p>
                    </div>
                    <ChartNoAxesCombined size={20} className="muted" />
                  </div>
                  <div className="risk-bars">
                    {["Alto", "Médio", "Baixo"].map((r) => {
                      const n = items.filter((i) => i.risk === r).length;
                      const pct = items.length
                        ? Math.max(8, (n / items.length) * 100)
                        : 0;
                      return (
                        <div className="risk-bar-row" key={r}>
                          <div>
                            <span>{r} risco</span>
                            <b>{n}</b>
                          </div>
                          <div className="risk-track">
                            <i
                              className={riskClass(r)}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="chart-foot">
                    Os níveis são indicativos e não representam avaliação
                    científica validada.
                  </p>
                </section>
                <section className="panel report-note">
                  <div className="note-icon">
                    <Activity size={21} />
                  </div>
                  <h3>Como interpretar os dados</h3>
                  <p>
                    Use os indicadores para organizar a revisão dos materiais,
                    não para avaliar estudantes ou inferir diagnósticos.
                  </p>
                  <ul>
                    <li>Priorize materiais com maior risco indicativo.</li>
                    <li>Registre as adaptações realizadas.</li>
                    <li>
                      Verifique a legibilidade com pessoas e contextos reais.
                    </li>
                  </ul>
                  <button
                    className="btn btn-secondary full-btn"
                    onClick={exportReport}
                  >
                    <Download size={16} /> Exportar relatório de triagem
                  </button>
                </section>
              </div>
              <section className="panel recent-panel report-table">
                <div className="panel-head">
                  <div>
                    <h3>Lista de materiais</h3>
                    <p>Materiais registrados durante esta sessão</p>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setPage("scanner")}
                  >
                    <Plus size={15} /> Novo material
                  </button>
                </div>
                {items.map((it) => (
                  <button
                    className="material-row"
                    key={it.id}
                    onClick={() => setSelected(it)}
                  >
                    <div className="file-icon graph">
                      <FileText size={18} />
                    </div>
                    <div className="material-info">
                      <strong>{it.title}</strong>
                      <small>
                        {it.subject} · {it.date}
                      </small>
                    </div>
                    <span className={`risk-badge ${riskClass(it.risk)}`}>
                      <i />
                      {it.risk}
                    </span>
                    <ChevronRight size={16} className="row-chevron" />
                  </button>
                ))}
                {selected && (
                  <div className="selected-detail">
                    <button
                      className="icon-btn close-detail"
                      onClick={() => setSelected(null)}
                    >
                      <X size={16} />
                    </button>
                    <strong>{selected.title}</strong>
                    <p>{selected.detail}</p>
                    <small>
                      Indicador de risco: {selected.risk} · {selected.issues}{" "}
                      ponto(s) para revisar
                    </small>
                  </div>
                )}
              </section>
            </>
          )}
          {page === "estudantes" && (
            <>
              <PageIntro
                eyebrow="PERSONALIZAÇÃO PEDAGÓGICA"
                title="Perfis de estudantes"
                desc="Registre preferências e estratégias de apoio para orientar a adaptação de materiais. Use apenas informações necessárias e autorizadas."
              />
              <div className="profile-layout">
                <section className="panel form-panel">
                  <div className="panel-head">
                    <div>
                      <h3>Novo perfil de apoio</h3>
                      <p>Evite dados pessoais desnecessários.</p>
                    </div>
                    <div className="upload-icon">
                      <Users size={19} />
                    </div>
                  </div>
                  <label className="field-label">
                    Nome ou identificador
                    <input
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Ex.: Estudante A"
                    />
                  </label>
                  <label className="field-label">
                    Tipo informado
                    <select
                      value={profileType}
                      onChange={(e) => setProfileType(e.target.value)}
                    >
                      <option>Deuteranopia</option>
                      <option>Protanopia</option>
                      <option>Tritanopia</option>
                      <option>Acromatopsia</option>
                      <option>Necessidades ainda não identificadas</option>
                    </select>
                  </label>
                  <label className="field-label">
                    Observações pedagógicas
                    <textarea
                      rows="4"
                      value={profileNotes}
                      onChange={(e) => setProfileNotes(e.target.value)}
                    />
                  </label>
                  <button
                    className="btn btn-primary full-btn"
                    onClick={addProfile}
                  >
                    <Plus size={16} /> Salvar perfil nesta sessão
                  </button>
                  <p className="small-note">
                    Os dados ficam somente no estado desta sessão e não são
                    enviados a um servidor nem persistidos após atualizar a
                    página.
                  </p>
                </section>
                <section className="panel profile-list-panel">
                  <div className="panel-head">
                    <div>
                      <h3>Perfis registrados</h3>
                      <p>{savedProfiles.length} perfil(is) nesta sessão</p>
                    </div>
                    <Users size={19} className="muted" />
                  </div>
                  {savedProfiles.map((p, i) => (
                    <div className="profile-card" key={`${p.name}-${i}`}>
                      <div className="profile-avatar">
                        {p.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="profile-card-main">
                        <strong>{p.name}</strong>
                        <span>
                          {p.type} · {p.grade}
                        </span>
                        <p>{p.notes}</p>
                      </div>
                      <button
                        className="icon-btn"
                        onClick={() => {
                          setSavedProfiles((prev) =>
                            prev.filter((_, j) => j !== i),
                          );
                          notify("Perfil removido da sessão.");
                        }}
                        aria-label="Remover perfil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="guide-disclaimer">
                    <ShieldCheck size={16} />
                    <span>
                      Use estas informações para apoiar a acessibilidade, não
                      para rotular estudantes ou substituir avaliações
                      profissionais.
                    </span>
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
        <footer className="app-footer">
          <div>
            <span className="footer-mark">CM</span>
            <span>
              ColorMind <b>·</b> tecnologia a serviço da inclusão
            </span>
          </div>
          <span>
            Versão demonstrativa 1.0 <b>·</b> Feito para educadores
          </span>
        </footer>
      </main>
      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}
function Stat({ icon: Icon, color, label, value, trend }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={19} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-trend">
        <span className={`trend-dot ${color}`} />
        {trend}
      </div>
    </div>
  );
}
function QuickAction({ icon: Icon, title, desc, onClick, color }) {
  return (
    <button className="quick-action" onClick={onClick}>
      <div className={`quick-icon ${color}`}>
        <Icon size={19} />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
      <ChevronRight size={16} />
    </button>
  );
}
function PageIntro({ eyebrow, title, desc }) {
  return (
    <div className="page-intro">
      <div className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      <p className="subtitle">{desc}</p>
    </div>
  );
}
function GuideItem({ n, title, desc }) {
  return (
    <div className="guide-item">
      <div className="guide-number">{n}</div>
      <div>
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
      <CheckCircle2 size={17} className="guide-ok" />
    </div>
  );
}
function Principle({ icon: Icon, title, desc }) {
  return (
    <div className="principle">
      <div className="principle-icon">
        <Icon size={18} />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
    </div>
  );
}
function LibraryCard({ icon: Icon, tag, title, desc, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="panel library-card">
      <div className="library-card-top">
        <div className="library-icon">
          <Icon size={20} />
        </div>
        <span>{tag}</span>
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button className="library-expand" onClick={() => setOpen(!open)}>
        {open ? "Ocultar orientações" : "Ver orientações"}{" "}
        <ChevronRight size={15} className={open ? "rotated" : ""} />
      </button>
      {open && (
        <ul className="library-checklist">
          {items.map((x) => (
            <li key={x}>
              <CheckCircle2 size={15} />
              {x}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

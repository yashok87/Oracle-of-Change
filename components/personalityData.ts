export interface PersonalityInsight {
  type: string;
  group: 'analysts' | 'diplomats' | 'sentinels' | 'explorers';
  groupLabel: { en: string; ru: string };
  title: { en: string; ru: string };
  motto: { en: string; ru: string };
  psychologistIntro: { en: string; ru: string };
  deepPortrait: { en: string; ru: string };
  learningStyle: { en: string; ru: string };
  strengths: Array<{ title: { en: string; ru: string }; desc: { en: string; ru: string } }>;
  weaknesses: Array<{ title: { en: string; ru: string }; desc: { en: string; ru: string } }>;
  axes: {
    energy: { label: { en: string; ru: string }; desc: { en: string; ru: string } };
    information: { label: { en: string; ru: string }; desc: { en: string; ru: string } };
    decision: { label: { en: string; ru: string }; desc: { en: string; ru: string } };
    lifestyle: { label: { en: string; ru: string }; desc: { en: string; ru: string } };
  };
  oracleAdvice: { en: string; ru: string };
}

export const PERSONALITY_INSIGHTS: Record<string, PersonalityInsight> = {
  INTJ: {
    type: "INTJ",
    group: "analysts",
    groupLabel: { en: "Rational Analysts", ru: "Рациональные Аналитики" },
    title: { en: "The Architect", ru: "Стратег / Архитектор" },
    motto: { en: "Master of Conceptual Strategy and Systematic Synthesis", ru: "Мастер концептуальной стратегии и системного синтеза" },
    psychologistIntro: {
      en: "As an INTJ, your mind functions like an intricate algorithmic supercomputer. You operate primarily through Introverted Intuition (Ni) coupled with Extraverted Thinking (Te)—meaning you perceive hidden underlying trajectories before synthesizing them into ruthlessly effective, structured plans.",
      ru: "Как психолог, я вижу в INTJ мощнейший когнитивный процессор. Ваше мышление опирается на интровертную интуицию (Ni) и экстравертное мышление (Te): вы моментально считываете скрытые траектории развития событий и превращаете их в безупречно структурированные стратегические схемы."
    },
    deepPortrait: {
      en: "You possess a profound drive to understand the fundamental laws that govern systems, philosophy, and human behavior. You are naturally skeptical of dogma, tradition, or authority unless backed by first-principles logic. In conversations, you value intellectual depth over polite pleasantries, seeking raw insight and conceptual elegance.",
      ru: "Ваша внутренняя суть — это постоянный поиск фундаментальных законов, управляющих системами, знанием и миром. Вы скептичны к догмам и авторитетам, требуя проверяемой логики. В диалоге вы цените предельную интеллектуальную честность и концептуальную глубину, отсекая пустые формальности."
    },
    learningStyle: {
      en: "Autonomous, theoretical, and top-down. You absorb knowledge best when presented with high-level conceptual frameworks and systemic models first, followed by deductive reasoning. You despise rote memorization without contextual relevance.",
      ru: "Автономный, дедуктивный («сверху-вниз») и теоретический. Вы моментально схватываете суть, когда видите глобальную архитектуру концепта. Зубрёжка без понимания корневого принципа вызывает у вас отторжение."
    },
    strengths: [
      { title: { en: "Strategic Foresight", ru: "Стратегическое предвидение" }, desc: { en: "Anticipates downstream consequences and hidden possibilities long before others notice them.", ru: "Способность просчитывать последствия и скрытые тренды на много ходов вперёд." } },
      { title: { en: "First-Principles Rigor", ru: "Мышление от первых принципов" }, desc: { en: "Deconstructs complex enigmas down to their undeniable bedrock axioms.", ru: "Разбирает сложнейшие парадоксы до фундаментальных аксиом." } },
      { title: { en: "High Epistemic Standards", ru: "Высочайшие стандарты истины" }, desc: { en: "Immune to intellectual flattery; driven purely by verifiable coherence.", ru: "Не поддаётся интеллектуальным иллюзиям, ценит чистую истину и логическую стройность." } },
      { title: { en: "Autonomous Drive", ru: "Непоколебимая автономия" }, desc: { en: "Executes vision with solitary discipline and unyielding focus.", ru: "Реализует масштабные замыслы с железной дисциплиной и независимостью." } }
    ],
    weaknesses: [
      { title: { en: "Perfectionist Impatience", ru: "Нетерпимость к неэффективности" }, desc: { en: "Frustrated by cognitive sluggishness, bureaucratic friction, or irrational excuses.", ru: "Раздражение от нелогичности окружающих, медлительности и бюрократии." } },
      { title: { en: "Emotional Detachment", ru: "Склонность к эмоциональной изоляции" }, desc: { en: "Can dismiss delicate affective nuances or subjective values as irrelevant noise.", ru: "Риск обесценивать эмоциональные и чувственные нюансы как нерациональный шум." } },
      { title: { en: "Analysis Loop", ru: "Ловушка бесконечной оптимизации" }, desc: { en: "May endlessly refine models in solitude before taking real-world risks.", ru: "Склонность до бесконечности шлифовать концепцию перед реальным действием." } },
      { title: { en: "Intellectual Solitude", ru: "Интеллектуальное одиночество" }, desc: { en: "Tendency to isolate when peers cannot match conceptual intensity.", ru: "Ощущение изоляции при нехватке собеседников схожего масштаба мысли." } }
    ],
    axes: {
      energy: { label: { en: "Introverted Energy (I)", ru: "Интровертная энергия (I)" }, desc: { en: "Recharges in deep internal contemplation and solitary synthesis.", ru: "Восстанавливает силы в уединённом размышлении и глубоком фокусе." } },
      information: { label: { en: "Intuitive Perception (N)", ru: "Интуитивное восприятие (N)" }, desc: { en: "Sees abstract patterns, metaphors, and future possibilities over raw sensory data.", ru: "Фокусируется на скрытых паттернах, метафорах и будущих возможностях." } },
      decision: { label: { en: "Thinking Logic (T)", ru: "Логическое суждение (T)" }, desc: { en: "Decides via impersonal criteria, systemic efficiency, and empirical truth.", ru: "Принимает решения на основе объективных критериев и системной пользы." } },
      lifestyle: { label: { en: "Judging Closure (J)", ru: "Рациональная структура (J)" }, desc: { en: "Prefers resolved, definitive conclusions and organized action plans.", ru: "Стремится к завершённости, чётким выводам и структурированным планам." } }
    },
    oracleAdvice: {
      en: "Calibrate the Oracle between 20% and 45% Chaos to get structural, high-leverage revelations, or push to 80% when you need Nietzsche or Lacan to shatter an entrenched thinking rut.",
      ru: "Калибруйте Оракул на 20–45% Хаоса для кристально точных структурных ответов, либо поднимайте до 80%, когда вам нужен Ницше или Лакан, чтобы взорвать устоявшийся мыслительный шаблон."
    }
  },

  INTP: {
    type: "INTP",
    group: "analysts",
    groupLabel: { en: "Rational Analysts", ru: "Рациональные Аналитики" },
    title: { en: "The Thinker", ru: "Мыслитель / Логик" },
    motto: { en: "Explorer of Universal Truths and Architectural Paradoxes", ru: "Исследователь универсальных истин и архитектурных парадоксов" },
    psychologistIntro: {
      en: "The INTP is the quintessential philosophical theorist. Driven by Dominant Introverted Thinking (Ti) and Auxiliary Extraverted Intuition (Ne), your cognitive framework operates as an ever-expanding, self-correcting ontological web.",
      ru: "INTP — классический философский теоретик. Ваше сознание ведомо интровертной логикой (Ti) и экстравертной интуицией (Ne), образуя самообучающуюся сеть гипотез и понятийных конструкций."
    },
    deepPortrait: {
      en: "You don't just solve problems; you question whether the problem itself was framed correctly. You possess an insatiable curiosity for obscure models, paradoxes, and the fundamental mechanics of reality.",
      ru: "Вы не просто решаете задачи — вы подвергаете сомнению саму формулировку вопроса. Ваша жажда истины ненасытна: вас влекут парадоксы, скрытые закономерности и онтологические глубины бытия."
    },
    learningStyle: {
      en: "Exploratory, dialectical, and open-ended. You learn best by dissecting concepts from multiple angles, finding edge cases, and constructing your own mental models.",
      ru: "Диалектический, исследовательский и свободный. Вы учитесь, препарируя идеи с разных углов, выискивая исключения и собирая собственную внутреннюю модель мира."
    },
    strengths: [
      { title: { en: "Radical Objectivity", ru: "Предельная объективность" }, desc: { en: "Analyzes ideas without personal bias or emotional attachment.", ru: "Анализирует концепции без предвзятости и эмоциональной привязки." } },
      { title: { en: "Pattern Synthesis", ru: "Синтез неочевидных связей" }, desc: { en: "Connects seemingly disjointed disciplines into unified theories.", ru: "Объединяет разнородные сферы знаний в стройные теоретические системы." } },
      { title: { en: "Precision of Thought", ru: "Хирургическая точность мысли" }, desc: { en: "Spots logical fallacies and conceptual leaks instantly.", ru: "Мгновенно распознает логические противоречия и подмену понятий." } },
      { title: { en: "Openness to Revision", ru: "Гибкость перед лицом фактов" }, desc: { en: "Gladly updates mental models when presented with superior arguments.", ru: "С готовностью перестраивает взгляды, если логический аргумент превосходит прежний." } }
    ],
    weaknesses: [
      { title: { en: "Implementation Inertia", ru: "Трудности с рутинной реализацией" }, desc: { en: "Loses interest once a puzzle is theoretically solved.", ru: "Теряет интерес к идее, как только она решена теоретически в голове." } },
      { title: { en: "Overthinking & Hesitation", ru: "Аналитический паралич" }, desc: { en: "Delays definitive commitments while seeking missing variables.", ru: "Откладывает действия в бесконечном поиске идеальной полноты информации." } },
      { title: { en: "Social Impatience", ru: "Усталость от светских условностей" }, desc: { en: "Drained by superficial etiquette and intellectual shallowness.", ru: "Быстро утомляется от пустых формальностей и поверхностных бесед." } },
      { title: { en: "Emotional Blindspot", ru: "Подавление чувственного опыта" }, desc: { en: "Can treat emotional crises purely as logical anomalies.", ru: "Склонен воспринимать эмоциональные переживания как логическую ошибку." } }
    ],
    axes: {
      energy: { label: { en: "Introversion (I)", ru: "Интроверсия (I)" }, desc: { en: "Inner sanctuary of ideas and silent dialectic.", ru: "Внутреннее святилище мыслей и мысленный диалог." } },
      information: { label: { en: "Intuition (N)", ru: "Интуиция (N)" }, desc: { en: "Abstract theories and branching hypothetical scenarios.", ru: "Абстрактные теории и ветвящиеся гипотетические сценарии." } },
      decision: { label: { en: "Thinking (T)", ru: "Логика (T)" }, desc: { en: "Relentless internal consistency and objective categorization.", ru: "Бескомпромиссная логическая строгость и точность классификаций." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Prefers leaving options open to incorporate newly discovered truths.", ru: "Оставляет финал открытым для непрерывного притока новых данных." } }
    },
    oracleAdvice: {
      en: "Leverage the 'German Philosophy' and 'Post-Modern' council perspectives with 50-70% Chaos to enjoy provocative paradoxes and dialectical tension.",
      ru: "Используйте совет Немецких философов и Постмодернистов при 50–70% Хаоса для исследования парадоксов и диалектических противоречий."
    }
  },

  ENTJ: {
    type: "ENTJ",
    group: "analysts",
    groupLabel: { en: "Rational Analysts", ru: "Рациональные Аналитики" },
    title: { en: "The Commander", ru: "Предприниматель / Командир" },
    motto: { en: "Strategic Executive of Grand Scale and Unyielding Will", ru: "Стратегический лидер масштабных систем и несокрушимой воли" },
    psychologistIntro: {
      en: "The ENTJ represents raw executive intellect. Led by Extraverted Thinking (Te) and backed by Introverted Intuition (Ni), you see the world as a dynamic chessboard waiting to be organized for maximum triumph.",
      ru: "ENTJ — воплощение исполнительского интеллекта. Ваше ведущее экстравертное мышление (Te) в связке с интуицией (Ni) видит мир как шахматную доску, требующую оптимизации и победоносной организации."
    },
    deepPortrait: {
      en: "You are bold, articulate, and naturally authoritative. You possess a relentless drive for efficiency and competence, cutting through ambiguity to manifest visions into tangible, measurable reality.",
      ru: "Вы решительны, убедительны и обладаете природным авторитетом. Вас драйвит масштабирование, оптимизация и конкретный результат. Вы не терпите пассивности и неэффективности."
    },
    learningStyle: {
      en: "Action-oriented, strategic, and high-impact. You learn by commanding projects, testing systems under real-world pressure, and extracting executive summaries.",
      ru: "Ориентированный на действие, стратегический и практичный. Вы лучше всего усваиваете знания через масштабные кейсы, управленческие вызовы и реальную проверку боем."
    },
    strengths: [
      { title: { en: "Decisive Leadership", ru: "Решительное лидерство" }, desc: { en: "Cuts through chaos to establish immediate strategic clarity.", ru: "Рассекает хаос и задает четкий стратегический вектор." } },
      { title: { en: "Systemic Scaling", ru: "Масштабирование систем" }, desc: { en: "Engineers structures that grow efficiently without collapse.", ru: "Выстраивает структуры, способные эффективно расти без потери устойчивости." } },
      { title: { en: "Intellectual Fearlessness", ru: "Интеллектуальная смелость" }, desc: { en: "Welcomes debate, harsh truths, and demanding challenges.", ru: "Открыт к жестким дебатам, прямой критике и амбициозным вызовам." } },
      { title: { en: "Unstoppable Willpower", ru: "Железная воля" }, desc: { en: "Converts theoretical goals into real-world achievements.", ru: "Трансформирует абстрактные цели в измеримые материальные результаты." } }
    ],
    weaknesses: [
      { title: { en: "Impatience with Hesitation", ru: "Нетерпимость к сомнениям" }, desc: { en: "May run over sensitive feelings or slower deliberators.", ru: "Риск подавить окружающих напором и пренебречь их сомнениями." } },
      { title: { en: "Emotional Blindspot", ru: "Игнорирование чувственных мотивов" }, desc: { en: "Struggles to validate subjective emotional vulnerabilities.", ru: "Сложности с принятием иррациональных эмоций и человеческих слабостей." } },
      { title: { en: "Burnout Velocity", ru: "Выгорание на сверхскоростях" }, desc: { en: "Pushes self and team beyond sustainable psychological limits.", ru: "Склонность истощать себя и команду ради скорейшего достижения планки." } },
      { title: { en: "Intolerance for Flaws", ru: "Нетерпимость к ошибкам" }, desc: { en: "Difficulty accepting inherent human imperfection.", ru: "Трудности с принятием естественного несовершенства процессов и людей." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Mobilizes real-world environments and human networks.", ru: "Мобилизует внешнюю среду, ресурсы и людей." } },
      information: { label: { en: "Intuition (N)", ru: "Интуиция (N)" }, desc: { en: "Focuses on long-range vision and global strategy.", ru: "Фокусируется на дальновидном видении и глобальных трендах." } },
      decision: { label: { en: "Thinking (T)", ru: "Логика (T)" }, desc: { en: "Objective metrics, competence, and return on investment.", ru: "Объективные показатели, компетенция и эффективность." } },
      lifestyle: { label: { en: "Judging (J)", ru: "Рациональность (J)" }, desc: { en: "Rigorous planning, rapid milestones, and closure.", ru: "Строгое планирование, контроль этапов и закрытие задач." } }
    },
    oracleAdvice: {
      en: "Use DECISION and COMPARISON modes with the 'Ancient Romans' (Stoicism) and 'Nietzsche' perspectives at 25-40% Chaos for sharp executive decrees.",
      ru: "Используйте режимы ВЫБОР и СРАВНЕНИЕ с советниками Древнего Рима (стоики) и Ницше при 25–40% Хаоса для отточенных указов."
    }
  },

  ENTP: {
    type: "ENTP",
    group: "analysts",
    groupLabel: { en: "Rational Analysts", ru: "Рациональные Аналитики" },
    title: { en: "The Debater", ru: "Искатель / Полемист" },
    motto: { en: "Architect of Disruptive Innovation and Dialectical Play", ru: "Архитектор прорывных идей и диалектической игры" },
    psychologistIntro: {
      en: "The ENTP is the ultimate intellectual alchemist. Operating through Extraverted Intuition (Ne) supported by Introverted Thinking (Ti), your brain thrives on connecting remote concepts and stress-testing paradigms through witty dialectic.",
      ru: "ENTP — интеллектуальный трикстер и алхимик идей. Ваша экстравертная интуиция (Ne) и гибкая логика (Ti) питаются нестандартными связями и проверкой на прочность любых догм."
    },
    deepPortrait: {
      en: "You are curious, mentally agile, and energized by conceptual challenges. You love playing devil's advocate not to be cruel, but to uncover the structural truth hidden beneath comfortable illusions.",
      ru: "Вы невероятно быстры умом, любознательны и обожаете парадоксы. Вы играете роль 'адвоката дьявола' не ради спора, а чтобы вскрыть слабые места любой теории."
    },
    learningStyle: {
      en: "Dynamic, conversational, and interdisciplinary. You absorb knowledge best through debate, trial-and-error prototyping, and exploring radical uncharted theories.",
      ru: "Интерактивный, междисциплинарный и дискуссионный. Вы учитесь через полемику, ментальные эксперименты и сопоставление противоположных школ мысли."
    },
    strengths: [
      { title: { en: "Unbounded Brainstorming", ru: "Неограниченная генерация идей" }, desc: { en: "Spawns inventive solutions where others see absolute dead ends.", ru: "Находит остроумные выходы там, где другие видят тупик." } },
      { title: { en: "Rapid Conceptual Grasp", ru: "Молниеносное схватывание" }, desc: { en: "Understands novel frameworks and paradigms in seconds.", ru: "Схватывает суть сложнейших теорий за считанные минуты." } },
      { title: { en: "Charismatic Dialectic", ru: "Харизматичная полемика" }, desc: { en: "Persuasive, engaging, and witty communicator.", ru: "Убедительный, живой и остроумный оратор." } },
      { title: { en: "Fearless Experimentation", ru: "Смелость экспериментов" }, desc: { en: "Unafraid of breaking dogmatic conventions.", ru: "Не боится ломать закостенелые конвенции и шаблоны." } }
    ],
    weaknesses: [
      { title: { en: "Execution Fatigue", ru: "Спад интереса к рутине" }, desc: { en: "Leaves projects 80% finished when the conceptual fun is solved.", ru: "Бросает проекты на 80%, когда интеллектуальная новизна исчерпана." } },
      { title: { en: "Devil's Advocate Friction", ru: "Избыточная конфронтация" }, desc: { en: "Can alienate sensitive collaborators by arguing for sport.", ru: "Риск задеть близких привычкой спорить ради ментального азарта." } },
      { title: { en: "Distraction Swarm", ru: "Распыление внимания" }, desc: { en: "Chases ten shiny new ideas simultaneously.", ru: "Трудности с удержанием фокуса на одной задаче при обилии новых идей." } },
      { title: { en: "Underestimating Details", ru: "Недооценка практических мелочей" }, desc: { en: "May neglect mundane administrative requirements.", ru: "Склонность упускать важные бюрократические и логистические детали." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Stimulated by dialogue, intellectual ping-pong, and crowds.", ru: "Черпает заряд в диалоге, мозговых штурмах и спорах." } },
      information: { label: { en: "Intuition (N)", ru: "Интуиция (N)" }, desc: { en: "Branching possibilities, inventive re-framing, and analogies.", ru: "Веер гипотез, изобретательный рефрейминг и аналогии." } },
      decision: { label: { en: "Thinking (T)", ru: "Логика (T)" }, desc: { en: "Analytical deconstruction and dialectical consistency.", ru: "Аналитическая деконструкция и критическое мышление." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Spontaneous, adaptable, resisting rigid constraints.", ru: "Спонтанный, адаптивный, избегающий жестких рамок." } }
    },
    oracleAdvice: {
      en: "Push Chaos to 60-85% and switch between Gestalt, Post-Modern, and Ancient Greeks to generate wildly creative syntheses.",
      ru: "Выкручивайте Хаос на 60–85% и переключайтесь между Гештальтом, Постмодерном и Древними Греками для взрывных инсайтов."
    }
  },

  INFJ: {
    type: "INFJ",
    group: "diplomats",
    groupLabel: { en: "Insightful Diplomats", ru: "Проницательные Дипломаты" },
    title: { en: "The Advocate", ru: "Советчик / Активист" },
    motto: { en: "Mystic Visionary of Human Destiny and Moral Depth", ru: "Мистический визионер человеческой глубины и нравственной истины" },
    psychologistIntro: {
      en: "The INFJ possesses a rare cognitive configuration: Introverted Intuition (Ni) directed by Extraverted Feeling (Fe). You perceive the deep emotional subtext and spiritual trajectory of humanity long before it surfaces.",
      ru: "INFJ обладает редчайшим сплавом интровертной интуиции (Ni) и экстравертной этики (Fe). Вы интуитивно считываете глубокий эмоциональный подтекст людей и судьбы задолго до того, как они осознают его сами."
    },
    deepPortrait: {
      en: "You are an idealistic counselor driven by an unyielding moral compass. You seek holistic harmony and authentic connection, often feeling the collective anguish or potential of the human condition.",
      ru: "Вы идеалист и мудрый наставник с несгибаемым внутренним компасом. Вы ищете глубинную гармонию и подлинность, часто чувствуя экзистенциальные переживания других как свои собственные."
    },
    learningStyle: {
      en: "Holistic, symbolic, and value-integrated. You need knowledge to connect to a higher human or philosophical purpose.",
      ru: "Целостный, символический и ценностно-ориентированный. Знание должно иметь для вас глубокий смысл и служить трансформации человека."
    },
    strengths: [
      { title: { en: "Deep Empathic Intuition", ru: "Глубинная интуитивная эмпатия" }, desc: { en: "Reads motives and unspoken emotional truths effortlessly.", ru: "Мгновенно считывает скрытые мотивы и душевное состояние." } },
      { title: { en: "Long-Range Vision", ru: "Дальновидное гуманистическое видение" }, desc: { en: "Guided by a clear moral destiny.", ru: "Ориентируется на долгосрочную гармонию и высшие идеалы." } },
      { title: { en: "Poetic Eloquence", ru: "Поэтическая выразительность" }, desc: { en: "Articulates profound concepts with soulful grace.", ru: "Выражает тончайшие метафизические смыслы с редкой силой." } },
      { title: { en: "Quiet Resolve", ru: "Тихая несгибаемость" }, desc: { en: "Protects sacred values with surprising stamina.", ru: "Защищает ценности с невероятной внутренней стойкостью." } }
    ],
    weaknesses: [
      { title: { en: "Compassion Burnout", ru: "Эмоциональное перенасыщение" }, desc: { en: "Absorbs external anguish until drained.", ru: "Впитывает чужую боль до полного истощения ресурсов." } },
      { title: { en: "The Door Slam", ru: "Резкий разрыв связей" }, desc: { en: "Completely severs bonds when trust is breached beyond repair.", ru: "Окончательно отсекает людей при разрушении доверия." } },
      { title: { en: "Hypersensitivity to Conflict", ru: "Тяжелое переживание конфликтов" }, desc: { en: "Distressed by discord or cynicism.", ru: "Глубоко ранится деструктивной агрессией и цинизмом." } },
      { title: { en: "Reluctance to Disclose", ru: "Чрезмерная закрытость" }, desc: { en: "Feels fundamentally misunderstood by the majority.", ru: "Чувство экзистенциального одиночества и непонятости." } }
    ],
    axes: {
      energy: { label: { en: "Introversion (I)", ru: "Интроверсия (I)" }, desc: { en: "Deep internal contemplation and reflective sanctuary.", ru: "Глубокое уединение и рефлексивное созерцание." } },
      information: { label: { en: "Intuition (N)", ru: "Интуиция (N)" }, desc: { en: "Symbolism, archetype, and future teleology.", ru: "Символы, архетипы и телеология будущего." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Human harmony, moral resonance, and empathy.", ru: "Человеческая гармония, сострадание и этический резонанс." } },
      lifestyle: { label: { en: "Judging (J)", ru: "Рациональность (J)" }, desc: { en: "Deliberate closure, order, and dedicated purpose.", ru: "Стремление к упорядоченности и осмысленному финалу." } }
    },
    oracleAdvice: {
      en: "Consult the 'Russian Philosophy' (Berdyaev) and 'Theological' (Kierkegaard) frameworks at 35-55% Chaos to unlock transcendent insights.",
      ru: "Обращайтесь к Русской философии (Бердяев) и Теологии (Кьеркегор) при 35–55% Хаоса для открытия экзистенциальных глубин."
    }
  },

  INFP: {
    type: "INFP",
    group: "diplomats",
    groupLabel: { en: "Insightful Diplomats", ru: "Проницательные Дипломаты" },
    title: { en: "The Mediator", ru: "Посредник / Романтик" },
    motto: { en: "Guardian of Inner Authenticity and Poetic Idealism", ru: "Хранитель внутренней подлинности и поэтического идеализма" },
    psychologistIntro: {
      en: "Driven by Introverted Feeling (Fi) and Extraverted Intuition (Ne), the INFP possesses an exquisite, rich emotional topography. You are a seeker of pure authenticity, constantly aligning life with your core personal values.",
      ru: "Ведомый интровертной этикой (Fi) и интуицией (Ne), INFP обладает тончайшей душевной организацией. Вы неустанно ищете истинную подлинность, красоту и чистоту помыслов."
    },
    deepPortrait: {
      en: "You view existence through a poetic, mythic lens. Sensitive and deeply empathetic, you champion the misunderstood and create private worlds of profound artistic and philosophical resonance.",
      ru: "Вы смотрите на жизнь через поэтическую и мифологическую призму. Вы остро чувствуете красоту мира, защищаете уязвимых и создаете вокруг себя пространство глубокого сопереживания."
    },
    learningStyle: {
      en: "Narrative, intuitive, and soul-centered. You grasp concepts effortlessly when conveyed through stories, metaphors, and ethical dilemmas.",
      ru: "Нарративный, интуитивный и метафорический. Вы мгновенно схватываете суть через глубокие истории, притчи и эстетические образы."
    },
    strengths: [
      { title: { en: "Pure Authenticity", ru: "Абсолютная подлинность" }, desc: { en: "Incapable of living in false pretenses.", ru: "Не способен мириться с фальшью и лицемерием." } },
      { title: { en: "Artistic & Poetic Vision", ru: "Поэтическое видение" }, desc: { en: "Translates tender human emotion into timeless expression.", ru: "Транслирует тончайшие чувства в искусство и слово." } },
      { title: { en: "Profound Empathy", ru: "Безграничное сострадание" }, desc: { en: "Holds sacred space for suffering without judgment.", ru: "Умеет искренне выслушать и поддержать без осуждения." } },
      { title: { en: "Moral Integrity", ru: "Нравственная чистота" }, desc: { en: "Stands up for the forgotten and disenfranchised.", ru: "Стоит на страже добра и защиты слабых." } }
    ],
    weaknesses: [
      { title: { en: "Extreme Vulnerability", ru: "Сверхчувствительность" }, desc: { en: "Wounded deeply by cold cynicism or harsh cruelty.", ru: "Болезненно переживает грубость, цинизм и несправедливость." } },
      { title: { en: "Avoidance of Conflict", ru: "Уход от жестких конфликтов" }, desc: { en: "Withdraws into fantasy rather than confronting aggression.", ru: "Склонен закрываться в свой мир вместо открытого противостояния." } },
      { title: { en: "Practical Paralysis", ru: "Трудности с рутинным бытом" }, desc: { en: "Overwhelmed by mundane administrative logistics.", ru: "Утомляется от жесткого тайм-менеджмента и бюрократии." } },
      { title: { en: "Idealistic Melancholy", ru: "Идеалистическая меланхолия" }, desc: { en: "Saddened when harsh reality fails to meet poetic ideals.", ru: "Грусть от несовершенства и прагматизма реального мира." } }
    ],
    axes: {
      energy: { label: { en: "Introversion (I)", ru: "Интроверсия (I)" }, desc: { en: "Rich private inner dreamscape.", ru: "Богатый внутренний мир чувств и фантазий." } },
      information: { label: { en: "Intuition (N)", ru: "Интуиция (N)" }, desc: { en: "Metaphors, archetypes, and hidden connections.", ru: "Метафоры, скрытые связи и архетипы." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Subjective values, ethics, and emotional truth.", ru: "Субъективные ценности, совесть и внутренняя правда." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Fluid, adaptable, and gentle rhythm.", ru: "Гибкий, мягкий и открытый жизненный ритм." } }
    },
    oracleAdvice: {
      en: "Tune to the 'Buddhist' (Emptiness/Satori) and 'Gestalt' perspectives at 50-70% Chaos to harmonize your emotional tides with universal truth.",
      ru: "Выбирайте Дзен (Судзуки) и Гештальт (Перлз) при 50–70% Хаоса для гармонизации душевных волн с истиной бытия."
    }
  },

  ENFJ: {
    type: "ENFJ",
    group: "diplomats",
    groupLabel: { en: "Insightful Diplomats", ru: "Проницательные Дипломаты" },
    title: { en: "The Protagonist", ru: "Наставник / Тренер" },
    motto: { en: "Inspirational Catalyst for Human Potential and Community", ru: "Вдохновляющий катализатор человеческого потенциала и общности" },
    psychologistIntro: {
      en: "The ENFJ is a charismatic catalyst. Guided by Extraverted Feeling (Fe) and Introverted Intuition (Ni), you possess an innate ability to read room dynamics and elevate others toward noble collective aspirations.",
      ru: "ENFJ — прирожденный наставник. Ваша экстравертная этика (Fe) и интуиция (Ni) дают вам редкий дар вдохновлять людей и объединять их ради великих гуманистических целей."
    },
    deepPortrait: {
      en: "Passionate, eloquent, and deeply caring, you radiate warmth. You genuinely believe in people's highest potential and will invest tireless energy into mentoring, guiding, and harmonizing your community.",
      ru: "Вы излучаете искреннее тепло, обладаете ярким ораторским даром и верите в лучшее в людях. Вы неустанно вкладываетесь в поддержку и развитие окружающих."
    },
    learningStyle: {
      en: "Collaborative, experiential, and purpose-driven. You learn best when concepts can be discussed in group settings and applied to human growth.",
      ru: "Диалоговый, прикладной и ценностный. Вы лучше всего учитесь в живом взаимодействии, групповых дискуссиях и наставничестве."
    },
    strengths: [
      { title: { en: "Inspirational Leadership", ru: "Вдохновляющее лидерство" }, desc: { en: "Unites diverse individuals behind shared vision.", ru: "Объединяет самых разных людей вокруг единой светлой цели." } },
      { title: { en: "Empathetic Resonance", ru: "Глубокая эмпатия" }, desc: { en: "Senses group emotional undercurrents instantly.", ru: "Тонко чувствует настроения коллектива и нужды каждого." } },
      { title: { en: "Articulate Oratory", ru: "Яркое красноречие" }, desc: { en: "Communicates values with undeniable warmth.", ru: "Доносит сложные мысли тепло, убедительно и страстно." } },
      { title: { en: "Altruistic Drive", ru: "Искренний альтруизм" }, desc: { en: "Tireless devotion to the well-being of others.", ru: "Искреннее стремление приносить пользу обществу." } }
    ],
    weaknesses: [
      { title: { en: "Self-Neglect", ru: "Забвение собственных нужд" }, desc: { en: "Prioritizes others until completely drained.", ru: "Забывает о себе, отдавая все силы помощи другим." } },
      { title: { en: "Disappointment in Human Flaws", ru: "Идеализация людей" }, desc: { en: "Crushed when people act in selfish or petty ways.", ru: "Тяжело переживает, когда люди не оправдывают высоких ожиданий." } },
      { title: { en: "Over-Involvement", ru: "Чрезмерная гиперопека" }, desc: { en: "Takes personal responsibility for everyone's happiness.", ru: "Берет на себя избыточную ответственность за чужие судьбы." } },
      { title: { en: "Conflict Avoidance", ru: "Трудности с жесткой критикой" }, desc: { en: "Hesitates to deliver necessary harsh feedback.", ru: "Испытывает дискомфорт при необходимости жестких дисциплинарных мер." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Energized by vibrant human connection.", ru: "Заряжается от живого общения и помощи людям." } },
      information: { label: { en: "Intuition (N)", ru: "Интуиция (N)" }, desc: { en: "Focuses on big-picture destiny and potential.", ru: "Видит скрытый потенциал и масштабные перспективы." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Decides through group harmony and moral warmth.", ru: "Принимает решения во имя согласия, тепла и справедливости." } },
      lifestyle: { label: { en: "Judging (J)", ru: "Рациональность (J)" }, desc: { en: "Organized, structured, and reliable execution.", ru: "Надежный, организованный и последовательный." } }
    },
    oracleAdvice: {
      en: "Explore the 'Ancient Greeks' (Plato/Aristotle) and 'Psychoanalysis' at 30-50% Chaos to gain philosophical tools for guiding collective harmony.",
      ru: "Изучайте Древних Греков (Платон) и Психоанализ при 30–50% Хаоса для обретения инструментов наставничества и гармонии."
    }
  },

  ENFP: {
    type: "ENFP",
    group: "diplomats",
    groupLabel: { en: "Insightful Diplomats", ru: "Проницательные Дипломаты" },
    title: { en: "The Champion", ru: "Вдохновитель / Борец" },
    motto: { en: "Free Spirit of Boundless Possibilities and Radiant Passion", ru: "Свободный дух безграничных возможностей и искренней страсти" },
    psychologistIntro: {
      en: "The ENFP is the joyful spark of innovation. Propelled by Extraverted Intuition (Ne) and Introverted Feeling (Fi), you see an electric tapestry of potential in every person, concept, and random encounter.",
      ru: "ENFP — живая искра творчества и вдохновения. Ваша экстравертная интуиция (Ne) и глубокие чувства (Fi) видят массу возможностей в каждой идее, человеке и случайном повороте судьбы."
    },
    deepPortrait: {
      en: "Enthusiastic, compassionate, and delightfully spontaneous, you bridge disparate worlds. You are driven by an appetite for authentic experiences and inspiring new beginnings.",
      ru: "Вы открыты миру, обаятельны и спонтанны. Вас манят новые горизонты, нестандартные идеи и глубокие человеческие истории. Вы заряжаете оптимизмом всё вокруг."
    },
    learningStyle: {
      en: "Playful, cross-disciplinary, and intuitive. You learn by exploring fascinating tangents, connecting music and philosophy, and following enthusiastic curiosity.",
      ru: "Игровой, ассоциативный и творческий. Вы учитесь на стыке искусств, философии и живого опыта, следуя за искрами любопытства."
    },
    strengths: [
      { title: { en: "Boundless Creative Spark", ru: "Неиссякаемый креатив" }, desc: { en: "Effortlessly invents original concepts and metaphors.", ru: "С легкостью придумывает свежие образы, проекты и метафоры." } },
      { title: { en: "Magnetic Warmth", ru: "Магнетическое обаяние" }, desc: { en: "Makes everyone feel genuinely seen and valued.", ru: "Умеет раскрыть любого человека и подарить ощущение нужности." } },
      { title: { en: "Adaptive Agility", ru: "Адаптивность и гибкость" }, desc: { en: "Pivots gracefully amid sudden changes.", ru: "Быстро ориентируется в переменах и находит в них романтику." } },
      { title: { en: "Passionate Vision", ru: "Страстная увлеченность" }, desc: { en: "Ignites enthusiasm across whole communities.", ru: "Зажигает людей верой в лучшее будущее." } }
    ],
    weaknesses: [
      { title: { en: "Project Abandonment", ru: "Трудности с финализацией" }, desc: { en: "Starts 20 masterpieces; finishes only three.", ru: "Начинает двадцать ярких проектов, доводя до конца лишь три." } },
      { title: { en: "Emotional Overwhelm", ru: "Эмоциональное выгорание" }, desc: { en: "Becomes scattered when overstimulated.", ru: "Распыляется и теряет силы при избытке стимулов." } },
      { title: { en: "Allergy to Rigid Routine", ru: "Непереносимость рутины" }, desc: { en: "Suffocated by repetitive micro-management.", ru: "Задыхается от бюрократии, графиков и микроменеджмента." } },
      { title: { en: "Overthinking Motives", ru: "Поиск скрытых смыслов" }, desc: { en: "May over-analyze simple comments looking for hidden depth.", ru: "Склонен излишне усложнять простые бытовые ситуации." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Fueled by people, novel ideas, and spontaneous events.", ru: "Питается общением, новыми впечатлениями и спонтанностью." } },
      information: { label: { en: "Intuition (N)", ru: "Интуиция (N)" }, desc: { en: "Seeing hidden connections and futuristic potential.", ru: "Видит скрытые взаимосвязи и вдохновляющие возможности." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Guided by empathy, values, and emotional resonance.", ru: "Опирается на внутренние ценности, совесть и тепло." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Free-form, open-ended, and serendipitous.", ru: "Свободный, гибкий и открытый воле случая." } }
    },
    oracleAdvice: {
      en: "Embrace the 'Impressionist' theme with Chaos at 65-85% for poetic, deeply atmospheric, and artistic revelations.",
      ru: "Выбирайте тему «Импрессионизм» при 65–85% Хаоса для получения поэтичных, живописных и чувственных откровений."
    }
  },

  ISTJ: {
    type: "ISTJ",
    group: "sentinels",
    groupLabel: { en: "Grounded Sentinels", ru: "Надежные Хранители" },
    title: { en: "The Inspector", ru: "Инспектор / Администратор" },
    motto: { en: "Pillar of Duty, Factual Precision, and Unwavering Integrity", ru: "Опора долга, фактической точности и несокрушимой честности" },
    psychologistIntro: {
      en: "The ISTJ is the bedrock of societal continuity. Anchored by Introverted Sensing (Si) and Extraverted Thinking (Te), your mind is a high-fidelity archive of verified facts, proven precedents, and reliable methods.",
      ru: "ISTJ — фундаментальная опора порядка и надежности. Ваша интровертная сенсорика (Si) и деловая логика (Te) создают внутреннюю базу проверенных фактов, традиций и четких процедур."
    },
    deepPortrait: {
      en: "You are dependable, honorable, and grounded. You take commitments with utmost seriousness, honoring your word and maintaining order against chaotic entropy.",
      ru: "Вы надежны, последовательны и честны. Ваше слово нерушимо, вы уважаете проверенные временем правила и обеспечиваете безупречную стабильность в любом деле."
    },
    learningStyle: {
      en: "Methodical, sequential, and evidence-based. You learn best through clear step-by-step documentation, real-world examples, and historical precedent.",
      ru: "Последовательный, структурированный и доказательный. Вы лучше всего усваиваете материал по четким инструкциям, фактам и практическим примерам."
    },
    strengths: [
      { title: { en: "Unshakable Reliability", ru: "Железная надежность" }, desc: { en: "Always fulfills obligations on time and to standard.", ru: "Всегда держит слово и доводит порученное до идеального конца." } },
      { title: { en: "Factual Precision", ru: "Фактическая точность" }, desc: { en: "Remembers exact details, dates, and specifications.", ru: "Помнит точные детали, цифры и процедурные нюансы." } },
      { title: { en: "Calm in Turmoil", ru: "Хладнокровие" }, desc: { en: "Maintains composure and protocol under chaos.", ru: "Сохраняет выдержку и порядок при любых потрясениях." } },
      { title: { en: "Ethical Integrity", ru: "Верность долгу" }, desc: { en: "Upholds standards even when unobserved.", ru: "Соблюдает высокие стандарты честности даже наедине с собой." } }
    ],
    weaknesses: [
      { title: { en: "Resistance to Sudden Shifts", ru: "Консерватизм перед переменами" }, desc: { en: "Uncomfortable with radical, untested disruptions.", ru: "С осторожностью относится к непроверенным новшествам." } },
      { title: { en: "Judgmental Rigidity", ru: "Склонность к категоричности" }, desc: { en: "May view non-standard lifestyles as irresponsible.", ru: "Риск посчитать чужую спонтанность несобранностью." } },
      { title: { en: "Suppression of Feelings", ru: "Сдержанность в эмоциях" }, desc: { en: "Struggles to express tender emotional vulnerability.", ru: "Сложности с открытым выражением тонких душевных чувств." } },
      { title: { en: "Self-Blame", ru: "Избыточное чувство вины" }, desc: { en: "Carries the burden of external system failures.", ru: "Берет на себя чрезмерный груз вины за ошибки системы." } }
    ],
    axes: {
      energy: { label: { en: "Introversion (I)", ru: "Интроверсия (I)" }, desc: { en: "Quiet, private focus on task and craft.", ru: "Тихий, уединенный фокус на деле и точности." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Concrete tangible facts, verified data, and history.", ru: "Конкретные факты, осязаемый опыт и история." } },
      decision: { label: { en: "Thinking (T)", ru: "Логика (T)" }, desc: { en: "Objective rules, standards, and practical utility.", ru: "Объективные правила, регламенты и польза." } },
      lifestyle: { label: { en: "Judging (J)", ru: "Рациональность (J)" }, desc: { en: "Structured schedules, clarity, and closure.", ru: "Четкий график, предсказуемость и завершенность." } }
    },
    oracleAdvice: {
      en: "Keep Chaos low (10-25%) with 'Ancient Romans' (Marcus Aurelius/Seneca) to receive solid, structured, and pragmatic wisdom.",
      ru: "Держите Хаос на минимальных значениях (10–25%) с советниками Древнего Рима (Марк Аврелий, Сенека) для ясных и практичных выводов."
    }
  },

  ISFJ: {
    type: "ISFJ",
    group: "sentinels",
    groupLabel: { en: "Grounded Sentinels", ru: "Надежные Хранители" },
    title: { en: "The Protector", ru: "Защитник / Хранитель" },
    motto: { en: "Devoted Guardian of Heritage, Care, and Practical Harmony", ru: "Преданный хранитель традиций, заботы и практической гармонии" },
    psychologistIntro: {
      en: "The ISFJ is the warm heart of service. Leading with Introverted Sensing (Si) supported by Extraverted Feeling (Fe), you hold a compassionate memory of what brings safety, comfort, and dignified care to those you love.",
      ru: "ISFJ — воплощение заботы и преданности. Ваша сенсорика (Si) в сочетании с чуткой этикой (Fe) создает вокруг вас атмосферу уюта, безопасности и душевного тепла."
    },
    deepPortrait: {
      en: "Quietly heroic, meticulous, and immensely patient, you remember birthdays, personal preferences, and the small touches that make life meaningful. You protect family, community, and heritage with humble dedication.",
      ru: "Скромный, внимательный к деталям и терпеливый, вы помните все важные мелочи о близких. Вы оберегаете семейные традиции и создаете порядок из искренней любви."
    },
    learningStyle: {
      en: "Practical, applied, and empathetic. You learn best when information has clear real-world utility in helping individuals and creating stability.",
      ru: "Практический, наглядный и ориентированный на пользу людям. Вы легко учитесь через конкретные примеры заботы и прикладные навыки."
    },
    strengths: [
      { title: { en: "Selfless Devotion", ru: "Самоотверженная забота" }, desc: { en: "Puts care and comfort into concrete action.", ru: "Превращает заботу в конкретные полезные действия." } },
      { title: { en: "Meticulous Memory", ru: "Внимание к деталям" }, desc: { en: "Recalls precise details about people and processes.", ru: "Помнит тончайшие предпочтения и потребности окружающих." } },
      { title: { en: "Steadfast Loyalty", ru: "Непоколебимая верность" }, desc: { en: "Stands faithfully by loved ones through adversity.", ru: "Остается преданным другом и партнером в любые времена." } },
      { title: { en: "Practical Organization", ru: "Практическая организованность" }, desc: { en: "Maintains smooth domestic and professional order.", ru: "Создает безупречный уют и порядок в быту и на работе." } }
    ],
    weaknesses: [
      { title: { en: "Difficulty Saying 'No'", ru: "Трудности с отказом" }, desc: { en: "Overburdens self to avoid disappointing others.", ru: "Перегружает себя чужими заботами, боясь обидеть отказом." } },
      { title: { en: "Reluctance to Voice Needs", ru: "Подавление своих желаний" }, desc: { en: "Suffers in silence while tending to everyone else.", ru: "Терпит неудобства молча, ставя себя на последнее место." } },
      { title: { en: "Anxiety Toward the Unknown", ru: "Тревога перед неизвестностью" }, desc: { en: "Stressed by abrupt disruption of comfortable routines.", ru: "Стресс от резкой смены привычного уклада жизни." } },
      { title: { en: "Taking Things Personally", ru: "Болезненная ранимость" }, desc: { en: "Deeply stung by ingratitude or harsh critique.", ru: "Остро переживает неблагодарность и холодную критику." } }
    ],
    axes: {
      energy: { label: { en: "Introversion (I)", ru: "Интроверсия (I)" }, desc: { en: "Private, humble, and gentle energy reserve.", ru: "Скромный, бережный и уединенный запас сил." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Tangible details, sensory memory, and tradition.", ru: "Осязаемые детали, память ощущений и традиции." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Interpersonal warmth, tact, and kindness.", ru: "Межличностное тепло, деликатность и доброта." } },
      lifestyle: { label: { en: "Judging (J)", ru: "Рациональность (J)" }, desc: { en: "Reliable schedules, preparedness, and order.", ru: "Надежный график, подготовленность и уют." } }
    },
    oracleAdvice: {
      en: "Use 'Theological' and 'Gestalt' frameworks with Chaos at 20-40% to receive comforting, grounded, and life-affirming perspectives.",
      ru: "Используйте Теологию и Гештальт при 20–40% Хаоса для получения поддерживающих, теплых и умиротворяющих ответов."
    }
  },

  ESTJ: {
    type: "ESTJ",
    group: "sentinels",
    groupLabel: { en: "Grounded Sentinels", ru: "Надежные Хранители" },
    title: { en: "The Director", ru: "Администратор / Управленец" },
    motto: { en: "Organizer of Institutions, Clear Standards, and Productive Order", ru: "Организатор институтов, четких стандартов и продуктивного порядка" },
    psychologistIntro: {
      en: "The ESTJ is the supreme operational pillar. Driven by Extraverted Thinking (Te) and Introverted Sensing (Si), you bring clarity, measurable standards, and firm direction to any group or institution.",
      ru: "ESTJ — опора управления и организационной мощи. Ваша экстравертная деловая логика (Te) и сенсорика (Si) наводят образцовый порядок, задавая прозрачные стандарты и темп."
    },
    deepPortrait: {
      en: "Direct, honest, and dedicated, you lead by example. You believe in honest labor, objective fairness, and adherence to proven ethical frameworks.",
      ru: "Вы прямолинейны, честны и трудолюбивы. Вы не любите пустых разговоров, требуя конкретных дел и соблюдения взятых на себя обязательств."
    },
    learningStyle: {
      en: "Structured, pragmatic, and procedural. You master knowledge through clear blueprints, operational drills, and measurable real-world milestones.",
      ru: "Структурированный, практический и прикладной. Вы учитесь на регламентах, кейсах эффективного менеджмента и реальной практике."
    },
    strengths: [
      { title: { en: "Operational Efficiency", ru: "Организационная эффективность" }, desc: { en: "Orchestrates resources and logistics with mastery.", ru: "Организует людей и ресурсы с максимальной отдачей." } },
      { title: { en: "Direct Candor", ru: "Прямота и честность" }, desc: { en: "Speaks plain truth without manipulative pretense.", ru: "Говорит прямо и открыто, не плетя интриг." } },
      { title: { en: "Unshakable Work Ethic", ru: "Непоколебимая трудоспособность" }, desc: { en: "Leads from the front through sheer industriousness.", ru: "Показывает пример высочайшей личной дисциплины." } },
      { title: { en: "Institutional Protection", ru: "Укрепление институтов" }, desc: { en: "Preserves stability and security for all members.", ru: "Создает стабильную и предсказуемую среду для окружающих." } }
    ],
    weaknesses: [
      { title: { en: "Inflexibility to Unconventional Ideas", ru: "Скепсис к нестандартным идеям" }, desc: { en: "Can dismiss novel methods if unproven.", ru: "С недоверием относится к новациям, не имеющим прецедентов." } },
      { title: { en: "Blunt Insensitivity", ru: "Излишняя резкость" }, desc: { en: "May hurt sensitive feelings during blunt critiques.", ru: "Может ранить окружающих излишне жесткой прямотой." } },
      { title: { en: "Difficulty Relaxing", ru: "Трудности с отдыхом" }, desc: { en: "Equates rest with unproductive laziness.", ru: "Испытывает вину за бездействие и отдых." } },
      { title: { en: "Status Anxiety", ru: "Озабоченность репутацией" }, desc: { en: "Overly concerned with public reputation and social proof.", ru: "Чрезмерное внимание к внешнему статусу и правилам." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Direct engagement with external operations.", ru: "Прямое и активное управление процессами во внешнем мире." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Facts, concrete results, and proven methods.", ru: "Факты, проверенные методы и осязаемый результат." } },
      decision: { label: { en: "Thinking (T)", ru: "Логика (T)" }, desc: { en: "Standardized rules, fairness, and utility.", ru: "Четкие правила, объективность и польза." } },
      lifestyle: { label: { en: "Judging (J)", ru: "Рациональность (J)" }, desc: { en: "Decisive closure, punctual milestones.", ru: "Быстрое принятие решений, пунктуальность и порядок." } }
    },
    oracleAdvice: {
      en: "Utilize KNOWLEDGE and DECISION modes with 'Ancient Romans' at 15-30% Chaos to receive actionable, bulletproof decrees.",
      ru: "Используйте режимы ЗНАНИЕ и УКАЗ с советниками Древнего Рима при 15–30% Хаоса для получения кристально четких директив."
    }
  },

  ESFJ: {
    type: "ESFJ",
    group: "sentinels",
    groupLabel: { en: "Grounded Sentinels", ru: "Надежные Хранители" },
    title: { en: "The Caregiver", ru: "Учитель / Консул" },
    motto: { en: "Host of Community Warmth, Social Harmony, and Attentive Service", ru: "Хранитель душевного тепла, социального согласия и заботливого служения" },
    psychologistIntro: {
      en: "The ESFJ is the social connector. Driven by Extraverted Feeling (Fe) and Introverted Sensing (Si), you possess an incredible ability to create welcoming spaces where everyone feels fed, heard, and respected.",
      ru: "ESFJ — душа любого сообщества. Ваша экстравертная этика (Fe) и сенсорика (Si) наделяют вас удивительным талантом объединять людей, создавать уют и заботиться о каждом."
    },
    deepPortrait: {
      en: "Warm, organized, and dutiful, you thrive on creating mutual harmony. You notice who feels left out and immediately weave them into the communal fold with genuine hospitality.",
      ru: "Вы гостеприимны, внимательны и надежны. Для вас важно, чтобы вокруг царили мир и согласие. Вы храните традиции встреч, праздников и совместных дел."
    },
    learningStyle: {
      en: "Interactive, relational, and story-based. You learn best in community settings, through group discussion, and when knowledge directly serves human welfare.",
      ru: "Интерактивный, командный и прикладной. Вы учитесь в диалоге, совместной практике и там, где знания помогают улучшать жизнь людей."
    },
    strengths: [
      { title: { en: "Community Cohesion", ru: "Сплочение коллектива" }, desc: { en: "Brings people together and dissolves social awkwardness.", ru: "Умеет подружить людей и разрядить любую обстановку." } },
      { title: { en: "Attentive Hospitality", ru: "Искреннее гостеприимство" }, desc: { en: "Creates warm, inclusive environments flawlessly.", ru: "Создает безупречную атмосферу уюта и праздника." } },
      { title: { en: "Practical Helpfulness", ru: "Конкретная помощь" }, desc: { en: "Shows love through tangible, supportive acts.", ru: "Помогает не словами, а реальными делами и заботой." } },
      { title: { en: "High Sense of Duty", ru: "Надежность и ответственность" }, desc: { en: "Unfailing reliability in family and social roles.", ru: "Безупречно выполняет социальные и семейные обязательства." } }
    ],
    weaknesses: [
      { title: { en: "Approval Anxiety", ru: "Зависимость от признания" }, desc: { en: "Vulnerable to external disapproval or criticism.", ru: "Болезненно реагирует на критику и холодность." } },
      { title: { en: "Resistance to Disruption", ru: "Консерватизм взглядов" }, desc: { en: "Uneasy with unconventional social choices.", ru: "С трудом принимает нестандартное или вызывающее поведение." } },
      { title: { en: "Self-Depletion", ru: "Переутомление от забот" }, desc: { en: "Gives until depleted without asking for reciprocal care.", ru: "Отдает все силы другим, забывая восстанавливать свои." } },
      { title: { en: "Avoiding Crucial Conflict", ru: "Боязнь разлада" }, desc: { en: "Sweeps tough issues under the rug to keep peace.", ru: "Склонен замалчивать острые темы ради сохранения видимого мира." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Energized by vibrant group interactions.", ru: "Заряжается от живого общения и заботы о людях." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Practical needs, real details, and comfortable customs.", ru: "Практические нужды, осязаемый комфорт и обычаи." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Social harmony, empathy, and mutual support.", ru: "Социальное согласие, такт и взаимное уважение." } },
      lifestyle: { label: { en: "Judging (J)", ru: "Рациональность (J)" }, desc: { en: "Planned gatherings, predictability, and structure.", ru: "Запланированные встречи, предсказуемость и порядок." } }
    },
    oracleAdvice: {
      en: "Select 'Gestalt' and 'Russian Philosophy' at 30-45% Chaos to explore relational bonds and holistic community wisdom.",
      ru: "Выбирайте Гештальт и Русскую философию при 30–45% Хаоса для глубокого осмысления отношений и человеческой общности."
    }
  },

  ISTP: {
    type: "ISTP",
    group: "explorers",
    groupLabel: { en: "Adaptable Explorers", ru: "Прагматичные Искатели" },
    title: { en: "The Crafter", ru: "Мастер / Виртуоз" },
    motto: { en: "Master of Mechanics, Tactile Logic, and Crisis Problem-Solving", ru: "Мастер механики, прикладной логики и хладнокровных решений" },
    psychologistIntro: {
      en: "The ISTP operates as a tactile troubleshooter. Driven by Introverted Thinking (Ti) and Extraverted Sensing (Se), you explore the world with your hands and sharp diagnostic senses, dismantling machines, code, or systems to understand their inner workings.",
      ru: "ISTP — мастер прикладной логики и физического мира. Ваша интровертная логика (Ti) и острая сенсорика (Se) дают способность мгновенно диагностировать и чинить любые механизмы, код и процессы."
    },
    deepPortrait: {
      en: "Calm, observant, and fiercely independent, you possess a quiet confidence. In a sudden crisis, while others panic, your heart rate drops as you coolly engineer a practical fix.",
      ru: "Вы сдержанны, наблюдательны и цените свободу. В моменты внезапных кризисов вы сохраняете ледяное спокойствие, быстро находя элегантное техническое решение."
    },
    learningStyle: {
      en: "Kinesthetic, diagnostic, and project-based. You learn best by pulling things apart, experimenting with physical tools, and real-time trial-and-error.",
      ru: "Кинестетический, диагностический и экспериментальный. Вы учитесь на практике: разбирая приборы, тестируя гипотезы и пробуя инструмент в деле."
    },
    strengths: [
      { title: { en: "Mastery of Tools & Tech", ru: "Виртуозное владение инструментами" }, desc: { en: "Intuitive grasp of mechanics, software, and physical dynamics.", ru: "Интуитивное понимание техники, программ и физических систем." } },
      { title: { en: "Crisis Composure", ru: "Хладнокровие в кризисе" }, desc: { en: "Remains relaxed and focused in high-stakes moments.", ru: "Сохраняет спокойствие и ясность ума при экстремальных вызовах." } },
      { title: { en: "Pragmatic Efficiency", ru: "Предельная лаконичность" }, desc: { en: "Finds the shortest, cleanest path to solve a problem.", ru: "Находит самый быстрый и экономный путь к решению." } },
      { title: { en: "Adaptable Resourcefulness", ru: "Находчивость" }, desc: { en: "Improvises brilliant fixes with whatever is at hand.", ru: "Импровизирует и создает решения из подручных средств." } }
    ],
    weaknesses: [
      { title: { en: "Emotional Detachment", ru: "Эмоциональная отстраненность" }, desc: { en: "Can seem indifferent or unapproachable during affective crises.", ru: "Может казаться холодным в моменты чужих эмоциональных драм." } },
      { title: { en: "Commitment Aversion", ru: "Нелюбовь к жестким обязательствам" }, desc: { en: "Resents being trapped by rigid long-term contracts.", ru: "Тяготится жесткими долгосрочными рамками и контролем." } },
      { title: { en: "Risk-Seeking Thrills", ru: "Тяга к риску" }, desc: { en: "May court physical or financial danger to fight boredom.", ru: "Склонен к рискованным авантюрам ради борьбы со скукой." } },
      { title: { en: "Communication Brevity", ru: "Излишняя немногословность" }, desc: { en: "Frustrates collaborators by explaining too little.", ru: "Может раздражать окружающих нежеланием подробно объяснять свои шаги." } }
    ],
    axes: {
      energy: { label: { en: "Introversion (I)", ru: "Интроверсия (I)" }, desc: { en: "Solitary craft, private workshop, quiet stamina.", ru: "Уединенная мастерская, независимость и фокус." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Real-time sensory inputs, physics, and tactile mechanics.", ru: "Реальные физические свойства, тактильность и физика." } },
      decision: { label: { en: "Thinking (T)", ru: "Логика (T)" }, desc: { en: "Dispassionate functional logic and efficiency.", ru: "Беспристрастная функциональная логика и польза." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Responsive, adaptable, improvisational action.", ru: "Спонтанность, быстрая реакция по ситуации." } }
    },
    oracleAdvice: {
      en: "Try the 'Ancient Romans' and 'Gestalt' perspectives at 40-60% Chaos for direct, unvarnished, and hands-on clarity.",
      ru: "Выбирайте стоиков (Рим) и Гештальт при 40–60% Хаоса для получения прямых, лаконичных и прикладных советов."
    }
  },

  ISFP: {
    type: "ISFP",
    group: "explorers",
    groupLabel: { en: "Adaptable Explorers", ru: "Прагматичные Искатели" },
    title: { en: "The Artist", ru: "Художник / Творец" },
    motto: { en: "Sensory Poet of Living Beauty, Gentle Grace, and Living in the Now", ru: "Сенсорный поэт живой красоты, гармонии и момента «здесь и сейчас»" },
    psychologistIntro: {
      en: "The ISFP lives as a sensory poet. Guided by Introverted Feeling (Fi) and Extraverted Sensing (Se), you experience the physical world with exquisite aesthetic sensitivity, translating deep inner values into living art, style, and presence.",
      ru: "ISFP живет в мире тонкой эстетики и чувств. Ваша интровертная этика (Fi) и чуткая сенсорика (Se) позволяют воспринимать мир с редким художественным вкусом и душевной чистотой."
    },
    deepPortrait: {
      en: "Gentle, understated, and intensely authentic, you let actions and artistic creation speak for you. You cherish personal freedom, nature's elegance, and spontaneous adventures without pretense.",
      ru: "Вы скромны, добры и искренни. Вы выражаете себя через творчество, музыку, визуальный стиль и заботу. Вы цените красоту природы и свободу быть собой."
    },
    learningStyle: {
      en: "Visual, aesthetic, and immersive. You learn best when concepts engage the senses—through colors, textures, soundscapes, and hands-on creation.",
      ru: "Визуальный, эстетический и чувственный. Вы учитесь через краски, звуки, тактильный контакт и погружение в живую атмосферу."
    },
    strengths: [
      { title: { en: "Exquisite Aesthetic Taste", ru: "Изысканный эстетический вкус" }, desc: { en: "Natural eye for harmony, design, and atmosphere.", ru: "Природное чувство стиля, гармонии форм и цвета." } },
      { title: { en: "Quiet Empathy", ru: "Тихое сопереживание" }, desc: { en: "Comforts others through warm, non-intrusive presence.", ru: "Поддерживает людей мягким и ненавязчивым присутствием." } },
      { title: { en: "Spontaneous Presence", ru: "Жизнь в настоящем моменте" }, desc: { en: "Fully attuned to the beauty of the current second.", ru: "Умеет наслаждаться текущей минутой и замечать чудо в простом." } },
      { title: { en: "Uncompromising Authenticity", ru: "Верность своей натуре" }, desc: { en: "Never compromises identity for social conformity.", ru: "Не прогибается под чужие шаблоны ради одобрения." } }
    ],
    weaknesses: [
      { title: { en: "Fragility to Criticism", ru: "Ранимость к критике" }, desc: { en: "Takes negative feedback as an attack on core identity.", ru: "Болезненно воспринимает критику своего творчества и личности." } },
      { title: { en: "Long-Range Planning Aversion", ru: "Сложности с далеким планированием" }, desc: { en: "Finds long-term financial/career blueprints suffocating.", ru: "Тяготится жесткими многолетними карьерными планами." } },
      { title: { en: "Passive Withdrawal", ru: "Уход в тень" }, desc: { en: "Hides feelings rather than addressing simmering conflicts.", ru: "Закрывается в себе при возникновении напряженности." } },
      { title: { en: "Fluctuating Self-Esteem", ru: "Колебания самооценки" }, desc: { en: "Underestimates own profound artistic gifts.", ru: "Склонен недооценивать свой уникальный талант." } }
    ],
    axes: {
      energy: { label: { en: "Introversion (I)", ru: "Интроверсия (I)" }, desc: { en: "Private sanctuary of sensory appreciation.", ru: "Уединенный мир эстетических впечатлений." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Vivid colors, textures, sounds, and physical reality.", ru: "Яркие краски, звуки, тактильные текстуры и природа." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Personal authenticity, compassion, and resonance.", ru: "Личная искренность, сострадание и внутренний вкус." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Fluid, unhurried, living spontaneously.", ru: "Плавный, свободный, спонтанный образ жизни." } }
    },
    oracleAdvice: {
      en: "Switch the theme to 'Impressionist' (Renoir mode) with Chaos at 50-75% for rich, evocative, and visually poetic symposium answers.",
      ru: "Включайте тему «Импрессионизм» (стиль Ренуара) при 50–75% Хаоса для живописных, тонких и образных откровений."
    }
  },

  ESTP: {
    type: "ESTP",
    group: "explorers",
    groupLabel: { en: "Adaptable Explorers", ru: "Прагматичные Искатели" },
    title: { en: "The Persuader", ru: "Маршал / Делец" },
    motto: { en: "Dynamo of Action, Instant Instinct, and Unstoppable Negotiation", ru: "Генератор действия, мгновенных инстинктов и блестящих переговоров" },
    psychologistIntro: {
      en: "The ESTP is pure kinetic energy. Driven by Extraverted Sensing (Se) and Introverted Thinking (Ti), you live on the cutting edge of the present moment, reading body language, seizing opportunities, and mastering tactical negotiations.",
      ru: "ESTP — сгусток чистой кинетической энергии. Ваша ведущая сенсорика (Se) и деловая логика (Ti) дают феноменальную реакцию, умение мгновенно ориентироваться в обстановке и побеждать в переговорах."
    },
    deepPortrait: {
      en: "Bold, charismatic, and pragmatic, you thrive under adrenaline. You learn by doing, test limits fearlessly, and bring a lively magnetism to every room you enter.",
      ru: "Вы смелы, энергичны и обаятельны. Вас зажигает драйв, спорт, бизнес и живые вызовы. Вы предпочитаете действовать здесь и сейчас, не тратя время на лишнюю теорию."
    },
    learningStyle: {
      en: "Kinetic, competitive, and experiential. You learn by jumping into live scenarios, negotiating deals, and testing hypotheses in physical reality.",
      ru: "Интенсивный, соревновательный и прикладной. Вы учитесь на реальных сделках, спорте, живых проектах и быстром отклике среды."
    },
    strengths: [
      { title: { en: "Lighting-Fast Reflexes", ru: "Молниеносная реакция" }, desc: { en: "Reacts to sudden threats or opportunities instantly.", ru: "Мгновенно оценивает обстановку и делает выигрышный ход." } },
      { title: { en: "Charismatic Persuasion", ru: "Убедительность и напор" }, desc: { en: "Reads nonverbal cues and wins over tough audiences.", ru: "Видит людей насквозь и легко находит подход к любому собеседнику." } },
      { title: { en: "Bold Fearlessness", ru: "Бесстрашие перед вызовами" }, desc: { en: "Embraces calculated risk without hesitation.", ru: "Не боится разумного риска и трудных переговоров." } },
      { title: { en: "Pragmatic Realism", ru: "Здоровый прагматизм" }, desc: { en: "Focuses purely on what works in practice.", ru: "Ориентируется только на то, что работает на практике." } }
    ],
    weaknesses: [
      { title: { en: "Impatience with Abstract Theory", ru: "Нетерпимость к абстракциям" }, desc: { en: "Bored by endless philosophical debate without action.", ru: "Быстро устает от долгих отвлеченных теорий без конкретного применения." } },
      { title: { en: "Impulsive Risk Taking", ru: "Склонность к авантюрам" }, desc: { en: "May leap before looking at long-term ramifications.", ru: "Риск броситься в авантюру без оценки долгосрочных последствий." } },
      { title: { en: "Difficulty with Emotional Vulnerability", ru: "Сложности с тонкими эмоциями" }, desc: { en: "Uncomfortable dealing with deep emotional trauma.", ru: "Испытывает неловкость при столкновении со сложными душевными драмами." } },
      { title: { en: "Allergy to Red Tape", ru: "Бунт против регламентов" }, desc: { en: "Rebels against slow bureaucratic procedures.", ru: "Раздражение от волокиты, инструкций и медлительных инстанций." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Energized by dynamic action, crowds, and movement.", ru: "Заряжается от движения, риска, людей и соревнований." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Sharp sensory awareness of the immediate environment.", ru: "Острейшее восприятие деталей окружающего пространства." } },
      decision: { label: { en: "Thinking (T)", ru: "Логика (T)" }, desc: { en: "Tactical logic, tangible benefits, and outcome.", ru: "Тактическая логика, выгода и результат." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Fast, flexible, seizing spontaneous openings.", ru: "Быстрый, гибкий, использующий любую подвернувшуюся возможность." } }
    },
    oracleAdvice: {
      en: "Use RECOMMENDATION and COMPARISON modes with 'Ancient Romans' and 'Nietzsche' at 30-50% Chaos for sharp tactical advice.",
      ru: "Используйте режимы РЕКОМЕНДАЦИЯ и СРАВНЕНИЕ с Ницше и Римлянами при 30–50% Хаоса для получения дерзких тактических рекомендаций."
    }
  },

  ESFP: {
    type: "ESFP",
    group: "explorers",
    groupLabel: { en: "Adaptable Explorers", ru: "Прагматичные Искатели" },
    title: { en: "The Performer", ru: "Политик / Развлекатель" },
    motto: { en: "Radiant Light of Joy, Sensory Celebration, and Infectious Energy", ru: "Сияющий свет радости, праздника жизни и заразительной энергии" },
    psychologistIntro: {
      en: "The ESFP is the radiant heartbeat of the present moment. Operating through Extraverted Sensing (Se) and Introverted Feeling (Fi), you celebrate life with genuine warmth, spontaneous humor, and magnetic theatricality.",
      ru: "ESFP — душа праздника и живое воплощение радости. Ваша экстравертная сенсорика (Se) и искренние чувства (Fi) наполняют окружающее пространство смехом, теплотой и позитивом."
    },
    deepPortrait: {
      en: "Generous, lively, and keenly observant of people's spirits, you transform mundane routines into memorable adventures. You love sharing beauty, music, food, and laughter with those around you.",
      ru: "Вы щедры, артистичны и внимательны к настроению людей. Вы превращаете любой серый день в яркое приключение, щедро делясь музыкой, радостью и улыбками."
    },
    learningStyle: {
      en: "Social, experiential, and multi-sensory. You learn best through group activities, hands-on demonstration, performing arts, and interactive workshops.",
      ru: "Интерактивный, игровой и эмоциональный. Вы учитесь через движение, перформанс, совместную практику и яркие наглядные образы."
    },
    strengths: [
      { title: { en: "Infectious Enthusiasm", ru: "Заразительный оптимизм" }, desc: { en: "Lifts the spirits of everyone in the vicinity.", ru: "Моментально поднимает настроение окружающим." } },
      { title: { en: "Generous Warmth", ru: "Искренняя щедрость" }, desc: { en: "Gives freely of time, comfort, and hospitality.", ru: "Щедро делится душевным теплом, вниманием и заботой." } },
      { title: { en: "Sensory Mastery", ru: "Чувство праздника" }, desc: { en: "Incredible eye for music, fashion, cuisine, and fun.", ru: "Тонкий вкус в музыке, стиле, кухне и создании атмосферы." } },
      { title: { en: "Spontaneous Courage", ru: "Спонтанная смелость" }, desc: { en: "Steps onto the stage or takes the leap with ease.", ru: "Легко выходит на сцену и пробует новое без страха." } }
    ],
    weaknesses: [
      { title: { en: "Boredom with Repetition", ru: "Скука от рутины" }, desc: { en: "Struggles with solitary theoretical study.", ru: "Утомляется от долгой кабинетной теории в одиночестве." } },
      { title: { en: "Conflict Avoidance", ru: "Бегство от негатива" }, desc: { en: "May evade serious unpleasant discussions.", ru: "Склонен избегать тяжелых разговоров, переключаясь на позитив." } },
      { title: { en: "Short-Term Focus", ru: "Фокус на сиюминутном" }, desc: { en: "Can neglect long-term consequences for immediate fun.", ru: "Риск упустить стратегические цели в погоне за ярким моментом." } },
      { title: { en: "Hypersensitivity to Rejection", ru: "Страх отвержения" }, desc: { en: "Deeply saddened if excluded from the group.", ru: "Болезненно переживает невнимание и холодность компании." } }
    ],
    axes: {
      energy: { label: { en: "Extraversion (E)", ru: "Экстраверсия (E)" }, desc: { en: "Fueled by crowds, celebration, and shared laughter.", ru: "Питается общением, праздником и смехом." } },
      information: { label: { en: "Sensing (S)", ru: "Сенсорика (S)" }, desc: { en: "Sensory vibrancy, immediate reality, and style.", ru: "Яркость чувств, осязаемая реальность и красота момента." } },
      decision: { label: { en: "Feeling (F)", ru: "Этика (F)" }, desc: { en: "Personal authenticity, warmth, and heart.", ru: "Личная искренность, сердечность и сопереживание." } },
      lifestyle: { label: { en: "Perceiving (P)", ru: "Иррациональность (P)" }, desc: { en: "Spontaneous, festive, and flexible schedule.", ru: "Спонтанный, легкий на подъем и открытый график." } }
    },
    oracleAdvice: {
      en: "Enjoy the 'Impressionist' theme and 'Gestalt' perspectives at 55-80% Chaos for vibrant, colorful, and sensory-rich Oracle decrees.",
      ru: "Выбирайте тему «Импрессионизм» и Гештальт при 55–80% Хаоса для получения живых, ярких и вдохновляющих ответов."
    }
  }
};

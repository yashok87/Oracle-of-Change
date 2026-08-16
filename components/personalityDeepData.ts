export interface PersonalityDeepInsight {
  type: string;
  careers: {
    idealRoles: { en: string[]; ru: string[] };
    workEnvironment: { en: string; ru: string };
    growthAdvice: { en: string; ru: string };
  };
  relationships: {
    idealMatches: Array<{ type: string; label: { en: string; ru: string }; synergy: { en: string; ru: string } }>;
    challengingMatch: { type: string; label: { en: string; ru: string }; tension: { en: string; ru: string } };
    communicationStyle: { en: string; ru: string };
    intimacyAdvice: { en: string; ru: string };
  };
  philosophy: {
    existentialMotive: { en: string; ru: string };
    idealPhilosophers: { en: string; ru: string };
  };
}

export const PERSONALITY_DEEP_DATA: Record<string, PersonalityDeepInsight> = {
  INTJ: {
    type: "INTJ",
    careers: {
      idealRoles: {
        en: ["Systems Architect", "Strategic Management Consultant", "AI & Machine Learning Researcher", "Venture Capital Partner", "Philosophical / Scientific Author", "Quantitative Financial Strategist"],
        ru: ["Системный архитектор", "Стратегический консультант", "Исследователь ИИ и нейросетей", "Партнер венчурного фонда", "Автор научных и философских трудов", "Количественный финансовый стратег"]
      },
      workEnvironment: {
        en: "High autonomy, meritocratic, intellectually rigorous, with zero tolerance for bureaucratic busywork or micromanagement.",
        ru: "Высокая автономия, меритократия, интеллектуальная строгость и полное отсутствие бюрократического микроменеджмента."
      },
      growthAdvice: {
        en: "Recognize that human irrationality and organizational politics are systemic variables that must be modeled, not just dismissed.",
        ru: "Учитесь воспринимать человеческую иррациональность и эмоции как системные переменные, которые нужно учитывать в модели, а не игнорировать."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ENFP",
          label: { en: "The Inspirer (Dynamic Polarity)", ru: "Вдохновитель (Динамическая полярность)" },
          synergy: {
            en: "ENFP brings vibrant emotional warmth and spontaneous curiosity that unlocks the INTJ's deeply guarded inner world.",
            ru: "ENFP наполняет жизнь INTJ эмоциональной теплотой, спонтанностью и свежим вдохновением, открывая его скрытую чувственность."
          }
        },
        {
          type: "ENTP",
          label: { en: "The Visionary (Intellectual Sparring)", ru: "Полемист (Интеллектуальный спарринг)" },
          synergy: {
            en: "Electric dialectical synergy where ideas are endlessly refined through razor-sharp debate.",
            ru: "Искрометный интеллектуальный союз, где обе стороны наслаждаются бесконечными дебатами и генерацией дерзких теорий."
          }
        }
      ],
      challengingMatch: {
        type: "ESFJ",
        label: { en: "The Caregiver", ru: "Хранитель традиций" },
        tension: {
          en: "Clash between the INTJ's need for unconventional logic and the ESFJ's reliance on social consensus and emotional etiquette.",
          ru: "Конфликт между тягой INTJ к бескомпромиссной логике и потребностью ESFJ в социальном консенсусе и соблюдении эмоциональных традиций."
        }
      },
      communicationStyle: {
        en: "Concise, precise, and conceptual. Values epistemic honesty, direct feedback, and substantive depth over pleasant small talk.",
        ru: "Лаконичный, точный и концептуальный. Ценит честность, прямую конструктивную критику и суть вместо светских формальностей."
      },
      intimacyAdvice: {
        en: "Practice expressing appreciation and emotional vulnerability verbally before reaching cognitive exhaustion.",
        ru: "Не держите признательность только в мыслях — проговаривайте теплые слова партнеру вслух, не дожидаясь усталости."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To decode universal principles and construct structures that stand the test of time.",
        ru: "Разгадать фундаментальные законы вселенной и создать системы, неподвластные времени."
      },
      idealPhilosophers: {
        en: "Spinoza (rationalist pantheism), Nietzsche (will to truth), Marcus Aurelius (stoic mastery).",
        ru: "Спиноза (рационализм), Ницше (воля к истине), Марк Аврелий (стоическая дисциплина)."
      }
    }
  },

  INTP: {
    type: "INTP",
    careers: {
      idealRoles: {
        en: ["Theoretical Physicist / Mathematician", "Philosophy Professor", "Algorithms & Compiler Architect", "Cybersecurity Threat Analyst", "Bioinformatics Researcher", "Game Engine Architect"],
        ru: ["Физик-теоретик / Математик", "Профессор философии", "Архитектор алгоритмов и компиляторов", "Аналитик кибербезопасности", "Исследователь биоинформатики", "Архитектор игровых движков"]
      },
      workEnvironment: {
        en: "Flexible, research-driven, with unlimited room for conceptual exploration and minimal routine deadlines.",
        ru: "Свободный график, исследовательский дух, простор для экспериментов и минимум жестких дедлайнов."
      },
      growthAdvice: {
        en: "Bridge the gap between theoretical elegance and tangible execution by shipping imperfect prototypes early.",
        ru: "Учитесь переводить идеальные теоретические конструкции в осязаемый результат: выпускайте ранние рабочие прототипы."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ENTJ",
          label: { en: "The Commander (Executive Engine)", ru: "Командир (Исполнительный двигатель)" },
          synergy: {
            en: "ENTJ provides the decisive executive force to bring the INTP's brilliant theoretical architecture into reality.",
            ru: "ENTJ дает волю и организационную мощь, превращая гениальные идеи INTP в работающие масштабные проекты."
          }
        },
        {
          type: "INFJ",
          label: { en: "The Mystic Counselor (Deep Insight)", ru: "Мистик-советник (Глубинное понимание)" },
          synergy: {
            en: "Shared passion for abstract ontology coupled with rich mutual psychological respect.",
            ru: "Глубокая общая страсть к философии, метафизике и тонкое взаимное уважение к личным границам."
          }
        }
      ],
      challengingMatch: {
        type: "ESFP",
        label: { en: "The Performer", ru: "Развлекатель" },
        tension: {
          en: "Mismatched tempos: INTP seeks deep solitary analysis while ESFP craves immediate sensory stimulation and social spotlight.",
          ru: "Разница ритмов: INTP стремится к тихим абстрактным размышлениям, тогда как ESFP ищет ярких сенсорных впечатлений и шумных компаний."
        }
      },
      communicationStyle: {
        en: "Dialectical, nuanced, inquisitive. Loves exploring hypothetical scenarios, paradoxes, and edge cases without judging.",
        ru: "Диалектический, исследовательский и открытый. Любит разбирать парадоксы, скрытые связи и мысленные эксперименты."
      },
      intimacyAdvice: {
        en: "Remember that emotional support does not always require solving a logical problem; presence itself is often the answer.",
        ru: "Помните, что близким не всегда нужен логический разбор проблемы — иногда достаточно простого теплого присутствия."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To pursue pure, unfiltered comprehension of the architecture of reality.",
        ru: "Постичь истинную, неискаженную архитектуру реальности и человеческого разума."
      },
      idealPhilosophers: {
        en: "Immanuel Kant (pure reason), Ludwig Wittgenstein (logic & language), Gottfried Leibniz.",
        ru: "Иммануил Кант (критика чистого разума), Людвиг Витгенштейн (логика языка), Лейбниц."
      }
    }
  },

  ENTJ: {
    type: "ENTJ",
    careers: {
      idealRoles: {
        en: ["Chief Executive Officer (CEO)", "Venture Capital Managing Director", "Corporate Turnaround Strategist", "Investment Banking Director", "Technology Visionary / Founder", "High-Stakes Legal Counsel"],
        ru: ["Генеральный директор (CEO)", "Управляющий директор венчурного фонда", "Антикризисный стратег", "Директор инвестиционного банка", "Основатель технологических проектов", "Ведущий судебный адвокат"]
      },
      workEnvironment: {
        en: "High-stakes, goal-driven, merit-based environment with high agency and authority to restructure operations.",
        ru: "Высокая ответственность, масштабные цели, меритократия и полномочия для кардинальной оптимизации систем."
      },
      growthAdvice: {
        en: "Cultivate active empathy; listening to your team's subtle intuitions prevents critical blind spots in your grand plan.",
        ru: "Развивайте эмпатию и слушайте интуицию команды: это защитит ваш глобальный план от скрытых слепых зон."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "INTP",
          label: { en: "The Thinker (Strategic Grounding)", ru: "Мыслитель (Теоретический фундамент)" },
          synergy: {
            en: "The INTP provides unassailable logical analysis while the ENTJ handles decisive real-world execution.",
            ru: "INTP снабжает союз глубочайшей логической экспертизой, а ENTJ обеспечивает решительную реализацию."
          }
        },
        {
          type: "INFP",
          label: { en: "The Idealist (Soulful Balance)", ru: "Идеалист (Душевная гармония)" },
          synergy: {
            en: "INFP's profound moral integrity and emotional warmth softens and enriches the ENTJ's pragmatic drive.",
            ru: "Искренняя глубина чувств и моральная чистота INFP гармонизируют железный прагматизм ENTJ."
          }
        }
      ],
      challengingMatch: {
        type: "ISFP",
        label: { en: "The Artist", ru: "Свободный художник" },
        tension: {
          en: "ENTJ's drive for structured control conflicts with ISFP's delicate need for unstructured emotional independence.",
          ru: "Потребность ENTJ в контроле и планах сталкивается с чувствительностью ISFP и его нелюбовью к давлению."
        }
      },
      communicationStyle: {
        en: "Direct, confident, structured, results-focused. Dislikes beating around the bush; values actionable conclusions.",
        ru: "Прямой, уверенный, четкий и ориентированный на результат. Не выносит пустых слов, ценит конкретику и выводы."
      },
      intimacyAdvice: {
        en: "Turn off the executive mode at home. A relationship is not a project to be optimized, but a sacred space to experience.",
        ru: "Выключайте командный режим дома. Отношения — это не проект для оптимизации, а пространство взаимного тепла."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To mobilize human potential and build enduring empires of innovation.",
        ru: "Мобилизовать человеческий потенциал и воздвигать несокрушимые империи прогресса."
      },
      idealPhilosophers: {
        en: "Niccolò Machiavelli (realpolitik), Friedrich Nietzsche (Ubermensch will), Sun Tzu (master strategy).",
        ru: "Никколо Макиавелли (стратегия власти), Фридрих Ницше (воля к созиданию), Сунь-Цзы (искусство стратегии)."
      }
    }
  },

  ENTP: {
    type: "ENTP",
    careers: {
      idealRoles: {
        en: ["Serial Tech Entrepreneur", "Venture Catalyst / Innovation Lead", "Intellectual Property Litigator", "Creative Director / Disruptive Brand Strategist", "Think-Tank Political Analyst", "Keynote Provocateur & Columnist"],
        ru: ["Серийный IT-предприниматель", "Лидер инноваций / Венчурный скаут", "Адвокат по интеллектуальной собственности", "Креативный директор / Бренд-стратег", "Политический аналитик мозгового центра", "Колумнист и публичный спикер"]
      },
      workEnvironment: {
        en: "Fast-moving, intellectually competitive, stimulating, with full permission to challenge paradigms and build new concepts.",
        ru: "Динамичная среда, интеллектуальный азарт, свобода ломать устаревшие парадигмы и запускать дерзкие концепты."
      },
      growthAdvice: {
        en: "Build disciplined follow-through habits or partner with strong implementers to prevent visionary ideas from fizzling out.",
        ru: "Развивайте привычку доводить начатое до конца или привлекайте надежных партнеров-реализаторов."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "INFJ",
          label: { en: "The Mystic Counselor (Golden Mirror)", ru: "Мистик-советник (Золотое зеркало)" },
          synergy: {
            en: "Deep magnetic chemistry where ENTP's expansive ideation finds deep emotional and philosophical grounding in INFJ.",
            ru: "Глубокая химия: фонтан идей ENTP обретает в INFJ мудрого, тонкого собеседника и душевную гавань."
          }
        },
        {
          type: "INTJ",
          label: { en: "The Architect (Strategic Alchemy)", ru: "Архитектор (Стратегическая алхимия)" },
          synergy: {
            en: "Incredible mutual respect for intellectual sharpness and fearlessness in dismantling dogma.",
            ru: "Огромное взаимное уважение за остроту ума, иронию и бесстрашие перед любыми догмами."
          }
        }
      ],
      challengingMatch: {
        type: "ISFJ",
        label: { en: "The Protector", ru: "Хранитель очага" },
        tension: {
          en: "ENTP's provocative questioning of traditions and love for sudden chaos distresses the stability-seeking ISFJ.",
          ru: "Постоянное стремление ENTP подвергать все сомнению и менять планы ранит стремление ISFJ к предсказуемости."
        }
      },
      communicationStyle: {
        en: "Witty, provocative, rapid-fire, metaphor-rich. Enjoys devil's advocacy and intellectual sparring for fun.",
        ru: "Остроумный, парадоксальный, образный и быстрый. Любит игру в «адвоката дьявола» и искрометную иронию."
      },
      intimacyAdvice: {
        en: "Ensure your partner feels secure that your love is steady even when your thoughts are in constant revolution.",
        ru: "Давайте партнеру уверенность в том, что ваши чувства стабильны, даже когда ваши мысли крутятся в вихре новых идей."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To ignite intellectual revolutions and dismantle obsolete illusions.",
        ru: "Зажигать интеллектуальные революции и сокрушать устаревшие иллюзии."
      },
      idealPhilosophers: {
        en: "Socrates (dialectical cross-examination), Paul Feyerabend (epistemological anarchism), Heraclitus (constant change).",
        ru: "Сократ (диалектический метод), Пол Фейерабенд (методологический анархизм), Гераклит (все течет)."
      }
    }
  },

  INFJ: {
    type: "INFJ",
    careers: {
      idealRoles: {
        en: ["Depth Psychologist / Jungian Analyst", "Organizational Epistemologist", "Literary Novelist / Essayist", "Social Reform Strategist", "Bioethics Consultant", "Curator of Transformational Experiences"],
        ru: ["Глубинный психолог / Юнгианский аналитик", "Организационный консультант", "Писатель-романист / Эссеист", "Стратег социальных трансформаций", "Эксперт по биоэтике", "Куратор культурных проектов"]
      },
      workEnvironment: {
        en: "Quiet, mission-driven, values-aligned, granting space for deep focus and meaningful human transformation.",
        ru: "Тихая, осмысленная атмосфера с глубокой миссией, пространством для уединения и помощи людям."
      },
      growthAdvice: {
        en: "Protect your nervous system with impenetrable boundaries; you cannot heal the world if your vessel is depleted.",
        ru: "Выстраивайте жесткие личные границы: вы не сможете спасти мир, если ваш собственный ресурс истощен."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ENTP",
          label: { en: "The Visionary (Catalytic Wonder)", ru: "Полемист (Катализатор восторга)" },
          synergy: {
            en: "ENTP brings exhilarating intellectual zest and helps the INFJ manifest private visions openly.",
            ru: "ENTP привносит яркий задор, смех и помогает INFJ открывать свои сокровенные прозрения миру."
          }
        },
        {
          type: "ENFP",
          label: { en: "The Champion (Soul Resonance)", ru: "Вдохновитель (Резонанс душ)" },
          synergy: {
            en: "Harmonious empathy, shared idealism, and mutual appreciation for human potential.",
            ru: "Гармоничная эмпатия, общее стремление к высокому и взаимная душевная чуткость."
          }
        }
      ],
      challengingMatch: {
        type: "ESTP",
        label: { en: "The Persuader", ru: "Делец / Маршал" },
        tension: {
          en: "ESTP's pure sensory immediacy and aggressive realism can feel overwhelming to INFJ's delicate intuitive frequency.",
          ru: "Жесткий напор и приземленный реализм ESTP могут ранить тонкую интуитивную натуру INFJ."
        }
      },
      communicationStyle: {
        en: "Symbolic, deeply empathetic, insightful. Listens beneath the words to comprehend the listener's unexpressed soul.",
        ru: "Символический, глубоко эмпатичный и чуткий. Слышит то, что собеседник не высказал словами."
      },
      intimacyAdvice: {
        en: "Share your own private struggles and inner chaos instead of always playing the saintly listener.",
        ru: "Не будьте только мудрым психологом для партнера — делитесь своими уязвимостями и тревогами."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To elevate human consciousness and bridge the sacred with the rational.",
        ru: "Возвышать человеческое сознание и соединять священное с рациональным."
      },
      idealPhilosophers: {
        en: "Carl Jung (individuation & the shadow), Søren Kierkegaard (existential faith), Arthur Schopenhauer.",
        ru: "Карл Густав Юнг (индивидуация и архетипы), Серен Кьеркегор (экзистенция веры), Артур Шопенгауэр."
      }
    }
  },

  INFP: {
    type: "INFP",
    careers: {
      idealRoles: {
        en: ["Novelist / Screenwriter / Poet", "Clinical Art Therapist", "Humanitarian Advocate", "Environmental Ethicist", "Creative Narrative Designer", "Philosophical Counselor"],
        ru: ["Писатель / Сценарист / Поэт", "Арт-терапевт", "Гуманитарный деятель", "Эколог-этик", "Нарративный дизайнер", "Философский консультант"]
      },
      workEnvironment: {
        en: "Authentic, non-judgmental, creative, aligned with deep personal values, free from rigid corporate politics.",
        ru: "Искренняя, творческая обстановка без токсичной корпоративной политики и фальши."
      },
      growthAdvice: {
        en: "Ground your transcendent ideals in structured small habits; action is the true canvas of authentic morality.",
        ru: "Воплощайте высокие идеалы в ежедневных маленьких шагах: действие — лучший холст для ваших ценностей."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ENFJ",
          label: { en: "The Mentor (Soulful Alchemy)", ru: "Наставник (Душевная алхимия)" },
          synergy: {
            en: "ENFJ provides protective social warmth and structure, honoring the INFP's exquisite moral depth.",
            ru: "ENFJ окружает заботой, вдохновляет на открытость и бережно ценит душевную глубину INFP."
          }
        },
        {
          type: "ENTJ",
          label: { en: "The Commander (Steel & Velvet)", ru: "Командир (Сталь и бархат)" },
          synergy: {
            en: "Powerful complementary bond: ENTJ builds the castle while INFP breathes poetry and warmth into it.",
            ru: "Мощный взаимодополняющий союз: ENTJ строит крепость, а INFP наполняет ее поэзией и смыслом."
          }
        }
      ],
      challengingMatch: {
        type: "ESTJ",
        label: { en: "The Executive", ru: "Администратор" },
        tension: {
          en: "ESTJ's blunt pragmatism and demand for rigid adherence to rules can feel suffocating to INFP's free spirit.",
          ru: "Жесткие инструкции и практицизм ESTJ могут восприниматься INFP как давление на его индивидуальность."
        }
      },
      communicationStyle: {
        en: "Gentle, poetic, authentic, deeply thoughtful. Seeks genuine heart-to-heart resonance without superficiality.",
        ru: "Мягкий, поэтичный, сопереживающий. Ищет душевной искренности и подлинного резонанса сердец."
      },
      intimacyAdvice: {
        en: "Communicate disappointments directly rather than retreating into a silent, melancholic inner sanctuary.",
        ru: "Говорите о своих обидах открыто, не замыкаясь в тихом меланхоличном уединении."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To live in pure alignment with the soul's moral truth and express universal beauty.",
        ru: "Жить в чистом согласии с голосом души и выражать невыразимую красоту бытия."
      },
      idealPhilosophers: {
        en: "Jean-Jacques Rousseau (innate human goodness), Albert Camus (the gentle rebel), Ralph Waldo Emerson.",
        ru: "Жан-Жак Руссо (естественная доброта), Альбер Камю (бунтующий человек), Ральф Уолдо Эмерсон."
      }
    }
  },

  ENFJ: {
    type: "ENFJ",
    careers: {
      idealRoles: {
        en: ["Executive Leadership Coach", "Educational Reformer / Dean", "Human Potential Director", "Public Relations / Diplomatic Envoy", "Transformational Speaker", "Nonprofit Executive Director"],
        ru: ["Коуч топ-лидеров", "Реформатор образования / Декан", "Директор по развитию потенциала", "Дипломатический представитель", "Вдохновляющий оратор", "Руководитель благотворительного фонда"]
      },
      workEnvironment: {
        en: "Collaborative, inspiring, people-centered, where teamwork and collective growth are celebrated.",
        ru: "Вдохновляющая, командная среда с фокусом на развитии людей и поддержке общих ценностей."
      },
      growthAdvice: {
        en: "Learn to step back and allow others to fail and learn their own lessons without feeling personally responsible.",
        ru: "Позволяйте другим совершать свои ошибки и расти на них: не берите на себя груз чужой судьбы."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "INFP",
          label: { en: "The Idealist (Sacred Union)", ru: "Идеалист (Священный союз)" },
          synergy: {
            en: "Pure emotional and moral resonance: ENFJ guides and protects, while INFP offers endless soulful depth.",
            ru: "Трогательный союз: ENFJ оберегает и направляет, а INFP дарит безграничную преданность и глубину."
          }
        },
        {
          type: "INTP",
          label: { en: "The Thinker (Mind & Heart)", ru: "Мыслитель (Разум и сердце)" },
          synergy: {
            en: "Harmonious balance of emotional intelligence and pristine logical clarity.",
            ru: "Прекрасный баланс эмоционального интеллекта и кристально чистой теоретической логики."
          }
        }
      ],
      challengingMatch: {
        type: "ISTP",
        label: { en: "The Craftsman", ru: "Мастер" },
        tension: {
          en: "ENFJ's desire for emotional intimacy and verbal reassurance can clash with ISTP's stoic, solitary detachment.",
          ru: "Потребность ENFJ в душевных разговорах сталкивается со сдержанностью и закрытостью ISTP."
        }
      },
      communicationStyle: {
        en: "Warm, charismatic, uplifting, persuasive. Naturally reads group dynamics and brings people together.",
        ru: "Теплый, харизматичный, вдохновляющий. Чувствует настроение группы и сплачивает коллектив."
      },
      intimacyAdvice: {
        en: "Clearly state your own needs instead of guessing what will please others and hoping they reciprocate.",
        ru: "Говорите о своих личных желаниях прямо, не надеясь, что партнер угадает их телепатически."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To nurture the highest potential in every human being and foster universal community.",
        ru: "Раскрыть высший потенциал в каждом человеке и объединять людей ради созидания."
      },
      idealPhilosophers: {
        en: "Confucius (social harmony and virtue), Martin Buber (I and Thou dialog), Plato (the philosopher educator).",
        ru: "Конфуций (гармония и благородство), Мартин Бубер (диалог «Я и Ты»), Платон (воспитание души)."
      }
    }
  },

  ENFP: {
    type: "ENFP",
    careers: {
      idealRoles: {
        en: ["Creative Strategist / Copywriter", "Documentary Filmmaker", "Human Experience (UX) Catalyst", "Social Entrepreneur", "Futurist / Trend Forecaster", "Cultural Anthropologist & Host"],
        ru: ["Креативный стратег / Копирайтер", "Режиссер документального кино", "UX-исследователь человеческого опыта", "Социальный предприниматель", "Футуролог / Тренд-аналитик", "Культуролог и ведущий проектов"]
      },
      workEnvironment: {
        en: "Dynamic, creative, unstructured, surrounded by curious minds and exciting unexplored frontiers.",
        ru: "Яркая, свободная, нестандартная атмосфера с минимумом рутины и максимумом простора для фантазии."
      },
      growthAdvice: {
        en: "Select two primary passions to master thoroughly; depth multiplies the impact of your expansive breadth.",
        ru: "Выберите 2 ключевые идеи и доведите их до мастерства: глубина стократно усилит масштаб ваших талантов."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "INTJ",
          label: { en: "The Architect (Soulful Magnetism)", ru: "Архитектор (Душевный магнетизм)" },
          synergy: {
            en: "Legendary complementary polarity: ENFP brings zest and joy while INTJ provides solid grounding and strategy.",
            ru: "Легендарный союз: ENFP дарит радость и крылья, а INTJ обеспечивает надежный стратегический фундамент."
          }
        },
        {
          type: "INFJ",
          label: { en: "The Mystic Counselor (Deep Magic)", ru: "Мистик-советник (Магия глубины)" },
          synergy: {
            en: "Effortless intuitive understanding where conversations flow between playful laughter and cosmic depth.",
            ru: "Взаимопонимание с полуслова: диалог мгновенно переходит от веселья к космической философии."
          }
        }
      ],
      challengingMatch: {
        type: "ISTJ",
        label: { en: "The Inspector", ru: "Хранитель порядка" },
        tension: {
          en: "ENFP's spontaneous unpredictability clashes with ISTJ's devotion to strict procedures and fixed routines.",
          ru: "Спонтанность и порывистость ENFP сталкиваются с консерватизмом и строгим распорядком ISTJ."
        }
      },
      communicationStyle: {
        en: "Enthusiastic, playful, metaphorical, deeply validating. Instantly makes people feel seen and celebrated.",
        ru: "Воодушевляющий, живой, образный. Моментально зажигает интерес и вселяет веру в свои силы."
      },
      intimacyAdvice: {
        en: "Stay present through the routine phases of long-term love; true intimacy deepens when the initial novelty settles.",
        ru: "Цените спокойные будни любви: настоящая близость раскрывается, когда спадает первая эйфория новизны."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To celebrate the boundless kaleidoscope of human possibility and spark authentic joy.",
        ru: "Исследовать калейдоскоп человеческих возможностей и зажигать искру радости в сердцах."
      },
      idealPhilosophers: {
        en: "Alan Watts (playful Zen wisdom), Ralph Waldo Emerson (self-reliance), Gaston Bachelard (poetics of space).",
        ru: "Алан Уотс (радостная философия дзена), Ральф Эмерсон (доверие себе), Гастон Башляр (поэтика духа)."
      }
    }
  },

  ISTJ: {
    type: "ISTJ",
    careers: {
      idealRoles: {
        en: ["Chief Financial Officer / Auditor", "Systems Reliability Engineer", "Judicial Magistrate / Legal Compliance", "Supply Chain Director", "Database Administrator", "Civil Infrastructure Engineer"],
        ru: ["Финансовый директор / Главный аудитор", "Инженер надежности систем (SRE)", "Судья / Эксперт по комплаенсу", "Директор по логистике и цепочкам поставок", "Администратор баз данных", "Инженер инфраструктуры"]
      },
      workEnvironment: {
        en: "Structured, stable, well-organized, with clear protocols, high accountability, and measurable standards.",
        ru: "Четкая структура, предсказуемость, понятные регламенты, строгая ответственность и порядок."
      },
      growthAdvice: {
        en: "Embrace experimental changes as calculated risk tests rather than threats to stability.",
        ru: "Воспринимайте инновации как контролируемый эксперимент, а не как угрозу существующему порядку."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ESTP",
          label: { en: "The Dynamo (Action Balance)", ru: "Делец (Энергия действия)" },
          synergy: {
            en: "Complementary grounding: ISTJ provides reliable stability while ESTP injects vigor and real-world courage.",
            ru: "ISTJ обеспечивает надежный тыл и порядок, а ESTP привносит азарт, смелость и живость."
          }
        },
        {
          type: "ISFJ",
          label: { en: "The Protector (Solid Anchor)", ru: "Хранитель (Надежный оплот)" },
          synergy: {
            en: "Shared devotion to family, loyalty, duty, and peaceful domestic harmony.",
            ru: "Глубокая общая верность семейным ценностям, долгу, порядку и взаимной поддержке."
          }
        }
      ],
      challengingMatch: {
        type: "ENFP",
        label: { en: "The Campaigner", ru: "Вдохновитель" },
        tension: {
          en: "Frustration over constant changing of plans, messy schedules, and disregard for standard routines.",
          ru: "Раздражение от постоянной смены планов, непредсказуемости и пренебрежения правилами."
        }
      },
      communicationStyle: {
        en: "Factual, straightforward, reliable, economical. States things exactly as they are without exaggeration.",
        ru: "Точный, немногословный, честный и фактический. Говорит по делу, без преувеличений и лишних эмоций."
      },
      intimacyAdvice: {
        en: "Express love through verbal words and spontaneous gestures, not solely through acts of service.",
        ru: "Выражайте любовь не только делами и заботой, но и теплыми словами, объятиями и вниманием."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To uphold integrity, preserve essential social order, and execute duties with unshakeable fidelity.",
        ru: "Хранить честность, поддерживать надежный порядок и выполнять долг с безупречной верностью."
      },
      idealPhilosophers: {
        en: "Cicero (civic duty & natural law), Thomas Hobbes (order over chaos), Seneca (practical constancy).",
        ru: "Цицерон (гражданский долг и законы), Томас Гоббс (порядок против хаоса), Сенека (стойкость духа)."
      }
    }
  },

  ISFJ: {
    type: "ISFJ",
    careers: {
      idealRoles: {
        en: ["Healthcare Specialist / Clinical Nurse", "Elementary / Special Educator", "Human Resources Care Coordinator", "Archivist / Museum Conservator", "Community Social Worker", "Interior Decorator / Landscape Designer"],
        ru: ["Врач / Специалист здравоохранения", "Педагог / Учитель", "Координатор HR и заботы о сотрудниках", "Архивариус / Реставратор", "Социальный координатор", "Дизайнер интерьеров / Ландшафтный архитектор"]
      },
      workEnvironment: {
        en: "Warm, respectful, harmonious, well-ordered, with a tangible sense of service to others.",
        ru: "Добрая, уважительная, спокойная обстановка с четкими задачами и реальной помощью людям."
      },
      growthAdvice: {
        en: "Saying 'no' to unreasonable demands is a fundamental act of self-respect that preserves your kindness.",
        ru: "Умение говорить твердое «нет» — это необходимая форма заботы о себе, сохраняющая вашу душевную силу."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ESFP",
          label: { en: "The Performer (Joyful Spark)", ru: "Развлекатель (Искры радости)" },
          synergy: {
            en: "ESFP brings laughter, color, and play into the ISFJ's life, while ISFJ offers steadfast security.",
            ru: "ESFP наполняет жизнь ISFJ красками и весельем, а ISFJ дарит преданность и уютный тыл."
          }
        },
        {
          type: "ESTJ",
          label: { en: "The Executive (Rock-Solid Pillar)", ru: "Администратор (Каменная стена)" },
          synergy: {
            en: "Shared respect for hard work, family protection, and traditional values.",
            ru: "Полное единодушие в вопросах семейного благополучия, порядка, честности и верности."
          }
        }
      ],
      challengingMatch: {
        type: "ENTP",
        label: { en: "The Debater", ru: "Полемист" },
        tension: {
          en: "ENTP's love of provocative debate and constant upheaval of norms can deeply upset ISFJ's peace.",
          ru: "Склонность ENTP к спорам ради спора и ломке традиций ранит стремление ISFJ к душевному миру."
        }
      },
      communicationStyle: {
        en: "Gentle, supportive, polite, attentive to details. Remembers personal preferences and history.",
        ru: "Мягкий, деликатный, заботливый. Помнит каждую важную мелочь о близких людях."
      },
      intimacyAdvice: {
        en: "Voice your own exhaustion before resentment builds; your loved ones want to care for you in return.",
        ru: "Говорите об усталости вовремя, не допуская обид: близкие искренне хотят заботиться о вас в ответ."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To protect the vulnerable, preserve cherished traditions, and quietly enrich the human garden.",
        ru: "Оберегать близких, хранить добрые традиции и тихо взращивать тепло в окружающем мире."
      },
      idealPhilosophers: {
        en: "Lev Tolstoy (the philosophy of moral care & humility), St. Francis of Assisi, John Locke.",
        ru: "Лев Толстой (этика ненасилия и служения), Франциск Ассизский, Джон Локк."
      }
    }
  },

  ESTJ: {
    type: "ESTJ",
    careers: {
      idealRoles: {
        en: ["Operations Director (COO)", "Senior Construction Project Manager", "Judicial Officer / Law Enforcement Commander", "Hospital Administrator", "Military Officer / Logistics Commander", "Financial Risk Controller"],
        ru: ["Операционный директор (COO)", "Руководитель крупных строительных проектов", "Судья / Руководитель силовых ведомств", "Главврач / Администратор клиники", "Офицер логистики и управления", "Контролер финансовых рисков"]
      },
      workEnvironment: {
        en: "High-standard, orderly, results-driven, with clear chains of command and unambiguous objectives.",
        ru: "Высокая дисциплина, четкая субординация, измеримые цели и строгая ответственность за результат."
      },
      growthAdvice: {
        en: "Value creative deviations; some breakthroughs occur only when standard procedures are questioned.",
        ru: "Не отсекайте нестандартные решения: прорывные инновации часто рождаются вне стандартных инструкций."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ISFP",
          label: { en: "The Artist (Soft Horizon)", ru: "Художник (Мягкие горизонты)" },
          synergy: {
            en: "ISFP brings gentle emotional tenderness and aesthetic appreciation, softening ESTJ's stern rigor.",
            ru: "ISFP привносит в жизнь ESTJ душевность, чуткость и искусство, смягчая его строгий характер."
          }
        },
        {
          type: "ISTJ",
          label: { en: "The Inspector (Order & Strength)", ru: "Хранитель (Порядок и сила)" },
          synergy: {
            en: "Unshakeable mutual respect for integrity, competence, and structured lifestyle.",
            ru: "Несокрушимое взаимное доверие, основанное на честности, дисциплине и верности слову."
          }
        }
      ],
      challengingMatch: {
        type: "INFP",
        label: { en: "The Mediator", ru: "Идеалист" },
        tension: {
          en: "ESTJ's blunt directive commands can severely wound the deeply sensitive, values-driven INFP.",
          ru: "Командный тон и требовательность ESTJ могут ранить тонкую и ранимую душу INFP."
        }
      },
      communicationStyle: {
        en: "Clear, authoritative, practical, punctual. Focuses on timelines, deliverables, and concrete facts.",
        ru: "Уверенный, четкий, авторитетный и пунктуальный. Говорит на языке фактов, сроков и задач."
      },
      intimacyAdvice: {
        en: "Acknowledge feelings as valid data points, even when they cannot be reduced to a numerical metric.",
        ru: "Признавайте чувства партнера как важную реальность, даже если их нельзя измерить цифрами."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To organize community efforts, uphold the rule of law, and build tangible security.",
        ru: "Организовывать людей, поддерживать порядок и созидать осязаемую надежность."
      },
      idealPhilosophers: {
        en: "Aristotle (virtue ethics & governance), Francis Bacon (practical empirical mastery), George Washington.",
        ru: "Аристотель (этика добродетелей и полиса), Фрэнсис Бэкон (знание — сила), Джордж Вашингтон."
      }
    }
  },

  ESFJ: {
    type: "ESFJ",
    careers: {
      idealRoles: {
        en: ["Head of Human Resources / People Officer", "Hospital Hospitality Director", "Corporate Event Producer", "Public Relations Ambassador", "Executive Community Lead", "Family Medicine Physician"],
        ru: ["Директор по персоналу (Chief People Officer)", "Директор клиентского сервиса", "Генеральный продюсер масштабных событий", "PR-директор и бренд-амбассадор", "Лидер общественных программ", "Семейный врач"]
      },
      workEnvironment: {
        en: "Warm, socially connected, vibrant, service-oriented, with high camaraderie and shared celebrations.",
        ru: "Дружная, теплая, сплоченная команда с культурой взаимопомощи и совместных праздников."
      },
      growthAdvice: {
        en: "Decouple your self-worth from external social approval; your intrinsic value is unconditional.",
        ru: "Не ставьте свою самооценку в зависимость от чужих похвал: ваша ценность безусловна сама по себе."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ISFP",
          label: { en: "The Artist (Gentle Symphony)", ru: "Художник (Нежная симфония)" },
          synergy: {
            en: "Mutual kindness and sensory celebration of life, food, and authentic emotional warmth.",
            ru: "Взаимная нежность, искренность и умение вместе наслаждаться уютом, красотой и моментами жизни."
          }
        },
        {
          type: "ISFJ",
          label: { en: "The Defender (Warm Hearth)", ru: "Хранитель (Теплый очаг)" },
          synergy: {
            en: "Shared dedication to home, family hospitality, and unwavering loyalty.",
            ru: "Общая любовь к семейному уюту, гостеприимству, верности и взаимной заботе."
          }
        }
      ],
      challengingMatch: {
        type: "INTP",
        label: { en: "The Logician", ru: "Логик" },
        tension: {
          en: "ESFJ's emphasis on social etiquette and emotional connection feels suffocating to INTP's solitary detachment.",
          ru: "Потребность ESFJ в светских ритуалах и эмоциях утомляет стремление INTP к уединению и сухой логике."
        }
      },
      communicationStyle: {
        en: "Warm, animated, welcoming, inclusive. Strives to make everyone feel valued, comfortable, and heard.",
        ru: "Сердечный, эмоциональный, радушный. Создает атмосферу душевного тепла для каждого собеседника."
      },
      intimacyAdvice: {
        en: "Allow quiet space for your partner to process thoughts without assuming silence means they are upset.",
        ru: "Давайте партнеру время помолчать: тишина не означает, что он на вас обижен."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To weave bonds of genuine belonging and sustain the emotional fabric of human society.",
        ru: "Укреплять узы любви и взаимопомощи, сохраняя тепло и единство между людьми."
      },
      idealPhilosophers: {
        en: "Desiderius Erasmus (humanist tolerance), David Hume (the primacy of moral sentiments), Nel Noddings (ethics of care).",
        ru: "Эразм Роттердамский (гуманизм и доброта), Дэвид Юм (этика сочувствия), Нел Ноддингс (этика заботы)."
      }
    }
  },

  ISTP: {
    type: "ISTP",
    careers: {
      idealRoles: {
        en: ["Aerospace / Mechanical Engineer", "Emergency Trauma Surgeon", "Forensic Data Analyst", "Extreme Sports / Precision Pilot", "Robotics Hardware Specialist", "Master Instrument Maker"],
        ru: ["Инженер аэрокосмических систем / Механик", "Хирург экстренной медицины", "Эксперт компьютерной криминалистики", "Пилот прецизионной авиации", "Инженер робототехники", "Мастер точных инструментов"]
      },
      workEnvironment: {
        en: "Hands-on, autonomous, problem-solving, free from unnecessary meetings or corporate emotional drama.",
        ru: "Прикладная, техническая работа с высокой автономией, без пустых совещаний и корпоративных интриг."
      },
      growthAdvice: {
        en: "Explain your rationale to teammates before executing; silent mastery can leave collaborators confused.",
        ru: "Объясняйте свои действия коллегам: ваше молчаливое мастерство порой оставляет команду в неведении."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ESTJ",
          label: { en: "The Executive (Pragmatic Dynamo)", ru: "Администратор (Прагматичный союз)" },
          synergy: {
            en: "Strong operational synergy where each respects the other's competence and no-nonsense logic.",
            ru: "Отличный деловой и жизненный союз: оба уважают профессионализм, прямоту и честный труд."
          }
        },
        {
          type: "ESFP",
          label: { en: "The Performer (Spontaneous Adventure)", ru: "Развлекатель (Драйв и приключения)" },
          synergy: {
            en: "Shared love for sensory thrill, outdoor exploration, and living purely in the moment.",
            ru: "Общая страсть к спорту, поездкам, ярким ощущениям и жизни «здесь и сейчас»."
          }
        }
      ],
      challengingMatch: {
        type: "ENFJ",
        label: { en: "The Protagonist", ru: "Наставник" },
        tension: {
          en: "ENFJ's emotional expectations and desire to orchestrate the relationship feels restrictive to ISTP.",
          ru: "Попытки ENFJ контролировать эмоции и навязывать задушевные беседы давят на свободу ISTP."
        }
      },
      communicationStyle: {
        en: "Minimalist, calm, dry-witted, highly practical. Prefers showing solutions through action rather than debate.",
        ru: "Лаконичный, спокойный, ироничный и точный. Предпочитает показать решение на деле, а не спорить."
      },
      intimacyAdvice: {
        en: "A little vulnerability does not compromise your autonomy; let your partner into your quiet thoughts.",
        ru: "Искренность не отнимает вашу свободу: делитесь тем, что у вас на душе, хотя бы изредка."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To master the mechanics of reality through direct sensory experience and technical precision.",
        ru: "Постигать законы физического мира через прямое действие, эксперимент и точность ремесла."
      },
      idealPhilosophers: {
        en: "Zeno of Citium (stoic equanimity), Bruce Lee (fluidity of form & action), Epictetus (focus on what is in your control).",
        ru: "Зенон Китийский (стоическое хладнокровие), Брюс Ли (текучесть формы), Эпиктет (фокус на контролируемом)."
      }
    }
  },

  ISFP: {
    type: "ISFP",
    careers: {
      idealRoles: {
        en: ["Fine Artist / Ceramicist", "Sound Designer / Music Producer", "Fashion / Haute Couture Designer", "Wildlife Conservationist / Botanist", "Chef / Gastronomy Artist", "Physical Therapist / Somatic Healer"],
        ru: ["Художник / Скульптор", "Саунд-дизайнер / Музыкальный продюсер", "Дизайнер одежды и стиля", "Биолог-натуралист / Ботаник", "Шеф-повар авторской кухни", "Телесно-ориентированный терапевт"]
      },
      workEnvironment: {
        en: "Aesthetically pleasing, tranquil, flexible, allowing personal artistic expression without corporate rigidity.",
        ru: "Красивая, свободная, гармоничная атмосфера без жестких рамок и психологического давления."
      },
      growthAdvice: {
        en: "Do not shy away from constructive business strategy; sound structures protect your artistic independence.",
        ru: "Не бойтесь деловой стратегии и финансов: грамотная организация защитит вашу творческую свободу."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ESFJ",
          label: { en: "The Provider (Gentle Warmth)", ru: "Заботящийся (Нежное тепло)" },
          synergy: {
            en: "ESFJ provides a loving, secure domestic harbor where the ISFP's creative gifts can blossom.",
            ru: "ESFJ окружает заботой и уютом, позволяя творческому дару ISFP раскрыться в безопасности."
          }
        },
        {
          type: "ESTJ",
          label: { en: "The Executive (Anchor & Muse)", ru: "Администратор (Опора и муза)" },
          synergy: {
            en: "ESTJ provides stable protection and logistics while ISFP infuses life with genuine beauty and gentleness.",
            ru: "ESTJ берет на себя внешние бури и организацию, а ISFP наполняет дом красотой и покоем."
          }
        }
      ],
      challengingMatch: {
        type: "ENTJ",
        label: { en: "The Commander", ru: "Командир" },
        tension: {
          en: "ENTJ's relentless drive for optimization and critical efficiency can feel harsh to the tender ISFP.",
          ru: "Напор, жесткая критика и стремление ENTJ всё подчинить планам могут ранить тонкую натуру ISFP."
        }
      },
      communicationStyle: {
        en: "Quiet, observant, artistic, deeply genuine. Expresses emotion through gestures, gifts, and presence.",
        ru: "Тихий, чуткий, искренний и выразительный. Выражает чувства через поступки, стиль и подарки."
      },
      intimacyAdvice: {
        en: "Speak up about what you need in words; do not assume your partner can always decode your subtle hints.",
        ru: "Говорите о своих желаниях словами: партнер не всегда может разгадать тонкие намеки."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To embody living aesthetic grace, honor nature, and celebrate unrepeatable moments of beauty.",
        ru: "Воплощать живую красоту, жить в согласии с природой и ценить неповторимый миг «сейчас»."
      },
      idealPhilosophers: {
        en: "Henry David Thoreau (living deliberately in nature), Bashō (poetics of the moment), Maurice Merleau-Ponty (sensory phenomenology).",
        ru: "Генри Дэвид Торо («Уолден, или Жизнь в лесу»), Мацуо Басё (хайку момента), Мерло-Понти (феноменология чувств)."
      }
    }
  },

  ESTP: {
    type: "ESTP",
    careers: {
      idealRoles: {
        en: ["Crisis Management Executive", "Commercial Real Estate Negotiator", "Angel Investor / High-Frequency Trader", "Air Force / Test Pilot", "Professional Athletic Coach", "Investigative Field Reporter"],
        ru: ["Антикризисный управляющий", "Ведущий переговорщик по недвижимости", "Венчурный инвестор / Трейдер", "Пилот-испытатель", "Тренер профессионального спорта", "Специальный репортажный журналист"]
      },
      workEnvironment: {
        en: "Fast-paced, action-oriented, competitive, with real-time feedback and high financial/tactical stakes.",
        ru: "Динамичная, адреналиновая обстановка с живыми переговорами, свободой маневра и высоким доходом."
      },
      growthAdvice: {
        en: "Practice pausing before high-risk leaps to map downstream secondary consequences.",
        ru: "Делайте секундную паузу перед рискованным шагом: просчитывайте отдаленные последствия."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ISFJ",
          label: { en: "The Defender (Calm Anchor)", ru: "Хранитель (Тихая гавань)" },
          synergy: {
            en: "ISFJ offers loving tranquility and grounding, while ESTP brings thrill, laughter, and bold protection.",
            ru: "ISFJ дарит спокойствие, уют и верность, а ESTP наполняет жизнь драйвом и надежной защитой."
          }
        },
        {
          type: "ISTJ",
          label: { en: "The Inspector (Dynamic Team)", ru: "Инспектор (Слаженная команда)" },
          synergy: {
            en: "Mutual respect for practical reality, hard work, and tangible results.",
            ru: "Взаимное уважение за трезвый ум, реализм, честность и умение добиваться целей."
          }
        }
      ],
      challengingMatch: {
        type: "INFJ",
        label: { en: "The Advocate", ru: "Мистик / Гуманист" },
        tension: {
          en: "ESTP's focus on raw physical reality can feel ungrounded or insensitive to INFJ's abstract mysticism.",
          ru: "Приземленный прагматизм ESTP может показаться чуждым тонкой метафизической натуре INFJ."
        }
      },
      communicationStyle: {
        en: "Vibrant, witty, bold, energetic. Tells captivating stories and negotiates deals with effortless charisma.",
        ru: "Живой, остроумный, напористый и харизматичный. Блестяще держит внимание и ведет переговоры."
      },
      intimacyAdvice: {
        en: "Show your partner that they matter more than the next adrenaline rush or spontaneous adventure.",
        ru: "Давайте партнеру почувствовать, что он для вас важнее любых сиюминутных авантюр и тусовок."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To conquer tangible challenges, seize fleeting opportunities, and taste life at full throttle.",
        ru: "Побеждать в реальной борьбе, ловить шансы на лету и жить на полной скорости."
      },
      idealPhilosophers: {
        en: "Theodore Roosevelt (the arena of action), Friedrich Nietzsche (embracing vitality and fate), Epicurus (wise sensory joy).",
        ru: "Теодор Рузвельт (человек на арене), Фридрих Ницше (жизненная сила и amor fati), Эпикур (радость бытия)."
      }
    }
  },

  ESFP: {
    type: "ESFP",
    careers: {
      idealRoles: {
        en: ["Performing Artist / Actor", "Event Emcee / Television Host", "Luxury Brand Ambassador", "Travel / Hospitality Creator", "Culinary Entertainer", "Fitness & Dance Master Instructor"],
        ru: ["Артист театра и кино / Шоумен", "Телеведущий / Конферансье", "Амбассадор премиум-брендов", "Создатель тревел-шоу и отелей", "Мастер гастрономических шоу", "Хореограф и мастер фитнеса"]
      },
      workEnvironment: {
        en: "Lively, expressive, social, sensory-rich, with ample room for spontaneous charm and celebration.",
        ru: "Праздничная, творческая, открытая среда с живым общением, сценой и положительными эмоциями."
      },
      growthAdvice: {
        en: "Develop long-range financial and career roadmaps so your radiant spontaneous joy is safeguarded.",
        ru: "Формируйте финансовую подушку и долгосрочные цели: это защитит вашу легкость и радость."
      }
    },
    relationships: {
      idealMatches: [
        {
          type: "ISTJ",
          label: { en: "The Inspector (Rock & Fire)", ru: "Инспектор (Скала и пламя)" },
          synergy: {
            en: "ISTJ brings steady order and financial prudence, while ESFP melts rigidity with warmth and laughter.",
            ru: "ISTJ приносит стабильность и порядок, а ESFP растапливает строгость смехом и нежностью."
          }
        },
        {
          type: "ISFP",
          label: { en: "The Artist (Kinship of Joy)", ru: "Художник (Родство сердец)" },
          synergy: {
            en: "Shared passion for aesthetics, music, culinary delight, and spontaneous living.",
            ru: "Общая любовь к стилю, музыке, вкусной еде, путешествиям и ярким моментам."
          }
        }
      ],
      challengingMatch: {
        type: "INTP",
        label: { en: "The Logician", ru: "Логик" },
        tension: {
          en: "ESFP craves lively social engagement while INTP retreats into solitary abstract theorizing.",
          ru: "Потребность ESFP в живом общении и эмоциях сталкивается с замкнутостью и сухой теорией INTP."
        }
      },
      communicationStyle: {
        en: "Warm, expressive, spontaneous, humorous. Lights up any room and makes everyone feel included.",
        ru: "Эмоциональный, искрометный, открытый. Зажигает улыбки и создает атмосферу праздника."
      },
      intimacyAdvice: {
        en: "Don't avoid serious conversations; resolving difficult topics together builds deep, unshakeable trust.",
        ru: "Не бойтесь серьезных и трудных разговоров: их преодоление рождает настоящую душевную крепость."
      }
    },
    philosophy: {
      existentialMotive: {
        en: "To celebrate existence as a luminous festival of shared joy and sensory wonder.",
        ru: "Праздновать жизнь как яркий фестиваль радости, красоты и душевного единения."
      },
      idealPhilosophers: {
        en: "Zorba the Greek (ecstatic love of life), Henri Bergson (the vital spark of elan vital), Oscar Wilde (the aesthetic art of living).",
        ru: "Никос Казандзакис («Грек Зорба»), Анри Бергсон (жизненный порыв), Оскар Уайльд (эстетизм жизни)."
      }
    }
  }
};

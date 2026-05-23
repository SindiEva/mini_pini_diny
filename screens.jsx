// ============================================================
// Спортивный марафон — Screen components
// Главная · Тренировки · Питание · Общение · Профиль
// ============================================================

const { useState: useS, useEffect: useE, useRef: useR } = React;

// ─── App header (greeting row, used on most screens) ────────────────────
const AppHeader = ({ greeting, name, onBell, day, total = 21 }) => (
  <div style={{ padding: '14px 20px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar name={name} size={42} tone="blush" />
      <div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.02em' }}>{greeting}</div>
        <div style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 700, marginTop: 1 }}>{name}</div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        height: 36, padding: '0 12px', borderRadius: 999,
        background: 'var(--surface)', border: '1px solid var(--line)',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 12, color: 'var(--ink-2)', fontWeight: 600,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blush)' }}/>
        День {day} из {total}
      </div>
      <button className="tap" onClick={onBell} style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'var(--surface)', border: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <Icon name="bell" size={18} color="var(--ink-2)"/>
        <span style={{
          position: 'absolute', top: 8, right: 9, width: 7, height: 7,
          background: 'var(--blush)', borderRadius: '50%', border: '1.5px solid var(--surface)',
        }}/>
      </button>
    </div>
  </div>
);


// ============================================================
// HOME SCREEN — Главная
// ============================================================
const HomeScreen = ({ day, onNav, onShowToast, onOpenOnboarding, onOpenNotif }) => {
  return (
    <div className="screen-enter" style={{ paddingBottom: 110 }}>
      <AppHeader greeting="Доброе утро" name="Анна" day={day} onBell={onOpenNotif}/>

      {/* Welcome / motivational */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Сегодня • {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
        </div>
        <h1 className="text-serif" style={{
          fontSize: 36, lineHeight: 1.08, margin: '8px 0 0', color: 'var(--ink)', letterSpacing: '-0.01em',
        }}>
          Маленькие шаги —<br/>
          <span className="text-serif-it" style={{ color: 'var(--blush)' }}>большие перемены.</span>
        </h1>
      </div>

      {/* Progress hero card */}
      <div style={{ padding: '22px 20px 0' }}>
        <Card padding={20} style={{
          background: 'linear-gradient(140deg, #FBEDE2 0%, #F5EAD9 55%, #ECF1E4 100%)',
          border: '1px solid rgba(232,184,156,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <RingProgress value={day / 21} size={92} stroke={9} color="var(--ink)" track="rgba(61,51,42,0.08)">
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{day}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-2)', letterSpacing: '0.06em', marginTop: 2 }}>ИЗ 21</div>
            </RingProgress>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>Прогресс марафона</div>
              <div className="text-serif" style={{ fontSize: 20, lineHeight: 1.15, marginTop: 2, color: 'var(--ink)' }}>
                Третья неделя — самая важная
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, color: 'var(--ink-2)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="flame" size={13} color="var(--blush)"/> 14 дней подряд
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="sparkle" size={13} color="var(--sage)"/> -2,1 кг
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's workout — hero */}
      <SectionHeader title="Сегодняшняя тренировка" hint="20 минут · мягкая нагрузка" action="Заменить"/>
      <div style={{ padding: '0 20px' }}>
        <Card padding={0} radius={26} style={{ overflow: 'hidden' }}>
          <ImgPH tone="blush" h={172} radius={0} dim>
            <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{
                  height: 28, padding: '0 12px', borderRadius: 999,
                  background: 'rgba(255,252,248,0.85)', backdropFilter: 'blur(6px)',
                  fontSize: 11, fontWeight: 700, color: 'var(--ink)',
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)' }}/>
                  Уровень 2 — мягкий
                </div>
                <button onClick={() => onShowToast('Добавлено в избранное ♡')} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,252,248,0.85)', backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="heart" size={16} color="var(--rose)"/>
                </button>
              </div>
              <div>
                <div className="text-serif" style={{ fontSize: 26, color: '#FFFCF8', lineHeight: 1.1, letterSpacing: '0.005em' }}>
                  Утренняя растяжка
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,252,248,0.85)', marginTop: 4, display: 'flex', gap: 10 }}>
                  <span>с Мариной</span>·<span>20 мин</span>·<span>спокойный темп</span>
                </div>
              </div>
            </div>
          </ImgPH>
          <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5, paddingRight: 12 }}>
              Снимает напряжение в спине и пояснице. Идеально для начала дня.
            </div>
            <Pill variant="primary" size="md" leading={<Icon name="play" size={14}/>} onClick={() => onShowToast('Тренировка начинается…')}>Начать</Pill>
          </div>
        </Card>
      </div>

      {/* Quick stats / nutrition tip row */}
      <SectionHeader title="Сегодня тебе важно"/>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card padding={16} radius={22} style={{ background: 'linear-gradient(160deg, #ECF1E4, #DBE5D0)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Icon name="water" size={22} color="#7A8E66"/>
            <span style={{ fontSize: 11, color: 'var(--ink-2)', fontWeight: 600 }}>5 / 8</span>
          </div>
          <div style={{ marginTop: 22, fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>Вода</div>
          <div className="text-serif" style={{ fontSize: 22, color: 'var(--ink)', marginTop: 2 }}>1,2 л</div>
          <div style={{ marginTop: 12 }}>
            <Bar value={5/8} color="#7A8E66" track="rgba(122,142,102,0.18)"/>
          </div>
        </Card>
        <Card padding={16} radius={22} style={{ background: 'linear-gradient(160deg, #FBEDE2, #F4D9C8)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Icon name="apple" size={22} color="#B07349"/>
            <span style={{ fontSize: 11, color: 'var(--ink-2)', fontWeight: 600 }}>2 / 4</span>
          </div>
          <div style={{ marginTop: 22, fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>Приёмы пищи</div>
          <div className="text-serif" style={{ fontSize: 22, color: 'var(--ink)', marginTop: 2 }}>Завтрак ✓</div>
          <div style={{ marginTop: 12 }}>
            <Bar value={2/4} color="#B07349" track="rgba(176,115,73,0.18)"/>
          </div>
        </Card>
      </div>

      {/* Nutrition tip */}
      <SectionHeader title="Совет на день"/>
      <div style={{ padding: '0 20px' }}>
        <Card padding={18} radius={24} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: 'linear-gradient(135deg, #FAEBC0, #F0DCA8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name="leaf" size={24} color="#8B6F2E"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Питание</div>
            <div className="text-serif" style={{ fontSize: 18, lineHeight: 1.25, color: 'var(--ink)', marginTop: 4 }}>
              Добавь горсть зелени к каждому приёму пищи
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.5 }}>
              Это простой способ увеличить клетчатку без подсчётов и стресса.
            </div>
            <button onClick={() => onNav('nutrition')} style={{ marginTop: 10, fontSize: 13, color: 'var(--ink)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Читать дальше <Icon name="arrowRight" size={14}/>
            </button>
          </div>
        </Card>
      </div>

      {/* Quick access */}
      <SectionHeader title="Что дальше?" hint="Подобрано для третьей недели"/>
      <div style={{ padding: '0 20px 4px', display: 'flex', gap: 12, overflowX: 'auto' }} className="no-scrollbar">
        {[
          { t: 'Как работает марафон', sub: '3 мин чтения', tone: 'lavender', icon: 'book', onClick: onOpenOnboarding },
          { t: 'Медитация перед сном', sub: '8 мин · аудио', tone: 'rose', icon: 'moon' },
          { t: 'Чек-лист недели', sub: '6 задач', tone: 'sage', icon: 'check' },
          { t: 'Сообщество', sub: 'Поддержка 24/7', tone: 'butter', icon: 'chat', onClick: () => onNav('community') },
        ].map((q, i) => (
          <button key={i} onClick={q.onClick} className="tap" style={{
            flexShrink: 0, width: 168, textAlign: 'left',
            background: 'var(--surface)', borderRadius: 22, padding: 16,
            border: '1px solid var(--line)', boxShadow: 'var(--shadow-1)',
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 14,
              background: q.tone === 'lavender' ? 'var(--lavender-tint)' : q.tone === 'rose' ? 'var(--rose-tint)' : q.tone === 'sage' ? 'var(--sage-tint)' : 'var(--butter-tint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={q.icon} size={20} color={q.tone === 'lavender' ? '#8579A1' : q.tone === 'rose' ? '#A65F5F' : q.tone === 'sage' ? '#6E8A57' : '#8E7032'}/>
            </div>
            <div className="text-serif" style={{ fontSize: 16, lineHeight: 1.2, marginTop: 14, color: 'var(--ink)' }}>{q.t}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{q.sub}</div>
          </button>
        ))}
      </div>

      {/* How marathon works — onboarding cards always visible */}
      <SectionHeader title="Как устроен марафон" action="Подробнее"/>
      <div style={{ padding: '0 20px' }}>
        <Card padding={20} radius={26}>
          {[
            { n: '01', t: 'Каждый день — мягкая тренировка', sub: 'От 15 до 30 минут. Без надрыва.' },
            { n: '02', t: 'Простое питание без подсчётов', sub: 'PDF-планы и рецепты на каждую неделю.' },
            { n: '03', t: 'Поддержка сообщества', sub: 'Чат с девочками и наставницей.' },
          ].map((s, i, a) => (
            <div key={s.n} style={{
              display: 'flex', gap: 14, padding: '14px 0',
              borderBottom: i < a.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div className="text-serif-it" style={{ fontSize: 22, color: 'var(--blush)', minWidth: 36 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 600 }}>{s.t}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 3, lineHeight: 1.4 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Premium hint */}
      <div style={{ padding: '24px 20px 8px' }}>
        <Card padding={18} radius={24} style={{
          background: 'linear-gradient(135deg, #3D332A 0%, #5C4D3F 100%)',
          border: 'none', color: '#FFFCF8',
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14,
              background: 'rgba(232,184,156,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="crown" size={22} color="#E8B89C"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#E8B89C', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Premium</div>
              <div className="text-serif" style={{ fontSize: 18, marginTop: 2, color: '#FFFCF8' }}>Откройте все 21 день</div>
              <div style={{ fontSize: 11, color: 'rgba(255,252,248,0.7)', marginTop: 4 }}>+ персональный план питания</div>
            </div>
            <Icon name="chevron" size={18} color="rgba(255,252,248,0.6)"/>
          </div>
        </Card>
      </div>
    </div>
  );
};


// ============================================================
// WORKOUTS SCREEN — Тренировки
// ============================================================
const WorkoutsScreen = ({ onShowToast }) => {
  const [filter, setFilter] = useS('Все');
  const [level, setLevel] = useS('Все уровни');

  const cats = ['Все', 'Йога', 'Растяжка', 'Кардио', 'Сила', 'Танцы', 'Дыхание'];
  const workouts = [
    { t: 'Утренняя растяжка', author: 'Марина', dur: 20, lvl: 'Мягкий', tone: 'blush', cat: 'Растяжка', kcal: 80, locked: false },
    { t: 'Йога для спины', author: 'Лена', dur: 25, lvl: 'Мягкий', tone: 'sage', cat: 'Йога', kcal: 110, locked: false },
    { t: 'Танцевальное кардио', author: 'Аня', dur: 30, lvl: 'Средний', tone: 'rose', cat: 'Танцы', kcal: 220, locked: true },
    { t: 'Поясница и осанка', author: 'Марина', dur: 18, lvl: 'Мягкий', tone: 'lavender', cat: 'Растяжка', kcal: 70, locked: false },
    { t: 'Сила без боли', author: 'Катя', dur: 35, lvl: 'Средний', tone: 'butter', cat: 'Сила', kcal: 240, locked: true },
    { t: 'Дыхание перед сном', author: 'Марина', dur: 10, lvl: 'Мягкий', tone: 'cream', cat: 'Дыхание', kcal: 30, locked: false },
  ];

  const filtered = filter === 'Все' ? workouts : workouts.filter(w => w.cat === filter);

  return (
    <div className="screen-enter" style={{ paddingBottom: 110 }}>
      {/* Title */}
      <div style={{ padding: '18px 20px 8px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Библиотека</div>
        <h1 className="text-serif" style={{ fontSize: 34, lineHeight: 1.05, margin: '6px 0 0', color: 'var(--ink)' }}>
          Тренировки <span className="text-serif-it" style={{ color: 'var(--blush)' }}>для тебя</span>
        </h1>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>
          Без давления. Выбирай по настроению, а не по расписанию.
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '16px 20px 0', display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1, height: 46, borderRadius: 999,
          background: 'var(--surface)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px',
        }}>
          <Icon name="search" size={18} color="var(--ink-3)"/>
          <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>Найти тренировку</span>
        </div>
        <button className="tap" style={{
          width: 46, height: 46, borderRadius: '50%',
          background: 'var(--ink)', color: '#FFFCF8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-1)',
        }}>
          <Icon name="filter" size={20}/>
        </button>
      </div>

      {/* Category chips */}
      <div style={{ padding: '18px 20px 0', display: 'flex', gap: 8, overflowX: 'auto' }} className="no-scrollbar">
        {cats.map(c => <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Chip>)}
      </div>

      {/* Level sub-chips */}
      <div style={{ padding: '12px 20px 0', display: 'flex', gap: 8, overflowX: 'auto' }} className="no-scrollbar">
        {['Все уровни', 'Мягкий', 'Средний', 'Высокий'].map(l => (
          <button key={l} onClick={() => setLevel(l)} className="tap" style={{
            height: 30, padding: '0 12px', borderRadius: 999,
            background: level === l ? 'var(--blush-tint)' : 'transparent',
            color: level === l ? 'var(--ink)' : 'var(--ink-2)',
            border: level === l ? '1px solid rgba(232,184,156,0.5)' : '1px solid transparent',
            fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
          }}>{l}</button>
        ))}
      </div>

      {/* Featured banner */}
      <div style={{ padding: '18px 20px 0' }}>
        <Card padding={0} radius={24} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <div style={{ flex: 1, padding: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blush)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Новый курс</div>
              <div className="text-serif" style={{ fontSize: 22, lineHeight: 1.1, color: 'var(--ink)', marginTop: 6 }}>
                14 дней<br/>мягкой йоги
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 8 }}>с Леной · от 15 минут</div>
              <Pill variant="primary" size="sm" style={{ marginTop: 14 }}>Начать курс</Pill>
            </div>
            <ImgPH tone="sage" h="auto" radius={0} style={{ width: 130, height: 'auto' }}/>
          </div>
        </Card>
      </div>

      {/* Workouts grid */}
      <SectionHeader title={filter === 'Все' ? 'Все тренировки' : filter} hint={`${filtered.length} занятий`}/>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {filtered.map((w, i) => (
          <div key={i} className="tap" onClick={() => w.locked ? onShowToast('Откройте Premium ✨') : onShowToast('Тренировка начинается…')}>
            <ImgPH tone={w.tone} h={148} radius={20}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{
                    height: 22, padding: '0 8px', borderRadius: 999,
                    background: 'rgba(255,252,248,0.9)', backdropFilter: 'blur(6px)',
                    fontSize: 10, fontWeight: 700, color: 'var(--ink)',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    <Icon name="clock" size={10}/> {w.dur} мин
                  </span>
                  {w.locked && (
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'rgba(255,252,248,0.9)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}><Icon name="lock" size={11} color="var(--ink)"/></span>
                  )}
                </div>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(255,252,248,0.92)', backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  alignSelf: 'flex-start',
                  boxShadow: '0 4px 12px rgba(61,51,42,0.12)',
                }}>
                  <Icon name="play" size={14} color="var(--ink)"/>
                </div>
              </div>
            </ImgPH>
            <div style={{ padding: '10px 4px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <span>{w.cat}</span><span>·</span>
                <span style={{ color: w.lvl === 'Мягкий' ? '#7A8E66' : w.lvl === 'Средний' ? 'var(--gold)' : 'var(--rose)' }}>{w.lvl}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginTop: 4, lineHeight: 1.25 }}>{w.t}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>с {w.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ============================================================
// NUTRITION SCREEN — Питание
// ============================================================
const NutritionScreen = ({ onShowToast }) => {
  const programs = [
    { t: 'Питание на 21 день', sub: 'Базовый план', pages: 48, tone: 'blush', icon: 'apple', col: '#B07349', new: true },
    { t: 'Завтраки за 10 минут', sub: '14 рецептов', pages: 28, tone: 'sage', icon: 'cup', col: '#6E8A57' },
    { t: 'Без вечернего жора', sub: 'Гид по вечеру', pages: 16, tone: 'lavender', icon: 'moon', col: '#8579A1' },
    { t: 'Сладкое без вины', sub: '12 десертов', pages: 22, tone: 'rose', icon: 'sparkle', col: '#A65F5F' },
  ];
  const articles = [
    { t: 'Почему важна клетчатка', read: 4, tone: 'sage' },
    { t: 'Вода: сколько и когда', read: 3, tone: 'lavender' },
    { t: 'Углеводы — не враги', read: 6, tone: 'butter' },
  ];
  const meals = [
    { time: 'Завтрак', t: 'Овсянка с ягодами и орехами', kcal: 320, status: 'done' },
    { time: 'Обед', t: 'Тёплый салат с куриной грудкой', kcal: 410, status: 'next' },
    { time: 'Перекус', t: 'Греческий йогурт, мёд', kcal: 180, status: 'plan' },
    { time: 'Ужин', t: 'Запечённая рыба с овощами', kcal: 360, status: 'plan' },
  ];

  return (
    <div className="screen-enter" style={{ paddingBottom: 110 }}>
      <div style={{ padding: '18px 20px 8px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Без подсчётов</div>
        <h1 className="text-serif" style={{ fontSize: 34, lineHeight: 1.05, margin: '6px 0 0', color: 'var(--ink)' }}>
          Питание <span className="text-serif-it" style={{ color: 'var(--sage)' }}>с заботой</span>
        </h1>
      </div>

      {/* Today's plan */}
      <SectionHeader title="План на сегодня" hint="1 270 ккал · сбалансировано"/>
      <div style={{ padding: '0 20px' }}>
        <Card padding={4} radius={26}>
          {meals.map((m, i, a) => (
            <div key={i} className="tap" onClick={() => onShowToast(m.status === 'done' ? 'Уже отмечено' : 'Отмечено как съедено ✓')} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
              borderBottom: i < a.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: m.status === 'done' ? 'var(--sage)' : m.status === 'next' ? 'var(--blush-tint)' : 'var(--surface-2)',
                border: m.status === 'plan' ? '1px dashed var(--line-strong)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {m.status === 'done' ? <Icon name="check" size={18} color="#3D332A"/> :
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: '0.05em' }}>
                    {String(i+1).padStart(2,'0')}
                  </span>
                }
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {m.time} {m.status === 'next' && <span style={{ color: 'var(--blush)' }}>· следующий</span>}
                </div>
                <div style={{
                  fontSize: 14, color: 'var(--ink)', marginTop: 3, fontWeight: 500,
                  textDecoration: m.status === 'done' ? 'line-through' : 'none',
                  opacity: m.status === 'done' ? 0.5 : 1,
                }}>{m.t}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600 }}>{m.kcal}</div>
            </div>
          ))}
        </Card>
      </div>

      {/* Programs (PDF cards) */}
      <SectionHeader title="Программы питания" hint="PDF · скачать и сохранить" action="Все"/>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {programs.map((p, i) => (
          <Card key={i} padding={16} radius={22} onClick={() => onShowToast('PDF готов к скачиванию')} style={{ position: 'relative' }}>
            {p.new && (
              <div style={{
                position: 'absolute', top: 12, right: 12,
                height: 20, padding: '0 8px', borderRadius: 999,
                background: 'var(--ink)', color: '#FFFCF8',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                display: 'inline-flex', alignItems: 'center',
              }}>NEW</div>
            )}
            <div style={{
              width: 56, height: 72, borderRadius: 10,
              background: p.tone === 'blush' ? 'linear-gradient(150deg, #F4D9C8, #E8B89C)'
                : p.tone === 'sage' ? 'linear-gradient(150deg, #DBE5D0, #BFD0B0)'
                : p.tone === 'lavender' ? 'linear-gradient(150deg, #DDD6E8, #C8BFD8)'
                : 'linear-gradient(150deg, #F5D7D7, #D89C9C)',
              boxShadow: '0 6px 16px rgba(61,51,42,0.10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <Icon name={p.icon} size={26} color={p.col}/>
              <span style={{
                position: 'absolute', bottom: -6, right: -6,
                height: 18, padding: '0 6px', borderRadius: 999,
                background: 'var(--surface)', border: '1px solid var(--line)',
                fontSize: 9, color: 'var(--ink-2)', fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 3,
              }}><Icon name="pdf" size={9}/>PDF</span>
            </div>
            <div className="text-serif" style={{ fontSize: 16, lineHeight: 1.2, marginTop: 18, color: 'var(--ink)' }}>{p.t}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{p.sub} · {p.pages} стр.</div>
          </Card>
        ))}
      </div>

      {/* Articles */}
      <SectionHeader title="Учиться, не торопясь"/>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {articles.map((a, i) => (
          <Card key={i} padding={14} radius={20} onClick={() => onShowToast('Открываем статью…')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <ImgPH tone={a.tone} h={60} style={{ width: 60, borderRadius: 14 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Статья · {a.read} мин
                </div>
                <div className="text-serif" style={{ fontSize: 16, lineHeight: 1.2, color: 'var(--ink)', marginTop: 4 }}>{a.t}</div>
              </div>
              <Icon name="chevron" size={16} color="var(--ink-3)"/>
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendation */}
      <div style={{ padding: '24px 20px 0' }}>
        <Card padding={20} radius={26} style={{ background: 'linear-gradient(140deg, #ECF1E4 0%, #DBE5D0 100%)', border: 'none' }}>
          <Icon name="sparkle" size={22} color="#6E8A57"/>
          <div className="text-serif" style={{ fontSize: 20, lineHeight: 1.2, marginTop: 12, color: 'var(--ink)' }}>
            Сегодня попробуй заменить хлеб на цельнозерновой
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>
            Маленькое изменение, которое поддержит твою энергию до ужина.
          </div>
        </Card>
      </div>
    </div>
  );
};


// ============================================================
// COMMUNITY SCREEN — Общение
// ============================================================
const CommunityScreen = ({ onShowToast, onOpenChat }) => {
  const chats = [
    { t: 'Третья неделя 🌸', last: 'Марина: Девочки, как у вас сегодня?', n: 12, time: '14:20', tone: 'blush', active: true },
    { t: 'Поддержка ☕', last: 'Алина: Сегодня не получилось…', n: 3, time: '12:08', tone: 'rose' },
    { t: 'Рецепты и еда', last: 'Катя поделилась рецептом', n: 0, time: 'Вчера', tone: 'sage' },
    { t: 'С Мариной (наставница)', last: 'Анна, как самочувствие?', n: 1, time: 'Вчера', tone: 'lavender', mentor: true },
  ];

  const posts = [
    { who: 'Лена', tone: 'sage', time: '20 мин', text: 'Сегодня впервые за неделю сделала тренировку без отговорок. Гордимся собой, да? 🌿', likes: 24, replies: 6 },
    { who: 'Юля', tone: 'rose', time: '1 ч', text: 'Девочки, делюсь обедом — теплый салат с тыквой. Получилось так уютно!', likes: 41, replies: 12, img: 'butter' },
    { who: 'Марина', tone: 'lavender', mentor: true, time: '3 ч', text: 'Напоминание: вы здесь не чтобы быть идеальными. Вы здесь чтобы стать ближе к себе.', likes: 138, replies: 28 },
  ];

  return (
    <div className="screen-enter" style={{ paddingBottom: 110 }}>
      <div style={{ padding: '18px 20px 8px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Ты не одна</div>
        <h1 className="text-serif" style={{ fontSize: 34, lineHeight: 1.05, margin: '6px 0 0', color: 'var(--ink)' }}>
          Наше <span className="text-serif-it" style={{ color: 'var(--rose)' }}>сообщество</span>
        </h1>
      </div>

      {/* Active marathon members */}
      <div style={{ padding: '16px 0 0 20px', display: 'flex', gap: 14, overflowX: 'auto' }} className="no-scrollbar">
        {[
          { n: 'А', tone: 'blush', s: 'Ты' },
          { n: 'Л', tone: 'sage', s: 'онлайн' },
          { n: 'Ю', tone: 'rose', s: 'онлайн' },
          { n: 'М', tone: 'lavender', s: 'наставница' },
          { n: 'К', tone: 'butter', s: 'онлайн' },
          { n: 'О', tone: 'cream', s: '' },
          { n: 'Д', tone: 'blush', s: '' },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ position: 'relative' }}>
              <Avatar name={p.n} tone={p.tone} size={56} ring={i === 0}/>
              {p.s === 'онлайн' && (
                <span style={{
                  position: 'absolute', bottom: 2, right: 2, width: 12, height: 12,
                  background: '#7A8E66', borderRadius: '50%', border: '2px solid var(--bg)',
                }}/>
              )}
            </div>
            <div style={{ fontSize: 10, color: 'var(--ink-2)', marginTop: 6, fontWeight: 600 }}>{p.s || p.n}</div>
          </div>
        ))}
      </div>

      {/* Chats */}
      <SectionHeader title="Чаты" hint="Тихая поддержка 24/7" action="+ Новый"/>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chats.map((c, i) => (
          <Card key={i} padding={14} radius={22} onClick={onOpenChat}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar name={c.t} tone={c.tone} size={48}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{c.t}</span>
                  {c.mentor && (
                    <span style={{
                      height: 18, padding: '0 7px', borderRadius: 999,
                      background: 'var(--lavender-tint)', color: '#6B5E8B',
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>Наставник</span>
                  )}
                </div>
                <div style={{
                  fontSize: 12, color: 'var(--ink-2)', marginTop: 3,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{c.last}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{c.time}</span>
                {c.n > 0 && (
                  <span style={{
                    minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999,
                    background: 'var(--blush)', color: 'var(--ink)',
                    fontSize: 11, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>{c.n}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Posts feed */}
      <SectionHeader title="Истории" hint="Поделись своим днём"/>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {posts.map((p, i) => (
          <Card key={i} padding={16} radius={22}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={p.who} tone={p.tone} size={38}/>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{p.who}</span>
                  {p.mentor && (
                    <span style={{
                      height: 16, padding: '0 6px', borderRadius: 999,
                      background: 'var(--lavender-tint)', color: '#6B5E8B',
                      fontSize: 9, fontWeight: 700,
                    }}>Наставник</span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{p.time} назад</div>
              </div>
              <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="chevronDown" size={16} color="var(--ink-3)"/>
              </button>
            </div>
            <div style={{ fontSize: 14, color: 'var(--ink)', marginTop: 12, lineHeight: 1.55 }}>{p.text}</div>
            {p.img && <ImgPH tone={p.img} h={180} radius={16} style={{ marginTop: 12 }}/>}
            <div style={{ display: 'flex', gap: 18, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)' }}>
              <button onClick={() => onShowToast('♡')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>
                <Icon name="heart" size={16} color="var(--rose)"/> {p.likes}
              </button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>
                <Icon name="chat" size={16} color="var(--ink-2)"/> {p.replies}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


// ============================================================
// PROFILE SCREEN — Профиль
// ============================================================
const ProfileScreen = ({ onShowToast, onOpenSettings, day }) => {
  const stats = [
    { v: '14', l: 'дней подряд', icon: 'flame', tone: 'blush' },
    { v: '-2,1', l: 'кг за 3 нед', icon: 'sparkle', tone: 'sage' },
    { v: '38', l: 'тренировок', icon: 'play', tone: 'lavender' },
  ];
  const achievements = [
    { t: 'Первая неделя', got: true, tone: 'blush' },
    { t: '7 тренировок', got: true, tone: 'sage' },
    { t: 'Тихий вечер', got: true, tone: 'lavender' },
    { t: 'Третья неделя', got: false, tone: 'rose' },
    { t: 'Финал 21 дня', got: false, tone: 'butter' },
  ];

  return (
    <div className="screen-enter" style={{ paddingBottom: 110 }}>
      {/* Profile hero */}
      <div style={{ padding: '24px 20px 0' }}>
        <Card padding={22} radius={28} style={{
          background: 'linear-gradient(140deg, #FBEDE2 0%, #F4D9C8 50%, #DDD6E8 100%)',
          border: 'none', textAlign: 'center', position: 'relative',
        }}>
          <button onClick={onOpenSettings} style={{
            position: 'absolute', top: 16, right: 16,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,252,248,0.7)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="settings" size={18} color="var(--ink)"/>
          </button>
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <Avatar name="А" tone="blush" size={88}/>
            <span style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--surface)', border: '2px solid var(--bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="crown" size={14} color="var(--gold)"/>
            </span>
          </div>
          <div className="text-serif" style={{ fontSize: 24, marginTop: 12, color: 'var(--ink)' }}>Анна Северина</div>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 4 }}>@anna_severina · Telegram</div>

          <div style={{
            marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 32, padding: '0 14px', borderRadius: 999,
            background: 'rgba(255,252,248,0.7)', backdropFilter: 'blur(6px)',
          }}>
            <Icon name="crown" size={14} color="var(--gold)"/>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Premium активен</span>
            <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>· до 14 марта</span>
          </div>
        </Card>
      </div>

      {/* Stats row */}
      <div style={{ padding: '18px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {stats.map((s, i) => (
          <Card key={i} padding={14} radius={20} style={{ textAlign: 'center' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, margin: '0 auto',
              background: s.tone === 'blush' ? 'var(--blush-tint)' : s.tone === 'sage' ? 'var(--sage-tint)' : 'var(--lavender-tint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={s.icon} size={16} color={s.tone === 'blush' ? '#B07349' : s.tone === 'sage' ? '#6E8A57' : '#8579A1'}/>
            </div>
            <div className="text-serif" style={{ fontSize: 22, marginTop: 10, color: 'var(--ink)', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 4, fontWeight: 600, letterSpacing: '0.04em' }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Marathon progress */}
      <SectionHeader title="Твой марафон"/>
      <div style={{ padding: '0 20px' }}>
        <Card padding={20} radius={26}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>Прогресс</div>
              <div className="text-serif" style={{ fontSize: 22, color: 'var(--ink)', marginTop: 2 }}>{day} из 21 дня</div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{Math.round(day/21*100)}%</div>
          </div>
          <div style={{ marginTop: 14 }}>
            <Bar value={day/21} color="var(--blush)" track="var(--blush-tint)" height={8}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10, color: 'var(--ink-3)' }}>
            <span>Неделя 1</span><span>Неделя 2</span><span>Неделя 3</span>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <SectionHeader title="Достижения" hint="3 из 5 получено"/>
      <div style={{ padding: '0 20px', display: 'flex', gap: 10, overflowX: 'auto' }} className="no-scrollbar">
        {achievements.map((a, i) => (
          <div key={i} style={{ flexShrink: 0, width: 96, textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 24, margin: '0 auto',
              background: a.got
                ? (a.tone === 'blush' ? 'linear-gradient(140deg, #F4D9C8, #E8B89C)'
                  : a.tone === 'sage' ? 'linear-gradient(140deg, #DBE5D0, #BFD0B0)'
                  : 'linear-gradient(140deg, #DDD6E8, #C8BFD8)')
                : 'var(--surface-2)',
              border: a.got ? 'none' : '1px dashed var(--line-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: a.got ? 1 : 0.5,
              boxShadow: a.got ? 'var(--shadow-soft)' : 'none',
            }}>
              <Icon name={a.got ? 'badge' : 'lock'} size={32} color={a.got ? '#FFFCF8' : 'var(--ink-3)'} filled={a.got}/>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 8, fontWeight: 600 }}>{a.t}</div>
          </div>
        ))}
      </div>

      {/* Settings list */}
      <SectionHeader title="Настройки"/>
      <div style={{ padding: '0 20px' }}>
        <Card padding={4} radius={24}>
          {[
            { t: 'Уведомления', sub: 'Утренние напоминания', icon: 'bell', tone: 'blush', col: '#B07349' },
            { t: 'Подписка Premium', sub: 'Активна до 14 марта', icon: 'crown', tone: 'butter', col: '#8E7032' },
            { t: 'Доступ к материалам', sub: 'PDF, видео, программы', icon: 'lock', tone: 'sage', col: '#6E8A57' },
            { t: 'Помощь и связь', sub: 'Написать наставнице', icon: 'heart', tone: 'rose', col: '#A65F5F' },
            { t: 'О приложении', sub: 'Версия 1.0.0', icon: 'sparkle', tone: 'lavender', col: '#8579A1' },
          ].map((s, i, a) => (
            <button key={i} className="tap" onClick={() => onShowToast('Открываем…')} style={{
              width: '100%', padding: '14px 12px', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              borderBottom: i < a.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: s.tone === 'blush' ? 'var(--blush-tint)' : s.tone === 'butter' ? 'var(--butter-tint)' : s.tone === 'sage' ? 'var(--sage-tint)' : s.tone === 'rose' ? 'var(--rose-tint)' : 'var(--lavender-tint)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={s.icon} size={18} color={s.col}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{s.t}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{s.sub}</div>
              </div>
              <Icon name="chevron" size={16} color="var(--ink-3)"/>
            </button>
          ))}
        </Card>
      </div>

      <div style={{ padding: '24px 20px 8px', textAlign: 'center' }}>
        <div className="text-serif-it" style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5 }}>
          «Сделано с заботой<br/>для тех, кто заботится о себе»
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { HomeScreen, WorkoutsScreen, NutritionScreen, CommunityScreen, ProfileScreen, AppHeader });

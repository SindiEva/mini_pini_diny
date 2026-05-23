// ============================================================
// Спортивный марафон — App shell
// Onboarding · Bottom nav · Chat overlay · Loading/empty states
// ============================================================

const { useState: usSt, useEffect: usEf } = React;

// ─── Telegram-style "header-on-content" status (we use iOS frame's instead) ──

// ─── Bottom Navigation ─────────────────────────────────────────────────
const BottomNav = ({ active, onChange }) => {
  const items = [
    { id: 'home',      label: 'Главная',     icon: 'home' },
    { id: 'workouts',  label: 'Тренировки',  icon: 'dumbbell' },
    { id: 'nutrition', label: 'Питание',     icon: 'leaf' },
    { id: 'community', label: 'Общение',     icon: 'chat' },
    { id: 'profile',   label: 'Профиль',     icon: 'user' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 70,
      padding: '0 12px 26px',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'relative',
        height: 72, borderRadius: 32, pointerEvents: 'auto',
        background: 'rgba(255,252,248,0.78)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(239,230,215,0.7)',
        boxShadow: '0 -2px 8px rgba(61,51,42,0.04), 0 12px 30px rgba(61,51,42,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 6px',
      }}>
        {items.map(it => {
          const isActive = active === it.id;
          return (
            <button key={it.id} onClick={() => onChange(it.id)} className="tap" style={{
              flex: 1, height: '100%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, position: 'relative',
            }}>
              <div style={{
                width: 46, height: 30, borderRadius: 16,
                background: isActive ? 'var(--blush-tint)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background .2s ease',
              }}>
                <Icon name={it.icon} size={20} color={isActive ? 'var(--ink)' : 'var(--ink-3)'} filled={isActive}/>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '-0.005em',
                color: isActive ? 'var(--ink)' : 'var(--ink-3)',
              }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Onboarding (welcome modal-sheet) ───────────────────────────────────
const Onboarding = ({ open, onClose }) => {
  const [step, setStep] = usSt(0);
  const slides = [
    {
      tone: 'blush',
      eyebrow: 'Добро пожаловать',
      title: 'Это твои <i>21 день</i> к лёгкости',
      body: 'Спортивный марафон — тёплое пространство для женщин, которые хотят прийти в форму без давления, диет и крайностей.',
      icon: 'heart',
    },
    {
      tone: 'sage',
      eyebrow: 'Как это работает',
      title: 'Маленькие шаги <i>каждый день</i>',
      body: 'Одна мягкая тренировка, простой план питания и поддержка девочек. Без надрыва — только то, что приятно делать.',
      icon: 'leaf',
    },
    {
      tone: 'lavender',
      eyebrow: 'Ты не одна',
      title: 'С тобой <i>наставница</i> и сообщество',
      body: 'Марина и десятки девочек уже идут этим путём. Можно тихо наблюдать или делиться — как тебе комфортно.',
      icon: 'chat',
    },
  ];
  const s = slides[step];
  const last = step === slides.length - 1;

  return (
    <Sheet open={open} onClose={() => {}} height="78%">
      <div style={{ padding: '8px 20px 22px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '6px 0 18px' }}>
          {slides.map((_, i) => (
            <span key={i} style={{
              height: 4, borderRadius: 999,
              width: i === step ? 24 : 6,
              background: i === step ? 'var(--ink)' : 'var(--line-strong)',
              transition: 'all .35s ease',
            }}/>
          ))}
        </div>

        <div className="fade-in" key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ImgPH tone={s.tone} h={220} radius={26}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 92, height: 92, borderRadius: '50%',
                background: 'rgba(255,252,248,0.82)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 18px 36px rgba(61,51,42,0.12)',
                animation: 'float 3s ease-in-out infinite',
              }}>
                <Icon name={s.icon} size={42} color="var(--ink)" filled/>
              </div>
            </div>
          </ImgPH>

          <div style={{ marginTop: 22, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blush)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.eyebrow}</div>
            <h2 className="text-serif" style={{ fontSize: 28, lineHeight: 1.1, margin: '10px 18px 0', color: 'var(--ink)' }}
              dangerouslySetInnerHTML={{ __html: s.title.replace(/<i>/g, '<span style="font-style:italic;color:var(--blush)">').replace(/<\/i>/g, '</span>') }}/>
            <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 14, lineHeight: 1.55, padding: '0 14px' }}>{s.body}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          {!last && <Pill variant="ghost" onClick={onClose}>Пропустить</Pill>}
          <Pill variant="primary" fullWidth onClick={() => last ? onClose() : setStep(step + 1)}
            trailing={<Icon name="arrowRight" size={16} color="#FFFCF8"/>}
          >
            {last ? 'Начать марафон' : 'Дальше'}
          </Pill>
        </div>
      </div>
    </Sheet>
  );
};

// ─── Chat overlay ──────────────────────────────────────────────────────
const ChatOverlay = ({ open, onClose }) => {
  const [msgs, setMsgs] = usSt([
    { who: 'Марина', tone: 'lavender', mentor: true, t: 'Девочки, как у вас сегодня? 🌸', time: '14:20' },
    { who: 'Лена', tone: 'sage', t: 'Сделала растяжку. Сначала не хотелось, потом так хорошо!', time: '14:22' },
    { who: 'Юля', tone: 'rose', t: 'А у меня обед получился красивый, делюсь ❤️', time: '14:23' },
    { who: 'me', t: 'Девочки, привет! Только что закончила утреннюю тренировку. Чувствую себя живой 🌿', time: '14:25' },
    { who: 'Марина', tone: 'lavender', mentor: true, t: 'Анна, это прекрасно! Помни — не идеал, а постоянство.', time: '14:26' },
  ]);
  const [input, setInput] = usSt('');
  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, { who: 'me', t: input, time: 'сейчас' }]);
    setInput('');
    setTimeout(() => {
      setMsgs(m => [...m, { who: 'Лена', tone: 'sage', t: 'Поддерживаю тебя! 💚', time: 'сейчас' }]);
    }, 1400);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'var(--bg)',
      transform: `translateX(${open ? 0 : 100}%)`,
      transition: 'transform .35s cubic-bezier(.2,.7,.2,1)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Chat header */}
      <div style={{
        padding: '54px 16px 12px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--line)',
        background: 'rgba(255,252,248,0.85)', backdropFilter: 'blur(20px)',
      }}>
        <button onClick={onClose} className="tap" style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--surface)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="chevronLeft" size={18} color="var(--ink)"/>
        </button>
        <Avatar name="Т" tone="blush" size={42}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>Третья неделя 🌸</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>24 участницы · 7 онлайн</div>
        </div>
        <button style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="settings" size={18} color="var(--ink-2)"/>
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <span style={{
            fontSize: 11, color: 'var(--ink-3)', fontWeight: 600,
            padding: '4px 10px', borderRadius: 999, background: 'var(--surface)',
          }}>Сегодня</span>
        </div>
        {msgs.map((m, i) => {
          const mine = m.who === 'me';
          return (
            <div key={i} style={{ display: 'flex', gap: 8, flexDirection: mine ? 'row-reverse' : 'row' }}>
              {!mine && <Avatar name={m.who} tone={m.tone} size={32}/>}
              <div style={{ maxWidth: '76%' }}>
                {!mine && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px 4px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)' }}>{m.who}</span>
                    {m.mentor && (
                      <span style={{
                        height: 14, padding: '0 5px', borderRadius: 999,
                        background: 'var(--lavender-tint)', color: '#6B5E8B',
                        fontSize: 8, fontWeight: 700, letterSpacing: '0.04em',
                      }}>МЕНТОР</span>
                    )}
                  </div>
                )}
                <div style={{
                  padding: '10px 14px', borderRadius: 18,
                  background: mine ? 'var(--ink)' : 'var(--surface)',
                  color: mine ? '#FFFCF8' : 'var(--ink)',
                  border: mine ? 'none' : '1px solid var(--line)',
                  fontSize: 14, lineHeight: 1.45,
                  borderBottomRightRadius: mine ? 6 : 18,
                  borderBottomLeftRadius: mine ? 18 : 6,
                }}>{m.t}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 3, textAlign: mine ? 'right' : 'left', padding: '0 12px' }}>{m.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <div style={{ padding: '8px 12px 28px', borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="plus" size={18} color="var(--ink-2)"/>
          </button>
          <div style={{
            flex: 1, height: 42, borderRadius: 999,
            background: 'var(--surface)', border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', padding: '0 6px 0 16px',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Сообщение в чат…"
              style={{
                flex: 1, border: 0, outline: 0, background: 'transparent',
                fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit',
              }}
            />
            <button style={{ padding: 6 }}><Icon name="mic" size={18} color="var(--ink-3)"/></button>
          </div>
          <button onClick={send} className="tap" style={{
            width: 42, height: 42, borderRadius: '50%',
            background: input.trim() ? 'var(--blush)' : 'var(--surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s ease',
          }}>
            <Icon name="send" size={18} color={input.trim() ? 'var(--ink)' : 'var(--ink-3)'} filled/>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Settings sheet ────────────────────────────────────────────────────
const SettingsSheet = ({ open, onClose }) => (
  <Sheet open={open} onClose={onClose} height="62%">
    <div style={{ padding: '4px 20px 28px' }}>
      <h3 className="text-serif" style={{ fontSize: 26, color: 'var(--ink)', margin: '4px 0 18px' }}>Настройки</h3>
      <Card padding={4} radius={22}>
        {[
          { t: 'Тёмная тема', sub: 'Скоро', sw: false },
          { t: 'Утренние напоминания', sub: '08:00', sw: true },
          { t: 'Звуки уведомлений', sub: 'Включены', sw: true },
          { t: 'Тихий час', sub: '22:00 – 08:00', sw: true },
        ].map((r, i, a) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderBottom: i < a.length - 1 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.t}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{r.sub}</div>
            </div>
            <div style={{
              width: 44, height: 26, borderRadius: 999, padding: 3,
              background: r.sw ? 'var(--blush)' : 'var(--line-strong)',
              transition: 'background .2s ease',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#FFFCF8',
                transform: `translateX(${r.sw ? 18 : 0}px)`,
                transition: 'transform .25s cubic-bezier(.2,.7,.2,1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }}/>
            </div>
          </div>
        ))}
      </Card>
      <Pill variant="soft" fullWidth style={{ marginTop: 14 }} onClick={onClose}>Закрыть</Pill>
    </div>
  </Sheet>
);

// ─── Loading state ─────────────────────────────────────────────────────
const ScreenLoader = ({ show }) => (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 75,
    background: 'var(--bg)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none',
    transition: 'opacity .25s ease',
  }}>
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '3px solid var(--blush-tint)',
        borderTopColor: 'var(--blush)',
        animation: 'spinSoft 1s linear infinite',
      }}/>
    </div>
    <div className="text-serif-it" style={{ marginTop: 18, color: 'var(--ink-2)', fontSize: 14 }}>минутку…</div>
  </div>
);

// ─── Notifications empty state (used inside bell sheet) ────────────────
const NotificationsSheet = ({ open, onClose }) => (
  <Sheet open={open} onClose={onClose} height="60%">
    <div style={{ padding: '4px 20px 28px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 className="text-serif" style={{ fontSize: 26, color: 'var(--ink)', margin: '4px 0 4px' }}>Уведомления</h3>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 18 }}>Спокойно. Только важное.</div>

      {/* Empty state */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <div style={{
          width: 96, height: 96, borderRadius: 28,
          background: 'linear-gradient(140deg, #FBEDE2, #DDD6E8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 18,
          boxShadow: 'var(--shadow-soft)',
        }}>
          <Icon name="bell" size={42} color="var(--ink-2)" filled/>
        </div>
        <div className="text-serif" style={{ fontSize: 22, color: 'var(--ink)', lineHeight: 1.2 }}>
          Всё тихо <span className="text-serif-it" style={{ color: 'var(--blush)' }}>и хорошо</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 10, lineHeight: 1.5, maxWidth: 280 }}>
          Когда появятся напоминания о тренировке или новые сообщения — ты увидишь их здесь.
        </div>
        <Pill variant="soft" size="sm" style={{ marginTop: 22 }} onClick={onClose}>Понятно</Pill>
      </div>
    </div>
  </Sheet>
);

// ─── ROOT APP ──────────────────────────────────────────────────────────
const App = () => {
  const [screen, setScreen] = usSt('home');
  const [loading, setLoading] = usSt(false);
  const [onboardingOpen, setOnboardingOpen] = usSt(false);
  const [chatOpen, setChatOpen] = usSt(false);
  const [notifOpen, setNotifOpen] = usSt(false);
  const [settingsOpen, setSettingsOpen] = usSt(false);
  const [toast, setToast] = usSt('');
  const [day] = usSt(14);

  // Show onboarding on mount once
  usEf(() => {
    const t = setTimeout(() => setOnboardingOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Toast auto-hide
  usEf(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (msg) => setToast(msg);

  const handleNav = (id) => {
    if (id === screen) return;
    setLoading(true);
    setTimeout(() => {
      setScreen(id);
      setLoading(false);
    }, 380);
  };

  let body = null;
  if (screen === 'home') body = <HomeScreen day={day} onNav={handleNav} onShowToast={showToast} onOpenOnboarding={() => setOnboardingOpen(true)} onOpenNotif={() => setNotifOpen(true)}/>;
  if (screen === 'workouts') body = <WorkoutsScreen onShowToast={showToast}/>;
  if (screen === 'nutrition') body = <NutritionScreen onShowToast={showToast}/>;
  if (screen === 'community') body = <CommunityScreen onShowToast={showToast} onOpenChat={() => setChatOpen(true)}/>;
  if (screen === 'profile') body = <ProfileScreen onShowToast={showToast} day={day} onOpenSettings={() => setSettingsOpen(true)}/>;

  return (
    <div style={{ height: '100%', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Top bar reserve for status (iOS frame status bar already absolutely positioned) */}
      <div style={{ height: 62, flexShrink: 0 }}/>

      <div style={{ position: 'absolute', inset: '62px 0 0 0', overflowY: 'auto', overflowX: 'hidden' }} className="no-scrollbar">
        {body}
      </div>

      <BottomNav active={screen} onChange={handleNav}/>

      <ScreenLoader show={loading}/>

      <Onboarding open={onboardingOpen} onClose={() => setOnboardingOpen(false)}/>
      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)}/>
      <NotificationsSheet open={notifOpen} onClose={() => setNotifOpen(false)}/>
      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)}/>

      <Toast show={!!toast}>{toast}</Toast>

      {/* Floating bell button to open notifications (test hook) — actually piped via AppHeader bell prop later */}
    </div>
  );
};

window.App = App;

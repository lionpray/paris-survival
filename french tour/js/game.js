const state = {
  hp: GAME_DATA.initialHP,
  maxHP: GAME_DATA.maxHP,
  day: 1,
  totalDays: GAME_DATA.totalDays,
  mealIndex: 0,
  interactionIndex: 0,
  correctCount: 0,
  totalCount: 0,
  dayCorrect: 0,
  dayTotal: 0,
  todayPlan: [],
  usedIndices: { morning: [], lunch: [], snack: [], dinner: [] },
  currentInteraction: null,
  answered: false,
};

// ── DOM refs ──
const screens = {
  intro: document.getElementById('screen-intro'),
  game:  document.getElementById('screen-game'),
  rest:  document.getElementById('screen-rest'),
  end:   document.getElementById('screen-end'),
};

const ui = {
  hpFill:          document.getElementById('hp-fill'),
  hpValue:         document.getElementById('hp-value'),
  dayLabel:        document.getElementById('day-label'),
  timeDots:        document.querySelectorAll('.time-dot'),
  sceneEmoji:      document.getElementById('scene-emoji'),
  sceneTime:       document.getElementById('scene-time'),
  sceneLocation:   document.getElementById('scene-location'),
  locationListenBtn: document.getElementById('location-listen-btn'),
  sceneIntro:      document.getElementById('scene-intro'),
  setupText:       document.getElementById('setup-text'),
  npcName:         document.getElementById('npc-name'),
  npcFrench:       document.getElementById('npc-french'),
  npcListenBtn:    document.getElementById('npc-listen-btn'),
  optionsGrid:     document.getElementById('options-grid'),
  voiceBtn:        document.getElementById('voice-btn'),
  feedbackOverlay: document.getElementById('feedback-overlay'),
  feedbackIcon:    document.getElementById('feedback-icon'),
  feedbackHp:      document.getElementById('feedback-hp'),
  feedbackText:    document.getElementById('feedback-text'),
  continueBtn:     document.getElementById('continue-btn'),
  pardonOverlay:   document.getElementById('pardon-overlay'),
  pardonText:      document.getElementById('pardon-text'),
  pardonRetry:     document.getElementById('pardon-retry'),
  pardonButton:    document.getElementById('pardon-button'),
  listeningOverlay: document.getElementById('listening-overlay'),
  restDay:         document.getElementById('rest-day'),
  restScore:       document.getElementById('rest-score'),
  restHp:          document.getElementById('rest-hp'),
  restNextBtn:     document.getElementById('rest-next-btn'),
  restNextLabel:   document.getElementById('rest-next-label'),
  endEmoji:        document.getElementById('end-emoji'),
  endTitle:        document.getElementById('end-title'),
  endSubtitle:     document.getElementById('end-subtitle'),
  scoreCorrect:    document.getElementById('score-correct'),
  scoreTotal:      document.getElementById('score-total'),
  scoreHp:         document.getElementById('score-hp'),
};

// ══════════════════════════════════════
// TTS
// ══════════════════════════════════════
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const clean = text
    .replace(/\n/g, ' ')
    .replace(/["""«»]/g, '')
    .replace(/\(.*?\)/g, '')
    .trim();
  const utt = new SpeechSynthesisUtterance(clean);
  utt.lang = 'fr-FR';
  utt.rate = 0.85;
  speechSynthesis.speak(utt);
}

// ══════════════════════════════════════
// VOICE INPUT
// ══════════════════════════════════════
function normalizeForMatch(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordSimilarity(heard, expected) {
  const skip = new Set(['et','un','une','le','la','les','de','du','je','vous','il','en','au','s','il']);
  const hw = normalizeForMatch(heard).split(' ').filter(w => w.length > 1 && !skip.has(w));
  const ew = normalizeForMatch(expected).split(' ').filter(w => w.length > 1 && !skip.has(w));
  if (ew.length === 0) return 0;
  const hits = hw.filter(h => ew.some(e => e.includes(h) || h.includes(e))).length;
  return hits / ew.length;
}

function startVoiceInput() {
  if (state.answered) return;

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    alert('음성 인식이 지원되지 않는 브라우저예요.\nSafari(iOS) 또는 Chrome을 사용해 주세요.');
    return;
  }

  const rec = new SpeechRec();
  rec.lang = 'fr-FR';
  rec.continuous = false;
  rec.interimResults = false;
  rec.maxAlternatives = 3;

  let resultHandled = false;

  ui.listeningOverlay.classList.add('active');
  ui.voiceBtn.disabled = true;

  rec.onresult = (event) => {
    resultHandled = true;
    ui.listeningOverlay.classList.remove('active');

    const transcripts = Array.from(event.results[0]).map(r => r.transcript);

    let bestOption = null, bestWrapper = null, bestScore = 0;
    const wrappers = ui.optionsGrid.querySelectorAll('.option-wrapper');

    state.currentInteraction.options.forEach((opt, i) => {
      transcripts.forEach(t => {
        const score = wordSimilarity(t, opt.text);
        if (score > bestScore) {
          bestScore = score;
          bestOption = opt;
          bestWrapper = wrappers[i];
        }
      });
    });

    if (bestScore >= 0.45 && bestOption) {
      handleAnswer(bestOption, bestWrapper, state.currentInteraction);
    } else {
      showPardon(transcripts[0] || '...', rec);
    }
  };

  rec.onerror = (e) => {
    resultHandled = true;
    ui.listeningOverlay.classList.remove('active');
    ui.voiceBtn.disabled = false;
    if (e.error === 'not-allowed') {
      alert('마이크 사용 권한이 필요해요.\n설정 → Safari → 마이크를 허용해 주세요.');
    } else if (e.error === 'no-speech') {
      showPardon('(소리가 감지되지 않았어요)', null);
    } else if (e.error !== 'aborted') {
      showPardon('(오류: ' + e.error + ')', null);
    }
  };

  rec.onend = () => {
    ui.listeningOverlay.classList.remove('active');
    ui.voiceBtn.disabled = false;
    // iOS Safari는 결과 없이 onend가 먼저 오는 경우가 많음
    if (!resultHandled) {
      showPardon('(음성이 감지되지 않았어요)\n더 크게, 천천히 말해보세요! 🎤', null);
    }
  };

  try {
    rec.start();
  } catch (e) {
    ui.listeningOverlay.classList.remove('active');
    ui.voiceBtn.disabled = false;
    alert('음성 인식 시작 오류: ' + e.message);
  }
}

function showPardon(heard, rec) {
  ui.pardonText.textContent = heard;
  ui.pardonOverlay.classList.add('active');

  ui.pardonRetry.onclick = () => {
    ui.pardonOverlay.classList.remove('active');
    setTimeout(startVoiceInput, 200);
  };

  ui.pardonButton.onclick = () => {
    ui.pardonOverlay.classList.remove('active');
    ui.voiceBtn.disabled = false;
  };
}

// ══════════════════════════════════════
// SCREENS
// ══════════════════════════════════════
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ══════════════════════════════════════
// HP
// ══════════════════════════════════════
function updateHP(delta) {
  state.hp = Math.max(0, Math.min(state.maxHP, state.hp + delta));
  const pct = (state.hp / state.maxHP) * 100;
  ui.hpFill.style.width = pct + '%';
  ui.hpFill.classList.remove('medium', 'low');
  if (pct <= 30) ui.hpFill.classList.add('low');
  else if (pct <= 60) ui.hpFill.classList.add('medium');
  ui.hpValue.textContent = state.hp + ' / ' + state.maxHP;
}

// ══════════════════════════════════════
// RENDER
// ══════════════════════════════════════
function updateTimeDots() {
  ui.timeDots.forEach((dot, i) => {
    dot.classList.remove('done', 'active');
    if (i < state.mealIndex) dot.classList.add('done');
    else if (i === state.mealIndex) dot.classList.add('active');
  });
}

function generateDayPlan() {
  state.todayPlan = GAME_DATA.mealOrder.map(meal => {
    const pool = GAME_DATA.pools[meal];
    let used = state.usedIndices[meal];
    if (used.length >= pool.length) { state.usedIndices[meal] = []; used = state.usedIndices[meal]; }
    const avail = pool.map((_, i) => i).filter(i => !used.includes(i));
    const idx = avail[Math.floor(Math.random() * avail.length)];
    used.push(idx);
    return pool[idx];
  });
}

function renderScene() {
  const scenario = state.todayPlan[state.mealIndex];
  const meta     = GAME_DATA.mealMeta[GAME_DATA.mealOrder[state.mealIndex]];

  ui.sceneEmoji.textContent    = scenario.emoji;
  ui.sceneTime.textContent     = meta.label + '  ' + meta.time;
  ui.sceneLocation.textContent = scenario.location;
  ui.sceneIntro.textContent    = scenario.intro;
  ui.locationListenBtn.onclick = () => speak(scenario.location);

  ui.dayLabel.textContent = 'Jour ' + state.day + ' / ' + state.totalDays;
  updateTimeDots();
}

function renderInteraction() {
  const interaction = state.todayPlan[state.mealIndex].interactions[state.interactionIndex];
  state.currentInteraction = interaction;
  state.answered = false;

  ui.setupText.textContent = interaction.setup;
  ui.npcName.textContent   = interaction.npcName;
  ui.npcFrench.textContent = interaction.npcFrench;

  const isSituation = interaction.npcName === 'Situation';
  ui.npcListenBtn.style.display = isSituation ? 'none' : 'flex';
  ui.npcListenBtn.onclick = () => speak(interaction.npcFrench);

  ui.voiceBtn.disabled = false;
  ui.voiceBtn.classList.remove('listening');

  ui.optionsGrid.innerHTML = '';
  interaction.options.forEach(opt => {
    const wrapper = document.createElement('div');
    wrapper.className = 'option-wrapper';

    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => handleAnswer(opt, wrapper, interaction));

    const listenBtn = document.createElement('button');
    listenBtn.className = 'listen-btn';
    listenBtn.textContent = '🔊';
    listenBtn.title = 'Écouter';
    listenBtn.addEventListener('click', e => { e.stopPropagation(); speak(opt.text); });

    wrapper.appendChild(btn);
    wrapper.appendChild(listenBtn);
    ui.optionsGrid.appendChild(wrapper);
  });
}

// ══════════════════════════════════════
// ANSWER
// ══════════════════════════════════════
function handleAnswer(opt, clickedWrapper, interaction) {
  if (state.answered) return;
  state.answered = true;
  state.totalCount++;
  state.dayTotal++;

  const isCorrect = opt.correct;
  const hpDelta   = isCorrect ? interaction.hpChange.success : interaction.hpChange.fail;
  if (isCorrect) { state.correctCount++; state.dayCorrect++; }

  const allWrappers = ui.optionsGrid.querySelectorAll('.option-wrapper');
  allWrappers.forEach((wrapper, i) => {
    const btn = wrapper.querySelector('.option-btn');
    btn.disabled = true;
    wrapper.querySelector('.listen-btn').disabled = true;
    if (wrapper === clickedWrapper) {
      btn.classList.add(isCorrect ? 'correct' : 'wrong');
    } else if (!isCorrect && interaction.options[i].correct) {
      btn.classList.add('reveal');
    }
  });

  ui.voiceBtn.disabled = true;
  updateHP(hpDelta);
  showFeedback(isCorrect, opt.feedback, hpDelta);
}

// ══════════════════════════════════════
// FEEDBACK
// ══════════════════════════════════════
function showFeedback(isCorrect, text, hpDelta) {
  ui.feedbackIcon.textContent = isCorrect ? '✅' : '❌';
  ui.feedbackHp.classList.remove('gain', 'loss');

  if (hpDelta > 0) {
    ui.feedbackHp.textContent = '+' + hpDelta + ' HP';
    ui.feedbackHp.classList.add('gain');
  } else if (hpDelta < 0) {
    ui.feedbackHp.textContent = hpDelta + ' HP';
    ui.feedbackHp.classList.add('loss');
  } else {
    ui.feedbackHp.textContent = '±0 HP';
    ui.feedbackHp.classList.add('gain');
  }

  ui.feedbackText.textContent = text;

  if (state.hp <= 0) {
    ui.continueBtn.textContent = '여행을 포기했다…';
    ui.continueBtn.className = 'btn btn-danger';
  } else {
    ui.continueBtn.textContent = isCorrect ? '다음 →' : '계속하기 →';
    ui.continueBtn.className = 'btn btn-primary';
  }

  ui.feedbackOverlay.classList.add('active');
}

function hideFeedback() {
  ui.feedbackOverlay.classList.remove('active');
}

// ══════════════════════════════════════
// PROGRESSION
// ══════════════════════════════════════
function advance() {
  hideFeedback();
  if (state.hp <= 0) { showEndScreen(false); return; }

  const scenario = state.todayPlan[state.mealIndex];
  state.interactionIndex++;

  if (state.interactionIndex < scenario.interactions.length) {
    renderInteraction();
    return;
  }

  state.interactionIndex = 0;
  state.mealIndex++;

  if (state.mealIndex < GAME_DATA.mealOrder.length) {
    renderScene();
    renderInteraction();
    return;
  }

  showRestScreen();
}

// ══════════════════════════════════════
// REST
// ══════════════════════════════════════
function showRestScreen() {
  speechSynthesis.cancel();
  showScreen('rest');

  const sleepHP = GAME_DATA.sleepBonus;
  updateHP(sleepHP);

  ui.restDay.textContent   = state.day + '일째 완료!';
  ui.restScore.textContent = state.dayCorrect + ' / ' + state.dayTotal + ' 정답';
  ui.restHp.textContent    = '+' + sleepHP + ' HP 회복 → 현재 ' + state.hp + ' / ' + state.maxHP;

  if (state.day >= state.totalDays) {
    ui.restNextBtn.textContent = '최종 결과 보기 →';
    ui.restNextLabel.textContent = '7일 완주를 눈 앞에!';
  } else {
    ui.restNextBtn.textContent = 'Bonne nuit… →';
    ui.restNextLabel.textContent = (state.day + 1) + '일째가 시작된다!';
  }
}

function startNextDay() {
  if (state.day >= state.totalDays) { showEndScreen(true); return; }
  state.day++;
  state.mealIndex = 0;
  state.interactionIndex = 0;
  state.dayCorrect = 0;
  state.dayTotal = 0;
  generateDayPlan();
  showScreen('game');
  renderScene();
  renderInteraction();
}

// ══════════════════════════════════════
// END
// ══════════════════════════════════════
function showEndScreen(survived) {
  speechSynthesis.cancel();
  showScreen('end');

  if (survived) {
    ui.endEmoji.textContent   = '🎉';
    ui.endTitle.textContent   = '7일 파리 생존 완료!';
    ui.endSubtitle.textContent = '프랑스어로 일주일을 버텨냈다.\n파리지앵들이 당신을 인정한다!';
  } else {
    ui.endEmoji.textContent   = '😮‍💨';
    ui.endTitle.textContent   = '여행을 포기했다…';
    ui.endSubtitle.textContent = '허기와 피로가 쌓여 결국 한국행 비행기를 예약했다.\n다음엔 더 잘할 수 있어!';
  }

  const pct = state.totalCount > 0
    ? Math.round((state.correctCount / state.totalCount) * 100) : 0;

  ui.scoreCorrect.textContent = state.correctCount + ' / ' + state.totalCount + ' (' + pct + '%)';
  ui.scoreTotal.textContent   = state.day + ' / ' + state.totalDays + ' 일';
  ui.scoreHp.textContent      = state.hp + ' / ' + state.maxHP;
}

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
function startGame() {
  speechSynthesis.cancel();
  Object.assign(state, {
    hp: GAME_DATA.initialHP, day: 1, mealIndex: 0, interactionIndex: 0,
    correctCount: 0, totalCount: 0, dayCorrect: 0, dayTotal: 0,
    todayPlan: [], currentInteraction: null, answered: false,
    usedIndices: { morning: [], lunch: [], snack: [], dinner: [] }
  });
  updateHP(0);
  generateDayPlan();
  showScreen('game');
  renderScene();
  renderInteraction();
}

// ── Events ──
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
ui.continueBtn.addEventListener('click', advance);
ui.restNextBtn.addEventListener('click', startNextDay);
ui.voiceBtn.addEventListener('click', startVoiceInput);

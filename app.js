/**
 * المحرك الرئيسي لـ "مرسم منيرة 👑" و "مرسم هادي وسلطان 🚀"
 * مصمم خصيصاً للآيباد (Apple Pencil + اللمس باليد) للأطفال من عمر 4 سنوات وأعلى
 */

(() => {
  // ==================== إعدادات الألوان والثيمات ====================
  const PALETTE_COLORS = [
    { hex: '#ff477e', name: 'وردي منيرة' },
    { hex: '#ff85a9', name: 'وردي فاتح' },
    { hex: '#a855f7', name: 'بنفسجي أميرات' },
    { hex: '#ef4444', name: 'أحمر' },
    { hex: '#f97316', name: 'برتقالي مشرق' },
    { hex: '#facc15', name: 'أصفر شمسي' },
    { hex: '#16a34a', name: 'أخضر علم الكويت' },
    { hex: '#10b981', name: 'أخضر نعناعي' },
    { hex: '#06b6d4', name: 'سماوي مضيء' },
    { hex: '#0284c7', name: 'أزرق هادي وسلطان' },
    { hex: '#2563eb', name: 'أزرق بحري' },
    { hex: '#8b5cf6', name: 'نيلي سحري' },
    { hex: '#92400e', name: 'بني شوكولاتة' },
    { hex: '#1e293b', name: 'أسود فحمي' },
    { hex: '#ffffff', name: 'أبيض ثلجي' }
  ];

  const THEMES = {
    munera: {
      title: 'مرسم منيرة',
      subtitle: 'الأميرة الفنانة الصغيرة ✨',
      icon: '👑',
      themeColor: '#ff5c93',
      defaultColor: '#ff477e',
      decorations: ['👑', '🦋', '🌸', '✨', '💖', '🎨'],
      stamps: ['👑', '🐱', '🦋', '💖', '🌸', '⭐', '🌙', '🇰🇼', '🍓', '🎀'],
      clearQuestion: 'هل تريدين فتح صفحة بيضاء جديدة يا منيرة؟',
      celebrateMsg: 'لوحة مذهلة يا أميرة منيرة! تم حفظ رسمتكِ 🎉👑',
      watermark: 'مرسم منيرة 👑'
    },
    boys: {
      title: 'مرسم هادي وسلطان',
      subtitle: 'مغامرات الرسم للأبطال ⚡',
      icon: '🚀',
      themeColor: '#0284c7',
      defaultColor: '#0284c7',
      decorations: ['🚀', '🚗', '⛵', '⚡', '⚽', '🪐'],
      stamps: ['🚀', '🚗', '🐶', '⛵', '🇰🇼', '⚽', '🦁', '⚡', '🪐', '🏆'],
      clearQuestion: 'هل تريدان فتح لوحة جديدة يا هادي وسلطان؟',
      celebrateMsg: 'إبداع بطولي يا هادي وسلطان! تم حفظ اللوحة 🎉🚀',
      watermark: 'مرسم هادي وسلطان 🚀'
    }
  };

  // ==================== حالة التطبيق (State) ====================
  const state = {
    theme: 'munera', // الافتراضي دائماً لمنيرة
    tool: 'brush', // brush | marker | glow | bucket | stamp | eraser
    color: '#ff477e',
    brushSize: 18,
    selectedStamp: '👑',
    nightPaper: false,
    activeTemplate: null,
    templatesTrayOpen: false,
    isDrawing: false,
    activePointerId: null,
    points: [],
    lastStampPos: null,
    undoStack: [],
    redoStack: [],
    maxHistory: 25
  };

  // ==================== عناصر الواجهة (DOM) ====================
  const drawCanvas = document.getElementById('draw-canvas');
  const outlineCanvas = document.getElementById('outline-canvas');
  const fxCanvas = document.getElementById('fx-canvas');
  const canvasContainer = document.getElementById('canvas-container');

  const drawCtx = drawCanvas.getContext('2d', { willReadFrequently: true });
  const outlineCtx = outlineCanvas.getContext('2d', { willReadFrequently: true });
  const fxCtx = fxCanvas.getContext('2d');

  // ==================== المؤثرات البصرية والجسيمات (FX Engine) ====================
  const particles = [];

  function spawnSparkles(x, y, count = 4, customColor = null) {
    const emojis = state.theme === 'munera' ? ['✨', '💖', '🌸', '⭐'] : ['⚡', '⭐', '🔥', '✨'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3.2;
      particles.push({
        type: Math.random() > 0.45 ? 'circle' : 'emoji',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8,
        size: 5 + Math.random() * 8,
        color: customColor || state.color,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        alpha: 1,
        decay: 0.025 + Math.random() * 0.02
      });
    }
  }

  function spawnConfettiBurst() {
    const w = fxCanvas.width;
    const h = fxCanvas.height;
    const confettiColors = ['#ff477e', '#fbbf24', '#38bdf8', '#16a34a', '#a855f7', '#f97316'];
    const emojis = state.theme === 'munera' ? ['👑', '💖', '🦋', '🌸', '✨'] : ['🚀', '🏆', '⚡', '⚽', '⭐'];

    for (let i = 0; i < 110; i++) {
      particles.push({
        type: i % 5 === 0 ? 'emoji' : 'confetti',
        x: w * 0.5 + (Math.random() - 0.5) * (w * 0.6),
        y: h * 0.45 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: -6 - Math.random() * 10,
        gravity: 0.25,
        size: 8 + Math.random() * 10,
        color: confettiColors[i % confettiColors.length],
        emoji: emojis[i % emojis.length],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.007
      });
    }
  }

  function spawnBubblesSweep() {
    const w = fxCanvas.width;
    const h = fxCanvas.height;
    for (let i = 0; i < 45; i++) {
      particles.push({
        type: 'emoji',
        x: Math.random() * w,
        y: h + Math.random() * 60,
        vx: (Math.random() - 0.5) * 2,
        vy: -4 - Math.random() * 6,
        size: 18 + Math.random() * 16,
        emoji: '🫧',
        alpha: 1,
        decay: 0.015 + Math.random() * 0.01
      });
    }
  }

  function animateFX() {
    fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.gravity) p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      fxCtx.save();
      fxCtx.globalAlpha = Math.max(0, p.alpha);

      if (p.type === 'circle') {
        fxCtx.fillStyle = p.color;
        fxCtx.beginPath();
        fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fxCtx.fill();
      } else if (p.type === 'confetti') {
        p.rotation += p.vRot;
        fxCtx.translate(p.x, p.y);
        fxCtx.rotate(p.rotation);
        fxCtx.fillStyle = p.color;
        fxCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.type === 'emoji') {
        fxCtx.font = `${Math.round(p.size * 1.6)}px sans-serif`;
        fxCtx.textAlign = 'center';
        fxCtx.textBaseline = 'middle';
        fxCtx.fillText(p.emoji, p.x, p.y);
      }

      fxCtx.restore();
    }

    requestAnimationFrame(animateFX);
  }

  // ==================== تهيئة اللوحة وأبعادها ====================
  function getPaperColor() {
    return state.nightPaper ? '#130f26' : '#ffffff';
  }

  function initCanvases() {
    const rect = canvasContainer.getBoundingClientRect();
    const w = Math.max(300, Math.floor(rect.width));
    const h = Math.max(240, Math.floor(rect.height));

    let prevDraw = null;
    if (drawCanvas.width > 0 && drawCanvas.height > 0) {
      prevDraw = document.createElement('canvas');
      prevDraw.width = drawCanvas.width;
      prevDraw.height = drawCanvas.height;
      prevDraw.getContext('2d').drawImage(drawCanvas, 0, 0);
    }

    drawCanvas.width = w;
    drawCanvas.height = h;
    outlineCanvas.width = w;
    outlineCanvas.height = h;
    fxCanvas.width = w;
    fxCanvas.height = h;

    drawCtx.fillStyle = getPaperColor();
    drawCtx.fillRect(0, 0, w, h);

    if (prevDraw) {
      drawCtx.drawImage(prevDraw, 0, 0, w, h);
    }

    if (state.activeTemplate) {
      renderActiveTemplate();
    }
  }

  // ==================== إدارة التراجع والإعادة (Undo / Redo) ====================
  function saveHistorySnapshot() {
    const snap = drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height);
    state.undoStack.push(snap);
    if (state.undoStack.length > state.maxHistory) {
      state.undoStack.shift();
    }
    state.redoStack = [];
    updateHistoryButtons();
  }

  function updateHistoryButtons() {
    document.getElementById('btn-undo').disabled = state.undoStack.length <= 1;
    document.getElementById('btn-redo').disabled = state.redoStack.length === 0;
  }

  function handleUndo() {
    if (state.undoStack.length <= 1) return;
    const current = state.undoStack.pop();
    state.redoStack.push(current);
    const prev = state.undoStack[state.undoStack.length - 1];
    drawCtx.putImageData(prev, 0, 0);
    updateHistoryButtons();
    window.soundStudio.playUndo();
  }

  function handleRedo() {
    if (state.redoStack.length === 0) return;
    const next = state.redoStack.pop();
    state.undoStack.push(next);
    drawCtx.putImageData(next, 0, 0);
    updateHistoryButtons();
    window.soundStudio.playPop(640);
  }

  // ==================== تبديل الثيم: مرسم منيرة ⇄ مرسم هادي وسلطان ====================
  function applyTheme(themeKey, playAudio = true) {
    state.theme = themeKey;
    const cfg = THEMES[themeKey];
    document.documentElement.setAttribute('data-theme', themeKey);
    document.getElementById('meta-theme-color').setAttribute('content', cfg.themeColor);

    document.getElementById('studio-title').textContent = cfg.title;
    document.getElementById('studio-subtitle').textContent = cfg.subtitle;
    document.getElementById('brand-icon').textContent = cfg.icon;
    document.getElementById('stamp-tool-icon').textContent = cfg.stamps[0];
    document.querySelector('#clear-modal h3').textContent = cfg.clearQuestion;

    document.getElementById('btn-theme-munera').classList.toggle('active', themeKey === 'munera');
    document.getElementById('btn-theme-boys').classList.toggle('active', themeKey === 'boys');

    cfg.decorations.forEach((emoji, idx) => {
      const el = document.getElementById(`deco-${idx + 1}`);
      if (el) el.textContent = emoji;
    });

    state.selectedStamp = cfg.stamps[0];
    renderStampsTray();
    renderTemplatesQuickTray();

    selectColor(cfg.defaultColor, false);

    if (playAudio) {
      window.soundStudio.playThemeSwitch(themeKey === 'boys');
      spawnSparkles(fxCanvas.width / 2, fxCanvas.height / 2, 18, cfg.defaultColor);
      showToast(
        themeKey === 'munera' ? '👑 أهلاً بكِ في مرسم الأميرة منيرة!' : '🚀 أهلاً بالأبطال في مرسم هادي وسلطان!',
        cfg.icon
      );
    }
  }

  // ==================== بناء شريط الألوان والملصقات ولوحات التلوين ====================
  function renderPalette() {
    const container = document.getElementById('colors-container');
    container.innerHTML = '';

    PALETTE_COLORS.forEach((c, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'color-swatch' + (c.hex === state.color ? ' active' : '');
      btn.style.backgroundColor = c.hex;
      if (c.hex === '#ffffff') {
        btn.style.border = '3.5px solid #cbd5e1';
      }
      btn.title = c.name;
      btn.dataset.color = c.hex;

      btn.addEventListener('click', () => {
        selectColor(c.hex, true, idx);
      });

      container.appendChild(btn);
    });
  }

  function selectColor(hex, playSound = true, idx = 0) {
    state.color = hex;

    if (state.tool === 'eraser') {
      selectTool('brush', false);
    }

    document.querySelectorAll('.color-swatch').forEach((el) => {
      el.classList.toggle('active', el.dataset.color.toLowerCase() === hex.toLowerCase());
    });

    const previewColor = hex.toLowerCase() === '#ffffff' ? '#94a3b8' : hex;
    document.querySelectorAll('.size-dot').forEach((dot) => {
      dot.style.backgroundColor = previewColor;
    });

    if (playSound) {
      window.soundStudio.playColorSelect(idx);
    }
  }

  function renderStampsTray() {
    const list = document.getElementById('stamps-list');
    list.innerHTML = '';
    const stamps = THEMES[state.theme].stamps;

    stamps.forEach((emoji) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'stamp-item-btn' + (emoji === state.selectedStamp ? ' active' : '');
      btn.textContent = emoji;
      btn.addEventListener('click', () => {
        state.selectedStamp = emoji;
        document.querySelectorAll('.stamp-item-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        window.soundStudio.playPop(720);
      });
      list.appendChild(btn);
    });
  }

  function renderTemplatesQuickTray() {
    const list = document.getElementById('templates-quick-list');
    if (!list) return;
    list.innerHTML = '';

    window.COLORING_PAGES.forEach((page) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = state.activeTemplate && state.activeTemplate.id === page.id;
      btn.className = 'template-quick-btn' + (isActive ? ' active' : '');
      btn.innerHTML = `<span class="tq-emoji">${page.badge}</span><span>${page.title}</span>`;

      btn.addEventListener('click', () => {
        loadColoringPage(page);
      });

      list.appendChild(btn);
    });
  }

  function loadColoringPage(page) {
    state.activeTemplate = page;
    drawCtx.fillStyle = getPaperColor();
    drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
    renderActiveTemplate();
    renderTemplatesQuickTray();
    saveHistorySnapshot();

    // تفعيل دلو التلوين أو الفرشاة لتسهيل التلوين الفوري للطفل
    if (state.tool === 'eraser' || state.tool === 'stamp') {
      selectTool('bucket', false);
    }

    document.getElementById('coloring-modal').classList.add('hidden');
    window.soundStudio.playCelebrate();
    showToast(`هيّا نلوّن "${page.title}"! 🎨`, page.badge);
  }

  function toggleTemplatesTray(forceState = null) {
    state.templatesTrayOpen = forceState !== null ? forceState : !state.templatesTrayOpen;
    const tray = document.getElementById('templates-tray');
    const dockBtn = document.getElementById('btn-dock-templates');

    if (state.templatesTrayOpen) {
      document.getElementById('stamps-tray').classList.add('hidden');
      tray.classList.remove('hidden');
      dockBtn.classList.add('active');
      renderTemplatesQuickTray();
    } else {
      tray.classList.add('hidden');
      dockBtn.classList.remove('active');
    }
  }

  function selectTool(toolName, playSound = true) {
    state.tool = toolName;
    document.querySelectorAll('.tool-btn[data-tool]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tool === toolName);
    });

    if (toolName === 'stamp') {
      toggleTemplatesTray(false);
    }

    const stampsTray = document.getElementById('stamps-tray');
    stampsTray.classList.toggle('hidden', toolName !== 'stamp');

    if (playSound) {
      window.soundStudio.playPop(580);
    }
  }

  // ==================== الرسم بالقلم واليد (Apple Pencil + Touch) ====================
  function getCanvasCoords(e) {
    const rect = drawCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (drawCanvas.width / rect.width),
      y: (e.clientY - rect.top) * (drawCanvas.height / rect.height),
      pressure: e.pointerType === 'pen' && e.pressure > 0 ? e.pressure : 0.65
    };
  }

  function getEffectiveSize(pressure) {
    if (state.tool === 'eraser') return state.brushSize * 1.4;
    const factor = 0.65 + pressure * 0.65;
    return Math.max(4, state.brushSize * factor);
  }

  function placeStampAt(x, y) {
    const size = Math.max(36, state.brushSize * 2.5);
    drawCtx.save();
    drawCtx.translate(x, y);
    const angle = (Math.random() - 0.5) * 0.28;
    drawCtx.rotate(angle);
    drawCtx.font = `${Math.round(size)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
    drawCtx.textAlign = 'center';
    drawCtx.textBaseline = 'middle';
    drawCtx.fillText(state.selectedStamp, 0, 0);
    drawCtx.restore();

    spawnSparkles(x, y, 5, state.color);
    window.soundStudio.playStamp();
  }

  function handlePointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    if (state.isDrawing && state.activePointerId !== e.pointerId) return;

    e.preventDefault();
    window.soundStudio.init();

    const pt = getCanvasCoords(e);

    if (state.tool === 'bucket') {
      performFloodFill(Math.round(pt.x), Math.round(pt.y), state.color);
      saveHistorySnapshot();
      spawnSparkles(pt.x, pt.y, 10, state.color);
      window.soundStudio.playBucketFill();
      return;
    }

    if (state.tool === 'stamp') {
      state.isDrawing = true;
      state.activePointerId = e.pointerId;
      state.lastStampPos = pt;
      placeStampAt(pt.x, pt.y);
      return;
    }

    state.isDrawing = true;
    state.activePointerId = e.pointerId;
    state.points = [pt];

    drawDot(pt);
  }

  function drawDot(pt) {
    drawCtx.save();
    const radius = getEffectiveSize(pt.pressure) / 2;

    if (state.tool === 'eraser') {
      drawCtx.fillStyle = getPaperColor();
    } else if (state.tool === 'glow') {
      drawCtx.shadowColor = state.color;
      drawCtx.shadowBlur = 18;
      drawCtx.fillStyle = state.color;
      window.soundStudio.playMagicSparkle();
    } else if (state.tool === 'marker') {
      drawCtx.globalAlpha = 0.45;
      drawCtx.fillStyle = state.color;
    } else {
      drawCtx.fillStyle = state.color;
    }

    drawCtx.beginPath();
    drawCtx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
    drawCtx.fill();
    drawCtx.restore();
  }

  function handlePointerMove(e) {
    if (!state.isDrawing || e.pointerId !== state.activePointerId) return;
    e.preventDefault();

    const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];

    for (const ev of events) {
      const pt = getCanvasCoords(ev);

      if (state.tool === 'stamp') {
        const dx = pt.x - state.lastStampPos.x;
        const dy = pt.y - state.lastStampPos.y;
        const dist = Math.hypot(dx, dy);
        const minStep = Math.max(48, state.brushSize * 2.4);
        if (dist >= minStep) {
          placeStampAt(pt.x, pt.y);
          state.lastStampPos = pt;
        }
        continue;
      }

      state.points.push(pt);
      const len = state.points.length;

      if (len < 2) continue;

      const p1 = state.points[len - 2];
      const p2 = state.points[len - 1];

      drawCtx.save();
      drawCtx.lineCap = 'round';
      drawCtx.lineJoin = 'round';
      drawCtx.lineWidth = getEffectiveSize(p2.pressure);

      if (state.tool === 'eraser') {
        drawCtx.strokeStyle = getPaperColor();
      } else if (state.tool === 'glow') {
        drawCtx.strokeStyle = '#ffffff';
        drawCtx.shadowColor = state.color;
        drawCtx.shadowBlur = 22;
        if (Math.random() < 0.35) spawnSparkles(p2.x, p2.y, 1, state.color);
        window.soundStudio.playMagicSparkle();
      } else if (state.tool === 'marker') {
        drawCtx.globalAlpha = 0.32;
        drawCtx.strokeStyle = state.color;
      } else {
        drawCtx.strokeStyle = state.color;
      }

      drawCtx.beginPath();
      if (len === 2) {
        drawCtx.moveTo(p1.x, p1.y);
        drawCtx.lineTo(p2.x, p2.y);
      } else {
        const p0 = state.points[len - 3];
        const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        drawCtx.moveTo(mid1.x, mid1.y);
        drawCtx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
      }
      drawCtx.stroke();

      if (state.tool === 'glow') {
        drawCtx.strokeStyle = state.color;
        drawCtx.lineWidth = getEffectiveSize(p2.pressure) * 0.7;
        drawCtx.stroke();
      }

      drawCtx.restore();
    }
  }

  function handlePointerUp(e) {
    if (!state.isDrawing || e.pointerId !== state.activePointerId) return;
    state.isDrawing = false;
    state.activePointerId = null;
    state.points = [];
    saveHistorySnapshot();
  }

  // ==================== خوارزمية دلو التلوين السحري الذكي (Scanline Flood Fill) ====================
  function hexToRgba(hex) {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 255];
  }

  function performFloodFill(startX, startY, fillHex) {
    const w = drawCanvas.width;
    const h = drawCanvas.height;
    if (startX < 0 || startX >= w || startY < 0 || startY >= h) return;

    const drawData = drawCtx.getImageData(0, 0, w, h);
    const pixels = drawData.data;

    const hasTemplate = Boolean(state.activeTemplate);
    const outlinePixels = hasTemplate ? outlineCtx.getImageData(0, 0, w, h).data : null;

    const startIdx = (startY * w + startX) * 4;

    if (hasTemplate && outlinePixels[startIdx + 3] > 140) {
      return;
    }

    const targetR = pixels[startIdx];
    const targetG = pixels[startIdx + 1];
    const targetB = pixels[startIdx + 2];
    const [fillR, fillG, fillB] = hexToRgba(fillHex);

    if (
      Math.abs(targetR - fillR) < 8 &&
      Math.abs(targetG - fillG) < 8 &&
      Math.abs(targetB - fillB) < 8
    ) {
      return;
    }

    const tolerance = 48;
    const visited = new Uint8Array(w * h);

    function matchesTarget(pxIndex) {
      const i = pxIndex * 4;
      if (hasTemplate && outlinePixels[i + 3] > 110) {
        return false;
      }
      const dr = Math.abs(pixels[i] - targetR);
      const dg = Math.abs(pixels[i + 1] - targetG);
      const db = Math.abs(pixels[i + 2] - targetB);
      return dr <= tolerance && dg <= tolerance && db <= tolerance;
    }

    function colorPixel(pxIndex) {
      const i = pxIndex * 4;
      pixels[i] = fillR;
      pixels[i + 1] = fillG;
      pixels[i + 2] = fillB;
      pixels[i + 3] = 255;
    }

    const stack = [startY * w + startX];
    visited[startY * w + startX] = 1;

    while (stack.length > 0) {
      const idx = stack.pop();
      const x = idx % w;
      const y = (idx - x) / w;

      colorPixel(idx);

      if (x > 0) {
        const left = idx - 1;
        if (!visited[left] && matchesTarget(left)) {
          visited[left] = 1;
          stack.push(left);
        }
      }
      if (x < w - 1) {
        const right = idx + 1;
        if (!visited[right] && matchesTarget(right)) {
          visited[right] = 1;
          stack.push(right);
        }
      }
      if (y > 0) {
        const up = idx - w;
        if (!visited[up] && matchesTarget(up)) {
          visited[up] = 1;
          stack.push(up);
        }
      }
      if (y < h - 1) {
        const down = idx + w;
        if (!visited[down] && matchesTarget(down)) {
          visited[down] = 1;
          stack.push(down);
        }
      }
    }

    drawCtx.putImageData(drawData, 0, 0);
  }

  // ==================== دفتر التلوين السحري (Coloring Book) ====================
  function renderActiveTemplate() {
    outlineCtx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height);
    if (!state.activeTemplate) {
      document.getElementById('active-template-pill').classList.add('hidden');
      renderTemplatesQuickTray();
      return;
    }

    const temp = document.createElement('canvas');
    temp.width = outlineCanvas.width;
    temp.height = outlineCanvas.height;
    const tCtx = temp.getContext('2d');

    state.activeTemplate.draw(tCtx, temp.width, temp.height);

    const imgData = tCtx.getImageData(0, 0, temp.width, temp.height);
    const d = imgData.data;
    const isNight = state.nightPaper;

    for (let i = 0; i < d.length; i += 4) {
      const a = d[i + 3];
      if (a > 0) {
        const brightness = (d[i] + d[i + 1] + d[i + 2]) / 3;
        if (brightness > 200) {
          d[i + 3] = 0;
        } else if (isNight) {
          d[i] = 226;
          d[i + 1] = 232;
          d[i + 2] = 240;
        }
      }
    }

    outlineCtx.putImageData(imgData, 0, 0);

    const pill = document.getElementById('active-template-pill');
    document.getElementById('active-template-name').textContent = `${state.activeTemplate.badge} ${state.activeTemplate.title}`;
    pill.classList.remove('hidden');
  }

  function openColoringModal(filterCategory = null) {
    const modal = document.getElementById('coloring-modal');
    modal.classList.remove('hidden');
    const defaultFilter = filterCategory || 'all';
    renderColoringGrid(defaultFilter);
    window.soundStudio.playPop(620);
  }

  function renderColoringGrid(filter = 'all') {
    document.querySelectorAll('.modal-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.filter === filter);
    });

    const grid = document.getElementById('coloring-grid');
    grid.innerHTML = '';

    const pages = [...window.COLORING_PAGES];
    const filtered =
      filter === 'all'
        ? pages
        : pages.filter((p) => p.category === filter || p.category === 'all');

    filtered.forEach((page) => {
      const card = document.createElement('div');
      card.className = 'coloring-card';

      const preview = document.createElement('canvas');
      preview.width = 280;
      preview.height = 200;
      preview.className = 'coloring-preview-canvas';
      const pCtx = preview.getContext('2d');
      page.draw(pCtx, preview.width, preview.height);

      const title = document.createElement('div');
      title.className = 'coloring-card-title';
      title.innerHTML = `<span>${page.badge}</span><span>${page.title}</span>`;

      card.appendChild(preview);
      card.appendChild(title);

      card.addEventListener('click', () => {
        loadColoringPage(page);
      });

      grid.appendChild(card);
    });
  }

  // ==================== معرض اللوحات والحفظ والاحتفال ====================
  const STORAGE_KEY = 'munera_studio_gallery_v1';

  function getSavedArtworks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveArtworksList(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      if (list.length > 1) {
        list.pop();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    }
    updateGalleryBadge();
  }

  function updateGalleryBadge() {
    const list = getSavedArtworks();
    document.getElementById('gallery-count').textContent = list.length;
  }

  function createCompositeCanvas(includeWatermark = true) {
    const out = document.createElement('canvas');
    out.width = drawCanvas.width;
    out.height = drawCanvas.height;
    const ctx = out.getContext('2d');

    ctx.drawImage(drawCanvas, 0, 0);
    if (state.activeTemplate) {
      ctx.drawImage(outlineCanvas, 0, 0);
    }

    if (includeWatermark) {
      const wmText = THEMES[state.theme].watermark;
      ctx.save();
      ctx.font = 'bold 20px Tajawal, sans-serif';
      const metrics = ctx.measureText(wmText);
      const padX = 16;
      const boxW = metrics.width + padX * 2;
      const boxH = 36;
      const x = out.width - boxW - 16;
      const y = out.height - boxH - 14;

      ctx.fillStyle = state.theme === 'munera' ? 'rgba(255, 71, 126, 0.88)' : 'rgba(2, 132, 199, 0.88)';
      ctx.beginPath();
      ctx.roundRect(x, y, boxW, boxH, 18);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(wmText, x + boxW / 2, y + boxH / 2 + 1);
      ctx.restore();
    }

    return out;
  }

  function celebrateAndSave() {
    window.soundStudio.playCelebrate();
    spawnConfettiBurst();

    const composite = createCompositeCanvas(true);
    const dataUrl = composite.toDataURL('image/png');

    const list = getSavedArtworks();
    list.unshift({
      id: Date.now(),
      theme: state.theme,
      title: THEMES[state.theme].title,
      date: new Date().toLocaleDateString('ar-SA'),
      dataUrl
    });
    if (list.length > 18) list.pop();
    saveArtworksList(list);

    const link = document.createElement('a');
    const filePrefix = state.theme === 'munera' ? 'لوحة-منيرة' : 'لوحة-هادي-وسلطان';
    link.download = `${filePrefix}-${Date.now().toString().slice(-4)}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(THEMES[state.theme].celebrateMsg, '🎉');
  }

  function renderGalleryModal() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    const list = getSavedArtworks();

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-gallery-msg">لا توجد لوحات محفوظة بعد! ارسموا لوحة جميلة واضغطوا على "حفظ واحتفال 🎉"</div>`;
      return;
    }

    list.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';

      const img = document.createElement('img');
      img.src = item.dataUrl;
      img.alt = item.title;
      img.className = 'gallery-preview-img';

      const title = document.createElement('div');
      title.className = 'coloring-card-title';
      title.textContent = `${item.theme === 'munera' ? '👑' : '🚀'} ${item.title} (${item.date})`;

      const actions = document.createElement('div');
      actions.className = 'gallery-card-actions';

      const loadBtn = document.createElement('button');
      loadBtn.type = 'button';
      loadBtn.className = 'gallery-action-btn';
      loadBtn.textContent = 'تعديل اللوحة 🖌️';
      loadBtn.addEventListener('click', () => {
        const image = new Image();
        image.onload = () => {
          state.activeTemplate = null;
          renderActiveTemplate();
          drawCtx.fillStyle = getPaperColor();
          drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
          drawCtx.drawImage(image, 0, 0, drawCanvas.width, drawCanvas.height);
          saveHistorySnapshot();
          document.getElementById('gallery-modal').classList.add('hidden');
          showToast('تم فتح اللوحة للتعديل! 🎨', '🖌️');
        };
        image.src = item.dataUrl;
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'gallery-action-btn delete';
      delBtn.textContent = '🗑️';
      delBtn.title = 'حذف اللوحة';
      delBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const updated = getSavedArtworks().filter((x) => x.id !== item.id);
        saveArtworksList(updated);
        renderGalleryModal();
        window.soundStudio.playUndo();
      });

      actions.appendChild(loadBtn);
      actions.appendChild(delBtn);

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  // ==================== إشعار لطيف عائم (Toast) ====================
  let toastTimer = null;
  function showToast(message, emoji = '✨') {
    const toast = document.getElementById('magic-toast');
    document.getElementById('toast-emoji').textContent = emoji;
    document.getElementById('toast-text').textContent = message;
    toast.classList.remove('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  // ==================== ربط الأحداث والأزرار ====================
  function bindEvents() {
    drawCanvas.addEventListener('pointerdown', handlePointerDown);
    drawCanvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    drawCanvas.addEventListener('contextmenu', (e) => e.preventDefault());

    document.getElementById('btn-theme-munera').addEventListener('click', () => {
      if (state.theme !== 'munera') applyTheme('munera', true);
    });
    document.getElementById('btn-theme-boys').addEventListener('click', () => {
      if (state.theme !== 'boys') applyTheme('boys', true);
    });

    document.getElementById('brand-badge').addEventListener('click', () => {
      window.soundStudio.playCelebrate();
      spawnSparkles(fxCanvas.width / 2, fxCanvas.height / 3, 22, state.color);
    });

    // اختيار الأدوات
    document.querySelectorAll('.tool-btn[data-tool]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectTool(btn.dataset.tool, true);
      });
    });

    // زر "صور تلوين" في القائمة الجانبية (بديل قوس قزح)
    document.getElementById('btn-dock-templates').addEventListener('click', () => {
      toggleTemplatesTray();
      window.soundStudio.playPop(660);
    });

    document.getElementById('btn-open-all-templates').addEventListener('click', () => {
      openColoringModal('all');
    });

    // اختيار أحجام الفرشاة
    document.querySelectorAll('.size-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.brushSize = Number(btn.dataset.size);
        document.querySelectorAll('.size-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        window.soundStudio.playPop(460 + state.brushSize * 6);
      });
    });

    document.getElementById('custom-color-Input').addEventListener('input', (e) => {
      selectColor(e.target.value, true, 5);
    });

    document.getElementById('btn-undo').addEventListener('click', handleUndo);
    document.getElementById('btn-redo').addEventListener('click', handleRedo);

    document.getElementById('btn-paper-mode').addEventListener('click', () => {
      const oldPaperHex = getPaperColor();
      state.nightPaper = !state.nightPaper;
      const newPaperHex = getPaperColor();

      canvasContainer.classList.toggle('night-paper', state.nightPaper);
      document.getElementById('paper-mode-icon').textContent = state.nightPaper ? '☀️' : '🌙';
      document.getElementById('paper-mode-text').textContent = state.nightPaper ? 'ورقة بيضاء' : 'ورقة ليلية';

      const imgData = drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height);
      const d = imgData.data;
      const [oldR, oldG, oldB] = hexToRgba(oldPaperHex);
      const [newR, newG, newB] = hexToRgba(newPaperHex);

      for (let i = 0; i < d.length; i += 4) {
        if (
          Math.abs(d[i] - oldR) < 15 &&
          Math.abs(d[i + 1] - oldG) < 15 &&
          Math.abs(d[i + 2] - oldB) < 15
        ) {
          d[i] = newR;
          d[i + 1] = newG;
          d[i + 2] = newB;
        }
      }
      drawCtx.putImageData(imgData, 0, 0);

      if (state.activeTemplate) {
        renderActiveTemplate();
      }
      saveHistorySnapshot();

      if (state.nightPaper) {
        selectTool('glow', false);
        showToast('تم تفعيل الورقة الليلية مع الفرشاة المضيئة! ✨🌙', '🌙');
      } else {
        showToast('تم تفعيل الورقة البيضاء المشرقة! ☀️', '☀️');
      }
      window.soundStudio.playPop(700);
    });

    document.getElementById('btn-remove-template').addEventListener('click', () => {
      state.activeTemplate = null;
      renderActiveTemplate();
      window.soundStudio.playUndo();
    });

    document.getElementById('btn-coloring-book').addEventListener('click', () => {
      openColoringModal('all');
    });
    document.getElementById('close-coloring-modal').addEventListener('click', () => {
      document.getElementById('coloring-modal').classList.add('hidden');
    });
    document.querySelectorAll('.modal-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        renderColoringGrid(tab.dataset.filter);
        window.soundStudio.playPop(650);
      });
    });

    document.getElementById('btn-gallery').addEventListener('click', () => {
      renderGalleryModal();
      document.getElementById('gallery-modal').classList.remove('hidden');
      window.soundStudio.playPop(620);
    });
    document.getElementById('close-gallery-modal').addEventListener('click', () => {
      document.getElementById('gallery-modal').classList.add('hidden');
    });

    document.getElementById('btn-clear').addEventListener('click', () => {
      document.getElementById('clear-modal').classList.remove('hidden');
      window.soundStudio.playPop(500);
    });
    document.getElementById('confirm-clear-no').addEventListener('click', () => {
      document.getElementById('clear-modal').classList.add('hidden');
      window.soundStudio.playPop(600);
    });
    document.getElementById('confirm-clear-yes').addEventListener('click', () => {
      document.getElementById('clear-modal').classList.add('hidden');
      drawCtx.fillStyle = getPaperColor();
      drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
      saveHistorySnapshot();
      spawnBubblesSweep();
      window.soundStudio.playClear();
      showToast('لوحة جديدة نظيفة وجاهزة للإبداع! 🫧✨', '🫧');
    });

    document.getElementById('btn-sound').addEventListener('click', () => {
      const muted = window.soundStudio.toggleMute();
      document.getElementById('sound-icon').textContent = muted ? '🔇' : '🔊';
    });

    document.getElementById('btn-save').addEventListener('click', celebrateAndSave);

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add('hidden');
        }
      });
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initCanvases();
      }, 150);
    });
  }

  // ==================== بدء التشغيل ====================
  function startStudio() {
    renderPalette();
    applyTheme('munera', false);
    initCanvases();
    saveHistorySnapshot();
    updateGalleryBadge();
    bindEvents();
    requestAnimationFrame(animateFX);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startStudio);
  } else {
    startStudio();
  }
})();

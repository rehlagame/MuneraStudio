/**
 * دفتر اللوحات المخططة للتلوين - مرسم منيرة 👑 ومرسم هادي وسلطان 🚀
 * لوحات تعليمية وإبداعية مرسومة بخطوط واضحة ومغلقة لتنمية مهارات الطفل
 * وتعمل بشكل مثالي مع "دلو التلوين" والفرشاة وأقلام التلوين
 */

const DrawingHelpers = {
  setupTransform(ctx, w, h) {
    const baseW = 800;
    const baseH = 560;
    const scale = Math.min(w / baseW, h / baseH) * 0.92;
    const offsetX = (w - baseW * scale) / 2;
    const offsetY = (h - baseH * scale) / 2;
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    ctx.strokeStyle = '#1e1b2e';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  },

  drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  },

  drawHeart(ctx, x, y, size) {
    const s = size / 2;
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.75);
    ctx.bezierCurveTo(x - s * 1.2, y - s * 0.1, x - s * 0.9, y - s * 1.1, x, y - s * 0.45);
    ctx.bezierCurveTo(x + s * 0.9, y - s * 1.1, x + s * 1.2, y - s * 0.1, x, y + s * 0.75);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  },

  drawDiamond(ctx, x, y, rx, ry) {
    ctx.beginPath();
    ctx.moveTo(x, y - ry);
    ctx.lineTo(x + rx, y);
    ctx.lineTo(x, y + ry);
    ctx.lineTo(x - rx, y);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  },

  drawStar(ctx, cx, cy, spikes, outerR, innerR) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerR;
      y = cy + Math.sin(rot) * outerR;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerR;
      y = cy + Math.sin(rot) * innerR;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  },

  drawCloud(ctx, x, y, w) {
    const r = w * 0.28;
    ctx.beginPath();
    ctx.arc(x - r * 0.9, y, r * 0.75, Math.PI * 0.5, Math.PI * 1.45);
    ctx.arc(x, y - r * 0.45, r * 0.95, Math.PI * 1.05, Math.PI * 1.95);
    ctx.arc(x + r * 0.9, y, r * 0.75, Math.PI * 1.55, Math.PI * 0.5);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
  },

  drawFlower(ctx, x, y, r) {
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      this.drawCircle(ctx, px, py, r * 0.65);
    }
    this.drawCircle(ctx, x, y, r * 0.55);
  }
};

window.COLORING_PAGES = [
  // ==================== 1. علم دولة الكويت 🇰🇼 ====================
  {
    id: 'kuwait_flag',
    title: 'علم دولة الكويت الحبيبة',
    category: 'all',
    badge: '🇰🇼',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // سارية العلم (العمود)
      ctx.beginPath();
      ctx.roundRect(145, 85, 24, 420, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // قمة السارية الدائرية
      H.drawCircle(ctx, 157, 68, 20);

      // قاعدة السارية المدرجة
      ctx.beginPath();
      ctx.roundRect(105, 495, 105, 30, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // أبعاد العلم (مقسم لـ 4 مناطق مغلقة تماماً لتلوين الأخضر والأبيض والأحمر والأسود)
      const fx = 169;
      const fy = 100;
      const fw = 500;
      const fh = 300;
      const stripeH = fh / 3; // 100 لكل شريط
      const trapW = 145; // عرض شبه المنحرف الأسود

      // 1) الشريط العلوي (الأخضر)
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + fw, fy);
      ctx.lineTo(fx + fw, fy + stripeH);
      ctx.lineTo(fx + trapW, fy + stripeH);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // 2) الشريط الأوسط (الأبيض)
      ctx.beginPath();
      ctx.moveTo(fx + trapW, fy + stripeH);
      ctx.lineTo(fx + fw, fy + stripeH);
      ctx.lineTo(fx + fw, fy + stripeH * 2);
      ctx.lineTo(fx + trapW, fy + stripeH * 2);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // 3) الشريط السفلي (الأحمر)
      ctx.beginPath();
      ctx.moveTo(fx + trapW, fy + stripeH * 2);
      ctx.lineTo(fx + fw, fy + stripeH * 2);
      ctx.lineTo(fx + fw, fy + fh);
      ctx.lineTo(fx, fy + fh);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // 4) شبه المنحرف الجانبي (الأسود)
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + trapW, fy + stripeH);
      ctx.lineTo(fx + trapW, fy + stripeH * 2);
      ctx.lineTo(fx, fy + fh);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // غيوم ونجوم لطيفة حول العلم
      H.drawCloud(ctx, 580, 470, 105);
      H.drawStar(ctx, 370, 465, 5, 32, 15);

      ctx.restore();
    }
  },

  // ==================== 2. القطة اللطيفة 🐱 ====================
  {
    id: 'cute_cat',
    title: 'القطة اللطيفة',
    category: 'munera',
    badge: '🐱',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // ذيل القطة
      ctx.beginPath();
      ctx.moveTo(275, 455);
      ctx.bezierCurveTo(155, 450, 145, 330, 210, 330);
      ctx.bezierCurveTo(240, 330, 215, 405, 275, 420);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // جسم القطة
      ctx.beginPath();
      ctx.moveTo(285, 325);
      ctx.quadraticCurveTo(255, 425, 270, 490);
      ctx.lineTo(510, 490);
      ctx.quadraticCurveTo(525, 425, 495, 325);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // منطقة البطن الدائرية للتلوين
      ctx.beginPath();
      ctx.ellipse(390, 425, 62, 55, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // طوق القطة مع الجرس
      ctx.beginPath();
      ctx.roundRect(305, 320, 170, 24, 12);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
      H.drawCircle(ctx, 390, 355, 18);

      // الأذن اليسرى واليمنى
      ctx.beginPath();
      ctx.moveTo(280, 215);
      ctx.lineTo(265, 100);
      ctx.lineTo(355, 150);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(500, 215);
      ctx.lineTo(515, 100);
      ctx.lineTo(425, 150);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // رأس القطة
      ctx.beginPath();
      ctx.ellipse(390, 238, 120, 92, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // فيونكة جميلة على الرأس
      H.drawCircle(ctx, 475, 142, 14);
      ctx.beginPath();
      ctx.moveTo(463, 138);
      ctx.lineTo(425, 112);
      ctx.lineTo(430, 162);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(487, 138);
      ctx.lineTo(525, 112);
      ctx.lineTo(520, 162);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // العيون والأنف
      H.drawCircle(ctx, 340, 228, 16);
      H.drawCircle(ctx, 440, 228, 16);

      ctx.beginPath();
      ctx.moveTo(376, 250);
      ctx.lineTo(404, 250);
      ctx.lineTo(390, 266);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // الفم المبتسم والشوارب
      ctx.beginPath();
      ctx.arc(376, 270, 14, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(404, 270, 14, 0, Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(295, 242); ctx.lineTo(235, 232);
      ctx.moveTo(295, 262); ctx.lineTo(235, 268);
      ctx.moveTo(485, 242); ctx.lineTo(545, 232);
      ctx.moveTo(485, 262); ctx.lineTo(545, 268);
      ctx.stroke();

      // كرة صوف بجانب القطة
      H.drawCircle(ctx, 625, 440, 48);

      ctx.restore();
    }
  },

  // ==================== 3. الكلب اللطيف 🐶 ====================
  {
    id: 'friendly_dog',
    title: 'الكلب اللطيف الوفي',
    category: 'boys',
    badge: '🐶',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // ذيل الكلب المرفوع بسعادة
      ctx.beginPath();
      ctx.moveTo(505, 420);
      ctx.quadraticCurveTo(605, 360, 585, 445);
      ctx.quadraticCurveTo(565, 480, 500, 465);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // جسم الكلب
      ctx.beginPath();
      ctx.moveTo(285, 315);
      ctx.quadraticCurveTo(255, 415, 275, 495);
      ctx.lineTo(505, 495);
      ctx.quadraticCurveTo(525, 415, 495, 315);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // بطن الكلب
      ctx.beginPath();
      ctx.ellipse(390, 425, 60, 58, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // طوق الكلب مع شارة نجمة
      ctx.beginPath();
      ctx.roundRect(295, 310, 190, 26, 12);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
      H.drawStar(ctx, 390, 358, 5, 24, 11);

      // رأس الكلب
      ctx.beginPath();
      ctx.ellipse(390, 220, 112, 95, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // الأذن اليسرى المتدلية اللطيفة
      ctx.beginPath();
      ctx.moveTo(295, 165);
      ctx.bezierCurveTo(200, 165, 190, 305, 255, 305);
      ctx.bezierCurveTo(285, 305, 290, 240, 295, 165);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // الأذن اليمنى المتدلية اللطيفة
      ctx.beginPath();
      ctx.moveTo(485, 165);
      ctx.bezierCurveTo(580, 165, 590, 305, 525, 305);
      ctx.bezierCurveTo(495, 305, 490, 240, 485, 165);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // بقعة لطيفة حول العين اليسرى
      H.drawCircle(ctx, 342, 208, 34);
      // العيون
      H.drawCircle(ctx, 342, 208, 14);
      H.drawCircle(ctx, 438, 208, 14);

      // الأنف البيضاوي الكبير
      ctx.beginPath();
      ctx.ellipse(390, 242, 24, 16, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // اللسان اللطيف خارج الفم
      ctx.beginPath();
      ctx.moveTo(374, 272);
      ctx.quadraticCurveTo(390, 315, 406, 272);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // ابتسامة الكلب
      ctx.beginPath();
      ctx.arc(372, 260, 18, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(408, 260, 18, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();

      // عظمة صغيرة بجانب الكلب
      ctx.beginPath();
      ctx.roundRect(120, 445, 95, 28, 12);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  },

  // ==================== 4. السفينة الشراعية في البحر ⛵ ====================
  {
    id: 'sea_ship',
    title: 'سفينة البحار الجميلة',
    category: 'boys',
    badge: '⛵',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // الشمس المشرقة والغيوم
      H.drawCircle(ctx, 145, 120, 46);
      H.drawCloud(ctx, 630, 125, 110);

      // سارية السفينة الوسطى
      ctx.beginPath();
      ctx.rect(390, 85, 20, 275);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // علم صغير أعلى السارية
      ctx.beginPath();
      ctx.moveTo(410, 85);
      ctx.lineTo(485, 108);
      ctx.lineTo(410, 132);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // الشراع الكبير الأيمن
      ctx.beginPath();
      ctx.moveTo(418, 110);
      ctx.quadraticCurveTo(615, 215, 585, 335);
      ctx.lineTo(418, 335);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // الشراع الأيسر
      ctx.beginPath();
      ctx.moveTo(382, 130);
      ctx.quadraticCurveTo(215, 225, 235, 335);
      ctx.lineTo(382, 335);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // جسم السفينة الخشبي (مقسم لشريطين للتلوين)
      ctx.beginPath();
      ctx.moveTo(155, 355);
      ctx.lineTo(645, 355);
      ctx.lineTo(575, 465);
      ctx.lineTo(225, 465);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // خط تزيين السفينة
      ctx.beginPath();
      ctx.moveTo(178, 392);
      ctx.lineTo(622, 392);
      ctx.stroke();

      // نوافذ السفينة الدائرية
      H.drawCircle(ctx, 300, 428, 20);
      H.drawCircle(ctx, 400, 428, 20);
      H.drawCircle(ctx, 500, 428, 20);

      // شريط أمواج البحر السفلي القابل للتلوين بالأزرق
      ctx.beginPath();
      ctx.moveTo(80, 465);
      ctx.quadraticCurveTo(160, 435, 240, 465);
      ctx.quadraticCurveTo(320, 495, 400, 465);
      ctx.quadraticCurveTo(480, 435, 560, 465);
      ctx.quadraticCurveTo(640, 495, 720, 465);
      ctx.lineTo(720, 520);
      ctx.lineTo(80, 520);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  },

  // ==================== 5. النجم المبتسم الكبير ⭐ ====================
  {
    id: 'smiling_star',
    title: 'النجم السعيد المبتسم',
    category: 'munera',
    badge: '⭐',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // النجم الكبير الرئيسي في المنتصف
      H.drawStar(ctx, 400, 280, 5, 210, 98);

      // عيون النجم اللطيفة
      H.drawCircle(ctx, 355, 255, 18);
      H.drawCircle(ctx, 445, 255, 18);

      // خدود النجم الدائرية للتلوين بالوردي
      H.drawCircle(ctx, 325, 290, 16);
      H.drawCircle(ctx, 475, 290, 16);

      // ابتسامة النجم الواسعة
      ctx.beginPath();
      ctx.arc(400, 285, 34, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      // نجوم صغيرة حول النجم الكبير
      H.drawStar(ctx, 145, 140, 5, 45, 20);
      H.drawStar(ctx, 655, 140, 5, 45, 20);
      H.drawStar(ctx, 155, 430, 5, 38, 17);
      H.drawStar(ctx, 645, 430, 5, 38, 17);

      ctx.restore();
    }
  },

  // ==================== 6. سماء ونجوم وهلال 🌙✨ ====================
  {
    id: 'sky_and_stars',
    title: 'سماء الليل والهلال والنجوم',
    category: 'all',
    badge: '🌙',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // الهلال الكبير المبتسم
      ctx.beginPath();
      ctx.arc(320, 255, 155, 0.35 * Math.PI, 1.65 * Math.PI, false);
      ctx.bezierCurveTo(220, 160, 220, 350, 390, 392);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // غيمة كبيرة ناعمة أسفل الهلال
      H.drawCloud(ctx, 280, 435, 165);
      H.drawCloud(ctx, 565, 420, 140);

      // مجموعة نجوم متلألئة بأحجام متنوعة في السماء
      H.drawStar(ctx, 520, 145, 5, 58, 26);
      H.drawStar(ctx, 650, 255, 5, 46, 21);
      H.drawStar(ctx, 435, 285, 5, 38, 17);
      H.drawStar(ctx, 145, 135, 5, 42, 19);

      // كوكب صغير بحلقة في السماء
      H.drawCircle(ctx, 150, 295, 32);
      ctx.beginPath();
      ctx.ellipse(150, 295, 62, 14, -0.25, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  },

  // ==================== 7. السيارة الجميلة 🚗 ====================
  {
    id: 'happy_car',
    title: 'السيارة الجميلة على الطريق',
    category: 'boys',
    badge: '🚗',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // شمس وغيمة في السماء
      H.drawCircle(ctx, 145, 115, 42);
      H.drawCloud(ctx, 610, 120, 105);

      // سقف السيارة ونوافذها
      ctx.beginPath();
      ctx.moveTo(215, 275);
      ctx.quadraticCurveTo(250, 155, 395, 155);
      ctx.quadraticCurveTo(540, 155, 575, 275);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // النافذة الخلفية والأمامية (مفصولتان بعمود للتلوين السهل)
      ctx.beginPath();
      ctx.moveTo(395, 155);
      ctx.lineTo(395, 275);
      ctx.stroke();

      // جسم السيارة الرئيسي
      ctx.beginPath();
      ctx.roundRect(120, 275, 560, 130, 45);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // المصباح الأمامي والخلفي
      ctx.beginPath();
      ctx.ellipse(662, 325, 16, 26, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(138, 325, 14, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // مقبض الباب
      ctx.beginPath();
      ctx.roundRect(425, 305, 45, 14, 7);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // العجلة الخلفية
      H.drawCircle(ctx, 250, 410, 62);
      H.drawCircle(ctx, 250, 410, 30);

      // العجلة الأمامية
      H.drawCircle(ctx, 550, 410, 62);
      H.drawCircle(ctx, 550, 410, 30);

      // خط الطريق
      ctx.beginPath();
      ctx.moveTo(75, 474);
      ctx.lineTo(725, 474);
      ctx.stroke();

      ctx.restore();
    }
  },

  // ==================== 8. تاج الأميرة منيرة 👑 ====================
  {
    id: 'princess_crown',
    title: 'تاج الأميرة منيرة',
    category: 'munera',
    badge: '👑',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      H.drawStar(ctx, 130, 140, 5, 36, 18);
      H.drawStar(ctx, 670, 140, 5, 36, 18);

      ctx.beginPath();
      ctx.roundRect(160, 410, 480, 65, 30);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(175, 428, 450, 30, 15);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(175, 410);
      ctx.lineTo(140, 210);
      ctx.lineTo(270, 310);
      ctx.lineTo(400, 145);
      ctx.lineTo(530, 310);
      ctx.lineTo(660, 210);
      ctx.lineTo(625, 410);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      H.drawCircle(ctx, 140, 188, 24);
      H.drawCircle(ctx, 400, 118, 30);
      H.drawCircle(ctx, 660, 188, 24);

      H.drawHeart(ctx, 400, 285, 90);
      H.drawDiamond(ctx, 255, 355, 36, 48);
      H.drawDiamond(ctx, 545, 355, 36, 48);

      H.drawCircle(ctx, 240, 443, 12);
      H.drawCircle(ctx, 320, 443, 12);
      H.drawCircle(ctx, 400, 443, 14);
      H.drawCircle(ctx, 480, 443, 12);
      H.drawCircle(ctx, 560, 443, 12);

      H.drawHeart(ctx, 140, 360, 45);
      H.drawHeart(ctx, 660, 360, 45);

      ctx.restore();
    }
  },

  // ==================== 9. الفراشة والزهور 🦋 ====================
  {
    id: 'butterfly_garden',
    title: 'الفراشة والزهور',
    category: 'munera',
    badge: '🦋',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      ctx.beginPath();
      ctx.moveTo(380, 260);
      ctx.bezierCurveTo(220, 90, 95, 150, 140, 280);
      ctx.bezierCurveTo(165, 340, 290, 320, 380, 300);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(420, 260);
      ctx.bezierCurveTo(580, 90, 705, 150, 660, 280);
      ctx.bezierCurveTo(635, 340, 510, 320, 420, 300);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(380, 305);
      ctx.bezierCurveTo(240, 315, 165, 395, 225, 465);
      ctx.bezierCurveTo(280, 520, 365, 445, 382, 370);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(420, 305);
      ctx.bezierCurveTo(560, 315, 635, 395, 575, 465);
      ctx.bezierCurveTo(520, 520, 435, 445, 418, 370);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      H.drawCircle(ctx, 235, 235, 42);
      H.drawCircle(ctx, 565, 235, 42);
      H.drawHeart(ctx, 280, 395, 42);
      H.drawHeart(ctx, 520, 395, 42);

      ctx.beginPath();
      ctx.roundRect(380, 220, 40, 195, 20);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      H.drawCircle(ctx, 400, 195, 34);

      ctx.beginPath();
      ctx.moveTo(385, 165);
      ctx.quadraticCurveTo(350, 105, 320, 125);
      ctx.stroke();
      H.drawCircle(ctx, 315, 128, 10);

      ctx.beginPath();
      ctx.moveTo(415, 165);
      ctx.quadraticCurveTo(450, 105, 480, 125);
      ctx.stroke();
      H.drawCircle(ctx, 485, 128, 10);

      H.drawFlower(ctx, 135, 455, 26);
      H.drawFlower(ctx, 665, 455, 26);

      ctx.restore();
    }
  },

  // ==================== 10. بيت الأحلام والحديقة 🏡 ====================
  {
    id: 'sweet_home',
    title: 'بيت الأحلام والحديقة',
    category: 'munera',
    badge: '🏡',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // شمس وغيمة
      H.drawCircle(ctx, 140, 115, 44);
      H.drawCloud(ctx, 625, 120, 105);

      // جذع الشجرة وتاج الشجرة الأخضر
      ctx.beginPath();
      ctx.rect(605, 330, 45, 165);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
      H.drawCircle(ctx, 628, 275, 78);

      // جدار المنزل الرئيسي
      ctx.beginPath();
      ctx.rect(210, 240, 320, 255);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // سقف المنزل المثلث
      ctx.beginPath();
      ctx.moveTo(175, 240);
      ctx.lineTo(370, 95);
      ctx.lineTo(565, 240);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // نافذة علوية على شكل قلب في السقف
      H.drawHeart(ctx, 370, 185, 52);

      // باب المنزل
      ctx.beginPath();
      ctx.roundRect(330, 355, 80, 140, [40, 40, 0, 0]);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();
      H.drawCircle(ctx, 392, 430, 8);

      // نافذتان جانبيتان
      ctx.beginPath();
      ctx.roundRect(240, 285, 65, 65, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(435, 285, 65, 65, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // زهرة في الحديقة
      H.drawFlower(ctx, 130, 440, 26);

      ctx.restore();
    }
  },

  // ==================== 11. صاروخ الفضاء السريع 🚀 ====================
  {
    id: 'space_rocket',
    title: 'صاروخ الفضاء السريع',
    category: 'boys',
    badge: '🚀',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      H.drawCircle(ctx, 165, 155, 42);
      ctx.beginPath();
      ctx.ellipse(165, 155, 78, 18, -0.3, 0, Math.PI * 2);
      ctx.stroke();

      H.drawStar(ctx, 640, 135, 5, 34, 16);
      H.drawStar(ctx, 650, 340, 5, 26, 12);
      H.drawStar(ctx, 150, 360, 5, 28, 13);

      ctx.beginPath();
      ctx.moveTo(315, 315);
      ctx.quadraticCurveTo(220, 345, 230, 435);
      ctx.lineTo(325, 400);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(485, 315);
      ctx.quadraticCurveTo(580, 345, 570, 435);
      ctx.lineTo(475, 400);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(340, 415);
      ctx.quadraticCurveTo(325, 480, 400, 525);
      ctx.quadraticCurveTo(475, 480, 460, 415);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(368, 415);
      ctx.quadraticCurveTo(360, 460, 400, 490);
      ctx.quadraticCurveTo(440, 460, 432, 415);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(400, 65);
      ctx.quadraticCurveTo(510, 175, 485, 395);
      ctx.lineTo(315, 395);
      ctx.quadraticCurveTo(290, 175, 400, 65);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(334, 165);
      ctx.quadraticCurveTo(400, 185, 466, 165);
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(330, 395, 140, 24, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      H.drawCircle(ctx, 400, 255, 52);
      H.drawCircle(ctx, 400, 255, 36);

      ctx.beginPath();
      ctx.moveTo(315, 345);
      ctx.lineTo(485, 345);
      ctx.stroke();

      ctx.restore();
    }
  },

  // ==================== 12. سمكة البحر اللطيفة 🐠 ====================
  {
    id: 'happy_fish',
    title: 'سمكة البحر الملونة',
    category: 'all',
    badge: '🐠',
    draw(ctx, w, h) {
      const H = DrawingHelpers;
      ctx.save();
      H.setupTransform(ctx, w, h);

      // فقاعات الماء الدائرية
      H.drawCircle(ctx, 185, 195, 16);
      H.drawCircle(ctx, 160, 145, 22);
      H.drawCircle(ctx, 195, 100, 14);

      // الزعنفة العلوية
      ctx.beginPath();
      ctx.moveTo(335, 185);
      ctx.quadraticCurveTo(415, 95, 485, 190);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // الزعنفة السفلية
      ctx.beginPath();
      ctx.moveTo(355, 375);
      ctx.quadraticCurveTo(425, 455, 475, 370);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // ذيل السمكة الكبير
      ctx.beginPath();
      ctx.moveTo(545, 280);
      ctx.quadraticCurveTo(675, 155, 665, 280);
      ctx.quadraticCurveTo(675, 405, 545, 280);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // جسم السمكة الرئيسي
      ctx.beginPath();
      ctx.ellipse(395, 280, 165, 110, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      // خطوط تزيين جسم السمكة لتلوينها بألوان متعددة
      ctx.beginPath();
      ctx.moveTo(340, 178);
      ctx.quadraticCurveTo(385, 280, 340, 382);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(435, 175);
      ctx.quadraticCurveTo(475, 280, 435, 385);
      ctx.stroke();

      // عين السمكة وابتسامتها
      H.drawCircle(ctx, 285, 255, 20);
      ctx.beginPath();
      ctx.arc(275, 295, 22, 0.15 * Math.PI, 0.75 * Math.PI);
      ctx.stroke();

      // نجمة بحر في القاع
      H.drawStar(ctx, 165, 455, 5, 42, 19);

      ctx.restore();
    }
  }
];

# DESIGN_GUIDE.md – הנחיות עיצוב פרימיום למצגת SKILLZ 2026

## ⚠️ קרא קובץ זה לפני כל עבודה על עיצוב או סטיילינג

מסמך זה מגדיר את הכיוון האסתטי של המצגת. העיצוב חייב להיות **production-grade, מרשים ובלתי נשכח** – לא בנאלי, לא גנרי, לא "AI slop".

---

## כיוון אסתטי: "Cinematic Sports Noir"

המצגת צריכה להרגיש כמו **טריילר קולנועי לסרט ספורט** – דרמטית, מקצועית, עם תחושת פרימיום. חשבו על Nike campaign meets ESPN documentary. הקהל הוא הורים שרוצים להרגיש ש-8,400 ₪ שווה כל שקל.

### העקרונות:
1. **Dramatic lighting** – שימוש בגרדיאנטים כהים עם זוהר אדום, לא flat colors
2. **Cinematic typography** – כותרות גדולות ובולטות עם משקל חזותי
3. **Layered depth** – שכבות, shadows, overlays שיוצרים עומק ותלת-מימד
4. **Controlled intensity** – הרגעים הדרמטיים בולטים כי יש סביבם מרחב נשימה
5. **Premium texture** – לא שטוח, יש grain, glow, subtle patterns

---

## טיפוגרפיה

### NO: Inter, Roboto, Arial, system fonts, Heebo רגיל בכל מקום
### YES: שילוב מעניין

**כותרות ראשיות:** `Heebo` weight 900, אבל עם אפקטים:
- `text-shadow` עדין עם glow אדום: `0 0 40px rgba(230, 57, 70, 0.3)`
- `letter-spacing: -0.02em` לתחושת צפיפות דרמטית
- גודל אגרסיבי: `clamp(2.5rem, 6vw, 5rem)`

**מספרים גדולים (01, 02, 100+, 8400):** 
- Weight 900, גודל ענק
- Gradient text effect: `background: linear-gradient(135deg, #e63946, #ff6b6b)` עם `-webkit-background-clip: text`
- או outline-only style: `-webkit-text-stroke: 2px #e63946; color: transparent;`

**טקסט גוף:** `Heebo` weight 400, עם `line-height: 1.7` ו-`color: #d0d0d0` (לא לבן מלא)

---

## צבעים ואווירה

### Gradient System (לא flat colors!)
```css
/* רקע ראשי - לא #0a0a0a שטוח, אלא gradient עם עומק */
--bg-gradient: radial-gradient(ellipse at 20% 50%, rgba(230, 57, 70, 0.08) 0%, #0a0a0a 70%);

/* רקע כרטיסים - glass morphism */
--card-bg: rgba(255, 255, 255, 0.03);
--card-border: rgba(255, 255, 255, 0.08);
--card-bg-hover: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(20px);

/* Glow effects */
--red-glow: 0 0 60px rgba(230, 57, 70, 0.15);
--red-glow-intense: 0 0 100px rgba(230, 57, 70, 0.25);

/* Accent gradient */
--accent-gradient: linear-gradient(135deg, #e63946 0%, #ff6b6b 50%, #e63946 100%);
```

### Noise/Grain Texture
הוסף שכבת grain מעל הכל לתחושת פרימיום:
```css
.slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

---

## כרטיסים (Cards)

### NO: רקע שטוח #1a1a1a עם border רגיל
### YES: Glass morphism עם glow

```css
.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(230, 57, 70, 0.4);
  box-shadow: 0 0 40px rgba(230, 57, 70, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5);
  transform: translateY(-4px);
}
```

### כרטיסי מאמנים – hover effect מיוחד:
```css
.coach-card:hover .coach-image {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.coach-card .coach-image {
  filter: grayscale(30%);
  transition: all 0.5s ease;
}

/* Red accent line under name */
.coach-name::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--accent-gradient);
  margin-top: 8px;
  transition: width 0.3s ease;
}

.coach-card:hover .coach-name::after {
  width: 80px;
}
```

---

## כפתורים

### NO: כפתור שטוח עם background-color
### YES: כפתור עם gradient, glow, ו-hover מרשים

```css
.cta-button {
  background: linear-gradient(135deg, #e63946, #c1303b);
  padding: 14px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(230, 57, 70, 0.3);
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 40px rgba(230, 57, 70, 0.5);
}

/* Shimmer effect */
.cta-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    transparent, 
    rgba(255,255,255,0.1), 
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}
```

---

## סלייד Hero – טיפול מיוחד

ה-Hero צריך להיות **WOW moment**:
- סרטון ברקע עם overlay **gradient** (לא שחור שטוח): `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7), rgba(10,10,10,1))`
- הלוגו נכנס עם **scale + blur**: `filter: blur(20px)` → `filter: blur(0)` 
- הכותרת נכנסת עם **clip-path reveal**: `clip-path: inset(0 100% 0 0)` → `clip-path: inset(0 0 0 0)`
- שורת המידע נכנסת אות-אות או מילה-מילה
- Subtle vignette effect בפינות המסך

---

## אנימציות כניסה – Framer Motion

### NO: fade-in פשוט לכל דבר
### YES: orchestrated entrance עם stagger ו-variety

```javascript
// Container variant with stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

// Mix different animations for children
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } // spring-like
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};
```

### Easing curves מקצועיים:
```
ease-out מהיר: [0.25, 0.46, 0.45, 0.94]
spring-like: [0.34, 1.56, 0.64, 1]
dramatic: [0.87, 0, 0.13, 1]
smooth: [0.4, 0, 0.2, 1]
```

---

## Decorative Elements

### Red accent lines:
```css
.section-divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #e63946, transparent);
  margin: 20px auto;
}
```

### Glowing dots (navigation):
```css
.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: #e63946;
  box-shadow: 0 0 20px rgba(230, 57, 70, 0.5);
  transform: scale(1.3);
}
```

### Diagonal slash accents (inspired by the PDF):
```css
.diagonal-accent {
  position: absolute;
  width: 3px;
  height: 100px;
  background: linear-gradient(to bottom, #e63946, transparent);
  transform: rotate(-20deg);
  opacity: 0.3;
}
```

---

## ספציפי לסליידים

### Flip Cards (סלייד 2):
- צד קדמי: מספר ענק עם gradient text, כותרת מתחת
- צד אחורי: רקע עם glow אדום עדין, טקסט מרכזי
- ה-flip צריך להיות 3D אמיתי עם shadow שמשתנה

### Timeline תשלומים (סלייד 11):
- לא progress bar רגיל – קו אדום זוהר שנמשך עם animation
- העיגולים בשלבים עם pulse glow כשהם "מגיעים"
- הסכומים צריכים להופיע עם counter animation

### Testimonials (סלייד 9):
- גרשיים גדולים – ❝ – בגודל 120px+, בצבע אדום עם opacity 0.15, מאחורי הטקסט
- ה-typing effect עם cursor מהבהב בצבע אדום

---

## Performance Notes

- Grain texture: שימוש ב-SVG inline (לא תמונה חיצונית) לביצועים
- backdrop-filter: מבטלים במובייל ישן (use @supports)
- אנימציות: `will-change: transform, opacity` על אלמנטים מונפשים
- BasketballParticles: CSS only, מבטלים במובייל

---

## TL;DR – הכללים

1. **לא שטוח** – כל משטח צריך עומק (gradients, shadows, glass)
2. **לא גנרי** – כל אלמנט צריך תשומת לב ייחודית
3. **דרמטי אבל מאופק** – הרגעים הגדולים בולטים כי יש סביבם שקט
4. **Premium texture** – grain, glow, blur בכל מקום
5. **Orchestrated motion** – אנימציות מתוזמנות, לא אקראיות
6. **Red = power** – האדום הוא הכוח – שימוש מדויק, לא בכל מקום

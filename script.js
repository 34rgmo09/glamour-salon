// Testimonials
  const testis = [
    { text: '"I\'ve been coming to Glamour for two years and I wouldn\'t go anywhere else. Every visit feels like a treat — the stylists truly listen and the results are always beyond my expectations."', author: '— Amara D., Loyal Client' },
    { text: '"The team here are absolute artists. My balayage looked straight off Pinterest. I get compliments every single day!"', author: '— Sophie K., Happy Client' },
    { text: '"Best facial I\'ve ever had. My skin has never looked better. The atmosphere is so calming — I leave feeling like a new person."', author: '— Lena M., Regular Client' }
  ];
  let currentTesti = 0;

  function changeTesti(i) {
    currentTesti = i;
    document.getElementById('testimonial-text').textContent = testis[i].text;
    document.getElementById('testimonial-author').textContent = testis[i].author;
    document.querySelectorAll('.dot').forEach((d,j) => d.classList.toggle('active', i===j));
  }

  setInterval(() => changeTesti((currentTesti + 1) % testis.length), 5000);

  // Booking form submission
  async function submitBooking() {
    const firstName = document.getElementById('f-firstname').value.trim();
    const lastName  = document.getElementById('f-lastname').value.trim();
    const email     = document.getElementById('f-email').value.trim();
    const phone     = document.getElementById('f-phone').value.trim();
    const service   = document.getElementById('f-service').value;
    const date      = document.getElementById('f-date').value;
    const time      = document.getElementById('f-time').value;
    const errEl     = document.getElementById('form-error');

    if (!firstName || !lastName || !email || !service || !date || !time) {
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';

    // Show confirmation immediately
    document.getElementById('confirm-client-name').textContent = firstName + ' ' + lastName;
    document.getElementById('confirm-service').textContent = service;
    document.getElementById('confirmOverlay').classList.add('show');

    // Send email via Formspree (replace YOUR_FORM_ID after signing up at formspree.io)
    try {
      await fetch('https://formspree.io/f/xvzlgybw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: firstName + ' ' + lastName,
          email: email,
          phone: phone || 'Not provided',
          service: service,
          date: date,
          time: time,
          _subject: `New Booking Request — ${service} — ${firstName} ${lastName}`
        })
      });
    } catch(e) {
      // Confirmation still shows even if email fails
      console.log('Email send error:', e);
    }
  }

  function closeConfirm() {
    document.getElementById('confirmOverlay').classList.remove('show');
    // Reset form
    ['f-firstname','f-lastname','f-email','f-phone','f-date','f-time'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('f-service').selectedIndex = 0;
  }
  function toggleOptions(btn) {
    btn.classList.toggle('open');
    const opts = btn.nextElementSibling;
    opts.classList.toggle('open');
    }
 // Chat — rule-based (free, no API needed)
  const rules = [
    { keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
      reply: "Hi there! 👋 Welcome to Glamour Hair & Beauty! How can I help you today?" },
    { keywords: ['hour', 'open', 'close', 'time', 'when'],
      reply: "We're open every day from 7am to 9pm — including weekends! 🕖" },
    { keywords: ['location', 'address', 'where', 'find you', 'directions'],
      reply: "You can find us at 123 Beauty Lane, Glamour City. Feel free to call us too: +254 (555) 987-6543 📍" },
    { keywords: ['phone', 'call', 'contact', 'number'],
      reply: "You can reach us at +254 (555) 987-6543 or email hello@glamourbeauty.com 📞" },
    { keywords: ['book', 'appointment', 'reserve', 'schedule'],
      reply: "To book an appointment, scroll down to our booking form and fill in your details — we'll confirm within 24 hours! 📅" },
    { keywords: ['price', 'cost', 'how much', 'fee', 'charge'],
      reply: "Here's a quick overview of our prices:\n\n✂️ Hair Styling from $35\n🎨 Hair Colouring from $80\n💅 Nail Care from $25\n✨ Facials from $60\n👁️ Lash & Brow from $45\n💆 Head Massage from $30\n\nScroll up to Services for full details!" },
    { keywords: ['hair', 'braid', 'cornrow', 'loc', 'blowout', 'twist', 'cut', 'style'],
      reply: "Our hair styling services include Box Braids ($80+), Knotless Braids ($100+), Cornrows ($60+), Twist Out ($45+), Blowout & Press ($55+), Locs Maintenance ($70+) and more! ✂️" },
    { keywords: ['colour', 'color', 'highlight', 'balayage', 'ombre', 'dye'],
      reply: "We offer Balayage ($120+), Full Highlights ($100+), Ombre ($110+), Full Colour ($80+), Root Touch-Up ($60+) and Colour Correction ($150+)! 🎨" },
    { keywords: ['nail', 'manicure', 'pedicure', 'acrylic', 'gel'],
      reply: "Our nail services include Classic Manicure ($25+), Gel Manicure ($40+), Acrylic Full Set ($55+), Pedicure ($35+), Gel Pedicure ($50+) and Nail Art ($15+ add-on)! 💅" },
    { keywords: ['facial', 'skin', 'face', 'glow', 'brightening', 'cleanse'],
      reply: "We have Classic Facial ($60+), Deep Cleanse ($75+), Brightening Facial ($85+), Anti-Aging Treatment ($100+) and Hydrating Mask ($70+)! ✨" },
    { keywords: ['lash', 'brow', 'eyebrow', 'extension', 'lamination', 'tint', 'lift'],
      reply: "Our Lash & Brow services include Classic Extensions ($80+), Volume Lashes ($100+), Lash Lift & Tint ($65+), Brow Shaping ($25+), Brow Tint ($20+) and Brow Lamination ($55+)! 👁️" },
    { keywords: ['massage', 'scalp', 'head', 'relax'],
      reply: "We offer Scalp Massage 30min ($30+), Deep Oil Treatment 45min ($50+), Aromatherapy Scalp 60min ($70+) and Hot Towel & Scalp Ritual ($60+)! 💆" },
    { keywords: ['email', 'mail'],
      reply: "You can email us at hello@glamourbeauty.com and we'll get back to you shortly! 📧" },
    { keywords: ['thank', 'thanks', 'appreciate'],
      reply: "You're so welcome! 😊 Is there anything else I can help you with?" },
    { keywords: ['bye', 'goodbye', 'see you'],
      reply: "Goodbye! We can't wait to see you at Glamour Hair & Beauty! ✨" },
  ];

  function getRuleBasedReply(text) {
    const lower = text.toLowerCase();
    for (const rule of rules) {
      if (rule.keywords.some(k => lower.includes(k))) {
        return rule.reply;
      }
    }
    return "I'm not sure about that, but our team can help! 😊 Call us at +254 (555) 987-6543 or email hello@glamourbeauty.com and we'll answer any question!";
  }

  function toggleChat() {
    const w = document.getElementById('chatWindow');
    w.classList.toggle('open');
  }

  function sendMsg() {
    const input = document.getElementById('chatInput');
    const msgs = document.getElementById('chatMessages');
    const text = input.value.trim();
    if (!text) return;

// Show user message
    msgs.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.textContent = 'Typing...';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    // Get reply after short delay to feel natural
    setTimeout(() => {
      const reply = getRuleBasedReply(text);
      typing.remove();
      msgs.innerHTML += `<div class="msg bot">${reply}</div>`;
      msgs.scrollTop = msgs.scrollHeight;
    }, 800);
  }

  // ── MOBILE MENU ──
  function toggleMobileMenu() {
    document.getElementById('hamburger').classList.toggle('open');
    document.getElementById('mobileMenu').classList.toggle('open');
  }
  function closeMobileMenu() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
  }

  // ── SCROLL ANIMATIONS ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  // ── GALLERY LIGHTBOX ──
  const galleryData = [
    { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=90', caption: 'Blowout & Press — Hair Styling' },
    { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=90', caption: 'Hair Colouring — Highlights & Colour' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=90', caption: 'Nail Care — Manicure & Polish' },
    { src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90', caption: 'Facial Treatment — Skin Care' },
    { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=90', caption: 'Lash & Brow — Extensions & Shaping' },
  ];
  let currentLight = 0;

  function openLightbox(i) {
    currentLight = i;
    updateLightbox();
    document.getElementById('lightbox').classList.add('open');
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
  }
  function updateLightbox() {
    document.getElementById('lightbox-img').src = galleryData[currentLight].src;
    document.getElementById('lightbox-caption').textContent = galleryData[currentLight].caption;
  }
  function prevLight() {
    currentLight = (currentLight - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
  }
  function nextLight() {
    currentLight = (currentLight + 1) % galleryData.length;
    updateLightbox();
  }
  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });

  // ── REVIEWS ──
  let selectedStars = 5;
  function setStars(n) {
    selectedStars = n;
    document.querySelectorAll('#starPicker span').forEach((s, i) => {
      s.classList.toggle('active', i < n);
    });
  }
  setStars(5);

  function submitReview() {
    const name    = document.getElementById('r-name').value.trim();
    const service = document.getElementById('r-service').value.trim();
    const text    = document.getElementById('r-text').value.trim();
    if (!name || !text) return;
    const stars = '★'.repeat(selectedStars) + '☆'.repeat(5 - selectedStars);
    const now = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    const card = document.createElement('div');
    card.className = 'review-card reveal visible';
    card.innerHTML = `
      <div class="review-stars">${stars}</div>
      <p class="review-text">"${text}"</p>
      <div class="review-author">${name}</div>
      <div class="review-date">${service ? service + ' · ' : ''}${now}</div>
    `;
    document.getElementById('reviews-grid').appendChild(card);
    document.getElementById('r-name').value = '';
    document.getElementById('r-service').value = '';
    document.getElementById('r-text').value = '';
    setStars(5);
    const thanks = document.getElementById('review-thanks');
    thanks.style.display = 'block';
    setTimeout(() => thanks.style.display = 'none', 3000);
      }

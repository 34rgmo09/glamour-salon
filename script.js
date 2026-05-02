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

  // Chat — full conversation memory
  const chatHistory = [];

  const SYSTEM_PROMPT = `You are a warm, friendly assistant for Glamour Hair & Beauty salon. You can answer any question the customer has — not just about the salon. Be natural, helpful, and conversational like a real person. Keep replies concise.

Salon details (use when relevant):
Services:
- Hair Styling: Box Braids $80+, Knotless Braids $100+, Twist Out $45+, Blowout & Press $55+, Bantu Knots $50+, Trim & Shape $35+, Cornrows $60+, Locs Maintenance $70+
- Hair Colouring: Balayage $120+, Full Highlights $100+, Ombre $110+, Full Colour $80+, Root Touch-Up $60+, Colour Correction $150+
- Nail Care: Classic Manicure $25+, Gel Manicure $40+, Acrylic Full Set $55+, Nail Art $15+ add-on, Pedicure $35+, Gel Pedicure $50+
- Facial Treatments: Classic $60+, Deep Cleanse $75+, Brightening $85+, Anti-Aging $100+, Hydrating Mask $70+
- Lash & Brow: Classic Extensions $80+, Volume Lashes $100+, Lash Lift & Tint $65+, Brow Shaping $25+, Brow Tint $20+, Brow Lamination $55+
- Head Massage: 30 min $30+, Deep Oil 45 min $50+, Aromatherapy 60 min $70+, Hot Towel Ritual $60+

Hours: Mon–Sun 7am–9pm
Location: 123 Beauty Lane, Glamour City
Phone: +254 (555) 987-6543
Email: hello@glamourbeauty.com

For bookings, guide them to scroll down to the booking form on the page.`;

  function toggleChat() {
    const w = document.getElementById('chatWindow');
    w.classList.toggle('open');
  }

  async function sendMsg() {
    const input = document.getElementById('chatInput');
    const msgs = document.getElementById('chatMessages');
    const text = input.value.trim();
    if (!text) return;

    // Add to history & display
    chatHistory.push({ role: 'user', content: text });
    msgs.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.textContent = 'Typing...';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: chatHistory
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || '').join('') || "Sorry, I couldn't respond right now. Please call us!";

      // Save assistant reply to history
      chatHistory.push({ role: 'assistant', content: reply });

      typing.remove();
      msgs.innerHTML += `<div class="msg bot">${reply}</div>`;
    } catch {
      typing.remove();
      msgs.innerHTML += `<div class="msg bot">Sorry, something went wrong. Please call us at +254 (555) 987-6543!</div>`;
    }
    msgs.scrollTop = msgs.scrollHeight;
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
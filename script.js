/**
 * BHARATHIYAR'S WOMEN LIBERATION & SAFETY PORTAL - SCRIPT.JS
 * Features:
 *  - Fiery Canvas Particle System
 *  - Web Audio Emergency Siren Synthesizer
 *  - Web Audio Bharathiyar Anthem Melodic Synthesizer
 *  - Geolocation API Live Tracking & SOS Sharing
 *  - Voice Assistant (Speech Recognition & Speech Synthesis)
 *  - Bharathi AI Chatbot Knowledge Base
 *  - Interactive Quiz Engine & Scholar Badge
 *  - Business Proposal Evaluator & Job Stream Portal
 *  - Full Bilingual Localization (Tamil <-> English)
 */

// ==========================================================================
// 1. STATE & GLOBAL CONFIGURATION
// ==========================================================================
const AppState = {
  currentLang: 'ta',
  isListening: false,
  ttsEnabled: true,
  sirenActive: false,
  audioPlaying: false,
  userCoords: null,
  recognition: null,
  sirenOsc: null,
  sirenGain: null,
  audioCtx: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false
};

// ==========================================================================
// 2. BILINGUAL DICTIONARY (TAMIL & ENGLISH)
// ==========================================================================
const i18nData = {
  ta: {
    ticker_badge: "24x7 அவசர உதவி / HELP",
    nav_home: "முகப்பு",
    nav_vision: "பாரதி பார்வை",
    nav_poems: "கவிதைகள்",
    nav_safety: "பெண்கள் பாதுகாப்பு",
    nav_schemes: "அரசு திட்டங்கள்",
    nav_business: "தொழில் & வேலை",
    nav_learning: "கற்க & வினாடிவினா",
    hero_badge: "மகாகவி சுப்பிரமணிய பாரதியாரின் புரட்சிப் பார்வை",
    hero_title_1: "நிமிர்ந்த நன்னடை,",
    hero_title_2: "நேர்கொண்ட பார்வை!",
    hero_subtitle: "\"ஆணும் பெண்ணும் நிகரெனக் கொள்வதால் அறிவிலோங்கி இவ்வையம் தழைக்குமாம்!\" — பெண்கள் விடுதலை, கல்வி உரிமை, சுயமரியாதை மற்றும் அச்சமற்ற பெண்களுக்கான முழுமையான பாதுகாப்பு & தொழில் மையம்.",
    audio_anthem_title: "அச்சமில்லை அச்சமில்லை (Fearless Anthem)",
    audio_anthem_sub: "பாரதியின் வீரமுழக்கம் & கவிதை குரல் வடிவம்",
    cta_chat: "பாரதி AI உடன் பேசுங்கள்",
    cta_voice: "குரல் வழி உரையாடு (Voice)",
    cta_safety: "பாதுகாப்பு & SOS மையம்",
    cta_business: "பெண்கள் தொழில் விண்ணப்பம்",
    stat_1: "சம உரிமை தத்துவம்",
    stat_2: "அவசர உதவி நெட்வொர்க்",
    stat_3: "பெண்கள் தொழில் கடன் திட்டங்கள்",
    stat_4: "காவல்துறை நேரடி அழைப்பு",
    video_title: "பாரதியின் சிறப்பு ஆவணப்படம் & பாடல்கள்",
    video_caption: "\"பெண்மை வாழ்கவென்று கூத்திடுவோமடா!\" — மகாகவி பாரதியாரின் பெண் விடுதலைப் பாடல்கள் & வரலாற்று ஆவணத் தொகுப்பு.",
    hero_quote_footer: "\"மாதர் தம்மை இழிவு செய்யும் மடமையைக் கொளுத்துவோம்!\"",
    sos_banner_title: "அவசர ஆபத்தா? உடனடி உதவி பெற இங்கே அழுத்தவும்!",
    sos_banner_desc: "Instant Emergency Location Broadcast, Siren Sound & Direct Dialing to Police 112 / Women Helpline 1091",
    vision_pill: "புரட்சியின் விடியல்",
    vision_title: "பாரதியாரின் 'பெண் விடுதலை' பெருமையும் வரலாறும்",
    vision_subtitle: "How Mahakavi Bharathi Shattered Century-Old Shackles & Prophesied the Modern Empowered Woman",
    v1_title: "சகோதரி நிவேதிதாவின் தரிசனம்",
    v1_tag: "1906 - கொல்கத்தா திருப்புமுனை",
    v1_desc: "1906-ல் சுவாமி விவேகானந்தரின் சீடரான சகோதரி நிவேதிதாவை பாரதி சந்தித்தபோது, பாரதியிடம் 'உன் மனைவியை ஏன் அழைத்து வரவில்லை?' என வினவினார். பாரதி சமூகம் பெண்களை வெளியே அனுமதிப்பதில்லை என கூறியதும், நிவேதிதா கோபமுற்று 'பெண்ணை அடிமையாக நடத்தும் வரை தாய்நாடு விடுதலை பெறாது!' என்றார். இந்த சொல்லே பாரதியை 'பெண் விடுதலைப் போராளி'யாக மாற்றியது. அவரை தன் ஞான குருவாக ஏற்றார் பாரதி.",
    v2_title: "கல்வி மறுப்பும் பால்ய திருமண எதிர்ப்பும்",
    v2_tag: "மடமையைக் கொளுத்திய புரட்சி",
    v2_desc: "பெண்களுக்குக் கல்வி தருவதே குற்றம் எனக் கருதப்பட்ட காலத்தில், 'ஏட்டையும் பெண்கள் தொடுவது தீமையென்றெண்ணியிருந்தவர் மாய்ந்து விட்டார்' என கர்ஜித்தவர் பாரதி. உடன்கட்டை ஏறுதல் (சதி), கைம்பெண் கொடுமை, பால்ய விவாகம் ஆகிய அனைத்திற்கும் எதிராக பேனாவை வாளாக சுழற்றிய முதல் தமிழ் மாவீரன்.",
    v3_title: "யார் இந்த 'புதுமைப் பெண்'?",
    v3_tag: "பாரதியின் கனவுப் பெண் வடிவம்",
    v3_desc: "அச்சமும், நாணமும், மடமும், பயிர்ப்பும் பெண்களின் ஆபரணங்கள் எனப் போதித்த பழமைவாதத்தை தூக்கி எறிந்தார். நிமிர்ந்த நடை, நேர்கொண்ட பார்வை, யாருக்கும் அஞ்சாத நெறி, அறிவுச் செருக்கு உடையவளே உண்மையான புதுமைப் பெண் என்று உலகிற்கு முதன்முதலில் பறைசாற்றினார்.",
    v4_title: "எல்லோரும் இந்நாட்டு மன்னர்",
    v4_tag: "சமத்துவமும் மனித உரிமையும்",
    v4_desc: "\"ஆணும் பெண்ணும் நிகரெனக் கொள்வதால் அறிவிலோங்கி இவ்வையம் தழைக்குமாம்!\" என்ற பாரதியின் தத்துவமே இன்றைய பெண்களின் விண்வெளிப் பயணம், ஆட்சி அதிகாரம், நீதித்துறை சாதனைகளுக்கு விதை போட்டது. பாரதியின் கனவு இன்று சர்வதேச மனித உரிமைகளுக்கான அடித்தளமாகப் போற்றப்படுகிறது.",
    safety_pill: "24x7 பெண்கள் பாதுகாப்பு அரண்",
    safety_title: "பெண்கள் பாதுகாப்பு மையம் (Women Safety Hub)",
    safety_subtitle: "Emergency SOS Alerter, Speed Dials, Safety Apps, and Instant Location Sharing for Women in Distress",
    sos_sub_text: "அவசர ஆபத்து",
    sos_hint: "ஒருமுறை அழுத்தினால்: சைரன் ஒலிக்கும், உங்கள் GPS இருப்பிடம் கணக்கிடப்பட்டு அவசர செய்தியாக அனுப்பப்படும்.",
    loc_heading: "நேரடி இருப்பிடம் & பாதுகாப்பு தகவல்",
    loc_sub: "உங்கள் இருப்பிடத்தை உடனடியாக குடும்பத்தினர் அல்லது காவல்துறைக்கு வாட்ஸ்அப் / SMS மூலம் பகிரவும்:",
    loc_status_lbl: "தற்போதைய நிலை:",
    btn_gps: "இருப்பிடத்தைக் கண்டறி (Get GPS)",
    btn_wa: "WhatsApp SOS அனுப்பு",
    btn_sms: "SMS SOS அனுப்பு",
    btn_siren: "அவசர சைரன் (Siren)",
    schemes_pill: "கல்வி & வாழ்வாதாரத் திட்டங்கள்",
    schemes_title: "பெண்கள் முன்னேற்றத்திற்கான அரசு நலத்திட்டங்கள்",
    schemes_subtitle: "Higher Education Assistance, Marriage Aid, Financial Security, and Free Transport Schemes",
    biz_pill: "பொருளாதார தற்சார்பு",
    biz_title: "பெண்கள் தொழில் விண்ணப்பம் & வேலைவாய்ப்பு மையம்",
    biz_subtitle: "Apply for Business Grants, Microloans, Mentorship, and Explore Open Career Streams for Women",
    learning_pill: "பாரதி கல்விக் கூடம்",
    learning_title: "பாரதியார் வாழ்க்கை வரலாறு & வினாடி வினா (Interactive Quiz)",
    learning_subtitle: "Test Your Knowledge on Mahakavi Bharathi's Vision, Women's Rights, and Earn Your Digital Scholar Badge!"
  },
  en: {
    ticker_badge: "24x7 EMERGENCY / HELP",
    nav_home: "Home",
    nav_vision: "Bharathi's Vision",
    nav_poems: "Poems",
    nav_safety: "Women Safety",
    nav_schemes: "Govt Schemes",
    nav_business: "Business & Jobs",
    nav_learning: "Learn & Quiz",
    hero_badge: "Mahakavi Subramania Bharathiyar's Revolutionary Vision",
    hero_title_1: "Upright Stride,",
    hero_title_2: "Fearless Gaze!",
    hero_subtitle: "\"When man and woman are embraced as equals, this world will blossom in brilliance!\" — Mahakavi Bharathiyar's monumental mission for women's liberation, literacy, safety, and economic sovereignty.",
    audio_anthem_title: "Achamillai Achamillai (Fearless Anthem)",
    audio_anthem_sub: "Bharathi's immortal clarion call of courage",
    cta_chat: "Talk to Bharathi AI",
    cta_voice: "Speak with Voice Assistant",
    cta_safety: "Safety & SOS Hub",
    cta_business: "Women Business Portal",
    stat_1: "Equal Rights Doctrine",
    stat_2: "Emergency Network 24/7",
    stat_3: "Business Loan Schemes",
    stat_4: "Direct Police Helplines",
    video_title: "Bharathi Documentary & Historic Songs",
    video_caption: "\"Long live womanhood!\" — Mahakavi Bharathiyar's songs of liberation and archival documentary.",
    hero_quote_footer: "\"We shall torch the foolishness that degrades womanhood!\"",
    sos_banner_title: "In Immediate Danger? Trigger Instant SOS Alert!",
    sos_banner_desc: "Instant Emergency Location Broadcast, Siren Sound & Direct Dialing to Police 112 / Women Helpline 1091",
    vision_pill: "Dawn of Revolution",
    vision_title: "Bharathiyar's Vision on Women's Liberation & Legacy",
    vision_subtitle: "How Mahakavi Bharathi Shattered Century-Old Shackles & Prophesied the Modern Empowered Woman",
    v1_title: "Sister Nivedita's Divine Awakening",
    v1_tag: "1906 - Kolkata Turning Point",
    v1_desc: "In 1906, meeting Swami Vivekananda's disciple Sister Nivedita transformed Bharathi. When she asked where his wife was and learned women were secluded at home, she thundered: 'The motherland can never attain freedom until her women are free!' Bharathi revered her as his spiritual Guru.",
    v2_title: "War on Illiteracy & Child Marriage",
    v2_tag: "Torch of Rebellion",
    v2_desc: "At a time when female literacy was condemned as a curse, Bharathi roared that those who forbade women from touching books were dead and gone! He wielded his pen against Sati, widow humiliation, and child marriage with fiery conviction.",
    v3_title: "Who is the 'Pudumai Penn'?",
    v3_tag: "The Ideal Modern Woman",
    v3_desc: "He discarded traditional dogmas that taught women meekness, timidity, and subservience. For Bharathi, the true modern woman carries an upright posture, an unswerving fearless gaze, and supreme intellectual pride.",
    v4_title: "Equal Rights for All Citizens",
    v4_tag: "Universal Human Equality",
    v4_desc: "\"When man and woman are considered equals, this earth shall flourish with knowledge!\" Bharathiyar's vision paved the path for today's women space explorers, prime ministers, Supreme Court judges, and entrepreneurs.",
    safety_pill: "24x7 Women Shield",
    safety_title: "Women Safety Command Hub",
    safety_subtitle: "Emergency SOS Alerter, Speed Dials, Safety Apps, and Instant Location Sharing for Women in Distress",
    sos_sub_text: "Emergency SOS",
    sos_hint: "Single tap: Triggers audible siren, fetches GPS coordinates, and prepares instant emergency dispatch.",
    loc_heading: "Live Coordinates & Safety Info",
    loc_sub: "Share your coordinates immediately with emergency contacts or police via WhatsApp / SMS:",
    loc_status_lbl: "Current Status:",
    btn_gps: "Locate GPS Coordinates",
    btn_wa: "Send WhatsApp SOS",
    btn_sms: "Send SMS SOS",
    btn_siren: "Emergency Siren",
    schemes_pill: "Education & Welfare Schemes",
    schemes_title: "Government Schemes for Women Empowerment",
    schemes_subtitle: "Higher Education Assistance, Marriage Aid, Financial Security, and Free Transport Schemes",
    biz_pill: "Economic Independence",
    biz_title: "Women Business Application & Careers",
    biz_subtitle: "Apply for Business Grants, Microloans, Mentorship, and Explore Open Career Streams for Women",
    learning_pill: "Bharathi Academy",
    learning_title: "Bharathiyar Biography & Interactive Quiz",
    learning_subtitle: "Test Your Knowledge on Mahakavi Bharathi's Vision, Women's Rights, and Earn Your Digital Scholar Badge!"
  }
};

// ==========================================================================
// 3. AMBIENT CANVAS FIRE & EMBERS PARTICLES
// ==========================================================================
function initFireCanvas() {
  const canvas = document.getElementById('fireCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? '#f59e0b' : '#ef4444'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 4. WEB AUDIO EMERGENCY SIREN SYNTHESIZER
// ==========================================================================
function initAudioContext() {
  if (!AppState.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    AppState.audioCtx = new AudioContext();
  }
  if (AppState.audioCtx.state === 'suspended') {
    AppState.audioCtx.resume();
  }
}

function playSirenSound() {
  initAudioContext();
  if (AppState.sirenActive) {
    stopSiren();
    return;
  }

  try {
    const ctx = AppState.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(700, ctx.currentTime);

    // Siren modulation (oscillate frequency between 700Hz and 1150Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2.2, ctx.currentTime); // 2.2 Hz cycle
    lfoGain.gain.setValueAtTime(350, ctx.currentTime);

    lfo.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);

    osc.start();
    lfo.start();

    AppState.sirenOsc = osc;
    AppState.sirenGain = gain;
    AppState.sirenLfo = lfo;
    AppState.sirenActive = true;

    const modalBtn = document.getElementById('modalSirenBtn');
    if (modalBtn) {
      modalBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> சைரனை நிறுத்து (Stop Siren)';
      modalBtn.classList.remove('btn-danger');
      modalBtn.classList.add('btn-primary');
    }
  } catch (err) {
    console.error('Siren audio error:', err);
  }
}

function stopSiren() {
  if (AppState.sirenOsc) {
    try {
      AppState.sirenOsc.stop();
      AppState.sirenLfo.stop();
    } catch (e) {}
    AppState.sirenOsc = null;
    AppState.sirenActive = false;

    const modalBtn = document.getElementById('modalSirenBtn');
    if (modalBtn) {
      modalBtn.innerHTML = '<i class="fa-solid fa-bullhorn"></i> சத்தமான அவசர சைரன் ஒலி (Siren Alert)';
      modalBtn.classList.remove('btn-primary');
      modalBtn.classList.add('btn-danger');
    }
  }
}

function toggleSiren() {
  if (AppState.sirenActive) {
    stopSiren();
  } else {
    playSirenSound();
  }
}

// ==========================================================================
// 5. BHARATHIYAR ANTHEM MELODIC SYNTHESIZER & NARRATION
// ==========================================================================
function toggleBharathiAudio() {
  const btn = document.getElementById('heroAudioBtn');
  const btnText = document.getElementById('audioBtnText');
  const btnIcon = document.getElementById('audioBtnIcon');

  if (AppState.audioPlaying) {
    window.speechSynthesis.cancel();
    AppState.audioPlaying = false;
    btnText.textContent = AppState.currentLang === 'ta' ? 'கேளுங்கள் (Listen)' : 'Listen Anthem';
    btnIcon.className = 'fa-solid fa-play';
    return;
  }

  initAudioContext();
  AppState.audioPlaying = true;
  btnText.textContent = AppState.currentLang === 'ta' ? 'இடைநிறுத்து (Stop)' : 'Stop Anthem';
  btnIcon.className = 'fa-solid fa-stop';

  // Play heroic synth melodic arpeggio
  playBharathiMelody();

  // Speak the fiery Tamil anthem
  const anthemText = "அச்சமில்லை அச்சமில்லை அச்சமென்பதில்லையே! இச்சகத்து ளோரெலாம் எதிர்த்து நின்ற போதினும், அச்சமில்லை அச்சமில்லை அச்சமென்பதில்லையே! உச்சிமீது வானிடிந்து வீழுகின்ற போதினும், அச்சமில்லை அச்சமில்லை அச்சமென்பதில்லையே!";
  speakText(anthemText, 'ta-IN', () => {
    AppState.audioPlaying = false;
    btnText.textContent = AppState.currentLang === 'ta' ? 'கேளுங்கள் (Listen)' : 'Listen Anthem';
    btnIcon.className = 'fa-solid fa-play';
  });
}

function playBharathiMelody() {
  try {
    const ctx = AppState.audioCtx;
    // Notes corresponding to courageous raga notes (Mohanam/Bilawal chord tones)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let noteTime = ctx.currentTime + 0.1;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime + idx * 0.22);

      gain.gain.setValueAtTime(0.001, noteTime + idx * 0.22);
      gain.gain.exponentialRampToValueAtTime(0.08, noteTime + idx * 0.22 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + idx * 0.22 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime + idx * 0.22);
      osc.stop(noteTime + idx * 0.22 + 0.45);
    });
  } catch (e) {
    console.log('Melody note synthesizer error:', e);
  }
}

// ==========================================================================
// 6. GEOLOCATION API & SOS SHARING
// ==========================================================================
function detectUserLocation(callback) {
  const statusElem = document.getElementById('currentLocationText');
  const modalLoc = document.getElementById('modalLocCoords');

  if (!navigator.geolocation) {
    const msg = 'உங்கள் உலாவியில் GPS இருப்பிட சேவை இயங்கவில்லை (Geolocation not supported).';
    if (statusElem) statusElem.textContent = msg;
    if (modalLoc) modalLoc.textContent = msg;
    if (callback) callback(null);
    return;
  }

  if (statusElem) statusElem.textContent = 'ஜிபிஎஸ் இருப்பிடம் தேடப்படுகிறது... (Fetching GPS...)';
  if (modalLoc) modalLoc.textContent = 'ஜிபிஎஸ் இருப்பிடம் தேடப்படுகிறது...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      AppState.userCoords = { latitude, longitude, accuracy };

      const locationStr = `அட்சரேகை: ${latitude.toFixed(4)}, தீர்க்கரேகை: ${longitude.toFixed(4)} (துல்லியம்: ±${Math.round(accuracy)}m)`;
      if (statusElem) statusElem.innerHTML = `<strong>${locationStr}</strong> <a href="https://maps.google.com/?q=${latitude},${longitude}" target="_blank" style="color: #f59e0b; margin-left: 8px;">[கூகுள் வரைபடம் / Map]</a>`;
      if (modalLoc) modalLoc.innerHTML = `GPS: <strong>${latitude.toFixed(4)}, ${longitude.toFixed(4)}</strong>`;

      if (callback) callback(AppState.userCoords);
    },
    (error) => {
      let errMsg = 'இருப்பிட அனுமதி மறுக்கப்பட்டது அல்லது கிடைக்கவில்லை.';
      if (error.code === 1) errMsg = 'இருப்பிட அனுமதி வழங்கப்படவில்லை (Permission Denied).';
      if (statusElem) statusElem.textContent = errMsg;
      if (modalLoc) modalLoc.textContent = errMsg;
      if (callback) callback(null);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

function shareSosLocation(channel) {
  const send = (coords) => {
    let mapsLink = 'Location not detected';
    if (coords) {
      mapsLink = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
    }

    const sosMessage = `🚨 *EMERGENCY SOS ALERT!* 🚨\nஉடனடி உதவி தேவை! நான் ஆபத்தில் உள்ளேன்.\n\nஎன் நேரடி GPS இருப்பிடம்:\n${mapsLink}\n\nஉடனடியாக என்னை தொடர்பு கொள்ளவும் அல்லது காவல்துறை 112 / பெண்கள் உதவி எண் 1091-ஐ அழைக்கவும்!`;

    if (channel === 'whatsapp') {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(sosMessage)}`;
      window.open(url, '_blank');
    } else if (channel === 'sms') {
      const url = `sms:?body=${encodeURIComponent(sosMessage)}`;
      window.location.href = url;
    }
  };

  if (!AppState.userCoords) {
    detectUserLocation((coords) => {
      send(coords);
    });
  } else {
    send(AppState.userCoords);
  }
}

// SOS Modal Handlers
function triggerSosModal() {
  const modal = document.getElementById('sosModalOverlay');
  if (modal) {
    modal.classList.add('active');
    detectUserLocation();
  }
}

function closeSosModal() {
  const modal = document.getElementById('sosModalOverlay');
  if (modal) {
    modal.classList.remove('active');
    stopSiren();
  }
}

// ==========================================================================
// 7. POEM RECITALS & FILTERING
// ==========================================================================
function filterPoems(category) {
  const buttons = document.querySelectorAll('.poem-tab-btn');
  buttons.forEach((btn) => btn.classList.remove('active'));

  const activeBtn = Array.from(buttons).find((b) =>
    b.getAttribute('onclick').includes(`'${category}'`)
  );
  if (activeBtn) activeBtn.classList.add('active');

  const cards = document.querySelectorAll('.poem-card');
  cards.forEach((card) => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function speakPoem(button) {
  const card = button.closest('.poem-card');
  const tamilLines = card.querySelector('.poem-tamil-lines');
  if (!tamilLines) return;

  const textToRead = tamilLines.innerText;
  speakText(textToRead, 'ta-IN');

  const originalHtml = button.innerHTML;
  button.innerHTML = '<i class="fa-solid fa-volume-high text-red-500"></i> ஒலிக்கிறது...';
  setTimeout(() => {
    button.innerHTML = originalHtml;
  }, 4000);
}

function copyPoem(button) {
  const card = button.closest('.poem-card');
  const tamilLines = card.querySelector('.poem-tamil-lines').innerText;
  const englishMeaning = card.querySelector('.poem-english-meaning').innerText;
  const fullText = `${tamilLines}\n\n${englishMeaning}\n— மகாகவி பாரதியார்`;

  navigator.clipboard.writeText(fullText).then(() => {
    const originalHtml = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check text-green-400"></i> நகலெடுக்கப்பட்டது!';
    setTimeout(() => {
      button.innerHTML = originalHtml;
    }, 2000);
  });
}

// ==========================================================================
// 8. BHARATHI AI CHATBOT & VOICE ASSISTANT
// ==========================================================================
const bharathiKnowledgeBase = [
  {
    keywords: ['புதுமை', 'புதுமைப்பெண்', 'pudumai', 'modern woman', 'definition'],
    answer: "<strong>புதுமைப் பெண் இலக்கணம்:</strong><br>பாரதி கண்ட புதுமைப் பெண் அச்சமும் நாணமும் கொண்டவள் அல்ல. 'நிமிர்ந்த நன்னடை நேர்கொண்ட பார்வையும், நிலத்தில் யார்க்கும் அஞ்சாத நெறிகளும், திமிர்ந்த ஞானச் செருக்கும் கொண்டவளே புதுமைப் பெண்!' அவள் கல்வி கற்று, சமூகத்தில் ஆண்களுக்கு நிகராக ஆட்சி அதிகாரங்களை கையில் எடுப்பவள்."
  },
  {
    keywords: ['பாதுகாப்பு', 'எண்', 'help', 'emergency', 'sos', 'helpline', 'காவல்', 'police'],
    answer: "<strong>முக்கிய பெண்கள் அவசர எண்கள்:</strong><br>• <strong>112</strong>: தேசிய அவசர உதவி (All-in-One ERSS)<br>• <strong>1091</strong>: பெண்கள் உதவி எண் (Women Helpline 24x7)<br>• <strong>181</strong>: குடும்ப வன்முறை மற்றும் துன்புறுத்தல் தடுப்பு<br>• <strong>1098</strong>: குழந்தைகள் பாதுகாப்பு (Childline)<br>• <strong>1930</strong>: சைபர் கிரைம் உதவி<br>உங்கள் தொலைபேசியில் <strong>'காவலன் SOS'</strong> செயலியை உடனடியாக நிறுவவும்!"
  },
  {
    keywords: ['திட்டம்', 'scheme', 'pudhumai penn', 'புதுமைப் பெண் திட்டம்', 'கல்வி', 'scholarship', 'scholar'],
    answer: "<strong>புதுமைப் பெண் திட்டம் (Moovalur Ramamirtham Ammaiyar):</strong><br>தமிழ்நாடு அரசு 6 முதல் 12-ம் வகுப்பு வரை அரசுப் பள்ளிகளில் பயின்று கல்லூரி செல்லும் அனைத்து மாணவிகளுக்கும் மாதந்தோறும் <strong>₹1,000</strong> நேரடி வங்கிப் பரிமாற்றம் செய்கிறது. இதனுடன் 'பேட்டி பச்சாவோ பேட்டி படாவோ' மற்றும் சுகன்யா சம்ரிதி திட்டங்களும் பெண்களின் கல்வி மற்றும் எதிர்காலத்தை உறுதி செய்கின்றன."
  },
  {
    keywords: ['தொழில்', 'கடன்', 'business', 'loan', 'mudra', 'முத்ரா', 'standup', 'startup'],
    answer: "<strong>பெண்களுக்கான தொழில் நிதி திட்டங்கள்:</strong><br>1. <strong>முத்ரா கடன் (PMMY):</strong> பிணையமின்றி ₹50,000 முதல் ₹10 லட்சம் வரை (சிசு, கிஷோர், தருண்).<br>2. <strong>ஸ்டாண்ட்-அப் இந்தியா (Stand-Up India):</strong> மகளிர் தொழில்முனைவோருக்கு ₹10 லட்சம் முதல் ₹1 கோடி வரை கடன்.<br>3. <strong>மகளிர் சுயஉதவிக் குழுக்கள்:</strong> குறைந்த வட்டியில் சுழல்நிதி உதவி. நமது தளத்தின் தொழில் பிரிவில் உடனே விண்ணப்பிக்கலாம்!"
  },
  {
    keywords: ['நிவேதிதா', 'guru', 'nivedita', 'ஞானகுரு'],
    answer: "<strong>சகோதரி நிவேதிதா & பாரதி:</strong><br>1906-ல் விவேகானந்தரின் சீடரான நிவேதிதா தேவியை பாரதி சந்தித்தார். 'மனைவியை ஏன் அழைத்து வரவில்லை?' என்ற நிவேதிதாவின் வினாவும், 'பெண்ணை அடிமைப்படுத்தும் தேசம் ஒருபோதும் விடுதலை அடையாது' என்ற கர்ஜனையுமே பாரதியை பெண் விடுதலைப் போராளியாக மாற்றியது. அவரைத் தன் 'ஞான குரு'வாக பாரதி ஏற்றார்."
  },
  {
    keywords: ['அச்சமில்லை', 'fearless', 'achamillai', 'பாடல்'],
    answer: "<strong>அச்சமில்லை அச்சமில்லை:</strong><br>'உச்சிமீது வானிடிந்து வீழுகின்ற போதினும், அச்சமில்லை அச்சமில்லை அச்சமென்பதில்லையே!' — எத்தகைய துன்பங்கள், சமூக அழுத்தங்கள் வந்தாலும் பெண்கள் அச்சமின்றி தன் உரிமைக்காக போராட வேண்டும் என்பதையே இப்பாடல் பறைசாற்றுகிறது."
  },
  {
    keywords: ['யார்', 'who is', 'biography', 'வரலாறு', 'பாரதியார்'],
    answer: "<strong>மகாகவி சுப்பிரமணிய பாரதியார் (1882 - 1921):</strong><br>எட்டயபுரத்தில் பிறந்து, இளம் வயதிலேயே கவிப்புலமை பெற்ற தேசியக் கவி. தமிழ் கவிதையில் புதுயுகம் படைத்தவர்; பெண் விடுதலை, தீண்டாமை ஒழிப்பு, இந்திய விடுதலை ஆகிய மூன்றையும் தன் முக்கண்களாகக் கொண்டு வாழ்ந்த மாபெரும் புரட்சியாளர்."
  }
];

function findChatResponse(userQuery) {
  const queryLower = userQuery.toLowerCase().trim();

  for (const item of bharathiKnowledgeBase) {
    const match = item.keywords.some((k) => queryLower.includes(k));
    if (match) {
      return item.answer;
    }
  }

  // Fallback in Bharathi's poetic persona
  return `<strong>பாரதியின் உரை:</strong><br>"தோழியே! பெண்ணின் சுயமரியாதையும் அறிவும் இந்த உலகின் பேரொளி. நீர் கேட்ட கேள்வி எனக்குப் புரிகிறது. '${userQuery}'. எதற்கும் அஞ்சாதீர்; கல்வி கற்பீர், உரிமைகளை அறிவீர், 'எட்டுமறிவினில் ஆணுக்கு இங்கே பெண் இளைப்பில்லை' என்பதை உங்கள் செயலில் நிலைநாட்டுங்கள்! அவசர உதவி அல்லது தொழில் கடன்கள் குறித்து அறிய விரைவுப் பொத்தான்களைப் பயன்படுத்துங்கள்."`;
}

function toggleChatDrawer() {
  const drawer = document.getElementById('chatDrawer');
  const overlay = document.getElementById('chatOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

function openChatDrawer(initialQuery) {
  const drawer = document.getElementById('chatDrawer');
  const overlay = document.getElementById('chatOverlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('active');
  }
  if (initialQuery) {
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = initialQuery;
      handleChatSubmit(new Event('submit'));
    }
  }
}

function closeChatDrawer() {
  const drawer = document.getElementById('chatDrawer');
  const overlay = document.getElementById('chatOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }
  stopVoiceRecognition();
}

function clearChatHistory() {
  const container = document.getElementById('chatMessages');
  if (container) {
    container.innerHTML = `
      <div class="chat-message bot-msg">
        <div class="msg-avatar"><i class="fa-solid fa-feather"></i></div>
        <div class="msg-content">
          <p><strong>வணக்கம்! நான் மகாகவி பாரதியாரின் கொள்கை வழி உருவாக்கப்பட்ட 'பாரதி AI' உதவியாளர்.</strong></p>
          <p>உரையாடல் புதுப்பிக்கப்பட்டது. பெண் விடுதலை, கல்வி, பாதுகாப்பு அல்லது கடன்கள் குறித்து என்னிடம் கேட்கலாம்!</p>
          <span class="msg-time">இப்போது</span>
        </div>
      </div>
    `;
  }
}

function sendQuickPrompt(text) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = text;
    handleChatSubmit(new Event('submit'));
  }
}

function handleChatSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chatInput');
  if (!input) return;

  const query = input.value.trim();
  if (!query) return;

  appendChatMessage(query, 'user');
  input.value = '';

  // Simulate Bharathi AI thinking with smooth delay
  setTimeout(() => {
    const reply = findChatResponse(query);
    appendChatMessage(reply, 'bot');

    if (AppState.ttsEnabled) {
      // Extract clean text without HTML tags for speech
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = reply;
      const cleanText = tempDiv.innerText || tempDiv.textContent;
      speakText(cleanText, 'ta-IN');
    }
  }, 450);
}

function appendChatMessage(text, sender) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

  const avatarHtml = sender === 'user'
    ? '<div class="msg-avatar"><i class="fa-solid fa-user"></i></div>'
    : '<div class="msg-avatar"><i class="fa-solid fa-feather"></i></div>';

  messageDiv.innerHTML = `
    ${avatarHtml}
    <div class="msg-content">
      ${sender === 'user' ? `<p>${text}</p>` : text}
      <span class="msg-time">${timeStr}</span>
    </div>
  `;

  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

// ==========================================================================
// 9. SPEECH RECOGNITION (VOICE INPUT) & SPEECH SYNTHESIS (VOICE OUTPUT)
// ==========================================================================
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Web Speech Recognition API is not supported in this browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = AppState.currentLang === 'ta' ? 'ta-IN' : 'en-IN';

  recognition.onstart = () => {
    AppState.isListening = true;
    const micBtn = document.getElementById('micBtn');
    const recBar = document.getElementById('voiceRecordingBar');
    if (micBtn) micBtn.classList.add('listening');
    if (recBar) recBar.style.display = 'flex';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = transcript;
      handleChatSubmit(new Event('submit'));
    }
    stopVoiceRecognition();
  };

  recognition.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    stopVoiceRecognition();
  };

  recognition.onend = () => {
    stopVoiceRecognition();
  };

  return recognition;
}

function toggleVoiceInput() {
  if (AppState.isListening) {
    stopVoiceRecognition();
  } else {
    startVoiceRecognition();
  }
}

function startVoiceRecognition() {
  if (!AppState.recognition) {
    AppState.recognition = initSpeechRecognition();
  }

  if (!AppState.recognition) {
    alert('மன்னிக்கவும், உங்கள் உலாவியில் குரல் உள்ளீடு (Speech Recognition) வசதி ஆதரிக்கப்படவில்லை. Chrome/Edge உலாவியைப் பயன்படுத்தவும்.');
    return;
  }

  try {
    AppState.recognition.lang = AppState.currentLang === 'ta' ? 'ta-IN' : 'en-IN';
    AppState.recognition.start();
  } catch (err) {
    console.warn('Could not start recognition:', err);
  }
}

function stopVoiceRecognition() {
  AppState.isListening = false;
  const micBtn = document.getElementById('micBtn');
  const recBar = document.getElementById('voiceRecordingBar');
  if (micBtn) micBtn.classList.remove('listening');
  if (recBar) recBar.style.display = 'none';

  if (AppState.recognition) {
    try {
      AppState.recognition.stop();
    } catch (e) {}
  }
}

function startVoiceAssistant() {
  openChatDrawer();
  setTimeout(() => {
    startVoiceRecognition();
  }, 400);
}

function toggleTtsVoice() {
  AppState.ttsEnabled = !AppState.ttsEnabled;
  const ttsIcon = document.getElementById('ttsIcon');
  if (ttsIcon) {
    if (AppState.ttsEnabled) {
      ttsIcon.className = 'fa-solid fa-volume-high';
    } else {
      ttsIcon.className = 'fa-solid fa-volume-xmark';
      window.speechSynthesis.cancel();
    }
  }
}

function speakText(text, lang = 'ta-IN', onComplete) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Select Tamil or Indian English voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.includes(lang.substring(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onComplete) {
    utterance.onend = onComplete;
    utterance.onerror = onComplete;
  }

  window.speechSynthesis.speak(utterance);
}

// Preload voices
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// ==========================================================================
// 10. INTERACTIVE QUIZ ENGINE ("BHARATHI KALVI KOODAM")
// ==========================================================================
const quizData = [
  {
    question: "1. பாரதியாருக்கு பெண் விடுதலையின் முக்கியத்துவத்தை உணர்த்தி 'ஞான குரு'வாக விளங்கியவர் யார்?",
    options: [
      "சகோதரி நிவேதிதா (Sister Nivedita)",
      "அன்னி பெசன்ட் (Annie Besant)",
      "ராணி மங்கம்மாள் (Rani Mangammal)",
      "வேலு நாச்சியார் (Velu Nachiyar)"
    ],
    correct: 0,
    explanation: "1906-ல் கொல்கத்தாவில் விவேகானந்தரின் சீடரான சகோதரி நிவேதிதாவை சந்தித்த பாரதி, அவரை தன் ஆன்மீக ஞான குருவாக ஏற்றுக்கொண்டு பெண் விடுதலைக்கான பாடல்களை இயற்றினார்."
  },
  {
    question: "2. 'நிமிர்ந்த நன்னடை நேர்கொண்ட பார்வையும்' என்ற பாடல் வரிகள் யாரைக் குறிக்கின்றன?",
    options: [
      "பாரதியின் செல்லம்மா",
      "புதுமைப் பெண் (The Modern Woman)",
      "வீரத்தாய்",
      "பாரத மாதா"
    ],
    correct: 1,
    explanation: "அச்சமும் மடமையும் இன்றி, சுதந்திர சிந்தனையும் நேர்கொண்ட பார்வையும் கொண்ட 'புதுமைப் பெண்'ணின் இலக்கணமாக பாரதியார் இதனைப் பாடினார்."
  },
  {
    question: "3. 'ஏட்டையும் பெண்கள் தொடுவது தீமையென் றெண்ணியி ருந்தவர்...' என்ற வரியின் அடுத்த சொல் எது?",
    options: [
      "வாழ்ந்துவிட்டார்",
      "மாய்ந்துவிட்டார்",
      "தூங்கிவிட்டார்",
      "ஓடிவிட்டார்"
    ],
    correct: 1,
    explanation: "'ஏட்டையும் பெண்கள் தொடுவது தீமையென் றெண்ணியி ருந்தவர் மாய்ந்துவிட்டார்; வீட்டுக்குள்ளே பெண்ணைப் பூட்டிவைப்போம் என்ற விந்தை மனிதர் தலைகவிழ்ந்தார்!' என்பது பாடல்."
  },
  {
    question: "4. அரசுப் பள்ளி மாணவிகளின் கல்லூரி படிப்பிற்கு மாதம் ₹1,000 வழங்கும் தமிழ்நாடு அரசு திட்டம் எது?",
    options: [
      "தாலிக்கு தங்கம் திட்டம்",
      "புதுமைப் பெண் திட்டம் (Moovalur Ramamirtham)",
      "அம்மா இருசக்கர வாகனம் திட்டம்",
      "கலைஞர் மகளிர் உரிமைத் திட்டம்"
    ],
    correct: 1,
    explanation: "மூவலூர் ராமாமிர்தம் அம்மையார் நினைவு 'புதுமைப் பெண் திட்டம்' மூலம் அரசுப் பள்ளி மாணவிகள் உயர்கல்வி பெற மாதந்தோறும் ₹1,000 உதவித்தொகை வழங்கப்படுகிறது."
  },
  {
    question: "5. பிணையமில்லாமல் (No Collateral) பெண்களுக்கு ₹10 லட்சம் வரை வணிகக் கடன் தரும் மத்திய அரசு திட்டம் எது?",
    options: [
      "முத்ரா கடன் திட்டம் (PMMY Mudra Loans)",
      "கிசான் கிரெடிட் கார்டு",
      "அடல் பென்ஷன் யோஜனா",
      "பிரதான் மந்திரி ஆவாஸ்"
    ],
    correct: 0,
    explanation: "பிரதான் மந்திரி முத்ரா யோஜனா (PMMY) மூலம் சிசு, கிஷோர், தருண் ஆகிய பிரிவுகளில் பெண்கள் சுலபமாக பிணையமின்றி தொழில் கடன் பெறலாம்."
  }
];

function renderQuizQuestion() {
  const q = quizData[AppState.quizIndex];
  const questionElem = document.getElementById('quizQuestion');
  const optionsElem = document.getElementById('quizOptions');
  const stepLabel = document.getElementById('quizStepLabel');
  const progressFill = document.getElementById('quizProgressBar');
  const nextBtn = document.getElementById('quizNextBtn');
  const explanationBox = document.getElementById('quizExplanation');

  if (!q || !questionElem || !optionsElem) return;

  AppState.quizAnswered = false;
  if (explanationBox) explanationBox.style.display = 'none';
  if (nextBtn) nextBtn.disabled = true;

  questionElem.textContent = q.question;
  stepLabel.textContent = `கேள்வி ${AppState.quizIndex + 1} / ${quizData.length}`;
  progressFill.style.width = `${((AppState.quizIndex + 1) / quizData.length) * 100}%`;

  optionsElem.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => selectQuizOption(idx, btn);
    optionsElem.appendChild(btn);
  });
}

function selectQuizOption(selectedIndex, button) {
  if (AppState.quizAnswered) return;
  AppState.quizAnswered = true;

  const q = quizData[AppState.quizIndex];
  const optionsElem = document.getElementById('quizOptions');
  const buttons = optionsElem.querySelectorAll('.quiz-opt-btn');
  const nextBtn = document.getElementById('quizNextBtn');
  const explanationBox = document.getElementById('quizExplanation');
  const expText = document.getElementById('quizExpText');

  buttons.forEach((b) => (b.disabled = true));

  if (selectedIndex === q.correct) {
    button.classList.add('correct');
    button.querySelector('i').className = 'fa-solid fa-circle-check text-green-400';
    AppState.quizScore++;
  } else {
    button.classList.add('incorrect');
    button.querySelector('i').className = 'fa-solid fa-circle-xmark text-red-400';
    // Highlight the correct one
    buttons[q.correct].classList.add('correct');
    buttons[q.correct].querySelector('i').className = 'fa-solid fa-circle-check text-green-400';
  }

  if (explanationBox && expText) {
    expText.textContent = q.explanation;
    explanationBox.style.display = 'block';
  }

  if (nextBtn) {
    nextBtn.disabled = false;
    if (AppState.quizIndex === quizData.length - 1) {
      nextBtn.innerHTML = 'முடிவுகளைக் காண்க <i class="fa-solid fa-medal"></i>';
    } else {
      nextBtn.innerHTML = 'அடுத்த கேள்வி <i class="fa-solid fa-chevron-right"></i>';
    }
  }
}

function nextQuizQuestion() {
  if (AppState.quizIndex < quizData.length - 1) {
    AppState.quizIndex++;
    renderQuizQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const body = document.getElementById('quizBody');
  const footer = document.querySelector('.quiz-footer');
  const resultView = document.getElementById('quizResultView');
  const scoreElem = document.getElementById('resultScore');
  const msgElem = document.getElementById('resultMessage');

  if (body) body.style.display = 'none';
  if (footer) footer.style.display = 'none';

  if (resultView && scoreElem) {
    resultView.style.display = 'block';
    scoreElem.textContent = `மதிப்பெண்: ${AppState.quizScore} / ${quizData.length}`;

    if (AppState.quizScore === 5) {
      msgElem.textContent = "அற்புதம்! நீங்கள் பாரதியாரின் புதுமைப் பெண் தத்துவங்களையும், மகளிர் உரிமைகளையும் முழுமையாக உணர்ந்த புரட்சிச் செம்மல்!";
    } else if (AppState.quizScore >= 3) {
      msgElem.textContent = "நன்று! பாரதியின் பெண் விடுதலை தத்துவத்தில் சிறந்த விழிப்புணர்வு கொண்டுள்ளீர்கள்!";
    } else {
      msgElem.textContent = "தொடர்ந்து கற்றிடுங்கள்! பாரதியின் கவிதைகளையும் பெண்களுக்கான அரசு நலத்திட்டங்களையும் இந்த வலைத்தளத்தில் வாசித்து அறியுங்கள்.";
    }
  }
}

function restartQuiz() {
  AppState.quizIndex = 0;
  AppState.quizScore = 0;
  AppState.quizAnswered = false;

  const body = document.getElementById('quizBody');
  const footer = document.querySelector('.quiz-footer');
  const resultView = document.getElementById('quizResultView');
  const nextBtn = document.getElementById('quizNextBtn');

  if (body) body.style.display = 'block';
  if (footer) footer.style.display = 'flex';
  if (resultView) resultView.style.display = 'none';
  if (nextBtn) nextBtn.innerHTML = 'அடுத்த கேள்வி <i class="fa-solid fa-chevron-right"></i>';

  renderQuizQuestion();
}

// ==========================================================================
// 11. BUSINESS PROPOSAL HANDLER & JOB OPENINGS PORTAL
// ==========================================================================
function handleBusinessSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('bizName').value;
  const phone = document.getElementById('bizPhone').value;
  const sector = document.getElementById('bizCategory').value;
  const loan = document.getElementById('bizLoanNeeded').value;
  const pitch = document.getElementById('bizPitch').value;

  const appId = 'TN-PENN-2026-' + Math.floor(1000 + Math.random() * 9000);

  let recScheme = 'முத்ரா கடன் திட்டம் (PMMY)';
  if (loan === 'standup_india') recScheme = 'ஸ்டாண்ட்-அப் இந்தியா திட்டம் (₹10 லட்சம் முதல் ₹1 கோடி வரை)';
  if (loan === 'mudra_shishu') recScheme = 'முத்ரா சிசு திட்டம் (₹50,000 மானியக் கடன்)';
  if (sector === 'handloom') recScheme = 'தமிழ்நாடு மகளிர் கைத்தறி & நெசவாளர் நல வாரிய மானியம்';
  if (sector === 'agri') recScheme = 'வேளாண் மகளிர் கூட்டுறவு வங்கி கடன் & கிசான் கிரெடிட்';

  const successBox = document.getElementById('bizSuccessBox');
  const successText = document.getElementById('bizSuccessText');
  const recPill = document.getElementById('recommendedSchemePill');

  if (successBox && successText && recPill) {
    successText.innerHTML = `வணக்கம் <strong>${name}</strong> அவர்களே! உங்கள் விண்ணப்பம் பதிவு செய்யப்பட்டது.<br>விண்ணப்ப எண்: <strong>${appId}</strong>.<br>தொலைபேசி எண் (${phone}) வழியாக மாவட்ட தொழில் மையம் (DIC) உங்களைத் தொடர்பு கொள்ளும்.`;
    recPill.textContent = `பரிந்துரைக்கப்பட்ட திட்டம்: ${recScheme}`;

    document.getElementById('businessApplyForm').style.display = 'none';
    successBox.style.display = 'block';
  }
}

function resetBizForm() {
  const form = document.getElementById('businessApplyForm');
  const successBox = document.getElementById('bizSuccessBox');
  if (form) {
    form.reset();
    form.style.display = 'block';
  }
  if (successBox) successBox.style.display = 'none';
}

function filterJobs(category) {
  const pills = document.querySelectorAll('.job-pill');
  pills.forEach((p) => p.classList.remove('active'));

  const activePill = Array.from(pills).find((p) =>
    p.getAttribute('onclick').includes(`'${category}'`)
  );
  if (activePill) activePill.classList.add('active');

  const items = document.querySelectorAll('.job-item');
  items.forEach((item) => {
    if (category === 'all' || item.getAttribute('data-type') === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function applyJobModal(jobTitle) {
  const modal = document.getElementById('jobModalOverlay');
  const title = document.getElementById('jobModalTitle');
  if (modal && title) {
    title.textContent = `விண்ணப்பம்: ${jobTitle}`;
    modal.classList.add('active');
  }
}

function closeJobModal() {
  const modal = document.getElementById('jobModalOverlay');
  if (modal) modal.classList.remove('active');
}

function handleJobApplySubmit(e) {
  e.preventDefault();
  alert('உங்கள் வேலை விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! சம்பந்தப்பட்ட துறை உங்களை விரைவில் தொடர்பு கொள்ளும்.');
  closeJobModal();
}

// ==========================================================================
// 12. LANGUAGE SWITCHER (TAMIL <-> ENGLISH)
// ==========================================================================
function toggleLanguage() {
  AppState.currentLang = AppState.currentLang === 'ta' ? 'en' : 'ta';
  const label = document.getElementById('langLabel');
  if (label) {
    label.textContent = AppState.currentLang === 'ta' ? 'English' : 'தமிழ்';
  }

  const dict = i18nData[AppState.currentLang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.innerHTML = dict[key];
    }
  });

  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.placeholder = AppState.currentLang === 'ta'
      ? 'பாரதியிடம் கேளுங்கள்... (Type in Tamil or English)'
      : 'Ask Bharathi... (Type question in English or Tamil)';
  }
}

// ==========================================================================
// 13. INITIALIZATION & EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Canvas initialization
  initFireCanvas();

  // 2. Render initial quiz question
  renderQuizQuestion();

  // 3. Language Toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }

  // 4. Mobile hamburger toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#0d121c';
        navMenu.style.padding = '1.5rem';
        navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
      }
    });
  }

  // 5. Highlight active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  console.log('Bharathiyar Women Liberation & Safety Portal successfully initialized!');
});

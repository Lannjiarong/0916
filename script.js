/**
 * Personal Identity & Precision Live Clock
 * Zero-dependency modern ES6 script
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // DOM Elements Selection
  // ==========================================
  const hoursEl = document.getElementById('clock-hours');
  const minutesEl = document.getElementById('clock-minutes');
  const secondsEl = document.getElementById('clock-seconds');
  const periodEl = document.getElementById('clock-period');
  const dateTextEl = document.getElementById('date-text');
  const timezoneTextEl = document.getElementById('timezone-text');

  const greetingTextEl = document.getElementById('greeting-text');
  const greetingIconEl = document.getElementById('greeting-icon');

  const btn12h = document.getElementById('btn-12h');
  const btn24h = document.getElementById('btn-24h');

  // Identity elements
  const userNameEl = document.getElementById('user-name');
  const editNameBtn = document.getElementById('edit-name-btn');
  const nameEditBox = document.getElementById('name-edit-box');
  const nameInput = document.getElementById('name-input');
  const saveNameBtn = document.getElementById('save-name-btn');
  const cancelNameBtn = document.getElementById('cancel-name-btn');

  const userBioEl = document.getElementById('user-bio');
  const editBioBtn = document.getElementById('edit-bio-btn');
  const bioEditBox = document.getElementById('bio-edit-box');
  const bioInput = document.getElementById('bio-input');
  const saveBioBtn = document.getElementById('save-bio-btn');
  const cancelBioBtn = document.getElementById('cancel-bio-btn');

  const avatarInitialsEl = document.getElementById('avatar-initials');

  // Contact / Action & Toast
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const toastEl = document.getElementById('toast');
  const toastMessageEl = document.getElementById('toast-message');

  // Theme dots
  const themeDots = document.querySelectorAll('.theme-dot');

  // ==========================================
  // State Initialization from LocalStorage
  // ==========================================
  let is24HourFormat = localStorage.getItem('personal_time_format') === '24h';
  let currentName = localStorage.getItem('personal_display_name') || 'Lannjiarong';
  let currentBio = localStorage.getItem('personal_user_bio') || 'Software Crafter & Technology Explorer';
  let activeTheme = localStorage.getItem('personal_theme') || 'cyan';

  // Apply initial data
  userNameEl.textContent = currentName;
  userBioEl.textContent = currentBio;
  updateAvatarInitials(currentName);
  applyTheme(activeTheme);
  updateFormatUI();

  // ==========================================
  // Clock & Time Functions
  // ==========================================
  function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let period = '';

    if (is24HourFormat) {
      hours = String(hours).padStart(2, '0');
      periodEl.style.display = 'none';
    } else {
      period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      hours = String(hours).padStart(2, '0');
      periodEl.style.display = 'inline-block';
      periodEl.textContent = period;
    }

    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    // Date formatting (e.g. Wednesday, September 16, 2026)
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateTextEl.textContent = now.toLocaleDateString(undefined, dateOptions);

    // Timezone string
    updateTimezone(now);

    // Dynamic greeting based on 24h hour
    updateGreeting(now.getHours());
  }

  function updateTimezone(now) {
    try {
      const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';
      const offsetMinutes = -now.getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? '+' : '-';
      const absMinutes = Math.abs(offsetMinutes);
      const offsetHours = String(Math.floor(absMinutes / 60)).padStart(2, '0');
      const offsetRemainder = String(absMinutes % 60).padStart(2, '0');
      const formattedOffset = `UTC${sign}${offsetHours}:${offsetRemainder}`;

      timezoneTextEl.textContent = `${formattedOffset} • ${timeZoneName}`;
    } catch {
      timezoneTextEl.textContent = 'Local Time';
    }
  }

  function updateGreeting(hour) {
    let greeting = 'Good day';
    let icon = '✨';

    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
      icon = '🌅';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
      icon = '☀️';
    } else if (hour >= 17 && hour < 22) {
      greeting = 'Good evening';
      icon = '🌆';
    } else {
      greeting = 'Good night';
      icon = '🌙';
    }

    greetingTextEl.textContent = greeting;
    greetingIconEl.textContent = icon;
  }

  function updateFormatUI() {
    if (is24HourFormat) {
      btn24h.classList.add('active');
      btn12h.classList.remove('active');
    } else {
      btn12h.classList.add('active');
      btn24h.classList.remove('active');
    }
  }

  btn12h.addEventListener('click', () => {
    if (is24HourFormat) {
      is24HourFormat = false;
      localStorage.setItem('personal_time_format', '12h');
      updateFormatUI();
      updateClock();
    }
  });

  btn24h.addEventListener('click', () => {
    if (!is24HourFormat) {
      is24HourFormat = true;
      localStorage.setItem('personal_time_format', '24h');
      updateFormatUI();
      updateClock();
    }
  });

  // Start clock immediately and synchronize with every second
  updateClock();
  setInterval(updateClock, 1000);

  // ==========================================
  // Editable Name Logic
  // ==========================================
  function updateAvatarInitials(name) {
    if (!name || !name.trim()) {
      avatarInitialsEl.textContent = 'ME';
      return;
    }
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      avatarInitialsEl.textContent = (words[0][0] + words[1][0]).toUpperCase();
    } else {
      avatarInitialsEl.textContent = words[0].slice(0, 2).toUpperCase();
    }
  }

  function startEditingName() {
    nameInput.value = currentName;
    nameEditBox.classList.remove('hidden');
    userNameEl.parentElement.classList.add('hidden');
    nameInput.focus();
    nameInput.select();
  }

  function saveName() {
    const newName = nameInput.value.trim();
    if (newName) {
      currentName = newName;
      userNameEl.textContent = currentName;
      localStorage.setItem('personal_display_name', currentName);
      updateAvatarInitials(currentName);
      showToast(`Welcome, ${currentName}!`);
    }
    cancelNameEdit();
  }

  function cancelNameEdit() {
    nameEditBox.classList.add('hidden');
    userNameEl.parentElement.classList.remove('hidden');
  }

  userNameEl.addEventListener('click', startEditingName);
  editNameBtn.addEventListener('click', startEditingName);
  saveNameBtn.addEventListener('click', saveName);
  cancelNameBtn.addEventListener('click', cancelNameEdit);

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') cancelNameEdit();
  });

  // ==========================================
  // Editable Bio Logic
  // ==========================================
  function startEditingBio() {
    bioInput.value = currentBio;
    bioEditBox.classList.remove('hidden');
    userBioEl.parentElement.classList.add('hidden');
    bioInput.focus();
    bioInput.select();
  }

  function saveBio() {
    const newBio = bioInput.value.trim();
    if (newBio) {
      currentBio = newBio;
      userBioEl.textContent = currentBio;
      localStorage.setItem('personal_user_bio', currentBio);
      showToast('Bio updated!');
    }
    cancelBioEdit();
  }

  function cancelBioEdit() {
    bioEditBox.classList.add('hidden');
    userBioEl.parentElement.classList.remove('hidden');
  }

  userBioEl.addEventListener('click', startEditingBio);
  editBioBtn.addEventListener('click', startEditingBio);
  saveBioBtn.addEventListener('click', saveBio);
  cancelBioBtn.addEventListener('click', cancelBioEdit);

  bioInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveBio();
    if (e.key === 'Escape') cancelBioEdit();
  });

  // ==========================================
  // Theme Switcher Logic
  // ==========================================
  function applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    themeDots.forEach(dot => {
      if (dot.getAttribute('data-color') === themeName) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const chosenTheme = dot.getAttribute('data-color');
      activeTheme = chosenTheme;
      localStorage.setItem('personal_theme', chosenTheme);
      applyTheme(chosenTheme);
      showToast(`Theme set to ${chosenTheme.toUpperCase()}`);
    });
  });

  // ==========================================
  // Copy Email & Toast Notification
  // ==========================================
  let toastTimeout = null;

  function showToast(message) {
    toastMessageEl.textContent = message;
    toastEl.classList.remove('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 2800);
  }

  btnCopyEmail.addEventListener('click', () => {
    const dummyEmail = 'hello@example.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dummyEmail)
        .then(() => showToast('Email copied to clipboard!'))
        .catch(() => showToast('hello@example.com'));
    } else {
      showToast('Contact: hello@example.com');
    }
  });
});

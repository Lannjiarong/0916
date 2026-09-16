# Personal Identity & Precision Live Clock

A modern personal landing page featuring a real-time digital clock, dynamic greetings, and an interactive identity card with dark glassmorphism styling.

## 🚀 Features

- **Precision Real-Time Clock**: Live hours, minutes, and seconds with smooth pulsing animations.
- **12H / 24H Toggle**: Instant format switching with saved preference.
- **Time-of-Day Greeting**: Automatically detects local time (Morning 🌅, Afternoon ☀️, Evening 🌆, Night 🌙).
- **Personalized Profile Card**:
  - Prominent display name with instant click-to-edit inline editor.
  - Role & bio tagline editor.
  - Avatar badge that dynamically derives initials from your name.
  - Online/active pulsing indicator.
  - Settings persisted across visits using browser `localStorage`.
- **Aesthetic Customization**:
  - Dark glassmorphism (`backdrop-filter: blur(24px)`).
  - 4 ambient themes: **Cyan Aurora**, **Electric Violet**, **Emerald Matrix**, and **Solar Sunset**.
  - Animated ambient lighting mesh.
- **Zero Dependencies**: Pure HTML5, CSS3, and modern Vanilla ES6 JavaScript.

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, accessibility attributes, and SEO optimization.
- **Vanilla CSS**: Custom CSS variables, responsive design, and glassmorphic UI.
- **Vanilla JavaScript**: Real-time clock loop, state persistence, and DOM interactions.

## 💻 Local Usage

Simply open `index.html` in any modern web browser or start a local server:

```bash
# Python HTTP Server
python -m http.server 8080
```
Then navigate to `http://localhost:8080/`.

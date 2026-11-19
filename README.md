# NANDHINI S — Personal Developer Portfolio

A modern developer portfolio website built for **Nandhini S**, an Information Technology student at **Sri Krishna College of Technology (SKCT), Coimbatore**, and **AWS Student Builder Group Leader**.

---

## 🎨 Visual Design System

- **Background**: Almost pure black (`#030303`) with a subtle dark blue grid (`rgba(0, 200, 255, 0.035)`) and soft radial lighting effects.
- **Primary Accent**: Neon cyan (`#00C8FF`) with ambient glows.
- **Secondary Accent**: Light blue (`#73D8FF`).
- **Achievements Variation**: Deep dark-blue background (`#030b18`) with yellow/gold accent typography (`#FFD700`).
- **Typography**: Modern bold sans-serif (*Plus Jakarta Sans*) with monospace accents (*Fira Code*).
- **Cards**: Glassmorphism cards with rounded borders, cyan glowing hover highlights, and smooth elevation.
- **Pure Vanilla Stack**: Zero frameworks (No React, No Tailwind CSS, No Bootstrap).

---

## 🧭 Navigation & Section Architecture

1. **Header (Sticky Navbar)**:
   - Brand: `NANDHINI S` with glowing cyan indicator.
   - Links: `Home`, `Projects`, `Gallery`, `Skills`, `Certificates`, `Achievements`, `Resume`, `Contact`.
   - Active navigation: **Cyan outlined pill** indicator based on scroll position (ScrollSpy).
   - Responsive mobile hamburger menu with animated toggle.

2. **Home Section**:
   - Left Column: Small cyan `HI, I'M`, large single-line `NANDHINI S`, professional title `Information Technology Student | AWS Student Builder Group Leader`, and personal introduction.
   - Right Column: Circular profile photograph surrounded by concentric glowing cyan borders and 8 rotating technology icons with gentle animations.
   - Connect Section below hero: Quick access buttons for GitHub, LinkedIn, Instagram, and Email.

3. **Projects (`CREATIVE WORKS`)**:
   - Alternating image-and-content zigzag layouts (desktop) and stacked cards (mobile).
   - Showcases 5 featured projects:
     1. **SmartBlood DSS**: Smart blood management and decision support system.
     2. **EventSync**: Event management system with attendance and event tracking.
     3. **Hospital Pharmacy Management System**: Pharmacy management featuring inventory, prescriptions, and role-based access.
     4. **Quantum-Safe Secure Communication**: Secure communication using post-quantum cryptography (ML-KEM-768, AES-256-GCM, HKDF-SHA256).
     5. **TransitOps 🚌**: Real-time transit operations management platform developed as a full-stack hackathon project (Spring Boot 3, React 18, Vite, Tailwind CSS, MySQL 8, Spring Security, JWT).
   - Each project card includes screenshot preview, title, description, technology badges, and GitHub repository button.

4. **Gallery (`GALLERY`)**:
   - Subtitle: *Moments, memories and experiences.*
   - Responsive CSS Grid featuring grouped album carousels and multimedia:
     - **AWS LaunchPad 2026 – Kickstart Your Cloud Journey 🚀**: Inauguration video of the AWS Student Builder Group at Sri Krishna College of Technology (21 August 2026), organized and coordinated as AWS Student Builder Group Leader – SKCT, with in-card HTML5 video player and theater mode.
     - **AWS Student Builder Group Inauguration 2026 🚀 (Multi-Photo Carousel)**: Grouped album card featuring 4 event photos (Leadership Address by Nandhini S, Student Cloud Community celebration, Core Organizing Team, and Stage Dignitaries & Faculty) with in-card side arrows, counter badge (`1 / 4`), and synchronized Lightbox modal slideshow navigation (`‹` / `›` buttons and keyboard arrow keys).
     - **VARNAM’26 – National Level Tech Fest (Multi-Photo Carousel)**: Grouped album card featuring 3 event photos at Karpagam Institute of Technology (Team photo, MERN Full Stack Development Workshop, and Campus Expo) with in-card side arrows, counter badge (`1 / 3`), and Lightbox slideshow navigation. Highlights Mind Maze, Code Twins, and MERN Workshop.
     - **Building On-Chain Apps on Ethereum Blockchain (Multi-Photo Carousel)**: Hands-on session conducted by the Department of Artificial Intelligence & Data Science, SKCT (31 January 2026) featuring 2 lab photos with in-card side arrows, counter badge (`1 / 2`), and Lightbox slideshow navigation.
     - **Project Demonstrations** (SmartBlood DSS, EventSync, TransitOps)
     - **Throw Ball – Sports Achievement 🏅 (Multi-Photo Carousel)**: Prize winner in Throw Ball during 2nd year of college at SAHASVAT'26 Sports Day, featuring 3 photos (stage award ceremony, gold medal & certificate close-up, and team podium) with in-card side arrows (`‹` / `›`), counter badge (`1 / 3`), and Lightbox slideshow navigation.
   - Interactive JavaScript **Lightbox Modal** supporting full-screen image and video playback with side navigation arrows and keyboard controls.

5. **Skills (`EXPERTISE CONTROL CENTER`)**:
   - Two-column management interface:
     - **Left Sidebar**: Category filters with live counter badges: *All Skills (17)*, *Programming (3)*, *Frontend Development (4)*, *Backend Development (1)*, *Database Management (2)*, *Cloud & Systems (1)*, *Tools & Technologies (6)*.
     - **Right Area**: Live search bar filtering skills instantly by keyword or category.
     - 17 individual skill cards: C++, Python, Java, HTML, CSS, JavaScript, React, Spring Boot, MySQL, SQL, AWS, Git, GitHub, VS Code, Selenium, Maven, TestNG.

6. **Certificates (`CERTIFICATIONS`)**:
   - 3-column responsive gallery with certificate preview placeholders, titles, issuing organizations, years, and View Certificate modal buttons.

7. **Achievements (`ACHIEVEMENTS`)**:
   - Deep dark-blue background section with yellow accent typography (`#FFD700`).
   - Cards with dates, details, and vector visuals for:
     - AWS Student Builder Group Leader – SKCT
     - AWS LaunchPad 2026 event organization
     - Technical event coordination
     - Student community building
     - Throw Ball – Sports Achievement 🏅 (SAHASVAT'26 Sports Day Prize Winner)

8. **Resume (`RESUME`)**:
   - Two-column layout:
     - Left: Embedded PDF preview viewer loading `assets/docs/Nandhini_S_Resume_Placeholder.pdf`.
     - Right: Offline copy card with document icon, `OFFLINE COPY` heading, description, and Download Resume button.

9. **Contact (`CONTACT`)**:
   - Four premium secure line cards:
     1. `EMAIL SECURE LINE`
     2. `GITHUB PROFILE`
     3. `LINKEDIN NETWORK`
     4. `INSTAGRAM PROFILE`
   - Validated contact form (Name, Email, Message) with real-time feedback and honest validation notice.

---

## 📁 File Structure

```text
portfolio/
├── index.html              # Main HTML5 document
├── style.css               # Vanilla CSS3 stylesheet (Neon Cyan + Black + Dark Blue Grid)
├── script.js               # Vanilla JavaScript (Navigation, Search, Filter, Lightbox, Validation)
├── server.js               # Lightweight local Node.js server
├── README.md               # Project documentation
└── assets/
    ├── docs/
    │   └── Nandhini_S_Resume_Placeholder.pdf
    ├── videos/
    │   └── aws-sbg-launchpad.mp4       # AWS SBG LaunchPad video recording
    └── images/
        ├── nandhini-profile.jpg        # Circular hero profile photo
        ├── aws-inauguration-podium-speech.jpg          # AWS SBG Inauguration - Leadership Address
        ├── aws-inauguration-audience-celebration.jpg   # AWS SBG Inauguration - Student Community
        ├── aws-inauguration-team-leaders.jpg           # AWS SBG Inauguration - Core Organizing Team
        ├── aws-inauguration-stage-dignitaries.jpg      # AWS SBG Inauguration - Stage Launch Ceremony
        ├── varnam26-team.jpg                           # VARNAM'26 - National Tech Fest Team
        ├── varnam26-mern-workshop.png                  # VARNAM'26 - MERN Workshop Session
        ├── varnam26-team-gps.jpg                       # VARNAM'26 - Participation Highlights
        ├── ethereum-blockchain-session.jpg             # Ethereum Blockchain Hands-on Session
        ├── ethereum-blockchain-lab.jpg                 # Ethereum Blockchain Lab & Smart Contract Demo
        ├── sports-throwball-stage-award.jpg            # SAHASVAT'26 Throw Ball - Stage Award Ceremony
        ├── sports-throwball-medal.jpg                  # SAHASVAT'26 Throw Ball - Gold Medal & Certificate
        ├── sports-throwball-team-podium.jpg            # SAHASVAT'26 Throw Ball - Team Podium Celebration
        ├── project-smartblood.svg
        ├── project-eventsync.svg
        ├── project-pharmacy.svg
        ├── project-quantum.svg
        ├── project-transitops.svg
        ├── gallery-aws-event.svg
        ├── gallery-tech-workshop.svg
        ├── gallery-project-demo.svg
        ├── gallery-college-activity.svg
        ├── cert-aws-cloud.svg
        ├── cert-fullstack-dev.svg
        ├── cert-software-testing.svg
        ├── cert-quantum-security.svg
        ├── achievement-aws-leader.svg
        ├── achievement-launchpad.svg
        ├── achievement-tech-events.svg
        └── achievement-community.svg
```

---

## 🚀 How to Run Locally

### Option 1: Included Node.js Server (Recommended)
Open a terminal in the `portfolio` folder and run:
```bash
node server.js
```
Then visit **`http://localhost:3000`** in your web browser.

### Option 2: VS Code Live Server
1. Open the `portfolio` folder in Visual Studio Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Direct Browser Open
Double-click `index.html` to open it directly in Chrome, Edge, Firefox, or Safari.

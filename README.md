# physicsPlayground
Demo: https://trulle1234.github.io/physicsPlaygroundGithubPages/

An **interactive 2D physics playground** built with **Matter.js**, where you can experiment with bodies and even control gravity with your device’s tilt!

> **Note:** To use device-tilt controls on phones you **must** serve over HTTPS (see below).

---

## 🚀 Features

- **Interactive:** Interact with the bodies using your mouse.
- **Drag & Drop:** Tweek the settings and drop in bodies from the menu.
- **Device Tilt:** On supported mobile browsers, tilt your phone to change gravity direction.  
- **Keyboard Shortcuts:**  
  - **C** – Clear the scene  
---

## 🛠 Prerequisites

- **Node.js** & **npm** (v14+)
- **Matter.js**  
  ```bash
  npm install matter-js
  ```

Modern browsers restrict access to device‑motion APIs on non‑secure origins. You’ll need a self‑signed SSL cert for local testing.

---

## 💾 Installation

1. **Clone this repo**  
   ```bash
   git clone https://github.com/Trulle1234/physicsPlayground.git
   cd physicsPlayground
   ```

2. **Install dependencies**  
   ```bash
   npm install matter-js
   ```

3. **Generate a self‑signed cert** (for local HTTPS)  


4. **Serve over HTTPS** (using `http-server`)
   

6. **Open in browser**  

---

## 📁 Project Structure

```plaintext
physicsPlayground/
├── icons/            # SVG icons
├── src/              # JavaScript source (Matter.js setup, controls, etc.)
├── index.html        # Main HTML file
├── cert.pem          # SSL certificate (optional)
└── key.pem           # SSL private key (optional)
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Have fun exploring physics in your browser!  
Feel free to open an issue or reach out at `trulle.123.contact@gmail.com` with questions or ideas.```

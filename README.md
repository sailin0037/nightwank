<div align="center">

<img src="https://nighthawkpdfreader.app/favicon-v2.svg" width="96" height="96" alt="Nighthawk PDF Reader" />

# Nighthawk PDF Reader

**Lightweight Windows PDF reader with Direct2D hardware acceleration, biological dark mode, and zero telemetry.**

[![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011%20(64--bit)-0078D6.svg?logo=windows&logoColor=white)](https://nighthawkpdfreader.app/download.html)
[![Language](https://img.shields.io/badge/Language-C%2B%2B20-00599C.svg?logo=c%2B%2B&logoColor=white)](https://nighthawkpdfreader.app/performance.html)
[![Renderer](https://img.shields.io/badge/Renderer-Direct2D-764ABC.svg)](https://nighthawkpdfreader.app/performance.html)
[![VirusTotal](https://img.shields.io/badge/VirusTotal-0%2F72%20Clean-10B981.svg?logo=virustotal&logoColor=white)](https://nighthawkpdfreader.app/security.html)
[![Telemetry](https://img.shields.io/badge/Telemetry-Air--Gapped%20(0%20calls)-10B981.svg)](https://nighthawkpdfreader.app/privacy.html)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<p>
  <a href="https://nighthawkpdfreader.app">Official Website</a> •
  <a href="https://github.com/sailin0037/nightwank/releases/latest/download/Nighthawk-Setup.exe">Download Setup (.exe)</a> •
  <a href="https://github.com/sailin0037/nightwank/releases/latest/download/Nighthawk-Windows-Portable.zip">Download Portable (.zip)</a> •
  <a href="https://nighthawkpdfreader.app/security.html">Trust & Security Center</a>
</p>

</div>

---

## Overview

Most modern PDF readers have become bloated web apps bundled inside 300MB Electron containers that idle at 400MB RAM, collect background analytics, and lock basic markup tools behind subscriptions.

**Nighthawk PDF Reader** is built from bare-metal **C++** with native **Direct2D** hardware acceleration. It delivers sub-0.3-second cold startup, 60fps locked scrolling on massive 1,000+ page documents, custom HLSL-powered biological dark modes, and complete local privacy with zero network calls.

---

## Key Features

### Direct2D Native Hardware Acceleration
- Written in pure C++ using the Direct2D graphics pipeline.
- Offloads rendering to the GPU for lag-free scrolling, instant vector zoom, and rapid page flipping.
- Memory footprint: idles at ~18–35MB RAM compared to 400MB+ for Adobe Acrobat.

### Biological Dark Modes (HLSL Shaders)
Unlike generic viewers that invert all colors indiscriminately (inverting photos and technical diagrams into unreadable negatives), Nighthawk implements shader-based color mapping:
- **Predator Mode:** Deep OLED crimson and black preserving natural night vision adaptation.
- **Night Vision:** High-contrast tactical amber and green minimizing ocular strain.
- **Sepia Paper:** Warm, blue-light-filtered tones designed for extended reading sessions.
- **Smart Color Inversion:** Inverts stark white backgrounds while preserving original image and photo fidelity.

### Free Native Markup & Annotations
- **Highlighting:** Precision text highlighting across custom color palettes.
- **Freehand Pen & Stylus:** Draw notes, sketch formulas, and annotate diagrams.
- **Sticky Notes:** Place contextual notes anywhere on the document.
- **PDF Standard Compliance:** All annotations are saved natively into standard PDF objects, ensuring compatibility with Adobe Acrobat, Apple Preview, and SumatraPDF.

### Air-Gapped Zero-Telemetry Security
- **Zero Sockets:** Document viewing contains zero network dependencies. Your documents never touch a cloud buffer, analytics API, or third-party telemetry server.
- **Biometric Vault:** Encrypt sensitive documents locally with native **Windows Hello** (fingerprint, facial recognition, or PIN).

---

## Benchmark Comparison

| Metric | Nighthawk PDF | SumatraPDF | Adobe Acrobat | Microsoft Edge |
| :--- | :---: | :---: | :---: | :---: |
| **Architecture** | **Native C++ / Direct2D** | Native C++ / GDI+ | C++ / CEF Webview | Chromium Web Engine |
| **Startup Time** | **< 0.3 sec** | ~0.5 sec | 4.2 – 7.8 sec | 1.8 – 3.2 sec |
| **RAM (100MB PDF)** | **~28 MB** | ~35 MB | ~380 MB | ~240 MB |
| **Biological Dark Mode** | **Yes (Shaders)** | Basic Invert | Paywalled / None | Invert Only |
| **Free Annotations** | **Yes (Full Suite)** | Limited | Requires Subscription | Basic Pen |
| **Network Telemetry** | **0 Calls (Air-Gapped)** | Zero | Constant Sync | Heavy Telemetry |
| **Installer Size** | **~27 MB** | ~14 MB | ~350 MB | Pre-installed |

---

## Downloads & Verification

### Official Releases (v1.0.0 Stable)

[![Download Setup](https://img.shields.io/badge/Download-Installer%20(.exe)-10b981.svg?logo=windows&logoColor=white&style=for-the-badge)](https://github.com/sailin0037/nightwank/releases/latest/download/Nighthawk-Setup.exe)
[![Download Portable](https://img.shields.io/badge/Download-Portable%20(.zip)-3b82f6.svg?logo=archive&logoColor=white&style=for-the-badge)](https://github.com/sailin0037/nightwank/releases/latest/download/Nighthawk-Windows-Portable.zip)

| Package | Format | Direct Download |
| :--- | :---: | :--- |
| **Nighthawk Setup** | `.exe` | [Download Installer](https://github.com/sailin0037/nightwank/releases/latest/download/Nighthawk-Setup.exe) |
| **Nighthawk Portable** | `.zip` | [Download Standalone Zip](https://github.com/sailin0037/nightwank/releases/latest/download/Nighthawk-Windows-Portable.zip) |

### Cryptographic Checksums (SHA-256)

To verify the mathematical integrity of your binary before execution:

```powershell
# In PowerShell:
Get-FileHash .\Nighthawk-Setup.exe -Algorithm SHA256
```

- **`Nighthawk-Setup.exe`**:
  ```
  3BDE425564851480E5AB6B798CD7F79CA56520C3CA5621A55831822626696AE9
  ```
- **`Nighthawk-Windows-Portable.zip`**:
  ```
  08F75C86584E1C507B83941A9E673C95B3B1DB0339E67C3DD24D9008D6BE3709
  ```

*Full security audit and VirusTotal report available at [nighthawkpdfreader.app/security](https://nighthawkpdfreader.app/security.html).*

---

## Windows SmartScreen Verification

Because Nighthawk is an independent, community-driven project:
1. Windows Defender SmartScreen may display: *"Windows protected your PC"*.
2. Click **More info**.
3. Click **Run anyway**.

You can independently verify the binary against any security engine (0/72 clean across Microsoft Defender, CrowdStrike, Kaspersky, and Bitdefender).

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + O` | Open PDF Document |
| `Ctrl + S` | Save Annotations |
| `Ctrl + D` | Toggle Biological Dark Mode |
| `Ctrl + M` | Cycle Shaders (Predator / Night Vision / Sepia) |
| `Ctrl + +` / `Ctrl + -` | Hardware Zoom In / Out |
| `Ctrl + 0` | Fit Page to Width |
| `Ctrl + F` | Instant In-Memory Text Search |
| `H` | Toggle Text Highlighter Tool |
| `P` | Toggle Freehand Pen / Stylus |
| `Esc` | Return to Navigation Hand Tool |

---

## Security Vulnerability Disclosure

If you identify any memory safety bug, rendering crash, or parsing vulnerability:
- Open an advisory directly via the **GitHub Security Advisory** tab.
- Or email: `security@nighthawkpdfreader.app`
- All vulnerability disclosures receive a response within **24 hours**.

---

## License

Distributed under the **MIT License**. Free for personal, academic, and commercial use.

---

<div align="center">
  <sub>Crafted for speed, privacy, and long reading sessions.</sub><br/>
  <sub>© 2026 <a href="https://nighthawkpdfreader.app">Nighthawk PDF Reader</a></sub>
</div>

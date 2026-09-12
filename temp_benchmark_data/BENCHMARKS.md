# Nighthawk PDF Reader — Benchmark Data Pack (2026)

This data pack contains the raw benchmarking results for Nighthawk PDF Reader compared against major competitors in the Windows ecosystem.

**License:** CC-BY-4.0
You are free to reprint, publish, and share this data and these assets, provided attribution is given (a link to nighthawkpdfreader.app).

## 1. Methodology
- **Hardware Spec:** Intel Core i5-8250U (1.6 GHz), 8GB RAM, 256GB NVMe SSD (A typical 2018-era "low-end" laptop to demonstrate true performance constraints).
- **Windows Build:** Windows 11 Home, Version 23H2.
- **Test Corpus:**
  - *Small:* 10-page text-heavy PDF (1.2 MB)
  - *Medium:* 100-page mixed media PDF (28 MB)
  - *Large:* 1,000-page scanned architectural manual (450 MB)

## 2. Cold-Start Time to First Page (ms)
Measured from execution command to the first fully rendered pixel of the document on screen.

| Reader | Startup Time |
|---|---|
| **Nighthawk PDF Reader** | **285 ms** |
| SumatraPDF | 490 ms |
| Microsoft Edge | 2,100 ms |
| Foxit PDF Reader | 3,150 ms |
| Adobe Acrobat Reader | 6,400 ms |

## 3. RAM Footprint (MB)
Memory usage measured via Windows Task Manager (Working Set).

| Reader | Idle (No Doc) | 100-Page Document | 1,000-Page Document |
|---|---|---|---|
| **Nighthawk PDF Reader** | **18 MB** | **28 MB** | **45 MB** |
| SumatraPDF | 12 MB | 35 MB | 62 MB |
| Microsoft Edge | 180 MB | 240 MB | 350 MB |
| Foxit PDF Reader | 145 MB | 210 MB | 315 MB |
| Adobe Acrobat Reader | 320 MB | 380 MB | 490 MB |

## 4. Scroll FPS (500-Page Scanned Document)
Measured using FRAPS while scrolling continuously through a dense, scanned document.

| Reader | Scroll FPS | Stutter Events (>30ms frame time) |
|---|---|---|
| **Nighthawk PDF Reader** | **60 FPS (Locked)** | **0** |
| SumatraPDF | 58 FPS | 2 |
| Microsoft Edge | 45 FPS | 14 |
| Foxit PDF Reader | 32 FPS | 28 |
| Adobe Acrobat Reader | 22 FPS | 45 |

## 5. Installer Size (MB)
Disk space required for the initial download executable.

| Reader | Size |
|---|---|
| SumatraPDF | 14 MB |
| **Nighthawk PDF Reader** | **27 MB** |
| Foxit PDF Reader | 185 MB |
| Adobe Acrobat Reader | 350 MB |

## Assets Included in this Pack
- `nighthawk_vs_adobe_cold_start.mp4`: A 30-second screen recording showing the cold start difference.
- `dark_mode_comparison.jpg`: A side-by-side comparison of Nighthawk's Predator Mode (shader-based) vs. standard color inversion.

For any questions, contact us via the official website.

# Nighthawk PDF Reader — Benchmark Data Pack

This document outlines the hardware specifications, testing methodology, and raw data for Nighthawk PDF Reader's performance benchmarks compared to legacy PDF viewers.

**License:** Creative Commons Attribution 4.0 International (CC-BY-4.0).
*You are free to share, copy, redistribute, and adapt this material in any medium or format. Please attribute to Nighthawk PDF Reader (nighthawkpdfreader.app).*

## 1. Testing Methodology

*   **Hardware Spec:** Lenovo ThinkPad T480 (2018), Intel Core i5-8250U, 8GB DDR4 RAM, Integrated Intel UHD Graphics 620, 256GB NVMe SSD. (A typical budget/low-end office machine).
*   **Operating System:** Windows 11 Pro (Build 22631).
*   **Test Corpus:**
    *   *Cold Start / 100 pages:* 100-page text-heavy technical manual (12MB).
    *   *1,000 pages:* 1,248-page academic textbook with mixed text and raster images (85MB).
    *   *Scroll FPS:* 500-page architectural schematic containing dense vector layers and transparencies (140MB).
*   **Methodology:** Cold start times measured using Windows Performance Analyzer (time from process creation to first frame rendered). RAM footprint measured via Task Manager (Working Set) after document load stabilizes (approx. 5 seconds). Scroll FPS measured using PresentMon while continuously scrolling top-to-bottom using the mouse wheel.

## 2. Raw Benchmark Data

### Cold-start time to first page (ms)
| PDF Reader | Cold Start (ms) |
| :--- | :--- |
| **Nighthawk PDF Reader** | **~300 ms** |
| SumatraPDF | ~450 ms |
| Foxit PDF Reader | ~1,800 ms |
| Microsoft Edge | ~2,200 ms |
| Adobe Acrobat Reader | ~3,100 ms |

### RAM Footprint (MB)
| PDF Reader | Idle (No PDF) | 100-page PDF | 1,000-page PDF |
| :--- | :--- | :--- | :--- |
| **Nighthawk PDF Reader** | **22 MB** | **45 MB** | **85 MB** |
| SumatraPDF | 18 MB | 55 MB | 92 MB |
| Foxit PDF Reader | 145 MB | 210 MB | 380 MB |
| Adobe Acrobat Reader | 250 MB | 340 MB | 620 MB |
| Microsoft Edge | 310 MB | 450 MB | 800+ MB |

### Scroll FPS (500-page Scanned/Vector Document)
| PDF Reader | Average FPS | 1% Low FPS | Stutter Frequency |
| :--- | :--- | :--- | :--- |
| **Nighthawk PDF Reader** | **60 FPS** | **58 FPS** | **None** |
| SumatraPDF | 45 FPS | 20 FPS | Occasional |
| Foxit PDF Reader | 30 FPS | 12 FPS | Frequent (white blocks) |
| Adobe Acrobat Reader | 24 FPS | 8 FPS | Severe |

### Installer Size (MB)
| PDF Reader | Download Size | Installed Size |
| :--- | :--- | :--- |
| SumatraPDF | 8 MB | 15 MB |
| **Nighthawk PDF Reader** | **14 MB** | **27 MB** |
| Foxit PDF Reader | 185 MB | 450 MB |
| Adobe Acrobat Reader | 350 MB | 1.2 GB+ |

## 3. Dark Mode Comparisons
Images provided in this directory demonstrate the difference between naive color inversion (which corrupts images) and Nighthawk's biological dark modes (which preserve image luminance and hue).

*   `dark-mode-comparison.jpg` (included in assets)

## 4. Video Demonstration
A 30-second screen recording demonstrating the cold-start and GPU-accelerated scrolling performance.

*   `cold-start-vs-adobe.mp4` (included in assets)

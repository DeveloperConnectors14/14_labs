# 14Labs website: image guide

How to find, choose and hand over photos for the website, and which images still need replacing.

## 1. Purpose

The 11 research cards on the homepage currently use **AI-generated images** (dark navy backgrounds with a single glowing object). We are replacing them, one card at a time, with **real photos that are free to use**.

The goal is to keep the carousel **consistent**. All cards should still look like one set, with the white card title easy to read on every image.

## 2. Where to find images

All three sites below are **free for commercial use** and need **no attribution**.

| Site | How to get portrait (tall) photos |
|---|---|
| [unsplash.com](https://unsplash.com) (best quality) | Search, then set the **Orientation → Portrait** filter |
| [pexels.com](https://www.pexels.com) | Search, then set **Orientation → Portrait** |
| [pixabay.com](https://pixabay.com) | Search, then set **Orientation → Vertical** |

- **Avoid "Unsplash+" photos.** These are paid and are marked with a crown or plus icon.
- **Your own lab photos are better than stock.** Photos of the team's labs and equipment (UET, CERAD, KICS) are the most authentic option.

## 3. Image requirements

### Research cards (the 11 papers)

Cards are **400 × 600 px (2:3 portrait)**.

- **Shape and size:** portrait (tall) photo, **at least 1200 px wide**.
- **Background:** dark or neutral. Avoid bright, busy backgrounds.
- **Subject position:** in the **middle or lower half**. The top third sits under the card title.
- **Do not use:** recognisable faces, brand logos, or text inside the image.

### Other images

| Where | Shape | Minimum size |
|---|---|---|
| Case-study cover (large banner on the case-study page) | Wide landscape, shown at 21:9 | 2000 px wide |
| Case-study card (homepage "Case studies" section) | Landscape | 1200 px wide |
| "Our focus" photo (homepage) | Landscape 3:2 | 1600 px wide |
| Paper page header (optional, different from the card photo) | Wide landscape; the title sits on the lower-left part | 2000 px wide |

## 4. How photos are treated on the site

- **Default:** each photo keeps its own colours. A **navy fade at the top** keeps the white title readable. In the code these cards are marked `imgTone: "dark"`.
- **Alternative if the set looks mixed:** a full **navy/teal duotone** on every photo. It is very uniform, but it hides the original colours.

## 5. Research card status

For the more scientific papers (#5, #9, #10, #11), exact matches are rare. A **general lab photo** (microscope, glassware, metal powder close-up) is fine.

| # | Card title | Paper | Search terms | Status | Credit |
|---|---|---|---|---|---|
| 1 | Solar Forecasting Review | Solar irradiance forecasting meta-review (Results in Engineering, 2026) | "solar panels sunset", "solar farm aerial" | ✅ Done: aerial solar farm | Bernd Dittrich (Unsplash) |
| 2 | Ti6Al4V Property Prediction | ML prediction of quasi-static properties in SLM Ti6Al4V (Int. J. Precision Eng. & Manufacturing) | "metal 3D printing", "titanium part", "laser metal" | ✅ Done: 3D printer head | Jakub Żerdzicki (Unsplash) |
| 3 | Fatigue Life Prediction | ML and physics-based fatigue life prediction of AM Ti-6Al-4V (Progress in Additive Manufacturing) | "metal part macro", "3D printed metal", "engineering lab" | ✅ Done: metal lattice sample in a gloved hand | ThisisEngineering (Unsplash) |
| 4 | Air Quality Prediction | ML for air quality prediction and sustainable urban planning (Sustainable Futures) | "smog city", "air pollution skyline" | ✅ Done: smoggy skyline with sun | Dawun Choi (Unsplash) |
| 5 | Nanoferrite Electrocatalysts | Zn–Co nanoferrite electrocatalysts for hydrogen and oxygen generation (Results in Chemistry) | "chemistry lab glassware", "electrolysis", "hydrogen" | ✅ Done: pipette filling glass vials | Fulvio Ciccolo (Unsplash) |
| 6 | Ensemble Solar Forecasting | Hybrid ensemble forecasting of solar irradiance (under review) | "solar panels close up", "solar cells" | ✅ Done: solar farm rows | Tom Fisk (Pexels) |
| 7 | Multi-Horizon Solar Prediction | Multi-horizon solar energy prediction in Lahore (under review) | "sun clouds sky", "solar panel field" | ✅ Done: sun breaking through clouds | Naval Rathore (Unsplash) |
| 8 | Automated Fire Extinguishing | Vision-based fire extinguishing with YOLOv11 and sensor fusion (under review) | "fire flame dark", "fire extinguisher", "smoke detector" | ✅ Done: single flame on black | Chirag Nayak (Unsplash) |
| 9 | Diffusion TEM Imaging | Diffusion-model regeneration of TEM images of ZnO particles (under review) | "electron microscope", "microscope lab" | ✅ Done: lab microscope with sample | ThisisEngineering (Unsplash) |
| 10 | Abamectin Nanoparticles | PVP-capped abamectin nanoparticles (under review) | "laboratory test tubes", "nanotechnology lab" | ✅ Done: pipette filling test tubes | Nathan Rimoux (Unsplash) |
| 11 | Interpretable SPS Modelling | Interpretable ML for SPS process–property relationships (under review) | "metal powder", "materials lab" | ✅ Done: preparing a metal sample | ThisisEngineering (Unsplash) |

## 6. Other images already on the site

| Where | Image | Credit |
|---|---|---|
| Case study "AI Find Sites", cover | Aerial view of a suburb | Max Böttinger (Unsplash) |
| Case study "AI Find Sites", card | Skyscrapers from below | Sean Pollock (Unsplash) |
| Case study "AI Admission Counselor", cover | University campus | Zhanhui Li (Unsplash) |
| Case study "AI Admission Counselor", card | Graduation cap | Dragos Blaga (Unsplash) |
| Homepage "Our focus" | Microscope close-up | Yassine Khalfalli (Unsplash) |
| Homepage hero, slide 1 (Agriculture) | Aerial fields at golden hour | Bernd Dittrich (Unsplash) |
| Homepage hero, slide 2 (Materials) | Sparks from a cutting machine | Clayton Cardinalli (Unsplash) |
| Homepage hero, slide 3 (Energy) | City street grid glowing at night, from above | Shio Yang (Unsplash) |

Note: the AI Admission Counselor cover shows the **University of Glasgow**, which is recognisable. Visitors could read it as a connection to that university. Replace it with a less identifiable campus or library photo if that is a concern.

## 6a. Paper page header photos

Each paper page has its own wide header photo behind the title (`heroImg`), different from its card photo. All are free Unsplash photos, chosen on 2026-10-26 from a contact sheet of 3 options per paper; #4 and #7 were replaced the same day from a wider shortlist.

| # | Paper | Header photo | Credit |
|---|---|---|---|
| 1 | Solar Forecasting Review | Solar panels in silhouette under a crimson dusk sky | Karsten Würth (Unsplash) |
| 2 | Ti6Al4V Property Prediction | Gold 3D-printed part on a dark print bed | Simon N. (Unsplash) |
| 3 | Fatigue Life Prediction | Dark perforated metal, macro | heino eisner (Unsplash) |
| 4 | Air Quality Prediction | Chimney smoke drifting over a hazy skyline | Anna Yablonskaya (Unsplash) |
| 5 | Nanoferrite Electrocatalysts | Gas bubbles rising through water on black | Zoran Borojevic (Unsplash) |
| 6 | Ensemble Solar Forecasting | Transmission towers against an orange sunset | Tinky 小天 (Unsplash) |
| 7 | Multi-Horizon Solar Prediction | Sunbeams breaking over a wide city from above | Reza Madani (Unsplash) |
| 8 | Automated Fire Extinguishing | Water mist from a ceiling fixture | Daoud Abismail (Unsplash) |
| 9 | Diffusion TEM Imaging | Electron micrograph (SEM) of crystalline particles | Joyita Bhattacharya (Unsplash) |
| 10 | Abamectin Nanoparticles | Tractor spraying a crop field at dusk | Teo Sticea (Unsplash) |
| 11 | Interpretable SPS Modelling | Dark metallic crystals, close-up | Atypeek Dgn (Unsplash) |

Notes:
- Unsplash has no real photos of electrolysis, TEM microscopes or spark plasma sintering, so #5, #9 and #11 use close stand-ins (#9 is a real electron micrograph, but SEM rather than TEM).
- None of the city photos (#4, #7) is confirmed to be Lahore; don't caption them as Lahore.

## 7. How to hand over a photo

1. Download the photo, choosing "Original" or "Large" size. Save it to the developer's **Downloads** folder, or share the file or link with the developer.
2. Say **which card number** it is for, e.g. "photo for #4".
3. The developer then:
   1. crops it to the right shape;
   2. compresses it to WebP;
   3. applies the treatment from section 4;
   4. checks it on desktop and mobile.
4. **The AI image is kept until the replacement is approved**, so a photo can always be swapped back.

## 8. For developers

- **Research card photos:**
  - Path: `public/media/research/<paper-id>-photo.webp`.
  - Format: portrait 2:3, about **900 × 1350 px**, WebP quality about 80.
  - On the paper in `src/data/publications.js`, set `img: "research/<paper-id>-photo.webp"` and `imgTone: "dark"`.
- **Paper page header photo:** `heroImg: "research/<paper-id>-hero.webp"` (wide landscape, 2400 px wide, WebP quality about 74). The title sits on the lower-left over a dark navy fade. If the crop hides the subject or puts something bright behind the navbar, set `heroPosition` (CSS object-position, e.g. `"center bottom"` or `"65% 85%"`). Without `heroImg` the header shows the brand gradient. For Unsplash photos, trigger the photo's `download_location` once when you use it (API guideline).
- **Case-study images:**
  - Path: `public/media/cases/`.
  - In `src/data/data.js`, set `cover` (page banner) or `img` (homepage card) on the case study.
- **Credits:** add a comment next to the image entry, e.g. `// Photo: <author> (<site>)`.
- **Verify:** run `npm run lint` and `npm run build`, then take screenshots at desktop (about 1709 px and 1366 px wide) and mobile (390 px), and look at them.
- **Overall site decisions** (layout, colours, card style) are in `CLAUDE.md` at the repository root.

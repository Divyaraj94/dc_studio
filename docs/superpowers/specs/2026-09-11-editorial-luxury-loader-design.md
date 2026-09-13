# Specification: Kinetic Editorial Luxury Preloader (Awwwards / Studio Freight Tier)

## 1. Objective & Aesthetic Philosophy
Elevate the portfolio preloader from a retro green terminal gimmick into an ultra-high-end $10,000+ creative engineering showcase. The aesthetic follows international award-winning design studios (Studio Freight, Locomotive, Awwwards Site of the Year, Active Theory):
- Restrained, cinematic obsidian palette (`#030508`).
- Large kinetic typography with physics-based counter animation (`000%` -> `100%`).
- Sliding masked discipline text carousel (`CREATIVE TECHNOLOGIST`, `OPEN-SOURCE CONTRIBUTOR`, `SYSTEMS ARCHITECT`, `PRODUCT BUILDER`).
- Architectural hairlines, micro-telemetry data points (`RESOLUTION`, `FRAME-RATE`, `LATENCY`).
- Seamless cinematic split-curtain wipe transition (`cubic-bezier(0.85, 0, 0.15, 1)`) revealing the underlying 3D WebGL core.
- Zero emojis, crisp typography, no juvenile glowing neon blur.

---

## 2. Component Architecture

### `Preloader.jsx` (Replacing MatrixLoader.jsx)
Located at: `src/components/Preloader/Preloader.jsx`

#### Internal State & Effects
1. **Counter Physics (`progress`)**:
   - Increments with variable acceleration: starts with crisp rapid ticks, slows gracefully near `90%`, and snaps to `100%`.
   - Formatted as `00` to `100%` (or 3-digit `000` to `100`).
2. **Kinetic Text Index (`currentDiscipline`)**:
   - Cycles through an array of high-status disciplines every 900ms:
     - `CREATIVE TECHNOLOGIST`
     - `OPEN-SOURCE CONTRIBUTOR`
     - `SYSTEMS ARCHITECT`
     - `PRODUCT BUILDER`
   - Animated with CSS vertical transform and opacity mask (`clip-path` / `overflow: hidden`).
3. **Telemetry Indicators**:
   - Real-time window inner width/height tracking (`window.innerWidth` × `window.innerHeight`).
   - Frame rate / rendering mode indicator (`60 FPS // WEBGL CORE`).
4. **Cinematic Exit Sequence**:
   - When progress reaches 100%, triggers `isExiting = true`.
   - Top curtain translates up (`translateY(-100%)`).
   - Bottom curtain translates down (`translateY(100%)`).
   - Calls `onComplete()` after 750ms transition.

---

## 3. Styling & Micro-Interactions

### `Preloader.module.css`
1. **Curtains Structure**:
   - `.curtainTop` and `.curtainBottom` create a split background.
   - Transition: `transform 0.85s cubic-bezier(0.85, 0, 0.15, 1)`.
2. **Noise Grain & Atmosphere**:
   - High-performance micro-pattern / fine noise grain overlay for a tactile, high-fashion magazine finish.
3. **Hairline Progress Track**:
   - 1px hairline bar across the center stage.
   - Progress fill with a bright needle indicator tracking current progress.
4. **Typography**:
   - Monospace for telemetry (`Space Mono`, `monospace`).
   - Clean sans-serif / grotesk for title & discipline text (`Outfit`, `Inter`, `sans-serif`).
5. **Interactive Controls**:
   - Subtle `[ SKIP ]` button in footer and top right with border expansion on hover.
   - Keyboard listener for `Escape` or `Enter` to instantly complete.

---

## 4. Integration with App & Navbar
- In `App.jsx`, replace `MatrixLoader` with `Preloader`.
- In `Navbar.jsx`, update the reload trigger button to `[ REPLAY INTRO ]` so visitors can re-experience the award-winning intro at any time.

---

## 5. Verification Plan
- Verify production build (`npm run build`).
- Verify in browser via subagent:
  - Check counter ticks smoothly to 100%.
  - Check discipline text flips cleanly.
  - Check split curtain opening reveals 3D portfolio hero seamlessly.
  - Check responsive layout on desktop and mobile.

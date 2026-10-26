# Orbit Lab

Open `index.html` directly in a browser. No installation, build, server, or internet connection is required. Matter.js 0.20.0 is bundled in vendor/.

Click **Burn** to launch; **Reset** returns to the pad. **Parameters** reveals all configurable geometry and physics inputs. Parameter changes and viewport resizing reset the flight. Flight time pauses in background tabs.

Defaults: Departure at (25vw, 50vh), diameter 10vh; Arrival at (75vw, 50vh), diameter 5vh; vehicle side 2.5vh. The vehicle starts flush with the top of Departure. Target altitude is measured from the surface to the vehicle center.

The dynamic vehicle uses Matter.js force integration at 120 Hz. Both planets are static collision bodies. Inverse-square gravity acts toward Departure. Arrival also attracts the vehicle only within its configured surface-relative activation range. A quintic ascent reference, acceleration feed-forward, and proportional/derivative thrust controller smoothly reach 15vh altitude in 10 seconds and maintain a 20-second orbit. This is a guided orbit, with continuing corrective thrust, rather than an unpowered orbital mechanics model. Gravity is calibrated as μ = (2π / period)² × orbitRadius³ × gravityMultiplier. Vehicle mass defaults to 1; weight varies with radius. World acceleration is converted from pixels/s² to Matter's pixels/ms².

Numerical default check at 1440×900: altitude at 10s = 14.9916vh; maximum altitude error during the next orbit = 0.00842vh; 20-second orbit closure error = 0.00210vh.

Matter.js: https://brm.io/matter-js/ (MIT license, preserved in the bundled source header).

Vehicle attitude uses a torque-based steering controller to align its marked top edge with the flight direction. During orbit it rotates at approximately 18 degrees per second. The exhaust rotates with the vehicle. Reset restores the initial upward heading.

## Flight plan

The bottom timeline covers 0–120 seconds. Hover the scale to preview a highlighted time, then click to open the action menu. Choose Rotate CW, Rotate CCW, or Next burn, adjust the 0.5–3 second duration slider, and Confirm. Use < to return to the action choices. Click outside or press Escape to dismiss. Keyboard users can focus the scale, adjust time with arrow keys, and press Enter to open the menu. Actions must start after the initial ascent and end by 120 seconds. Overlapping actions are rejected. Click an action chip to remove it; actions already started require Reset first. Reset preserves the plan for replay; Clear removes it while stopped. The simulation stops at 120 seconds.

The first scheduled action permanently disengages position and attitude guidance until Reset. Gravity and collisions remain active. Rotation torque defaults to 30°/s²; subsequent rotation continues without damping. Later burns accelerate along the vehicle's nose at 2vh/s². Both strengths are adjustable in Parameters. Manual maneuvers can change the orbit or cause a collision. With no scheduled actions, the original guided orbit continues.

## Pan and zoom

Drag the simulation background to pan. Scroll or pinch with two touch pointers to zoom around the pointer/pinch center. Fixed view controls provide zoom in/out (25%–800%) and Reset view. With the canvas focused, arrow keys pan, +/− zoom, and 0 resets the view. Labels follow the bodies while keeping a readable screen size. The header, timeline, telemetry, and parameters stay fixed. Camera changes never alter physics, mission time, or scheduled actions. Flight Reset preserves the camera; Reset view only resets the camera.

Additional burns now default to 2vh/s² (half the previous thrust). Each scheduled action creates a color-coded dot on the trajectory when it begins: blue for CW, purple for CCW, amber for burn. Markers and the full two-minute trail survive Reset and follow pan/zoom. Only the main Burn button clears them when starting a new flight; scheduled Next burn actions do not clear them. Trajectory dots have no labels.

Arrival gravity activates when the vehicle center is within 20% of the page’s initial viewport width from Arrival’s surface, and deactivates outside. This world-space range is independent of pan, zoom, and subsequent resizing. At multiplier 1, Arrival has the same surface acceleration as Departure (μ scales with radius squared); its strength and activation range are adjustable in Parameters. Both gravity fields combine.

Arrival’s default gravity multiplier is 1.5, making it 50% stronger than its previous default.

The timeline is a 2px line with flat ends. Scheduled actions appear as color-coded rounded rectangles spanning their actual duration; hover/click retains a larger invisible hit area.

Drag timeline action markers to reschedule in 0.5-second steps; their width matches duration. Invalid drops (overlap, initial ascent, elapsed mission time, or beyond 120s) return to the previous position. Adjacent actions may touch. Actions already started require Reset before moving. Focus a marker and use left/right arrows to reschedule with the keyboard.

Click an action marker (or focus it and press Enter) to edit its existing duration. Use < to change its action type, then Save changes. Overlap validation excludes the action being edited; invalid edits leave it unchanged. Dragging still reschedules the action. Reset before editing actions that have already started.

Telemetry displays the magnitude of vehicle velocity relative to Arrival in vh/s (100 vh = viewport height). This subtracts Arrival’s velocity vector from the vehicle’s, independent of pan/zoom. Arrival is currently static. Mission time remains visible via the timeline playhead.

## Unsafe contacts

The simulation stops on contact with Departure after the vehicle has lifted clear of the launch pad. Arrival contact stops it if relative speed is greater than 10.00vh/s or if the contacted face is left, top, or right in the vehicle's rotated local frame. Corner contacts are treated as unsafe; only the bottom face at up to 10.00vh/s is allowed. Collision checks use speed before the collision solver response. A short procedural particle explosion plays while mission physics remains frozen, and an “Ouch...” popup with Reset follows the vehicle under pan/zoom. Reset dismisses the popup and restores the pad, preserving the trajectory until the next main Burn.

A bottom-side Arrival contact at up to 10.00vh/s now stops the flight successfully and displays Success! with a Try again button. Try again resets the flight and preserves the plan and trajectory until the next main Burn.

Rotation actions show paired animated exhaust flames at one-third main-burn size. CW exhaust points left at the top-left and right at the bottom-right; CCW exhaust points right at the top-right and left at the bottom-left. Jets rotate with the vehicle and appear only while their action is active.

---
name: Iced 0.14 Run Functions and Window Events
description: Exact signatures and behavior of iced::run, iced::application, iced::daemon, and window event patterns in Iced 0.14
type: project
---

## `iced::run(update, view) -> Result`
- Simplest entry point — no boot function
- Requires `State: Default` (uses `Default::default()` for init)
- Returns `iced::Result` directly, not a builder
- No customization — default settings only

## `iced::application(boot, update, view) -> Application<...>`
- First param is `boot: impl BootFn<State, Message>` — an initialization function
- `BootFn` accepts either `Fn() -> State` OR `Fn() -> (State, Task<Message>)`
- Returns a builder; must call `.run()` to launch
- Opens one window by default
- Stops when all windows are closed
- Builder methods: `.title()`, `.theme()`, `.subscription()`, `.window()`, `.run()`

**Why:** The first parameter is NOT the window title — it is the boot/init function.

## `iced::daemon(boot, update, view) -> Daemon<...>`
- Same signature as `application`
- **No default window** — starts silently; windows only appear via `window::open` Task
- **Does NOT stop** when all windows close — runs until `exit` Task or process interrupt
- Suitable for: system tray apps, background services, apps that spawn windows on demand

## `iced::Event` enum
- `Event::Window(window::Event)` — does NOT include a window Id in the variant
- `Event::Mouse(mouse::Event)`
- `Event::Keyboard(keyboard::Event)`
- `Event::Touch(touch::Event)`
- `Event::InputMethod(...)`

## `window::Event` variants (selected)
- `Opened { position: Option<Point>, size: Size }`
- `Closed`
- `Resized(Size)` — single Size field, not named width/height
- `Moved(Point)`
- `CloseRequested`
- `Focused`, `Unfocused`

## Getting window Id from events
- `event::listen_raw(fn(Event, Status, Id) -> Option<Message>)` — provides Id as 3rd param (fn pointer only, no closures)
- `event::listen_with(fn(Event, Status, Id) -> Option<Message>)` — same signature
- `window::open_events() -> Subscription<Id>` — cleanest way to get Id on window open; map to a Message
- `event::listen() -> Subscription<Event>` — no Id available here

## Window drag-resize
- `window::drag_resize(id: Id, direction: Direction) -> Task<T>`
- Direction variants: North, South, East, West, NorthEast, NorthWest, SouthEast, SouthWest
- Must call on LMB press when cursor is in edge zone

## mouse::Interaction resize variants
- `ResizingHorizontally` — E/W edges
- `ResizingVertically` — N/S edges
- `ResizingDiagonallyDown` — NE/SW corners
- `ResizingDiagonallyUp` — NW/SE corners

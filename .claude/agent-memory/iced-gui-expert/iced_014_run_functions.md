---
name: Iced 0.14 Run Functions
description: Exact signatures and behavior of iced::run, iced::application, and iced::daemon in Iced 0.14
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

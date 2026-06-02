---
name: iced::application first param is boot not title
description: Correction — the first parameter of iced::application() is the boot/init function, not the window title
type: feedback
---

Do NOT describe the first parameter of `iced::application()` as the window title.

**Why:** User corrected this mistake directly. The first param is `boot: impl BootFn<State, Message>`, an initialization function returning the initial state. The title is set via the `.title()` builder method, not as a positional argument.

**How to apply:** Any time explaining `iced::application()` or `iced::run()`, always describe parameter roles accurately from the BootFn/UpdateFn/ViewFn traits.

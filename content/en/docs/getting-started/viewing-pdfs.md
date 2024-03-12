---
title: Viewing PDFs
date: 2024-03-12
description: >
  Use `zathura` to view PDFs in the terminal.
categories: [getting-started]
tags: [docs]
weight: 205
---

## Viewing PDFs with `zathura`

Zathura is a PDF viewer for Linux that integrates well with a keyboard-driven workflow. To view a PDF, run:

``` shell
zathura /path/to/your/file.pdf
```

### Navigating in Zathura
Zathura supports a variety of keyboard shortcuts to navigate through your document, making it easy to use without needing to take your hands off the keyboard:
```
Page Down: j
Page Up: k or Page Up
Zoom In: +
Zoom Out: -
Full Screen: F11
```

The configuration file for Zathura is located at `~/.config/zathura/zathurarc` and contains additional keybindings and settings:

``` shell
sudo vim ~/.config/zathura/zathurarc
```

This is Aegix's out-of-the-box `zathurarc`:
``` shell
set sandbox none
set statusbar-h-padding 0
set statusbar-v-padding 0
set page-padding 1
set selection-clipboard clipboard
map u scroll half-up
map d scroll half-down
map D toggle_page_mode
map r reload
map R rotate
map K zoom in
map J zoom out
map i recolor
map p print
map g goto top
```

Tim note:
There are also some helpful tips you try out right inside zathura by running `Ctrl + F1`.
This command invoked by `Ctrl + F1`: `groff -mom /usr/local/share/dwm/barbs.mom -Tpdf | zathura -` takes the barbs ministry of magic file invoked by groff, piped to zathura. Some fun functionality is outlined at the top of this document. My favorites being `s` to fit text to your window and `Ctrl + r` to invoke "reader mode" which inverts the colors.

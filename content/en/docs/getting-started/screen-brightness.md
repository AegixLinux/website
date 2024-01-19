---
title: Screen Brightness
date: 2024-01-05
description: >
  Adjusting the screen brightness in Aegix Linux.
categories: [getting-started]
tags: [docs]
weight: 200
---

## Brighten or darken the screen

### Using the mouse/touchpad/cursor

Hover your cursor/mouse over the battery icon in the top bar. Use mouse/touchpad scroll up/down to adjust the screen brightness.

### Built-in aliases

You can also control screen brightness using the following aliases:

``` shell 
        b="sudo brightnessctl set 100%" \
        dark="sudo brightnessctl set 5%" \
        bh="sudo brightnessctl set 50%" \
        be="sudo brightnessctl set 12%" \
        bq="sudo brightnessctl set 25%" \
        black="sudo brightnessctl set 0%" \
```

Just open a terminal and type `b` to set the screen brightness to 100%. Type `dark` to set the screen brightness to 5%. Type `bh` to set the screen brightness to 50%. Type `be` to set the screen brightness to 12%. Type `bq` to set the screen brightness to 25%. Type `black` to set the screen brightness to 0%.b

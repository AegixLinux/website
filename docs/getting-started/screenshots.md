---
title: Screenshots
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: >
  How to take a screenshot in Aegix Linux
categories: [getting-started]
tags: [docs]
weight: 210
---

## Take a screenshot

Press `PrtSc` to get a menu of screenshot options: select an area, the
current window, or the entire screen, each going to either your clipboard
or a file. The program doing the capturing is called `maim`.

When you save to a file, a second menu asks where. It remembers your last
five destinations, most recent first, so plain `Enter` saves to wherever
you saved last time. `~/Pictures/Screenshots` is always in the list, and
`browse...` lets you pick any directory under your home. You then get to
edit the filename, or just hit `Enter` to accept the timestamped default.

For a quick area shot with no menus, `Shift + PrtSc` selects an area and
saves it straight to `~/Pictures/Screenshots`.

## View screenshots

Open a terminal with `Ultra + Enter` and run `sxiv ~/Pictures/Screenshots`
to flip through what you have captured.

---
title: External Keyboards
date: 2024-01-05
description: > 
    Connect to an external keyboard in Aegix Linux after booting.
categories: [getting-started]
tags: [docs]
weight: 110
---

## `Ultra + F12` to re-run the keyboard setup script

Sometimes if you connect an external keyboard after booting, the keyboard will not work properly. This is because the keyboard setup script is only run once at boot. You can re-run the keyboard setup script by pressing `Ultra + F12`. This will allow you to use the external keyboard with the right key-repeat, and remaps where `CapsLock` is `Esc` for easy vim craft.

Sometimes detaching and re-attaching a laptop to a docking station will will require an `Ultra + F12` to re-run the keyboard setup script.
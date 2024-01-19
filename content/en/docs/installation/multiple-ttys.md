---
title: Multiple TTYs
date: 2024-01-01
description: >
  Did you know multiple TTYs (Teletype Terminals) are a fundamental feature in GNU/Linux systems including Aegix Linux?
categories: [installation]
tags: [docs]
weight: 100
---

In Linux systems, including Aegix Linux, multiple TTYs (Teletype Terminals) are a fundamental feature that allows you to access multiple terminal sessions directly from your physical machine. TTYs are essentially text-based terminals that let you interact with the system without using a graphical user interface (GUI). These are especially useful for troubleshooting, running multiple sessions simultaneously, or when working in a non-GUI environment.

## Here's how they work and their significance

1. **Multiple Sessions**: Linux typically provides several TTYs. By default, TTY1 is usually the graphical desktop environment (if one is installed), and TTYs 2 through 6 are text-based terminals.

2. **Switching TTYs**: You can switch between these TTYs using the keyboard shortcuts `Ctrl + Alt + F1`, `Ctrl + Alt + F2`, `Ctrl + Alt + F3`, and so on. Each combination takes you to a different TTY. For instance, `Ctrl + Alt + F2` will take you to TTY2, `Ctrl + Alt + F3` to TTY3, and so on.

3. **Use cases**:
    - **Validating block device selection**: Let's say you've already started the installation process and you're at the point where you need to select the block device to install to. You can use `Ctrl + Alt + F2` to switch to TTY2, then use `lsblk` to list the block devices and their sizes. This will help you select the right block device to install to. 
    - **Post-installation Troubleshooting**: If you're having issues with your system, you can switch to a different TTY and troubleshoot from there.
    - **Learning and exploration**: Imagine the possibilities! 

> Remember, when working in TTYs, you are working directly with a shell, so all the usual command-line tools and commands are available to you. This makes TTYs a powerful feature for system administration and advanced Linux usage.

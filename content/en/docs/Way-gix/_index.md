---
title: W_Aegix WayGix Aegix Wayland Base 
description: The introduction of install-w.sh
date: 2024-01-04
categories: [ai]
tags: [docs]
weight: 110
---

## Why WayGix?

"WayGix is a custom Wayland-based desktop environment for Aegix Linux. It's designed to be a lightweight, fast, and modern desktop environment that's easy to use and easy to customize. It's built on top of the Wayland display server protocol, which is designed to be more secure and more efficient than the older X11 protocol."
(credit: GitHub CoPilot AI)

## Let the hacking begin

The `install-w.sh` script started as a simple fork of `install-canary.sh` to basically not install any of the X11 packages. It's a work in progress, but it's a start.

I've started collecting some tidbits, odds, and ends here: 

--- 

## Migrating from X

- [https://arewewaylandyet.com/](https://arewewaylandyet.com/)
- [https://github.com/swaywm/sway/wiki/Useful-add-ons-for-sway](https://github.com/swaywm/sway/wiki/Useful-add-ons-for-sway)
- [https://wiki.gentoo.org/wiki/Wayland_Desktop_Landscape](https://wiki.gentoo.org/wiki/Wayland_Desktop_Landscape)
- [https://github.com/swaywm/sway/wiki/i3-Migration-Guide](https://github.com/swaywm/sway/wiki/i3-Migration-Guide)
- [https://github.com/natpen/awesome-wayland](https://github.com/natpen/awesome-wayland)

Replacements for X
- Window manager
	- dwm -> dwl
- Status bar
	- dwmblocks -> 
		- somebar https://sr.ht/~raphi/somebar/
		- dwl-bar https://github.com/MadcowOG/dwl-bar?tab=readme-ov-file 
		- someblocks https://sr.ht/~raphi/someblocks/ 
- Launcher
	- dmenu -> 
		- dmenu wayland `dmenu-wl` https://github.com/nyyManni/dmenu-wayland

[wlroots](https://github.com/swaywm/wlroots) - Pluggable, composable, unopinionated modules for building a Wayland compositor

dunst should work on wayland:
- [dunst](https://github.com/dunst-project/dunst) - A highly configurable and lightweight notification daemon

terminal
- [wterm](https://github.com/majestrate/wterm) - An [st](https://st.suckless.org/) fork for wayland

[mpv](https://github.com/mpv-player/mpv) - Command line video player

## Screen Locking

[](https://github.com/natpen/awesome-wayland?tab=readme-ov-file#screen-locking)

- [gtklock](https://github.com/jovanlanik/gtklock) - GTK-based lockscreen for Wayland
- [swayidle](https://github.com/swaywm/swayidle) - Idle management daemon for Wayland
- [swaylock](https://github.com/swaywm/swaylock) - Screen locker for Wayland
- [swaylock-effects](https://github.com/mortie/swaylock-effects) - A fork of swaylock with effects such as a blurred screenshot as background or a clock on the lockscreen
- [waylock](https://github.com/ifreund/waylock) - A simple screenlocker for Wayland compositors

## Wallpaper

[](https://github.com/natpen/awesome-wayland?tab=readme-ov-file#wallpaper)

- [mpvpaper](https://github.com/GhostNaN/mpvpaper) - A video wallpaper program for wlroots based wayland compositors
- [plasma-apply-wallpaperimage](https://invent.kde.org/plasma/plasma-workspace) - A terminal utility to change wallpaper on Plasma
- [swaybg](https://github.com/swaywm/swaybg) - A wallpaper utility for Wayland compositors
- [swww](https://github.com/Horus645/swww) - A Solution to your Wayland Wallpaper Woes
- [Wallutils](https://github.com/xyproto/wallutils) - A set of utilities to manage monitors, resolutions, wallpapers and timed wallpapers
- [waypaper](https://github.com/anufrievroman/waypaper) - GUI frontend for swaybg/swww to switch wallpapers
- [wpaperd](https://github.com/danyspin97/wpaperd) - Wallpaper daemon that shows random wallpapers from a directory and changes them after some time
- [wbg](https://codeberg.org/dnkl/wbg) - Super simple wallpaper application for Wayland compositors
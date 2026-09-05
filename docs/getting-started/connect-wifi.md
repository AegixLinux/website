---
title: Connect to wifi
author: Timothy Beach
authorURL: "https://github.com/timbeach"
date: 2026-09-05
description: > 
    Connect to wifi in Aegix Linux.
categories: [getting-started]
tags: [docs]
weight: 110
---

## Connect to wifi

Press `Ultra + Shift + W` to open the wifi menu. Networks are listed
strongest-signal first, one row per band, so a router broadcasting on both
2.4GHz and 5GHz shows up twice, labeled `[2.4G]` and `[5G]`. Pick the one
you want and hit `Enter`. You are only asked for a password when the saved
one is missing or wrong, and a notification confirms the connection
actually happened.

Picking a band is remembered for that network: choose `[5G]` and it stays
on 5GHz across reconnects until you pick its `[2.4G]` row.

The same menu is reachable with a mouse: click the `≡` at the top left of
the bar (or press `Ultra + M`) and choose `WiFi`.

## The long way

For wired connections, VPNs, and anything the quick menu does not cover,
`nmtui` is the full NetworkManager interface: open a terminal with
`Ultra + Enter` and run `nmtui`, or pick `Network Settings` from the bottom
of the wifi menu. There are status icons in the top right of the bar for
both wired and wireless connections.

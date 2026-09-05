---
title: Set Up Bluetooth
author: Mason Borchard
authorURL: "https://github.com/mason-u-borchard"
description: >
  Get some quick assistance setting up bluetooth on Aegix.
date: 2026-09-05
weight: 50
---

{{< figure src="/images/aegix_penguin_using_bluetooth_headset.png" width="400" class="figure-center" >}} 

## Bluetooth out of the box

Aegix installs with the `bluetoothd` service enabled and a graphical
Bluetooth manager, `blueman`. Its applet lives in the small system tray at
the bottom-right corner of the screen: click the Bluetooth icon there to
scan, pair, and connect devices.

If you prefer the terminal, `bluetoothctl` is also installed:

``` shell
bluetoothctl
power on
scan on
pair XX:XX:XX:XX:XX:XX
connect XX:XX:XX:XX:XX:XX
```

## Going deeper

### External Link: [Setting Up Bluetooth in Aegix](https://medium.com/@console.log_hello_uranus/setting-up-bluetooth-on-artix-linux-with-runit-a-comprehensive-guide-fb7b460384d3)

Check out the link above to an article on Medium by [Mason Borchard](https://medium.com/@console.log_hello_uranus) for a comprehensive guide to how Bluetooth works under runit, including troubleshooting.

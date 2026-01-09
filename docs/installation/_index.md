---
title: Installation
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: Install Aegix Linux
categories: [installation]
tags: [docs]
weight: 20
---

## Create a bootable USB

Download this specific (aegix-hosted), STABLE version of the <a href="https://aegixlinux.org/artix-base-runit-20250303-x86_64.iso"><strong><span style="font-size: 1.5em;">artix-base-runit ISO</span></strong></a>, you'll need to create a bootable USB drive. You can use any tool you like, but I recommend [Rufus](https://rufus.ie/en/) or [Ventoy](https://www.ventoy.net/en/index.html). They're free, open source, and work on Windows, Linux, and MacOS.

After downloading the ISO, you can run `sha256sum artix-base-runit-20250303-x86_64.iso`, which should output the following hash. _We do this to ensure the ISO hasn't been tampered with._
``` shell
6368cacc6dd8fdfe8ea74949d2c836d81c6e9d562f50f6ad2c1bf188502c4c51  artix-base-runit-20250303-x86_64.iso
```

If you're using Ventoy, you can just download the ISO and copy it to the USB drive. If you're using Rufus, you'll need to download the ISO and use Rufus to create the bootable USB.

If you're coming from Ubuntu or another Linux distro, you can use the `dd` command to copy the ISO to the USB drive. For example:

``` shell
sudo dd if=/path/to/artix-base-runit.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

## Boot from the USB

Once you've created the bootable USB, you'll need to boot from it. This will vary depending on your computer, but you'll need to press a key (usually F12 or F2) during boot to access the boot menu. From there, you can select the USB drive and boot from it.

## Install Aegix Linux

### Connect to the internet

Unless you want to go through the hassle of manually connecting to wifi, just use a wired connection by plugging in ethernet.

### Download and run the installer script

Once you've booted from the USB, you'll be presented with a terminal. After logging in as `root` with the password `artix`, you can run the following command to download and run the Aegix installer script:

``` shell
curl -LO aegixlinux.org/install.sh && sh install.sh
```

### Follow the prompts

The installer script will walk you through the installation process.

Be sure to select the right disk / block device to install to. If you're not sure which one to select, you can use `lsblk` to list the block devices and their sizes. Selecting the wrong block device could result in data loss. You have been warned. Act accordingly. The Aegix Linux Project is not responsible for any data loss. Be sure to back up your data before installing Aegix Linux.


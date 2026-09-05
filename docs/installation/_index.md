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

Download the [**Aegix Linux ISO**](https://github.com/AegixLinux/aegixlinux/releases/latest)
(about 1.7 GB). It boots on both UEFI and legacy BIOS machines. On some
hardware you will need to disable Secure Boot first.

Verify the download before you write it, so you know it arrived intact:

``` shell
sha256sum aegix-20260904-x86_64.iso
```

``` shell
3fd05c2c24a48637a70ab2d6fafea27669253a195f044af018fbfccaa53fe076  aegix-20260904-x86_64.iso
```

Then write it to a USB stick. On Linux:

``` shell
sudo dd if=aegix-20260904-x86_64.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

Replace `/dev/sdX` with your USB device, and check it twice with `lsblk`:
`dd` will overwrite whatever you point it at without asking. On Windows or
macOS, [Rufus](https://rufus.ie/en/) and [Ventoy](https://www.ventoy.net/en/index.html)
both work and are free and open source.

## Boot from the USB

Once you've created the bootable USB, you'll need to boot from it. This will vary depending on your computer, but you'll need to press a key (usually F12 or F2) during boot to access the boot menu. From there, you can select the USB drive and boot from it.

## Install Aegix Linux

### Connect to the internet

Ethernet works with no setup. For wifi, run `nmtui`, pick your network, and
enter the password. Confirm you are really online before continuing:

``` shell
ping -c1 8.8.8.8
```

The installer downloads the base system and the desktop packages while it
runs, so a working connection is required.

### Run the installer

The Aegix live session logs you in automatically and prints a short menu. The
installer is already on the ISO, so just run:

``` shell
sh install.sh
```

There is a copy of these instructions at `/root/README.md` on the live system,
in case the welcome text scrolls away.

### Follow the prompts

The installer script will walk you through the installation process.

Be sure to select the right disk / block device to install to. If you're not sure which one to select, you can use `lsblk` to list the block devices and their sizes. Selecting the wrong block device could result in data loss. You have been warned. Act accordingly. The Aegix Linux Project is not responsible for any data loss. Be sure to back up your data before installing Aegix Linux.


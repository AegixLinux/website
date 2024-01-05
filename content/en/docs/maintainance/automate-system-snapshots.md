---
title: System Snapshots
date: 2024-01-01
description: >
  Automate system snapshot every time you update or install a package.
categories: [maintainance]
tags: [docs]
---

## Install timeshift and timeshift-autosnap

Since every Aegix installation uses BTRFS with the right subvolumes setup, you can easily take snapshots of the system and roll back to a previous snapshot if needed. Simply install the `timeshift` and `timeshift-autosnap` packages:

``` shell
sudo pacman -S timeshift timeshift-autosnap
```

## Why do we do this?

If it's not obvious, rolling release systems like Aegix Linux are constantly being updated. This means that the system is constantly changing. Sometimes, these changes can cause issues. For example, a package update may break compatibility with another package. Or, you may accidentally install a package that breaks something. 

In order to guard against this kind of breakage, we take snapshots of the system before and after every package installation or update. This way, if something goes wrong, you can easily roll back to a previous snapshot and get your system back to a working state.

Usually these types of breakages don't last long, and are fixed in a subsequent update. But if you're in a hurry, you can always roll back to a previous snapshot and wait for the fix to be released.

You don't even need to interact with any timeshift GUIs. The `timeshift-autosnap` package will automatically take snapshots before and after every package installation or update. You can also take snapshots manually using the `timeshift` command.
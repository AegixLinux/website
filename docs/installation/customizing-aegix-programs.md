---
title: Customizing Aegix-Programs
author: Mason Borchard
authorURL: "https://github.com/mason-u-borchard"
date: 2024-06-06
description: >
  Learn how to customize the aegix-programs.csv file before running BARBs during an Aegix installation.
categories: [installation]
tags: [docs]
weight: 10
---

## Introduction

During the installation of Aegix Linux, you have the option to customize which programs are installed by modifying the `aegix-programs.csv` file. This guide will walk you through the steps to edit this file before running BARBs during the Aegix installation process.

## Steps

### Step 1: Install as Usual

Begin the installation of Aegix Linux as you normally would:
```sh
curl -LO aegixlinux.org/install.sh && sh install.sh
```

### Step 2: Move to TTY2

At the BARBs prompt, instead of hitting `Enter` to begin the script, switch to TTY2 by pressing `Ctrl + Alt + F2`.

### Step 3: Chroot into the Live Environment

Chroot into the live environment with the following command:

```sh
artix-chroot /mnt
```

### Step 4: Download aegix-programs.csv

Download the `aegix-programs.csv` file into the `/root` directory:

```sh
curl -L aegixlinux.org/aegix-programs.csv -o /root/aegix-programs.csv
```

### Step 5: Enter Vim Editor

Open the `aegix-programs.csv` file in the Vim editor:

```sh
vim /root/aegix-programs.csv
```

### Step 6: Edit the File

Delete any lines for programs you do not wish to install by navigating to the line and pressing `dd`. If you accidentally delete the wrong line, press `u` to undo the change.

### Step 7: Save and Exit

Save the file by pressing `ESC`, then `Shift + zz`, or `ESC` followed by `:wq` and `Enter` to save and quit. To quit without saving, press `ESC`, then `Shift + zq`, or `ESC` followed by `:q!` and `Enter`.

### Step 8: Return to TTY1

Switch back to TTY1 by pressing `Ctrl + Alt + F1`.

### Step 9: Run BARBs

Press `Enter` to begin the BARBs installation process.
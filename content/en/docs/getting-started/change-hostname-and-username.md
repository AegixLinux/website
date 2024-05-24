---
title: Changing Hostname and Username
author: Mason Borchard
authorURL: "https://github.com/mason-u-borchard"
description: Guide on how to change the hostname and username on Aegix Linux.
date: 2024-05-23
categories: [getting-started]
tags: [docs]
weight: 10
---

## Introduction

There may come a time when you need to change the hostname or username of your Aegix Linux system. Whether you picked the wrong name during installation or simply want a change, this guide will walk you through the steps necessary to make these changes on Aegix Linux.

## Changing the Hostname

### Step 1: Edit the `/etc/hostname` File

The hostname of your system is stored in the `/etc/hostname` file. You can change it by editing this file with `vim`.


```sh
sudo vim /etc/hostname
```

Replace the current hostname with your desired new hostname. Save and exit the editor (`Esc` + `:wq` OR `Esc` + `[hold] Shift` + `zz` in vim).

### Step 2: Edit the /etc/hosts File
To ensure your system recognizes the new hostname, update the `/etc/hosts` file.

```sh
sudo vim /etc/hosts
```
Find the line that contains your current hostname (usually associated with `127.0.1.1`) and replace it with your new hostname. For example:

```sh
127.0.0.1    localhost
::1    localhost
127.0.1.1    $newhostname.localdomain $newhostname
```

Save and exit the editor (`Esc` + `:wq` OR `Esc` + `[hold] Shift` + `zz` in vim).

### Step 3: Apply the Changes
To apply the hostname change immediately without rebooting, you can directly write the new hostname to `/proc/sys/kernel/hostname`.

```sh
echo $newhostname | sudo tee /proc/sys/kernel/hostname
```

## Changing the Username

**1. Login as Root or Another User:**
You cannot change your username while you are logged in as that user. Either log in as root or another user.

**2. Change the Username:**
Use the `usermod` command to change the username. Replace `oldusername` with your current username and `newusername` with your desired new username.

```sh
sudo usermod -l newusername oldusername
```

**3. Rename the Home Directory:**
Rename the home directory of the user to match the new username.

```sh
sudo mv /home/oldusername /home/newusername
```

**4. Update the Home Directory Path:**
Update the home directory path for the user.

```sh
sudo usermod -d /home/newusername -m newusername
```

**5. Update File Permissions:**
Ensure the new home directory and files within it have the correct ownership.

```sh
sudo chown -R newusername /home/newusername
```

**6. Reboot the system:**
Reboot the system to ensure all changes take effect.
```sh
sudo reboot
```
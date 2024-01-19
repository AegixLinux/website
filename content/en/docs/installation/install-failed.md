---
title: Troubleshooting
date: 2024-01-01
description: >
  What to do if your installation fails.
categories: [installation]
tags: [docs]
weight: 90
---

## Installation Failed?

If your installation fails after the block device is already set up and mounted, you can chroot into the system and poke around. 
Especially if it failed during the BARBS routines, you can re-run BARBS manually to see if you can overcome the problem.

The `install.sh` script will automatically mount the partitions to `/mnt` and `/mnt/boot`. Use `lsblk` to verify this. 
To chroot into the system, run:

``` shell
artix-chroot /mnt
cd /root
sh barbs.sh
``` 

`install.sh` and `barbs.sh` are both aggressively set to exit on error. This can be a good thing, because an error-free installation results in a working system, but the trade-off is that if something goes wrong, the script will exit and you'll have to deal with it manually. If the script fails, it is usually because one of the packages called from `aegix-programs.csv` by `barbs.sh` failed to install due to a maintainer failing to update their GPG keys before they expired. If this happens, you can chroot into the system as described above. Look at the the aegix-programs.csv file and find the package that the script failed on. This is usually either the last mentioned package before the script failed or the one after it. Try to install those packages manually with `yay -S <package-name>`. If you find the package that is failing this way, you can edit the aegix-programs.csv file and remove that package from the list. Then you can re-run `barbs.sh` and it should complete successfully.


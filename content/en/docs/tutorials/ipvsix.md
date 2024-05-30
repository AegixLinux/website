---
title: Disable IPV6
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: >
  Proven method for disabling IPV6 on your Linux machine.
date: 2024-05-29
weight: 45
---

## Why even disable ipv6?

Sometimes internet things slow down with ipv6. I've experienced this many times, and I've noticed a marked speed improvement after disabling this. I once got down and dirty in the internals of some log somewhere and noticed that all my DNS queries were being tried first at ipv6, then after failing they would be tried as ipv4, every single time. Ideally ipv6 would just work well, but sometimes that is not the case.

If you're curious whether or not your system has ipv6 enabled, run this in a terminal to check: 
``` Shell 
ip -6 addr show
``` 

If so, you'll see something like this:
``` Shell
🪶Aegix:[beach✨byzantium ~]$ ip -6 addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN qlen 1000
    inet6 ::1/128 scope host proto kernel_lo
       valid_lft forever preferred_lft forever
3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP qlen 1000
    inet6 fe80::f18a:5a15:eec4:3b94/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

## How to disable ipv6

- [x] Edit /etc/default/grub

``` Shell 
sudo vim /etc/default/grub
```

- [x] Update GRUB_CMDLINE_LINUX_DEFAULT 

to include `ipv6.disable=1`. 

- [x] Update GRUB 

``` Shell 
sudo grub-mkconfig -o /boot/grub/grub.cfg
``` 

Example output:
``` Shell
❯ sudo grub-mkconfig -o /boot/grub/grub.cfg

Generating grub configuration file ...
Found linux image: /boot/vmlinuz-linux
Found initrd image: /boot/initramfs-linux.img
Found fallback initrd image(s) in /boot:  initramfs-linux-fallback.img
Warning: os-prober will not be executed to detect other bootable partitions.
Systems on them will not be added to the GRUB boot configuration.
Check GRUB_DISABLE_OS_PROBER documentation entry.
Adding boot menu entry for UEFI Firmware Settings ...
done
```

- [x] Go crazy

If we wanted to go crazy, we could blacklist the IPV6 kernel module like this: 
``` Shell 
echo "blacklist ipv6" | sudo tee /etc/modprobe.d/ipv6.conf
``` 

Then `reboot` 

## Validate your changes took effect

Post-reboot validation: 
``` Shell
❯ cat /proc/cmdline
BOOT_IMAGE=/vmlinuz-linux root=UUID=<uuid-value> rw rootflags=subvol=@ loglevel=3 cryptdevice=UUID=<uuid-value>:aegixluks root=/dev/mapper/tankluks ipv6.disable=1
❯ ip -6 addr show
❯
❯ lsmod |grep ipv6
❯
❯ ss -tulwn6
Netid    State    Recv-Q    Send-Q       Local Address:Port       Peer Address:Port   Process
```
The last three commands should return nothing as shown above.

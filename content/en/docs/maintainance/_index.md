---
title: Maintainance
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: Keep the system running smoothly
categories: [maintainance]
tags: [docs]
weight: 30
---

## Update the system

You will want to update the system regularly to keep it up to date with the latest security patches and bug fixes. 
There is a built-in alias to make this easy. Just open a terminal and run:

``` shell
update
```

This updates all your official repo packages along with any AUR packages you have installed.

Sometimes you want to update the system without updating the AUR packages. You can do this by running:

``` shell
sudo pacman -Syu --noconfirm
``` 

Remove the `--noconfirm` flag to not skip the confirmation prompts.

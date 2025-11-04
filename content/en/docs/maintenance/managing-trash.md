---
title: Managing Trash
author: Mason Borchard
authorURL: "https://github.com/mason-u-borchard"
date: 2024-08-11
description: >
  A guide to managing the Trash directory in Aegix Linux using the command line.
categories: [maintenance]
tags: [docs, file-management, trash]
weight: 15
---

## Introduction

In Aegix Linux, managing files in the **Trash** can be handled via the command line. This page covers viewing, recovering, and emptying files from the `Trash` directory using simple commands.
 
˚₊‧꒰ა (=🝦ﻌ🝦=) ໒꒱‧₊˚ 
## Viewing Files in the Trash

To view the files that are currently in the Trash, you can use the following command:

```sh
ls ~/.local/share/Trash/files
```

This command lists all the files that have been moved to the `Trash` directory.

## Recovering Files from the Trash

If you need to recover a file from the Trash, you can move it back to its original or a new location using the `mv` command.

### Moving a File to Its Original Location

If you remember the original location of the file, you can restore it with:

```sh
mv ~/.local/share/Trash/files/<filename> ~/path/to/original/location/
```

Replace `<filename>` with the name of the file you wish to recover, and `/path/to/original/location/` with the directory where the file should be restored.

### Moving a File to a New Location

Alternatively, you can move the file to any desired directory:

```sh
mv ~/.local/share/Trash/files/<filename> ~/desired/location/
```

This command moves the file from the Trash to the specified location.

## Emptying the Trash

To completely empty the `Trash` directory -- removing all files and their associated metadata, use the following commands:

### Remove Files from Trash

```sh
rm -rf ~/.local/share/Trash/files/*
```

### Remove Metadata from Trash

```sh
rm -rf ~/.local/share/Trash/info/*
```

These commands ensure that the Trash directory is fully cleared out.


 ⁺✧────────༺♡༻────────✧⁺ 

These guidelines should cover all of the basic Trash-related adventures. Enjoy! 
title: Cyphertext Alcove
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: >
    Have you ever wanted a private journal with a lock your little sibling couldn't break into?  
date: 2024-04-09
weight: 10

## Summary

Have you ever wanted a private journal with a lock your little sibling couldn't break into?
This is like that, only your little sibling in this scenario could be an advanced threat actor, and your lock still won't break.
This recipe will work on any POSIX compliant system, and we are using [Aegix Linux](https:aegixlinux.org) to demonstrate it.

## Prerequisites

### Create a directory

``` Shell
mkdir CyphertextAlcove
```

### Install gocryptfs

It is an encrypted overlay filesystem written in Go.

``` Shell
yay -S gocryptfs --noconfirm
```

### Initialize the encrypted folder

We must initialze the directory to prepare it for encryption.
This step will prompt you for a passphrase, and it generate the encryption key.
It is important that you make up a good one which you can remember.
Whatever you choose, don't use `margaretthatcheris110%SEXY`.
[Edward Snowden already nabbed that one.](https://youtu.be/yzGzB-yYKcc?si=Xfst589v7MrWmiYX&t=140) 

``` Shell
gocryptfs -init ~/CyphertextAlcove
```

Here's an example from my terminal for demonstration.

``` Shell
🪶Aegix:[beach✨byzantium ~]$ gocryptfs -init ~/CyphertextAlcove

Choose a password for protecting your files.
Password:
Repeat:

Your master key is:

    74866488-ab68f00d-3caef6fb-68917820-
    f17fe849-56adbc13-2f6496a5-dc8f41d7

If the gocryptfs.conf file becomes corrupted or you ever forget your password,
there is only one hope for recovery: The master key. Print it to a piece of
paper and store it in a drawer. This message is only printed once.
The gocryptfs filesystem has been created successfully.
You can now mount it using: gocryptfs CyphertextAlcove MOUNTPOINT
```

### Mount the encrypted folder

Once initialized, you need to mount the encrypted directory to a mount point where you can interact with the contents as plain text.
If you're unfamiliar with mounting file systems in Linux, the process involves first creating an empty directory, if you haven't already created one, to use as a mount point, from whence the file system can be mounted. 

``` Shell
mkdir ~/AlcoveVault
gocryptfs ~/CyphertextAlcove ~/AlcoveVault
```

Of course you can name either of these anything you like. For example, your encrypted folder could be `.bk_1` and your mount point could be the empty `/mnt` directory already on your system. I'm using `CyphertextAlcove` and `AlcoveVault` for demonstrative purposes.

Here's what it looks like in my terminal:

``` Shell
🪶Aegix:[beach✨byzantium ~]$ mkdir ~/AlcoveVault
🪶Aegix:[beach✨byzantium ~]$ gocryptfs ~/CyphertextAlcove ~/AlcoveVault
Password:
Decrypting master key
DetectQuirks: Btrfs detected, forcing -noprealloc. See https://github.com/rfjakob/gocryptfs/issues/395 for why.
Filesystem mounted and ready.
SwitchToSyslog: Unix syslog delivery error
SwitchToSyslog: Unix syslog delivery error
SwitchToSyslog: Unix syslog delivery error
SwitchToSyslog: Unix syslog delivery error
SwitchLoggerToSyslog: Unix syslog delivery error
```

I'm leaving in the warning/error messages above to demonstrate this working on a BTRFS system and to prove that those don't matter.
Obviously I entered the passphrase above that I setup in an earlier step.
## Usage

### Accessing files

Simply navigate to `~/AlcoveVault` to create, read, or edit your files. 
Any changes here will be encrypted and saved to `~/CyphertextAlcove`.

Here's an example from my terminal: 

``` Shell
🪶Aegix:[beach✨byzantium ~]$ cd AlcoveVault
🪶Aegix:[beach✨byzantium ~/AlcoveVault]$ vim test.md
🪶Aegix:[beach✨byzantium ~/AlcoveVault]$ ls
test.md
```

### Unmounting

When you're done, make sure you unmount the encrypted folder to secure your notes.
Below I've navigated back to `~`, unmounted the decrypted file system, navigated back into the empty directory we use as a mount point, and voila. 
There is nothing there.

``` Shell
🪶Aegix:[beach✨byzantium ~/AlcoveVault]$ cd ..
🪶Aegix:[beach✨byzantium ~]$ fusermount -u ~/AlcoveVault

🪶Aegix:[beach✨byzantium ~]$ cd AlcoveVault
🪶Aegix:[beach✨byzantium ~/AlcoveVault]$ ls
🪶Aegix:[beach✨byzantium ~/AlcoveVault]$
```

This is profound on several levels which I'll leave you to ponder.

### Integration with Obsidian

This may be totally obvious, but you can use your decrypted filesystem directory as an Obsidian vault, assuming you trust Obsidian enough to do that for your use case.
Of course the vault must be mounted via `gocryptfs` for access.

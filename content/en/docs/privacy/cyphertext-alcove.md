---
title: Cyphertext Alcove
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: Have you ever wanted a private journal with a lock your little sibling couldn't break into?  
date: 2024-04-09
weight: 20
---

## Setting the stage

Have you ever wanted a private journal with a lock your little sibling couldn't break into?
This is like that, only your little sibling in this scenario could be an advanced threat actor, and your lock still won't break.
This recipe will work on any POSIX compliant system, and we are using [Aegix Linux](https:aegixlinux.org) to demonstrate it.

In the end, you'll have two aliases you can call from your terminal: `alcove` and `unalcove`.
The first unlocks your diary so you can use it, and the second locks it back up.

And btw, you can use this encrypted-folder recipe for any type of file, not just a diary.

## TL;DR

``` Shell
mkdir ~/CyphertextAlcove
yay -S gocryptfs --noconfirm
gocryptfs -init ~/CyphertextAlcove
mkdir ~/AlcoveVault
gocryptfs ~/CyphertextAlcove ~/AlcoveVault
cd ~/AlcoveVault && vim dear-diary.md
cd ~ && fusermount -u ~/AlcoveVault
echo '# Cyphertext Alcove' >> ~/.config/shell/aliasrc
echo 'alias alcove="gocryptfs ~/CyphertextAlcove ~/AlcoveVault && cd ~/AlcoveVault"' >> ~/.config/shell/aliasrc
echo 'alias unalcove="cd ~ && fusermount -u ~/AlcoveVault"' >> ~/.config/shell/aliasrc
source ~/.config/shell/aliasrc
```

## Prerequisites

### Create a directory

This will be our encrypted container for our notes.

``` Shell
mkdir ~/CyphertextAlcove
```

### Install gocryptfs

It is an encrypted overlay filesystem written in Go.

``` Shell
yay -S gocryptfs --noconfirm
```

### Initialize the encrypted folder

We must initialze the directory to prepare it for encryption.
This step will prompt you for a passphrase and generate the encryption key.
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

### Automate usage with an alias

Add this wherever you keep your aliases. 
Normally this is in `~/.bashrc` or `~/.zshrc`.
On Aegix Linux, we use `~/.config/shell/aliasrc`.

``` Shell
# Cyphertext Alcove
alias alcove="gocryptfs ~/CyphertextAlcove ~/AlcoveVault && cd ~/AlcoveVault"
alias unalcove="cd ~ && fusermount -u ~/AlcoveVault"
```

Don't foget to source your shell configuration file after adding the alias.
On Aegix it would be `source ~/.config/shell/aliasrc`.

## Integration with Obsidian

This may be totally obvious, but you can use your decrypted filesystem directory as an Obsidian vault, assuming you trust Obsidian enough to do that for your use case.
Of course the vault must be mounted via `gocryptfs` for access.

## What about other types of files?

You can encrypt any type of file with `gocryptfs`. 
This Cyphertext Alcove recipe is a demonstration of how to use it for private notes, but you can use it for any type of file you want to keep secure.

## Why should I trust gocryptfs?

#### Modern Cryptographic Primitives

__Encryption Algorithm:__
gocryptfs uses AES-GCM (Advanced Encryption Standard in Galois/Counter Mode) for file content encryption. AES is a widely recognized standard, used globally for secure data encryption. GCM mode provides both confidentiality and integrity, ensuring data is encrypted securely and remains unaltered.

__Key Derivation:__
It employs scrypt for key derivation, which is a memory-hard function. This makes brute-force attacks on the password significantly more difficult, enhancing the security against password cracking attempts.

#### Filename Encryption

gocryptfs encrypts not only the file content but also the filenames. This adds an additional layer of privacy, preventing adversaries from inferring any information from the filenames themselves.

#### Forward Secrecy

By using a unique, randomly generated file encryption key (FEK) for each file, gocryptfs ensures forward secrecy. Even if one file's key is somehow compromised, the other files remain secure due to their unique encryption keys.

#### Integrity and Authenticity

The use of AES-GCM mode ensures that both the integrity and authenticity of the data are maintained. Any unauthorized modification of the encrypted data is detectable, which protects against tampering.

#### Open Source and Audited

gocryptfs is open-source, allowing for community review and audit of its source code. This transparency helps in identifying and rectifying potential vulnerabilities. It has undergone independent security audits, which adds to its credibility and reliability.

#### User Space Implementation

Being a FUSE (Filesystem in Userspace) based filesystem, gocryptfs operates in user space, which means it doesn't require kernel-level privileges. This isolation from the kernel reduces the risk of system-wide vulnerabilities.

#### Active Development and Maintenance

Regular updates and active maintenance contribute to its safety, as security issues and bugs are promptly addressed.

#### Operational Security

The security of gocryptfs also depends on operational best practices, such as using strong, unique passwords for encryption and safely managing the password and encryption keys.

#### Limitations

While gocryptfs provides robust security features, it's essential to consider the entire system's security. For instance, the security of the encrypted data also depends on the underlying system security, password strength, and how well the encryption keys are protected.

__In summary__, gocryptfs employs strong, modern cryptographic standards and practices, making it a safe tool for encrypting files and directories. However, the overall security also depends on how it's used and the broader system and operational security practices in place.

If you're using Aegix Linux, you already have an encrypted system drive, such that when your machine is off, your data is LUKS encrypted, and you're already on the right track to a secure system.







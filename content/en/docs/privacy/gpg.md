---
title: GPG
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: Setup GPG for encryption
date: 2024-04-09
categories: [privacy, cryptography]
tags: [docs]
weight: 40
---

I originally wrote this back in the TANKLINUX days. It's still totally relevant, so I'm including it here. 

This is an example of learning one of those evergreen technologies that will always be useful!

## GPG

Anyone who doesn't want to get hacked should be able to readily encrypt secrets on their local machine. We can have some discussion around why any serious person would be inclined to take this route instead of using a remote password manager like lastPass another time. For now, we want to be able to encrypt secrets locally. If you are running TANKLINUX, your hard disk is already encrypted in such a way that even state-sponsored hackers cannot break into it. Now that your computer is up and running, you want to use a program called `pass` to individually encrypt each password, passphrase, secret, as needed.
In order to use `pass`, you need to generate a GPG key pair, similarly to how we generated an SSH key pair above.

``` Shell

[beach@tank ~]$ gpg --full-generate-key
gpg (GnuPG) 2.2.41; Copyright (C) 2022 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
  (14) Existing key from card
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: Tank X220
Email address: tankx220@proton.me
Comment:
You selected this USER-ID:
    "Tank X220 <tankx220@proton.me>"

     ┌──────────────────────────────────────────────────────┐
     │ Please enter the passphrase to                       │
     │ protect your new key                                 │
     │                                                      │
     │ Passphrase: *********************___________________ │
     │                                                      │
     │       <OK>                              <Cancel>     │
     └──────────────────────────────────────────────────────┘

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: directory '/home/beach/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/beach/.gnupg/openpgp-revocs.d/88D41F87C2A0F9D31A6F43C9A9D450FE8E6D3C04.rev'
public and secret key created and signed.

pub   rsa4096 2023-05-29 [SC]
      88D41F87C2A0F9D31A6F43C9A9D450FE8E6D3C04
uid                      Tank X220 <tankx220@proton.me>
sub   rsa4096 2023-05-29 [E]
```

## pass

Now that we have our GPG key pair created, we can initialize our password-store with `pass init <your-gpg-id>`.
In my case:
``` Shell
[beach@tank ~dt]$ pass init 88D41F87C2A0F9D31A6F43C9A9D450FE8E6D3C04
mkdir: created directory '/home/beach/.local/share/password-store/'
Password store initialized for 88D41F87C2A0F9D31A6F43C9A9D450FE8E6D3C04
```

Test out that `pass` is working correctly by adding an example secret password with `pass add <non-secret-name-of-password` like this:
``` Shell
[beach@tank ~]$ pass add example-password
Enter password for example-password:
Retype password for example-password:
```
We just added a secret that is now encrypted on our local hard drive. In order to decrypt this secret, we can use `pass <non-secret-name-of-password` which will then prompt us for our global GPG password, akin to lastPass' master password. After entering that value, we will see the text we encrypted above, decrypted and ready for use. It will look something like this:
``` Shell
[beach@tank ~]$ pass example-password
thisisencrypted
```

### A note on copy/paste in the terminal

If you are brand new to TANKLINUX, one of the first things you'll want to learn how to do is copy text from the terminal. You are already used to `Ctrl + c` to copy from text editors or `Ctrl + Shift + c` to copy from some terminal emulators. The TANKLINUX build of ST (Suckless Simple Terminal) uses `Alt + c` to copy and `Alt + v` to copy and paste in the terminal. Vim, of course, uses other conventions, like `dd` to cut, `Shift + y` to yank (or copy) and `Shift + p` to paste.

---
title: Encrypt secrets with pass
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: Use pass to encrypt and store passwords locally
date: 2024-04-09
weight: 10
---

There are many password managers available that provide the convenience of storing your passwords in the cloud such that you can access them from any device. 

The problem is that you are trusting a third party when you don't need to, not to mention that simply accessing secrets from a mobile device drastically increases your attack surface. 

In case it isn't obvious, state-sponsored hackers aggressively target not only these cloud platforms but also all of the popular mobile devices that access them. 

## Prerequisites

Firstly, make sure you have `pass` installed. You can install it with:

``` shell
yay -S pass --noconfirm
```

And be sure to have gpg set up and installed. If you need help with that, check out the [GPG](/docs/privacy/gpg) recipe or this article [Encryption without an App](https://thequantitative.medium.com/send-secret-messages-even-the-four-letter-agencies-cant-break-into-ace64880d04f).

Then initialize `pass` with:

``` shell
pass init <your-gpg-key>
``` 

This will set up `pass` to use your GPG key for encryption. 
You can find your GPG key with:

``` shell
gpg --list-keys
```

Use a value that resembles `6B1D731B17C1F02FF6F4372E246CFC8282B671CF` for `<your-gpg-key>` above.

## Use pass

`pass` is a dead-simple, command-line, password manager that uses real encryption (via GPG) to encrypt and store passwords locally. 

The basic form to store a password is:

``` shell
pass add <name>
``` 

This will prompt you for a password and store the value you enter, encrypted in `~/.local/share/password-store<name>.gpg`.

When you want to retrieve the password, you can use:

``` shell
pass <name>
``` 

This will prompt you for your GPG passphrase and then output the password to stdout (in your terminal).

### Practical Tips

If you want to practice invaluable password hygiene, you can use [passgen](/docs/privacy/passgen) to generate a strong password and then store it with `pass`.

Use a unique password for each service you're registered to online. This way, if your account at one service is compromised, the attacker won't be able to use the same password to access your other accounts. 
Think of all the critical services you use online: email, bank, social media, etc. Be sure to never share the same password between them. 

If you aren't following this advice already, then from this day, from this hour, from this minute, let us strive to protect our accounts online.


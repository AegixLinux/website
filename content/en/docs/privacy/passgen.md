---
title: passgen - Generate passwords
author: Timothy Beach
authorURL: "https://github.com/timbeach"
description: Generate secure, pseudo-random passwords in the terminal with passgen
date: 2024-04-09
weight: 30
---

`passgen` is a simple shell script that generates a secure, pseudo-random password. 
It can be used to generate passwords of a specified length and character set. 
The default character set includes uppercase and lowercase letters, numbers, and a few special characters. 
You can customize the character set and length of the generated password using command-line options.

### Usage

Simply run `passgen` in your terminal to generate a password with the default settings.
You can customize the length and character set of the generated password using the following options:
- `--length` or `-l`: Specify the length of the password (default is 20 characters).
- `--special` or `-s`: Include and extended range of special characters in the character set.
- `--nospecial` or `-n`: Use only letters and numbers in the character set.

### Examples

Generate a password with the default settings:
- `passgen`

Generate a password with a length of 16 characters:
- `passgen --length 16`

Generate a password with the extended special characters set:
- `passgen --special`

Generate a password using only letters and numbers:
- `passgen --nospecial`

### Script

By the time you're reading this, Aegix will ship with the `passgen` script in your path.

Here is the `passgen` shell script:

 ``` Shell
#!/bin/sh

# Default settings
DEFAULT_LENGTH=20
LENGTH=$DEFAULT_LENGTH
CHARSET='A-Za-z0-9_!@#$%^&*'

# Process command-line options
while [ $# -gt 0 ]; do
  case "$1" in
    --length|-l)
      LENGTH="$2"
      shift 2
      ;;
    --special|-s)
      CHARSET='A-Za-z0-9_!@#$%^&*\|/~`'
      shift
      ;;
    --nospecial|-n)
      CHARSET='A-Za-z0-9'
      shift
      ;;
    *)
      echo "Usage: $0 [--length|-l length] [--special|-s] [--nospecial|-n]"
      exit 1
      ;;
  esac
done

# Generate a random string with the specified length and character set
tr -dc "$CHARSET" < /dev/urandom | fold -w "$LENGTH" | head -n 1
```
If it is not already on your system, you can add it by following these steps after you `cd ~/.local/bin`:

``` Shell
touch passgen && chmod +x passgen && vim passgen
```

Set paste mode in vim with `:set paste` and then press `i` to enter insert mode.

Then paste the script above into the `passgen` file you just created. 
(To paste in the terminal (including in vim) on Aegix, you can use `Alt + v`.)
((To save and exit vim, press `Esc` to exit insert mode, then type `Shift + ZZ`.))

Now you can generate a password with `passgen` from any terminal on your system.
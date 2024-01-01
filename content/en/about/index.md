---
title: About Aegix Linux
linkTitle: About
menu: {main: {weight: 10}}
---

{{% blocks/cover title="About Aegix Linux" image_anchor="bottom" height="auto" %}}

<p class="lead mt-5" style="background-color: rgba(174, 134, 18, 0.65) !important; color: #ece3ce !important; display: inline-block; padding: 5px 10px; font-weight: bold;">An Elite GNU/Linux System</p>

{{% /blocks/cover %}}

{{% blocks/lead color="dark" %}}

Aegix is a Linux system that sits on top of [Artix](https://artixlinux.org/), a systemd-free fork of [Arch Linux](https://archlinux.org). In the lower realms of Linux distro-hopping, people think **running Arch is a flex on Ubuntu users**, and **running Artix is a flex on Arch users**. 

Aegix is like a fork or custom flavor of Artix that aims to provide a more opinionated, turn-key experience for users who want to get up and running quickly with a secure, minimal, and easy-to-use system.

Deepen your understanding of the core technology that has been with us for ages. Invest in learning tools that don't quickly change and are not tied to any particular company or platform.

{{% /blocks/lead %}}

{{% blocks/section color="light" %}}

# Yay & the AUR
{.text-center}

One thing first-time Arch users quickly learn is that the [Arch User Repository](https://aur.archlinux.org/) (AUR) is a great way to install software. The AUR is a community-driven repository for Arch users to share and install software that is not available in the official repositories. This makes installing most of the software you want to use as easy as running: `yay -S <package-name>`.
{.text-center}

The `yay` command is a wrapper for the `pacman` package manager that makes it easy to install packages from the AUR. Aegix comes with `yay` pre-installed, so you can start installing software from the AUR right away.
{.text-center}

{{% /blocks/section %}}

{{% blocks/section color="secondary" %}}

# Responsible Secrets Management
{.text-center}

Aegix uses [pass](https://www.passwordstore.org/) for password management. Pass is a simple, secure, and open-source password manager that uses GPG encryption and git for version control. Pass is a great way to manage your passwords and other secrets in a secure and responsible way.
{.text-center}

{{% /blocks/section %}}
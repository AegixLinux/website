---
title: Aegix Linux
---

<style>
.td-cover-block h1,
.td-cover-block .display-1 {
  color: #00ff9f !important;
  animation: sparkle-glow 2s ease-in-out infinite !important;
  cursor: pointer !important;
}
@keyframes sparkle-glow {
  0%, 100% {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9),
                 0 0 40px rgba(0, 255, 159, 0.9),
                 0 0 60px rgba(0, 255, 159, 0.6),
                 -2px -2px 15px rgba(0, 255, 159, 0.3);
  }
  50% {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9),
                 0 0 60px rgba(0, 255, 159, 1),
                 0 0 100px rgba(0, 255, 159, 0.8),
                 -2px -2px 25px rgba(0, 255, 159, 0.5);
  }
}
.td-arrow-down a,
.td-arrow-down .btn,
.td-arrow-down .fa-circle-chevron-down,
.td-arrow-down i {
  color: #00ff9f !important;
  animation: arrow-sparkle 2s ease-in-out infinite !important;
}
@keyframes arrow-sparkle {
  0%, 100% {
    color: #00ff9f !important;
    text-shadow: 0 0 25px rgba(0, 255, 159, 0.9),
                 0 0 45px rgba(0, 255, 159, 0.6) !important;
  }
  50% {
    color: #00ffcc !important;
    text-shadow: 0 0 50px rgba(0, 255, 159, 1),
                 0 0 80px rgba(0, 255, 159, 0.8) !important;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const title = document.querySelector('.td-cover-block h1, .td-cover-block .display-1');
  if (title) {
    title.style.cursor = 'pointer';
    title.addEventListener('click', function() {
      window.open('https://youtu.be/dQw4w9WgXcQ?si=Mb-JwEppw6mHXlbc', '_blank');
    });
  }
});
</script>

{{< blocks/cover title="Discover Aegix Linux" image_anchor="top" height="full" >}}

<!-- <div style="max-width: 700px; margin: 0 auto 30px auto;">
  <p style="color: white; text-shadow: 0 0 10px rgba(0,0,0,0.8); font-size: 1.4rem; background-color: rgba(0,0,0,0.6); padding: 18px; border-radius: 5px; line-height: 1.6;">
    Latest release <strong><a href="https://github.com/AegixLinux/aegixlinux/blob/master/RELEASE_NOTES.md" style="color: #77C8F1; text-decoration: none;">Blood Moon</a></strong> is available now.
    <br>Existing users can fix update issues by removing the [community] lines from /etc/pacman.conf
  </p>
</div> -->

<!-- 🌆 Cyberpunk theme buttons with neon glow effects -->
<a class="btn btn-lg me-3 mb-4" href="/docs/" style="background: linear-gradient(45deg, #00ffff, #0080ff); color: #0f0f23; border: none; text-shadow: none; font-weight: bold; box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);">
  Documentation <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
<a class="btn btn-lg me-3 mb-4" href="https://github.com/AegixLinux" style="background: linear-gradient(45deg, #ff00ff, #ff0040); color: white; border: none; text-shadow: none; font-weight: bold; box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);">
  Source Code <i class="fab fa-github ms-2"></i>
</a>
<!-- Cyberpunk Cyphertext Alcove button with matrix green glow -->
<a class="btn btn-lg me-3 mb-4" href="/docs/privacy/cyphertext-alcove/" style="background: linear-gradient(45deg, #00ff41, #00ffff); color: #0f0f23; border: none; text-shadow: none; font-weight: bold; box-shadow: 0 0 20px rgba(0, 255, 65, 0.4);">
  Cyphertext Alcove <i class="fas fa-lock ms-2"></i>
</a>
<br>
<div style="text-align: center; margin-top: 60px;">
  <a href="#td-block-1" aria-label="Read more" style="display: inline-block; color: #00ff9f !important; text-decoration: none;">
    <i class="fa-solid fa-circle-chevron-down" style="font-size: 400%; color: #00ff9f !important;"></i>
  </a>
</div>
{{< /blocks/cover >}}


{{% blocks/lead color="dark" %}}
This isn't our operating system.
It's yours.
{.h1 .text-center}
{{% /blocks/lead %}}


<!-- Updated section colors to match theme -->
{{% blocks/section color="secondary" type="row" %}}
{{% blocks/feature icon="fa-brands fa-linux" title="Invest in Yourself" %}}
Invest in learning core technology that has stood the test of time. Unix philosophy, vim-centricity, and simplicity are the core of Aegix Linux.
{{% /blocks/feature %}}


{{% blocks/feature icon="fab fa-github" title="Contributions welcome!" url="https://github.com/aegixlinux/aegixlinux" %}}
We do a [Pull Request](https://github.com/aegixlinux/aegixlinux/pulls) contributions workflow on **GitHub**. New users are always welcome!
{{% /blocks/feature %}}


{{% blocks/feature icon="fab fa-youtube" title="Follow us on Youtube!" %}}
Instructional videos are available on our [YouTube Channel](https://www.youtube.com/@aegixlinux).
{{% /blocks/feature %}}


{{% /blocks/section %}}


{{% blocks/section color="dark" %}}
Every Aegix installation has [suckless](https://suckless.org/) GUIs, is [LUKS](https://gitlab.com/cryptsetup/cryptsetup/) encrypted, uses the [runit](http://smarden.org/runit/) init system (not systemd), and employs a [BTRFS](https://btrfs.readthedocs.io/en/latest/) filesystem with subvolumes for snapshots and rollbacks via optionally installable [timeshift](https://teejeetech.com/timeshift/).
{.h3 .text-center}
{{% /blocks/section %}}


{{% blocks/section color="primary" type="row" %}}

{{% blocks/feature icon="fa-solid fa-key" title="Easy Turn-key Installation" %}}
Aegix installation is straight-forward, providing automated setup to get you up and running quickly and securely.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-solid fa-laptop-code" title="Developer Friendly" %}}
Get started with a full development environment out of the box. Aegix is a great platform for learning and practicing software development.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-brands fa-twitter" title="Follow us on X/Twitter!" url="https://twitter.com/aegixlinux" %}}
For announcement of latest features, new videos, posts, etc.
{{% /blocks/feature %}}

{{% /blocks/section %}}


<!-- {{% blocks/section color="white" %}}
<div style="text-align: center;">
  <img src="/aegix-icon-1.png" alt="Aegix logo" style="max-width: 300px; height: auto;">
  <!--p>The aegis of Aegix</p
</div> -->


{{% /blocks/section %}}
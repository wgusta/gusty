import type { Project } from '../types';

const linuxCachyInstall: Project = {
  id: 'linux-cachy-install',
  title: {
    en: 'Look Mama, no hands! Linux Installation on my Desktop PC',
    de: 'Schau Mama, ohne Hände! Linux-Installation auf meinem Desktop-PC',
  },
  description: {
    en: 'After running out of Windows 10 I was forced to upgrade to Windows 11, but it looked horrible. So I deleted everything, changed my CPU and installed Linux Cachy OS.',
    de: 'Nach dem Ende von Windows 10 musste ich auf Windows 11 upgraden, aber es sah furchtbar aus. Also habe ich alles gelöscht, die CPU gewechselt und Linux Cachy OS installiert.',
  },
  tags: ['Linux', 'Arch', 'Cachy OS', 'Installation', 'Hardware'],
  column: 'danger',
  finalizedAt: '2025-01-27',
  aiContent: {
    en: `# Linux Cachy OS Installation

Windows 10 support ended. Microsoft pushed Windows 11. I had no choice.

I upgraded.

IT LOOKED HORRIBLE.

The interface felt wrong. The taskbar placement. The rounded corners everywhere. The way it handled windows. Everything felt like it was designed by someone who had never used a computer before.

I stared at my screen for days, trying to make it work. Trying to make it feel right.

IT NEVER DID.

So I made a decision.

I DELETED EVERYTHING.

![PC case with CPU upgrade](/images/linux-install-1.jpg)

First, I opened the case. Changed the CPU. Upgraded the hardware while I was at it. If I was going to start fresh, I might as well do it properly.

The old CPU came out. The new one went in. Thermal paste. Screws. Everything back in place.

HARDWARE READY. SOFTWARE NEXT.

I booted from a USB drive. The GRUB menu appeared.

![GRUB boot menu](/images/linux-install-2.jpg)

Welcome to GRUB. Version 2.06.

I selected the installation option. Pressed enter.

The screen went dark. Then came back with an error.

![Boot error message](/images/linux-install-3.jpg)

"error: loader/efi/linux.c:grub_arch_efi_linux_boot_image:227:cannot load image."

I stared at the error message.

THIS WAS NOT GOING TO BE EASY.

I pressed any key. Tried again. Same error.

I dropped to the GRUB command line.

![GRUB command line](/images/linux-install-4.jpg)

The command line appeared. I could see the kernel parameters. The boot configuration. Everything laid out in text.

I adjusted parameters. Added flags. Tried different kernel options.

cow_spacesize=10G copytoram=auto module_blacklist=pcspkr i915.modeset=1 amdgpu.modeset=1 nvme_load=yes

I typed. Adjusted. Booted again.

IT WORKED.

The Arch installation process started.

![Arch Linux boot process](/images/linux-install-5.jpg)

The screen filled with system messages. Kernel loading. Module initialization. Filesystem mounting.

:: running early hook [udev]
Starting systemd-udevd version 258.2-2-arch
:: running hook [archiso_loop_mnt]
:: Mounting '/dev/sdb1' to '/run/archiso/bootmnt'
:: Device /dev/sdb1 mounted successfully.
:: Copying rootfs image to RAM...

The progress bar filled. 703MiB copied. Installation proceeding.

I watched the terminal scroll. Line after line of system initialization. Everything working. Everything making sense.

NO ROUNDED CORNERS. NO FORCED UPDATES. NO TELEMETRY.

Just Linux. Just Arch. Just control.

The installation completed. I rebooted. The system came up.

Time to configure.

![Bluetooth terminal](/images/linux-install-6.jpg)

I opened a terminal. Started configuring Bluetooth. Pairing devices. Setting up the system.

bluetoothctl commands. Device discovery. Trusting devices. Connecting.

The terminal filled with [CHG] and [NEW] messages. Devices appearing. Devices connecting.

FF:87:8A:06:6D:EC MX Master 2S

The mouse connected. The keyboard connected. Everything working.

I kept configuring. Setting up the desktop environment. Installing packages. Making it mine.

![Getting started GUI](/images/linux-install-7.jpg)

The "Getting started" window appeared. A checklist of components. Authentication agent. Terminal. Wallpaper. Notification daemon. Application launcher.

Some items showed "Missing" in red. Others showed "Installed" in green. Some showed "Running" in blue.

I worked through the list. Installed what was needed. Configured what was required.

The system took shape. Component by component. Feature by feature.

I HAD CONTROL AGAIN.

No forced updates. No telemetry. No interface decisions made by someone else.

Just my system. Just my choices. Just Linux.

Windows 11 looked horrible. So I deleted everything. Changed my CPU. Installed Linux Cachy OS.

BEST DECISION I EVER MADE.`,
    de: `# Linux Cachy OS Installation

Windows 10 Support endete. Microsoft drängte Windows 11 auf. Ich hatte keine Wahl.

Ich habe upgegradet.

ES SAH FURCHTBAR AUS.

Das Interface fühlte sich falsch an. Die Taskleistenplatzierung. Die abgerundeten Ecken überall. Die Art, wie es Fenster handhabte. Alles fühlte sich an, als hätte es jemand designt, der noch nie einen Computer benutzt hat.

Ich starrte tagelang auf meinen Bildschirm und versuchte, es zum Laufen zu bringen. Versuchte, dass es sich richtig anfühlt.

TAT ES NIE.

Also traf ich eine Entscheidung.

ICH HABE ALLES GELÖSCHT.

![PC-Gehäuse mit CPU-Upgrade](/images/linux-install-1.jpg)

Zuerst öffnete ich das Gehäuse. Wechselte die CPU. Upgradete die Hardware gleich mit. Wenn ich schon neu anfange, dann richtig.

Die alte CPU kam raus. Die neue rein. Wärmeleitpaste. Schrauben. Alles zurück an seinen Platz.

HARDWARE BEREIT. SOFTWARE ALS NÄCHSTES.

Ich bootete von einem USB-Stick. Das GRUB-Menü erschien.

![GRUB Boot-Menü](/images/linux-install-2.jpg)

Willkommen bei GRUB. Version 2.06.

Ich wählte die Installationsoption. Drückte Enter.

Der Bildschirm wurde dunkel. Dann kam er mit einem Fehler zurück.

![Boot-Fehlermeldung](/images/linux-install-3.jpg)

"error: loader/efi/linux.c:grub_arch_efi_linux_boot_image:227:cannot load image."

Ich starrte die Fehlermeldung an.

DAS WIRD NICHT EINFACH.

Ich drückte eine beliebige Taste. Versuchte es nochmal. Gleicher Fehler.

Ich wechselte zur GRUB-Kommandozeile.

![GRUB-Kommandozeile](/images/linux-install-4.jpg)

Die Kommandozeile erschien. Ich konnte die Kernel-Parameter sehen. Die Boot-Konfiguration. Alles in Text dargestellt.

Ich passte Parameter an. Fügte Flags hinzu. Probierte verschiedene Kernel-Optionen.

cow_spacesize=10G copytoram=auto module_blacklist=pcspkr i915.modeset=1 amdgpu.modeset=1 nvme_load=yes

Ich tippte. Passte an. Bootete nochmal.

ES FUNKTIONIERTE.

Der Arch-Installationsprozess startete.

![Arch Linux Boot-Prozess](/images/linux-install-5.jpg)

Der Bildschirm füllte sich mit Systemmeldungen. Kernel laden. Modul-Initialisierung. Dateisystem mounten.

:: running early hook [udev]
Starting systemd-udevd version 258.2-2-arch
:: running hook [archiso_loop_mnt]
:: Mounting '/dev/sdb1' to '/run/archiso/bootmnt'
:: Device /dev/sdb1 mounted successfully.
:: Copying rootfs image to RAM...

Der Fortschrittsbalken füllte sich. 703MiB kopiert. Installation läuft.

Ich beobachtete das Terminal scrollen. Zeile für Zeile Systeminitialisierung. Alles funktioniert. Alles ergibt Sinn.

KEINE ABGERUNDETEN ECKEN. KEINE ERZWUNGENEN UPDATES. KEINE TELEMETRIE.

Nur Linux. Nur Arch. Nur Kontrolle.

Die Installation war abgeschlossen. Ich rebootete. Das System kam hoch.

Zeit zum Konfigurieren.

![Bluetooth-Terminal](/images/linux-install-6.jpg)

Ich öffnete ein Terminal. Begann Bluetooth zu konfigurieren. Geräte pairen. Das System einrichten.

bluetoothctl-Befehle. Geräteerkennung. Geräte vertrauen. Verbinden.

Das Terminal füllte sich mit [CHG] und [NEW] Nachrichten. Geräte erscheinen. Geräte verbinden.

FF:87:8A:06:6D:EC MX Master 2S

Die Maus verbunden. Die Tastatur verbunden. Alles funktioniert.

Ich konfigurierte weiter. Desktop-Umgebung einrichten. Pakete installieren. Es zu meinem machen.

![Getting-Started-GUI](/images/linux-install-7.jpg)

Das "Getting started" Fenster erschien. Eine Checkliste von Komponenten. Authentication Agent. Terminal. Wallpaper. Notification Daemon. Application Launcher.

Einige Einträge zeigten "Missing" in Rot. Andere "Installed" in Grün. Manche "Running" in Blau.

Ich arbeitete die Liste ab. Installierte was nötig war. Konfigurierte was erforderlich war.

Das System nahm Form an. Komponente für Komponente. Feature für Feature.

ICH HATTE WIEDER DIE KONTROLLE.

Keine erzwungenen Updates. Keine Telemetrie. Keine Interface-Entscheidungen von jemand anderem.

Nur mein System. Nur meine Entscheidungen. Nur Linux.

Windows 11 sah furchtbar aus. Also habe ich alles gelöscht. Meine CPU gewechselt. Linux Cachy OS installiert.

BESTE ENTSCHEIDUNG MEINES LEBENS.`,
  },
};

export default linuxCachyInstall;

# Pulse desktop installers

Drop the installer builds in this folder with these exact file names:

| Platform | File name         | Served at                    |
|----------|-------------------|------------------------------|
| Windows  | `Pulse-Setup.exe` | `/downloads/Pulse-Setup.exe` |
| macOS    | `Pulse.dmg`       | `/downloads/Pulse.dmg`       |

The download page (`/<locale>/download`) links to these paths after the form is submitted.
To use different file names, change `DOWNLOADS` at the top of `src/components/site/DownloadForm.tsx`.

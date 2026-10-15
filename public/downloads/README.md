# Pulse desktop installers

Drop the installer builds in this folder with these exact file names:

| Platform | File name         | Served at                    |
|----------|-------------------|------------------------------|
| Windows  | `Pulse-Setup.exe` | `/downloads/Pulse-Setup.exe` |
| macOS    | `Pulse.dmg`       | `/downloads/Pulse.dmg`       |

The download page (`/<locale>/download`) links to these paths after the form is submitted.
To use different file names, change `DOWNLOADS` at the top of `src/components/site/DownloadForm.tsx`.

After submit, the page auto-starts the installer for the visitor's detected OS (Windows → `.exe`, macOS → `.dmg`).
Links carry the session's `utm_*` params as a query string (e.g. `/downloads/Pulse.dmg?utm_source=…`) so server logs can attribute downloads; the file itself is unaffected.

/**
 * Installers come from the Pulse download portal, not from this repo. The link always redirects to the latest production
 * build (channel=stable), so a new release needs no change here. Builds used to be committed to /public/downloads, which
 * froze the site on an old build (2026-11-09: the Windows button was serving a Pulse Stage build).
 * utm_mark=website tells these downloads apart from other links in the app's client_downloaded event.
 */
const PORTAL='https://download.pulse.co.jp/distributions/app/installers/latest?channel=stable&utm_mark=website';
export const DOWNLOADS={
  windows:{href:`${PORTAL}&platform=win`,file:'Pulse-Setup.exe'},
  mac:{href:`${PORTAL}&platform=osx`,file:'Pulse.dmg'},
} as const;

export type DesktopPlatform=keyof typeof DOWNLOADS;
/** 'mobile' = phone/tablet (no desktop app yet); null = unknown desktop (Linux etc.). */
export type Platform=DesktopPlatform|'mobile'|null;
export const PLATFORM_NAME:Record<DesktopPlatform,string>={windows:'Windows',mac:'macOS'};

/** Desktop OS detection. iPadOS in desktop mode reports "Macintosh", so touch points are used to tell it apart. */
export function detectPlatform():Platform{
  if(typeof navigator==='undefined')return null;
  const p=(navigator as Navigator&{userAgentData?:{platform?:string;mobile?:boolean}}).userAgentData?.platform?.toLowerCase();
  if(p){
    if(p.includes('windows'))return 'windows';
    if(p==='macos')return 'mac';
    if(p==='android'||p==='ios')return 'mobile';
    return null;
  }
  const ua=navigator.userAgent;
  if(/iPhone|iPad|iPod|Android|Windows Phone/i.test(ua))return 'mobile';
  if(/Windows/i.test(ua))return 'windows';
  if(/Macintosh|Mac OS X/i.test(ua))return navigator.maxTouchPoints<2?'mac':'mobile';
  return null;
}

/** Kick off a download without leaving the page. If the browser blocks it, the visible button is the fallback. */
export function startDownload(href:string,file:string){
  const a=document.createElement('a');a.href=href;a.download=file;a.style.display='none';
  document.body.appendChild(a);a.click();a.remove();
}

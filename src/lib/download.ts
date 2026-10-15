/** Installer files live in /public/downloads. Replace the files there (or the paths here) when a new build ships. */
export const DOWNLOADS={
  windows:{href:'/downloads/Pulse-Setup.exe',file:'Pulse-Setup.exe'},
  mac:{href:'/downloads/Pulse.dmg',file:'Pulse.dmg'},
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

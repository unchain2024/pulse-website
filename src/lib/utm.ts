/** First-touch UTM capture. Values live in sessionStorage so they survive the locale redirect and in-site navigation. */
export const UTM_KEYS=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'] as const;
export type UtmKey=typeof UTM_KEYS[number];
export type Utm=Partial<Record<UtmKey,string>>;

const STORE='pulse.utm';
const MAX_LEN=200;
const LABELS:Record<UtmKey,string>={utm_source:'UTM Source',utm_medium:'UTM Medium',utm_campaign:'UTM Campaign',utm_term:'UTM Term',utm_content:'UTM Content'};

/** Pull the whitelisted utm_* keys out of a query string. */
export function parseUtm(search:string):Utm{
  const params=new URLSearchParams(search);
  const utm:Utm={};
  for(const k of UTM_KEYS){const v=params.get(k)?.trim();if(v)utm[k]=v.slice(0,MAX_LEN);}
  return utm;
}

/** Stored UTM for this session, or {} when none / storage unavailable. */
export function getUtm():Utm{
  if(typeof window==='undefined')return {};
  try{const raw=sessionStorage.getItem(STORE);return raw?JSON.parse(raw) as Utm:{};}catch{return {};}
}

/** Capture UTM from the current URL once per session (first touch wins). Safe to call repeatedly. */
export function captureUtm():void{
  if(typeof window==='undefined')return;
  try{
    if(sessionStorage.getItem(STORE))return;
    const utm=parseUtm(window.location.search);
    if(Object.keys(utm).length)sessionStorage.setItem(STORE,JSON.stringify(utm));
  }catch{}
}

/** Append the stored UTM params to a link so server logs can attribute it. */
export function withUtm(href:string,utm:Utm=getUtm()):string{
  const q=new URLSearchParams(utm as Record<string,string>).toString();
  return q?href+(href.includes('?')?'&':'?')+q:href;
}

/** Readable-label fields for the Web3Forms payload. Empty object when nothing is stored. */
export function utmFields(utm:Utm=getUtm()):Record<string,string>{
  const out:Record<string,string>={};
  for(const k of UTM_KEYS){const v=utm[k];if(v)out[LABELS[k]]=v;}
  return out;
}

import {getTranslations,setRequestLocale} from 'next-intl/server';
import {ContactForm} from '@/components/site/ContactForm';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;const t=await getTranslations({locale,namespace:'site.contact'});return {title:t('title')+' | Pulse'};}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;setRequestLocale(locale);return <div className="page on" data-page="contact"><ContactForm/></div>}

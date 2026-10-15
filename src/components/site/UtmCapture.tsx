'use client';
import {useEffect} from 'react';
import {captureUtm} from '@/lib/utm';

/** Mounted once in the locale layout; remembers the landing URL's utm_* params for the session. */
export function UtmCapture(){useEffect(()=>{captureUtm()},[]);return null;}

import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

const redirects = new Map<string, string>([
  ['/about', '/about-axe-da-ilha-malta'],
  ['/about-oxossi-capoeira-malta.html', '/about-axe-da-ilha-malta'],
  ['/about-capoeira-nomada-malta.html', '/about-axe-da-ilha-malta'],
  ['/axe-na-ilha-2025.html', '/axe-da-ilha-2026'],
  ['/axe-da-ilha-2026.html', '/axe-da-ilha-2026'],
  ['/capoeira-classes-malta.html', '/capoeira-classes-malta'],
  ['/contact.html', '/contact'],
  ['/festival', '/axe-da-ilha-2026'],
  ['/gentle-power.html', '/capoeira-classes-malta'],
  ['/schedule', '/capoeira-classes-malta'],
  ['/workshop.html', '/workshop'],
  ['/workshops', '/workshop'],
]);

export async function handle({ event, resolve }) {
  const forceWWW = (event.url.hostname === env.PUBLIC_HOST)
  const realHost = (forceWWW)
    ? 'www' + event.url.hostname
    : event.url.hostname
  const target = redirects.get(event.url.pathname)

console.log('redirect debug', env.PUBLIC_HOST, forceWWW, realHost, target, realHost + (target ?? event.url.pathname) + event.url.search )
  if (target
    || forceWWW) {
    redirect(301, realHost + (target ?? event.url.pathname) + event.url.search)
  }
  return resolve(event);
}
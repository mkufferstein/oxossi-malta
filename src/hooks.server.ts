import { redirect } from '@sveltejs/kit';

const redirects = new Map<string, string>([
  ['/capoeira-classes-malta.html', '/capoeira-classes-malta'],
  ['/about-oxossi-capoeira-malta.html', '/about-axe-da-ilha-malta'],
  ['/about-capoeira-nomada-malta.html', '/about-axe-da-ilha-malta'],
  ['/workshop.html', '/workshop'],
  ['/axe-na-ilha-2025.html', '/axe-da-ilha-2026'],
  ['/axe-da-ilha-2026.html', '/axe-da-ilha-2026'],
  ['/contact.html', '/contact'],
]);

export async function handle({ event, resolve }) {
  const target = redirects.get(event.url.pathname);
  if (target) {
    redirect(301, target);
  }
  return resolve(event);
}
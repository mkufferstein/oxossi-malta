import { redirect } from '@sveltejs/kit';

const redirects = new Map<string, string>([
  ['/capoeira-classes-malta.html', '/capoeira-classes-malta']
]);

export async function handle({ event, resolve }) {
  const target = redirects.get(event.url.pathname);
  if (target) {
    redirect(301, target);
  }
  return resolve(event);
}
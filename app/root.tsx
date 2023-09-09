import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import stylesheet from '~/globals.css';
import { SITE_DESCRIPTION, SITE_TITLE } from './consts';

export const meta: V2_MetaFunction = () => {
  return [
    { title: SITE_TITLE },
    {
      property: 'og:title',
      content: `Login / ${SITE_TITLE}`,
    },
    { name: 'description', content: SITE_DESCRIPTION },
  ];
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Outfit:wght@400;500;600;700;900&family=Poppins:ital,wght@0,200;0,400;0,500;0,700;1,100&family=Roboto+Mono&family=Roboto:wght@400;500;700;900&display=swap',
  },
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

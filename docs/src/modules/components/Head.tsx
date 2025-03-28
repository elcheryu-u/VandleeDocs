import * as React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { LANGUAGES_SSR } from 'docs/config';
import { useUserLanguage, useTranslate } from '@vandlee/docs/i18n';
import { pathnameToLanguage } from '../utils/helpers';

const HOST = process.env.PULL_REQUEST_ID
  ? 'https://test-docs.vandlee.com'
  : 'https://docs.vandlee.com';

interface HeadProps {
  card?: string;
  children?: React.ReactNode;
  description: string;
  disableAlternateLocale?: boolean;
  largeCard?: boolean;
  title: string;
  type?: string;
}

export default function Head(props: HeadProps) {
  const t = useTranslate();
  const {
    card = '/static/social-previes/home-preview.jpg',
    children,
    description = t('strapline'),
    disableAlternateLocale = false,
    largeCard = true,
    title = t('headTitle'),
    type = 'website',
  } = props;
  const userLanguage = useUserLanguage();
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const preview = card.startsWith('http') ? card : `${HOST}${card}`;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* X */}
      <meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />
      {/* https://x.com/MUI_hq */}
      <meta name="twitter:site" content="@vandlee" />
      {/* #default-branch-switch */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={preview} />
      {/* Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      {/* #default-branch-switch */}
      <meta property="og:url" content={`${HOST}${router.asPath}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={preview} />
      <meta property="og:ttl" content="604800" />
      {/* Algolia */}
      <meta name="docsearch:language" content={userLanguage} />
      {/* #default-branch-switch */}
      <meta name="docsearch:version" content="master" />
      {disableAlternateLocale
        ? null
        : LANGUAGES_SSR.map((userLanguage2) => (
            <link
              key={userLanguage2}
              rel="alternate"
              href={`https://docs.zuro.com${
                userLanguage2 === 'es' ? '' : `/${userLanguage2}`
              }${canonicalAs}`}
              hrefLang={userLanguage2}
            />
          ))}
      {children}
    </NextHead>
  );
}

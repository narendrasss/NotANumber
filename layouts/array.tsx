import React from 'react'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'

import { styled } from '@/stitches'

import CodeBlock from '@/elements/CodeBlock'
import ThematicBreak from '@/elements/ThematicBreak'
import ExternalLink from '@/elements/ExternalLink'
import InlineCode from '@/elements/InlineCode'
import UnorderedList from '@/elements/UnorderedList'
import OrderedList from '@/elements/OrderedList'

import { formatPath } from '@/lib/utils'

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
})

const mdxComponents = {
  a: ExternalLink,
  pre: CodeBlock,
  hr: ThematicBreak,
  inlineCode: InlineCode,
  ul: UnorderedList,
  ol: OrderedList,
}

type Frontmatter = {
  __resourcePath: string
  title: string
  description: string
  blurb: string
  editedAt: string
  publishedAt: string
}

export default function ArrayLayout({
  frontMatter = {} as Frontmatter,
  children,
}) {
  const slug = formatPath(frontMatter.__resourcePath)
  return (
    <MDXProvider components={mdxComponents}>
      <Article>
        <Head>
          <title>{frontMatter.title}</title>
          <meta name="description" content={frontMatter.description} />
          <meta name="author" content="Nanda Syahrasyad" />
          <meta property="og:title" content={frontMatter.title} />
          <meta property="og:description" content={frontMatter.description} />
          <meta
            property="og:image"
            content={`https://nan.fyi/og-image/${slug}.png`}
          />
          <meta property="og:url" content={`https://nan.fyi/${slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Header>
          <p>Not a Number</p>
          <Title>{frontMatter.title}</Title>
          <Blurb>{frontMatter.blurb}</Blurb>
          <Blurb>{formatter.format(new Date(frontMatter.publishedAt))}</Blurb>
        </Header>
        {children}
      </Article>
    </MDXProvider>
  )
}

const Header = styled('header', {
  gridColumn: '1 / -1',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '0 24px',
})

const Title = styled('h1', {
  fontFamily: 'var(--text-serif)',
  fontSize: '6rem',
  fontWeight: '500',
  lineHeight: '1',
  margin: '64px 0',
})

const Blurb = styled('p', {
  opacity: 0.7,
  marginTop: '16px',
})

const Article = styled('article', {
  '--text-sans': 'Karla',
  '--text-mono': 'DM Mono',

  '--horizontal-padding': '32px',

  '--base-color': '235, 60%',
  '--dark-blue': 'hsla(235, 80%, 32%)',
  '--base-blue': 'hsla(var(--base-color), 55%)',
  '--light-blue': 'hsla(var(--base-color), 90%)',

  '--color-main': 'var(--base-blue)',
  '--color-light': 'var(--light-blue)',
  '--color-dark': 'var(--dark-blue)',
  '--color-highlight-1': 'hsla(327, 41%, 72%, 1)',
  '--color-highlight-2': 'hsla(168, 50%, 52%, 1)',

  '--inline-code-background': 'var(--color-light)',

  fontFamily: 'var(--text-sans)',
  color: 'hsla(240, 60%, 25%)',
  backgroundColor: 'hsla(var(--base-color), 98%)',
  paddingBottom: 'calc(3 * var(--horizontal-padding))',

  display: 'grid',
  gridTemplateColumns:
    '1fr min(60ch, calc(100vw - calc(var(--horizontal-padding) * 2))) 1fr',
  gridColumnGap: 'var(--horizontal-padding)',

  '> *': {
    marginBottom: '1.5rem',
    gridColumn: '2 / span 1',
  },

  '> header': {
    marginBottom: '80px',
  },

  '> .full-width': {
    gridColumn: '1 / -1',
  },

  '> h2': {
    fontFamily: 'var(--text-mono)',
    fontSize: '2rem',
    marginTop: '3rem',
    marginBottom: '2rem',
  },

  '> h3': {
    fontFamily: 'var(--text-mono)',
    fontSize: '1.5rem',
    marginTop: '1.5rem',
  },

  '> figure': {
    marginTop: '3rem',
    marginBottom: '4.5rem',
  },

  '> blockquote': {
    paddingLeft: '20px',
    color: 'var(--gray600)',
    borderLeft: '3px solid var(--teal)',
  },
})

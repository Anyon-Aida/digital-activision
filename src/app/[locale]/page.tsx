import HomePage from '../Homepage'

export function generateStaticParams() {
  return [{ locale: 'hu' }, { locale: 'en' }]
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'hu'
  return <HomePage locale={locale} />
}

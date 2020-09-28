import Link from 'next/link'

const links = [
  { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
  { href: 'https://nextjs.org/docs', label: 'Docs' },
]

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center p-3 mx-3">
        <li>
          <Link href="/">
            <a className="text-2xl no-underline">podmap.me</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

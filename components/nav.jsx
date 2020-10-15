import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center p-3 mx-3">
        <li>
          <Link href="/">
            <a className="text-2xl no-underline">podmap.me</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          <li>
            <a href="https://batjc.wordpress.com/pods-and-pod-mapping-worksheet/" target="_blank" rel="noopener noreferrer">
              instructions
            </a>
          </li>
          <li>
            <Link href="/privacy">
              <a>privacy</a>
            </Link>
          </li>
          <li>
            <Link href="/credits">
              <a>credits</a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  )
}

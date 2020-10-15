import { useState } from 'react'
import Link from 'next/link'

import { useAuthentication, useLoggedIn } from 'swrlit'

export default function Nav() {
  const [handle, setHandle] = useState("")
  const [badHandle, setBadHandle] = useState(false)
  const { loginHandle, logout } = useAuthentication()
  const loggedIn = useLoggedIn()
  async function logIn(){
    setBadHandle(false)
    try {
      await loginHandle(handle);
    } catch (e) {
      console.log("error:", e)
      setBadHandle(true)
    }
  }
  function onChange(e){
    setHandle(e.target.value)
    setBadHandle(false)
  }
  function onKeyPress(e){
    if (e.key === "Enter"){
      logIn()
    }
  }
  return (
    <nav>
      <ul className="flex justify-between items-center p-3 mx-3">
        <li>
          <Link href="/">
            <a className="text-2xl no-underline">podmap.me</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          {loggedIn ? (
            <li>
              <button onClick={logout}>log out</button>
            </li>
          ) : (
            <>
              <li className="relative">
                <input type="text" className="pl-2"
                       placeholder="what's your handle?"
                       value={handle} onChange={onChange} onKeyPress={onKeyPress}/>
                {badHandle && (
                  <p className="text-xs text-red-500 absolute">
                    hm, I don't recognize that handle
                  </p>
                )}
              </li>
              <li>
                <button onClick={logIn}>log in</button>
              </li>
            </>
          )}
          <li>
            🌝
          </li>
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

import Nav from '../components/nav'

export default function PrivacyPage(){
  return (
    <div>
      <Nav/>
      <main className="text-center text-lg w-128 m-auto ">
        <p className="my-6">
          podmap.me will never store any data about you, period. we will never
          intentionally track your web activity or facilitate a third party
          tracking your activities. keep an eye on us
          with the markup's <a href="https://themarkup.org/blacklight?url=podmap.me">blacklight tool</a>
          &nbsp;and&nbsp;let us know at <a href="mailto:hello@itme.email">hello@itme.email</a>&nbsp;if
          you find any trackers.
        </p>
        <p className="my-6">
          all data you create on podmap.me will be stored in a place that you control -
          right now this means we only save data in the local storage of your web
          browser. in the future we will support saving your pod information in a
          &nbsp;<a href="https://solidproject.org">personal online data store</a>. we do not run
          our own data storage servers - this site is static html and javascript
          hosted on <a href="https://vercel.com/">vercel</a>.
        </p>
      </main>
    </div>
  )
}

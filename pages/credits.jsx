import Nav from '../components/nav'

export default function CreditsPage(){
  return (
    <div>
      <Nav/>
      <main className="text-center text-lg w-128 m-auto ">
        <p className="my-6">
          podmap.me is a web-based implementation of the
          &nbsp;<a href="https://batjc.wordpress.com/">Bay Area Transformative Justice Collective's</a>&nbsp;
          <a href="https://batjc.wordpress.com/pods-and-pod-mapping-worksheet/">Pod Mapping Worksheet</a>.
        </p>
        <p>
          if you find it helpful please <a href="https://batjc.wordpress.com/donate/">donate</a>.
        </p>
      </main>
    </div>
  )
}

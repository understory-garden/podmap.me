import Nav from '../components/nav'

export default function CreditsPage(){
  return (
    <div>
      <Nav/>
      <main className="text-center text-lg w-128 m-auto ">
        <p className="my-6">
          podmap.me is a Web-based implementation of
          the <a href="https://batjc.wordpress.com/pods-and-pod-mapping-worksheet/">Pod Mapping Worksheet</a> created
          by <a href="https://www.instagram.com/mia.mingus/">Mia Mingus</a> for
          the <a href="https://batjc.wordpress.com/">Bay Area Transformative Justice Collective</a>.
          .
        </p>
        <p>
          if you find it helpful please <a href="https://batjc.wordpress.com/donate/">donate</a>.
        </p>
      </main>
    </div>
  )
}

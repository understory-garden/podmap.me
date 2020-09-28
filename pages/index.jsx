import {cloneElement, Children} from "react"
import Nav from '../components/nav'


function CircleLayout({children, className="", style={}, ...args}){
  return (
    <div className={`circle-flow ${className}`} style={{"--m": children.length, ...style}} {...args}>
      {Children.map(children, (child, i) => {
        return cloneElement(child, {style: {"--i": i + 1}})
      })}
    </div>
  )
}

export default function IndexPage() {

  const things = ["Fee", "Fie", "Foe", "Fum", "Fam", "For"]
  return (
    <div>
      <Nav />
      <div className="w-screen relative">
        <div className="w-screen absolute top-0 pointer-events-none">
          <CircleLayout className="m-auto" style={{"--rel": 0.333, "--d": "24vw", "--tan" : 0.5}}>
            {things.map((x, i) => (
              <div className="pod-element" key={i}>
                <input placeholder="Pod member"></input>
              </div>
            ))}
          </CircleLayout>
        </div>
        <div className="w-screen absolute top-0 pointer-events-none">
          <CircleLayout className="m-auto" style={{"--rel": 0.333, "--d": "24vw", "--tan" : 0.5}}>
            <div className="pod-element border-4 bg-gray-200">
              <input placeholder="Your name"></input>
            </div>
          </CircleLayout>
        </div>
      </div>
    </div>
  )
}

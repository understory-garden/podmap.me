import {useState, useCallback, cloneElement, Children} from "react"
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

// thanks,https://usehooks.com/useLocalStorage/
function useLocalState(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log("ERROR LOADING INIT", error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log("ERROR STORING LOCAL", error);
    }
  }, [storedValue, setStoredValue]);

  return [storedValue, setValue];
}

export default function IndexPage() {
  const [podmap, setPodmap] = useLocalState("https://podmap.me/pods/default", {things: [], potentialThings: []})
  return (
    <div>
      <Nav />
      <div className="w-screen h-screen relative">
        <div className="pod-container">
          <CircleLayout className="m-auto" style={{"--rel": 0.333, "--d": "9rem", "--tan" : 0.5}}>
            <div className="pod-element border-4 bg-gray-200">
              <input placeholder="Your name"
                     className="pod-input"
                     value={podmap && podmap.name || ""}
                     onChange={e => {
                       setPodmap(pm => ({...pm, name: e.target.value}))
                     }}
              />
            </div>
          </CircleLayout>
        </div>
        <div className="pod-container">
          <CircleLayout className="m-auto" style={{"--rel": 0.333, "--d": "9rem", "--tan" : 0.5}}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div className="pod-element" key={i}>
                <input placeholder="Pod member"
                       className="pod-input text-xl"
                       value={(podmap && podmap.things && podmap.things[i]) || ""}
                       onChange={e => {
                         setPodmap(pm => {
                           pm.things = pm.things || []
                           pm.things[i] = e.target.value
                           return {...pm}
                         })
                       }}/>
              </div>
            ))}
          </CircleLayout>
        </div>
        <div className="pod-container">
          <CircleLayout className="m-auto" style={{"--rel": 2.333, "--d": "6rem", "--tan" : 0.5}}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
              <div className="pod-element border-dotted" key={i}>
                <input placeholder="Pod member?"
                       className="pod-input text-sm"
                       value={(podmap && podmap.potentialThings && podmap.potentialThings[i]) || ""}
                       onChange={e => {
                         setPodmap(pm => {
                           pm.potentialThings = pm.potentialThings || []
                           pm.potentialThings[i] = e.target.value
                           return {...pm}
                         })
                       }}/>
              </div>
            ))}
          </CircleLayout>
        </div>
        <div className="pod-container">
          <CircleLayout className="m-auto" style={{"--rel": 1, "--d": "12rem", "--tan" : 0.4}}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div className={`pod-element  ${((i === 2) || (i === 5)) && 'hidden'}`} key={i}>
                <input placeholder="Support Org"
                       className="pod-input"
                       value={(podmap && podmap.supportOrgs && podmap.supportOrgs[i]) || ""}
                       onChange={e => {
                         setPodmap(pm => {
                           pm.supportOrgs = pm.supportOrgs || []
                           pm.supportOrgs[i] = e.target.value
                           return {...pm}
                         })
                       }}/>
              </div>
            ))}
          </CircleLayout>
        </div>
      </div>
    </div>
  )
}

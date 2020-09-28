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
  const [podmap, setPodmap] = useLocalState("https://podmap.me/pods/default", {things: ["", "", "", "", "", ""]})
  return (
    <div>
      <Nav />
      <div className="w-screen relative">
        <div className="w-screen absolute top-0 pointer-events-none">
          <div className="w-screen absolute top-0 pointer-events-none">
            <CircleLayout className="m-auto" style={{"--rel": 0.333, "--d": "24vw", "--tan" : 0.5}}>
              <div className="pod-element border-4 bg-gray-200">
                <input placeholder="Your name"
                       value={podmap && podmap.name}
                       onChange={e => {
                         setPodmap(pm => ({name: e.target.value, ...pm}))
                       }}
                ></input>
              </div>
            </CircleLayout>
          </div>
          <CircleLayout className="m-auto" style={{"--rel": 0.333, "--d": "24vw", "--tan" : 0.5}}>
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div className="pod-element" key={i}>
                <input placeholder="Pod member"
                       value={podmap && podmap.things[i]}
                       onChange={e => {
                         setPodmap(pm => {
                           pm.things[i] = e.target.value
                           return {...pm}
                         })
                       }}></input>
              </div>
            ))}
          </CircleLayout>
        </div>
      </div>
    </div>
  )
}

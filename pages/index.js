import { AuthButton, Value, List } from '@solid/react';
import data from '@solid/query-ldflex';

const hs = data["https://podmap.me/harmedSupport"]
const chs = data["https://podmap.me/causedHarmSupport"]

export default () => {
  const addToby = async () => {
    console.log("ADDED!", await data.user[hs].add(data["https://tobytoberson.inrupt.net/profile/card#me"]))
  }
  const addDad = async () => {
    console.log("ADDED!", await data.user[hs].add(data["https://r2vachon.solid.community/profile/card#me"]))
  }

  return <div>
           <h1>Welcome to Next.js!</h1>
           <AuthButton popup="static/popup.html" login="Login here!" logout="Log me out"/>
           <p>Welcome back, <Value src="user.name"/></p>
           <List src="user[https://podmap.me/harmedSupport]"/>
           <button onClick={addToby}>Add toby</button>
           <button onClick={addDad}>Add dad</button>
         </div>;
}

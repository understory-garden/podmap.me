import { Circle } from 'react-shapes';
import { AuthButton, Value, List, useLDflexValue, useLDflexList } from '@solid/react';
import data from '@solid/query-ldflex';
import styled from 'styled-components'

import { Form, Text, TextArea } from 'informed';


const hs = data["https://podmap.me/harmedSupport"]
const chs = data["https://podmap.me/causedHarmSupport"]

const StyledCircleInputDiv = styled.div`
position: relative;

textarea {
  border: none;
  position: absolute;
  background: transparent;
  top: 20px;
  width: 80px;
  left: 10px;
  height: 60px;
  resize: none;
  text-align: center;
  font-size: larger;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  &:focus {
    border: none;
    outline: none;
  }
}
`

const CircleInput = ({field}) => (
  <StyledCircleInputDiv>
    <Circle r={50} fill={{color:'white'}} stroke={{color:'black'}} strokeWidth={3}/>
    <TextArea field={field} />
  </StyledCircleInputDiv>
)

export default () => {
  const addToby = async () => {
    console.log("ADDED!", await data.user[hs].add(data["https://tobytoberson.inrupt.net/profile/card#me"]))
  }
  const addDad = async () => {
    console.log("ADDED!", await data.user[hs].add(data["https://r2vachon.solid.community/profile/card#me"]))
  }

  const addHarmedSupport = async ({name}) => {
    console.log("adding ", name)
    await data.user[hs].add(name)
    console.log("added ", name)

  }

  const harmedPod = useLDflexList("user")

  return <div>
           <h1>podmap me</h1>
           <AuthButton popup="static/popup.html" login="Login here!" logout="Log me out"/>
           <p>Welcome back, <Value src="user.name"/></p>
           <List src="user[https://podmap.me/harmedSupport]"/>

           <Form onSubmit={addHarmedSupport}>
             <Text field="name"/>
             <button type="submit">can help me if I am harmed</button>
           </Form>

           <button onClick={addToby}>Add toby</button>
           <button onClick={addDad}>Add dad</button>

           <CircleInput/>

         </div>;
}

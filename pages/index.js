import { Circle } from 'react-shapes';
import { LiveUpdate, AuthButton, Value, List, useLDflexValue, useLDflexList } from '@solid/react';
import data from '@solid/query-ldflex';
import styled from 'styled-components'

import { Form, Text, TextArea } from 'informed';

data.context.extend({
  harmed: "https://podmap.me/harmedSupport",
  causedHarm: "https://podmap.me/causedHarmSupport"
})

const StyledCircleInputDiv = styled.div`
position: relative;

textarea {
  position: absolute;
  background: transparent;
  border: none;
  padding-top: 15px;
  top: 20px;
  width: 80px;
  left: 10px;
  height: 40px;
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

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

const PersonDiv = styled.div`
position: relative;

h3 {
  position: absolute;
  background: transparent;
  top: 20px;
  width: 80px;
  left: 10px;
  text-align: center;
  font-size: larger;
}
`

const Person = ({name}) => {
  const addHarmedSupport = async ({name}) => {
    await data.user.harmed.add(name)
  }

  return (
  <PersonDiv>
    <Circle r={50} fill={{color:'white'}} stroke={{color:'black'}} strokeWidth={3}/>
    <h3>{`${isValidUrl(name) ? useLDflexValue(`[${name}].name`) || '' : name}`}</h3>
  </PersonDiv>
)
                           }


export default () => {
  const addHarmedSupport = async ({name}) => {
    await data.user.harmed.add(name)
  }
  const harmedPod = useLDflexList("user.harmed")
  const profile = useLDflexValue("user")


  return (
    <div>
      <h1>podmap me</h1>
      <AuthButton popup="static/popup.html" login="Login here!" logout="Log me out"/>
      <p>
        Welcome back, <a href={profile}><Value src="user.name"/></a>
      </p>
      <Form onSubmit={addHarmedSupport}>
        <Text field="name"/>
        <button type="submit">can help me if I am harmed</button>
      </Form>
      <LiveUpdate>
        {harmedPod.map(user => (
          <Person key={user} name={user}/>
        ))}
      </LiveUpdate>
    </div>
  )
}

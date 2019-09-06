import { Circle } from 'react-shapes';
import { LiveUpdate, AuthButton, Value, List, useLDflexValue, useLDflexList, useLiveUpdate } from '@solid/react';
import data from '@solid/query-ldflex';
import styled from 'styled-components'

import { Form, Text, TextArea } from 'informed';

import Link from 'next/link';

import '../util/init'

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

const Name = ({webid}) => {
  const name = useLDflexValue(`[${webid}].name`)
  return (
    <Link href="/with/[webid]" as={`/with/${encodeURIComponent(webid)}`}>{`${name}`}</Link>
  )
}

const Person = ({name}) => {
  const deleteHarmedSupport = async () => {
    await data.user.harmed.delete(name)
  }

  return (
    <PersonDiv>
      <Circle r={50} fill={{color:'white'}} stroke={{color:'black'}} strokeWidth={3}/>
      <h3>{isValidUrl(name) ? <Name webid={name}/> : name}</h3>
      <button onClick={deleteHarmedSupport}>X</button>
    </PersonDiv>
  )
}

const Pod = ({}) => {
  const harmedPod = useLDflexList("user.harmed")
  return (
    <div>
      {harmedPod.map(user => (
        <Person key={user} name={user}/>
      ))}
    </div>
  )
}


export default () => {
  const addHarmedSupport = async ({name}) => {
    await data.user.harmed.add(name)
  }
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
        <Pod/>
      </LiveUpdate>
    </div>
  )
}

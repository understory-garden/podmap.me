import {Fragment} from 'react'

import { useLDflexValue, useLDflexList, LiveUpdate } from '@solid/react'
import { useRouter } from 'next/router'
import data from '@solid/query-ldflex';
import '../../util/init'

const AddToHarmedPod = ({webid}) => {
  const name = useLDflexValue(`[${webid}].name`)
  const currentUserWebid = useLDflexValue("user")
  const currentUserHarmedPod = useLDflexList("user.harmed")

  const inHarmedPod = currentUserHarmedPod.find(n => n == webid)

  const addHarmedSupport = async () =>
        await data.user.harmed.add(webid)

  const deleteHarmedSupport = async () =>
        await data.user.harmed.delete(webid)

  return currentUserHarmedPod && (inHarmedPod ? (
    <button onClick={deleteHarmedSupport}>remove {`${name}`} from my pod</button>
  ) : (
    <button onClick={addHarmedSupport}>add {`${name}`} to my pod </button>
  ))
}

export default () => {
  const { webid } = useRouter().query
  const name = useLDflexValue(`[${webid}].name`)
  const currentUserWebid = useLDflexValue("user")

  return (
    <Fragment>
      <h1>{`${name || ''}`}</h1>
      <LiveUpdate>
        {name && (currentUserWebid != webid) && <AddToHarmedPod webid={webid}/>}
      </LiveUpdate>
    </Fragment>
  )
}

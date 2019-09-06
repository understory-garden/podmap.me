import {Fragment} from 'react'

import { useLDflexValue, useLDflexList, ActivityButton } from '@solid/react'
import { useRouter } from 'next/router'
import data from '@solid/query-ldflex';
import '../../util/init'
import dynamic from 'next/dynamic'


const { as } = data.context;

export function customActivityButton(type, activate, deactivate, deactivateNoChildren) {
  const activityType = `${as}${type}`;
  return ({
    object,
    children = object ? null : 'this page',
    activateText = activate,
    deactivateText = children ? deactivate : deactivateNoChildren,
    ...props
  }) =>
    <ActivityButton {...props}
                    {...{ activityType, object, children, activateText, deactivateText }} />;
}

const AddToHarmedPod = dynamic(
  customActivityButton("Harmed", "Add to harmed pod", "In your harmed pod", "In harmed pod"),
  {ssr: false}
)

export default () => {
  const currentUserWebid = useLDflexValue("user")
  const currentUserHarmedPod = useLDflexList("user.harmed")
  console.log(currentUserHarmedPod)

  const { webid } = useRouter().query
  const name = useLDflexValue(`[${webid}].name`)

  const addHarmedSupport = async () => {
    await data.user.harmed.add(webid)
  }

  return (
    <Fragment>
      <h1>{`${name || ''}`}</h1>
      <AddToHarmedPod/>
      <button onClick={addHarmedSupport}>Can support me</button>
    </Fragment>
  )
}

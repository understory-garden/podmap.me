import {Fragment} from 'react'

import { useLDflexValue } from '@solid/react'
import { useRouter } from 'next/router'
import data from '@solid/query-ldflex';
import '../../util/init'

export default () => {
  const router = useRouter()
  const { webid } = router.query
  const name = useLDflexValue(`[${webid}].name`)
  const addHarmedSupport = async () => {
    await data.user.harmed.add(webid)
  }

  return (
    <Fragment>
      <h1>{`${name || ''}`}</h1>
      <button onClick={addHarmedSupport}>Can support me</button>
    </Fragment>
  )
}

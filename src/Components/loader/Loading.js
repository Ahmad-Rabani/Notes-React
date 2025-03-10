import React from 'react'
import { LoadingsScreen,SmallLoader } from './LoaderStylled'

const Loader = () => {
  return (
    <LoadingsScreen>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
    </LoadingsScreen>
  )
}

export const SmLoader = () => {
  return (
    <SmallLoader></SmallLoader>
  )
}

export default Loader

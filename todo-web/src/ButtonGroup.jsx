import React, { useState } from 'react'

export default function ButtonGroup({ setTab, tab }) {
  return (
    <div>
      <button onClick={()=> setTab('all')}>All</button>
      <button onClick={()=>setTab('active')}>Active</button>
      <button onClick={()=>setTab('completed')}>Completed</button>
    </div>
  )
}

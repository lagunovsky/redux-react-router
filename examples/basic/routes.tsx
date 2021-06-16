import React from 'react'
import { Route, Routes } from 'react-router'

export function AppRoutes(){
  return (
    <Routes>
      <Route element={<div children={'any'}/>}/>
    </Routes>
  )
}

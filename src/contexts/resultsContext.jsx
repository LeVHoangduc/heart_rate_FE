import React from 'react'
import { createContext, useEffect, useState } from 'react'

export const ResultsContext = createContext('')

const ResultsContextProvider = ({ children }) => {

  const [result, setResult] = useState(null)

  useEffect(() => {
    const resultData = JSON.parse(localStorage.getItem('result'))
    
    resultData && setResult(result)
  }, [])

  return <ResultsContext.Provider value={result}>{children}</ResultsContext.Provider>
}

export default ResultsContextProvider

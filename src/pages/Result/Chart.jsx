import React from 'react';
import InferenceGraph from './InferenceGraph';
import useResultsContext from '../../hooks/useResultsContext'

const Chart = () => {
  const { result } = useResultsContext();
  if (!result) {
    return null;
  }
  return <InferenceGraph startPoint={0} length={result.ecg[0].length - result.ecg[0].length / 2} inference={result.ecg[0]} />;
}
export default Chart;
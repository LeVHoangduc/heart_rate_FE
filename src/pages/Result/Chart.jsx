import React from 'react';
import InferenceGraph from './InferenceGraph';

const Chart = () => {

  // Giả định rằng chúng ta có một mảng `ecgData` chứa dữ liệu ECG.
  const ecgData = new Array(1790).fill(null).map(() => Math.random());

  // Đối tượng JSON chứa dữ liệu ECG, tỷ lệ tim và id người dùng.
  const ecgObject = {
    ecg: ecgData,
    heartrate: 88,
    user_id: '1'
  };

  return <InferenceGraph startPoint={0} length={ecgObject.ecg.length - 1740} inference={ecgObject.ecg} />;

}
export default Chart;
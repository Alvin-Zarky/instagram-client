import React, { useCallback, useState } from "react";
import { Button } from "reactstrap";

interface BtnClick {
  addData: VoidFunction;
}

function CallBackTesting() {
  const [data, setData] = useState([]);

  const addArrData = useCallback(() => {
    // setData((prev: any): any => {
    //   return [...prev, "Some Data"];
    // });
    setData((prev: any): any => [...prev, "Some Data"]);
  }, []);

  return (
    <>
      <div>useCallback</div>
      <ButtonClick addData={addArrData} />
      {data.map((val: string, index: number) => (
        <div key={index}>{val}</div>
      ))}
    </>
  );
}

// function ButtonClick({ addData }: BtnClick) {
//   console.log("button rerender");
//   return <Button onClick={addData}>Click</Button>;
// }
const ButtonClick = React.memo(({ addData }: BtnClick) => {
  console.log("button rerender");
  return <Button onClick={addData}>Click</Button>;
});

export default CallBackTesting;

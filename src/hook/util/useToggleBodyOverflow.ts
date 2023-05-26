import { useEffect } from "react"

const useToggleBodyOverflow = (isShowPopUp: any) =>{
  
  useEffect(() =>{
    document.body.style.overflowY= "visible";
    if(isShowPopUp){
      document.body.style.overflowY= "hidden"
    }  
    return () => { document.body.style.overflowY= "visible"; }
  }, [isShowPopUp])

}

export default useToggleBodyOverflow
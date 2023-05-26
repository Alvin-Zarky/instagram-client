import { useState } from "react"

const useUploadFileChat = () =>{
  const [urlImage, setUrlImage] = useState<any[]>([])
  const [fileImage, setFiles] = useState<any[]>([])

  const uploadFileChat = (files: FileList, id:string) =>{
    if(files.length > 0){
      let arr: any[] = []
      
      for(const val of Array.from(files)){
        setFiles((prev: any) => {
          return [...prev, { url: URL.createObjectURL(val), type: val.type }];
        });
        arr.push({ url: URL.createObjectURL(val), type: val.type })

        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onloadend = (value) => {
          
          setUrlImage((data: any) => [
            ...data,
            { url: reader.result, type: val.type },
          ]);
        };
      }

      return arr
    }
  }

  return {
    urlImage,
    fileImage,
    setUrlImage,
    setFiles,
    uploadFileChat
  }
}

export default useUploadFileChat

class Storage{

  keyItem:string
  constructor(keyItem: string){
    this.keyItem= keyItem
  }

  getItem(){
    const data= JSON.parse(localStorage.getItem(this.keyItem)!)
    return data
  }
  
  setItem(values:string){
    return localStorage.setItem(this.keyItem, JSON.stringify(values))
  }

  removeItem(){
    return localStorage.removeItem(this.keyItem)
  }

  clearStorage(){
    return localStorage.clear()
  }

}

export default Storage
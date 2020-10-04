class SimpleEarphones{ // origin api
    public attach: () => void
    constructor(){
      this.attach = function(){
      console.log("Use Earphones with Type C phone")
    }
    }
  }
  
  class EarPhoneAdapter extends SimpleEarphones{ // adapter
    public attach: () => void 
    constructor(typeCphone){
      super()
      this.attach = function(){
        typeCphone.attach()
      }
    }
  }
  
  class TypeCPhone { // new api
    public attach: () => void
    constructor(){
      this.attach = function(){
       console.log("Earphones attached to Type C phone")
    }
    } 
  }
  
  var typeCphone = new TypeCPhone() 
  var adapter = new EarPhoneAdapter(typeCphone) // adapt
  adapter.attach()
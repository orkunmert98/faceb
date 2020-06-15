export const adduser=(item)=>(
    {
type:"adduser",
payload:item
    }
)





/**  utils*/





/* ınıtal_state */

const INITIAL_STATE = {
    user:null

  };
  



  /* reducers */
 export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
     
      case "adduser":
        return {
        
          user: action.payload
        };

      default:
        return state;
    }
  };
  

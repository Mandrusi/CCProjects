const initialWagonState = {
  supplies: 100,
  distanceTravelled: 0,
  daysOnRoad: 0,
  cash: 200
}

const gameReducer = (state = initialWagonState, action) => {
  switch(action.type){
    case 'gather':
      return {
        ...state,
        supplies: state.supplies + 15,
        daysOnRoad: state.daysOnRoad + 1
      };
    case 'travel':
      const { payload } = action;
      const requiredSupplies = 20 * payload;
      if (state.supplies >= requiredSupplies) {
      return {
        ...state,
        supplies: state.supplies - 20 * payload,
        distanceTravelled: state.distanceTravelled + 10 * payload,
        daysOnRoad: state.daysOnRoad + payload
      };
       }  else {
          return state;
        }
      
    
    case 'tippedWagon':
      return {
        ...state,
        supplies: state.supplies - 30,
        daysOnRoad: state.daysOnRoad + 1
      }
    case 'sell':
      return {
        ...state,
        supplies: state.supplies - 20,
        cash: state.cash + 5
      };
    case 'buy':
      return {
        ...state,
        supplies: state.supplies + 25,
        cash: state.cash - 15
      };
    case 'theft':
      return {
        ...state,
        cash: Math.floor(state.cash / 2)
      };


    default:
      return state;

  }

}

let wagon = gameReducer(undefined, {});
console.log(wagon);

const action = {
  type: 'travel',
  payload: 1
};
wagon = gameReducer(wagon, action);
console.log(wagon);

const actiontwo = {
  type: 'gather'
};

wagon = gameReducer(wagon, actiontwo);
console.log(wagon)

const actionthree = {
  type: 'tippedWagon'
};

wagon = gameReducer(wagon, actionthree);
console.log(wagon)

const actionfour = {
  type: 'travel',
  payload: 3
};

wagon = gameReducer(wagon, actionfour);
console.log(wagon)



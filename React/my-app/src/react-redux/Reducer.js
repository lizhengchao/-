import * as ActionType from './ActionType';

var reducer = (state, action) => {
    var type = action.type;
    switch (type) {
        case ActionType.AddCount.type:
        return {count: state.count+1};
        default: return state
    }
}

export default reducer;
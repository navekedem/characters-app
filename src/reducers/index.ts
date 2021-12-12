const viewReducer = (state:boolean = true, action:{appView:boolean,type:string}) => {
    if(action.type === "CHANGE_VIEW") {
        return action.appView;
    }
    return state;
}

export default viewReducer;
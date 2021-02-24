// import {getReduxDispatch} from "../@createStore";

const ActionType = {
    SET_MASK_DATA: '[MASK] SET_MASK_DATA',
};

const ActionCreator = {
    setMaskData(maskData) {
        return {
            type: ActionType.SET_MASK_DATA,
            Data: maskData
        }
    },
};

const Selector = {
    getMaskData: (state) => state.Mask.maskData,
};

const initialState = {
    maskData: [],
};

const Reducer = function (state = initialState, action) {
    switch (action.type) {
        case ActionType.SET_MASK_DATA: {
            return {
                ...state,
                maskData: action.Data,
            };
        }
        default: {
            return state;
        }
    }
};

// const Transformer = {};

const AsyncMethods = {

    async getMaskData() {

        // const dispatch = getReduxDispatch();

        return {};
    },

};

const ReduxCustomer = {ActionType, ActionCreator, Reducer, Selector, AsyncMethods};

export default ReduxCustomer;

export function composeReducer(map, defaultState) {
    return function (state, action) {
        if (map[action.type]) {
            const func = map[action.type]
            return func(state, action.payload)
        }
        return state || defaultState
    }
}

export class ReducerComposer {
    constructor(defaultState) {
        this.map = {}
        this.defaultState = defaultState
    }
    add(actionName, func) {
        this.map[actionName] = func
        return this
    }
    generateReducer() {
        return composeReducer(this.map, this.defaultState)
    }
}
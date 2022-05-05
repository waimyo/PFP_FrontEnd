export const events = {
    //initial state
    state: {
        layout: 'div',
    },

    //getters
    getters: {
        getLayout: (state) => () => {
            return state.layout;
        },
    },

    //mutations
    mutations: {
        setLayout(state, _layout) {
            state.layout = _layout;
        }

    }

}
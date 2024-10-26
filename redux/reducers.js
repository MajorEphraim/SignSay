    import types from './types'

const initialFirstTimeState ={
    firstTime:null
}

const initialModeReducer = {
	mode:null
}

const initialModalReducer = {
	isVisible:false
}

const initialThemeReducer = {
	theme:null
}

const initialLanguageReducer = {
	language:null
}

const initialSignsReducer = {
	allSigns:[]
}

const initialConnectionReducer = {
	isConnected:true
}

export const firstTimeReducer =(state=initialFirstTimeState, action)=>{
    switch (action.type) {
		
		case types.FIRST_TIME:
			return {
				firstTime: action.payload,
			}

		default:
			return state
	}
}

export const themeReducer =(state=initialThemeReducer, action)=>{
    switch (action.type) {
		
		case types.SET_THEME:
			return {
				theme: action.payload,
			}

		case types.GET_THEME:
			return {
				theme: action.payload,
			}

		default:
			return state
	}
}

export const modeReducer =(state=initialModeReducer, action)=>{
    switch (action.type) {
		case types.GET_MODE:
			return {
				mode: action.payload,
			}

		case types.UPDATE_MODE:
			return {
				mode: action.payload,
			}

		default:
			return state
	}
}


export const modalReducer =(state=initialModalReducer, action)=>{
    switch (action.type) {
		
		case types.UPDATE_MODAL:
			return {
				isVisible: action.payload,
			}

		default:
			return state
	}
}

export const languageReducer =(state=initialLanguageReducer, action)=>{
    switch (action.type) {
		
		case types.GET_LANGUAGE:
			return {
				language: action.payload,
			}

		case types.SET_LANGUAGE:
			return {
				language: action.payload,
			}

		default:
			return state
	}
}

export const allSignsReducer =(state=initialSignsReducer, action)=>{
    switch (action.type) {
		
		case types.FETCH_SIGNS:
			return {
				allSigns: action.payload,
			}

		default:
			return state
	}
}

export const connectionReducer =(state=initialConnectionReducer, action)=>{
    switch (action.type) {
		
		case types.UPDATE_CONNECTION:
			return {
				isConnected: action.payload,
			}

		default:
			return state
	}
}
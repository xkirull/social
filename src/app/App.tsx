import Routing from 'pages'
import './App.css'
import withRouter from './hooks'
import { Provider } from 'react-redux'
import { appStore } from './appStore'

function App() {
    return (
        <>
            <Provider store={appStore}>
                <Routing />
            </Provider>
        </>
    )
}

export default withRouter(App)

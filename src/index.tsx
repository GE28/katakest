/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import SolidDisplay from '@components/SolidDisplay'

const root = document.getElementById('root')

function App() {
    return (
        <>
            <SolidDisplay />
        </>
    )
}

render(() => <App />, root!)

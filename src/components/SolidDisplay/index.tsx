import solidLogo from '@assets/solid.svg';
import './styles.css'

function SolidDisplay() {
    return (
        <>
            <a href="https://solidjs.com" target="_blank">
                <img src={solidLogo} class="logo solid" alt="Solid logo" />
            </a>
            <h1>Solid + Vite</h1>
            <p>
                <small>
                    CSS (and SVG) by Vite Team
                </small>
            </p>
        </>
    );
}

export default SolidDisplay;
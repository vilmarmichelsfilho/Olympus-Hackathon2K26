<script setup>
import { RouterLink } from 'vue-router';
import FacebookIcon from '@iconify-vue/mdi/facebook';
import InstagramIcon from '@iconify-vue/mdi/instagram';
import TwitterIcon from '@iconify-vue/mdi/twitter';
</script>

<template>
    <footer>
        <div class="contatos">
            <h2>Entre em contato</h2>
            <ul>
                <li>Email: Vitorstudioss@gmail.com</li>
                <li>Telefone: 9999:9 999</li>
                <li>Telefone 02: 9999:9999</li>
            </ul>
        </div>
        <div class="meio">
            <div class="redesSociais">
                <h2>Nos Siga</h2>
                <span>-</span>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FacebookIcon class="icone-rede"></FacebookIcon>
                        </a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <InstagramIcon class="icone-rede"></InstagramIcon>
                        </a></li>
                    <li><a href="https://www.x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                            <TwitterIcon class="icone-rede"></TwitterIcon>
                        </a></li>
                </ul>
            </div>
            <div class="rights">
                <p>© 2026 Olympos <br>
                    All rights reserved.</p>
            </div>
        </div>
        <div class="navegue">
            <h2>Navegue</h2>
            <ul>
                <li>
                    <RouterLink to="/">Menu</RouterLink>
                </li>
                <li>
                    <RouterLink to="/proximos-jogos">Próximos jogos</RouterLink>
                </li>
                <li class="item-times">
                    <RouterLink to="/times">Times</RouterLink>
                </li>
                <li>
                    <RouterLink to="/login">Login</RouterLink>
                </li>
                <li>
                    <RouterLink to="/sobrenos">Sobre Nós</RouterLink>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=BBH+Hegarty&family=Cinzel:wght@400..900&display=swap');

footer {
    background: #151313;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: start;
    gap: clamp(2rem, 5vw, 5rem);
    padding: 2.5rem clamp(1.5rem, 5vw, 5rem);
    color: white;
}

.contatos,
.navegue {
    min-width: 0;
}

.navegue {
    justify-self: end;
}

.meio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.redesSociais {
    display: flex;
    justify-content: center;
    align-items: center;
}
.redesSociais h2 {
    margin-bottom: 0;
}
.redesSociais span {
    font-weight: bolder;
    font-family: "BBH Hegarty", sans-serif;
    font-size: 1.2rem;
    margin: 0 0.8rem;
}
.redesSociais a {
    color: white;
    transition: 0.3s;
}
.redesSociais a:hover {
    color: #DE6D1C;
}
.redesSociais ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0;
}
.icone-rede {
    width: 1.75rem;
    height: 1.75rem;
}
.rights p {
    font-family: "Cinzel", serif;
    font-style: normal;
    text-align: center;
    font-weight: bolder;
    margin: 0;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
ul li {
    font-family: "Afacad", sans-serif;
    font-size: clamp(0.85rem, 1vw, 1rem);
    line-height: 1.7;
}
h2 {
    font-family: "BBH Hegarty", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin: 0 0 0.5rem;
    font-size: clamp(1.2rem, 1.5vw, 1.5rem);
}
.navegue a {
    text-decoration: none;
    color: white;
    transition: 0.3s;
}
.navegue a:hover {
    color: #DE6D1C;
}

@media (max-width: 1023px) {
    .item-times {
        display: none;
    }
}

@media (max-width: 768px) {
    footer {
        grid-template-columns: 1fr;
        justify-items: center;
        gap: 2rem;
        padding: 2.5rem 1.25rem;
        text-align: center;
    }

    .contatos,
    .meio,
    .navegue {
        width: 100%;
        justify-self: center;
    }

    .meio {
        order: 3;
    }

    .redesSociais {
        flex-wrap: wrap;
    }

    .redesSociais span {
        display: none;
    }

    .redesSociais ul {
        flex-basis: 100%;
        margin-top: 0.75rem;
    }

    .icone-rede {
        width: 2rem;
        height: 2rem;
    }

}
</style>

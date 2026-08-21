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
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon width="2.5vw"></FacebookIcon>
                        </a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon width="2.5vw"></InstagramIcon>
                        </a></li>
                    <li><a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon width="2.5vw"></TwitterIcon>
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
                    <RouterLink to="/">Jogos</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">Times</RouterLink>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vw 5vw;
}

.meio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1vw;
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
    font-size: 1.2vw;
    margin: 0 0.8vw;
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
    gap: 0.5vw;
}
.rights p {
    font-family: "Cinzel", serif;
    font-style: normal;
    text-align: center;
    font-weight: bolder;
}
ul {
    list-style: none;
    padding: 0;
}
ul li {
    font-family: "Afacad", sans-serif;
    font-size: 1vw;
}
h2 {
    font-family: "BBH Hegarty", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin-bottom: 0.4vw;
}
.navegue a {
    text-decoration: none;
    color: white;
    transition: 0.3s;
}
.navegue a:hover {
    color: #DE6D1C;
    font-size: 1.1vw;
}
</style>
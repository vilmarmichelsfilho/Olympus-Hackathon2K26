<script setup>
import { RouterLink } from 'vue-router';
import FacebookIcon from '@iconify-vue/mdi/facebook'; import InstagramIcon from '@iconify-vue/mdi/instagram'; import MusicNoteIcon from '@iconify-vue/mdi/music-note';
</script>

<template>
    <footer>
        <div class="midia">
        <h2>Nos Siga</h2>
        <p>-</p>
        <ul>
            <li><a href="facebook.com"><FacebookIcon style="width: 10vw;" /></a></li>
            <li><a href="instagram.com"><InstagramIcon style="width: 10vw;"/></a></li>
            <li><a href="tiktok.com"><MusicNoteIcon style="width: 10vw;"/></a></li>
        </ul>
    </div>
    <div class="contato-navegacao">
        <ul>
            <li><h3>Entre em contato</h3></li>
            <li><p>Email: Vitorstudioss@gmail.com</p></li>
            <li><p>Telefone: 99 99999-9999</p></li>
            <li><p>Telefone 2: 99 9999-9999</p></li>
        </ul>
        <nav>
            <ul>
                <li><h3>Navegue</h3></li>
                <li><RouterLink>Menu</RouterLink></li>
                <li><RouterLink>Jogos</RouterLink></li>
                <li><RouterLink>Times</RouterLink></li>
                <li><RouterLink>Login</RouterLink></li>
                <li><RouterLink>Sobre Nós</RouterLink></li>
            </ul>
        </nav>
    </div>
    <div class="rights-reserved">
        <p>© 2026 Olympos <br> All rights reserved.</p>
    </div>
    </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=BBH+Hegarty&family=Cinzel:wght@400..900&display=swap');
footer {
    margin-bottom: 15vw;
}
.midia {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5vw 5vw 10vw 5vw;
    font-family: "BBH Hegarty", sans-serif;
}
.midia ul {
    display: flex;
}
ul {
    list-style: none;
    padding: 0;
}
.contato-navegacao {
    margin: 5vw;
    display: flex;
    justify-content: space-between;
    font-family: "BBH Hegarty", sans-serif;
}
.contato-navegacao ul {
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
}
.contato-navegacao p, a {
    font-family: "Afacad", sans-serif;
}
.rights-reserved {
    font-family: "Cinzel", serif;
    font-weight: 900;
    font-style: normal;
    text-align: center;
    margin-top: 15vw;
}
</style>
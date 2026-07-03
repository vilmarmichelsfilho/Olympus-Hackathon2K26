<script setup>
import loginInput from '@/components/loginInput.vue';
import loginButton from '@/components/loginButton.vue';
</script>

<template>
    <div class="container">
        <div class="loginContainer">
            <div class="head">
                <h2>Olympus</h2>
                <p>Sign up</p>
            </div>
            <div class="input">
                <h1>Log-in</h1>
                <loginInput :nome="'Login'" :tipo="'input'"></loginInput>
                <loginInput :nome="'Senha'" :tipo="'password'"></loginInput>
            </div>
            <div class="text">
                <p>Só organizadores das olimpíadas tem acesso ao painel de controle</p>
                <loginButton>Entrar</loginButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Krona+One&display=swap');
.container {
    background: url('../assets/loginBackground.png');
    background-size: cover;
    width: 100vw;
    height: 100vh;
    color: white;
    display: grid;
    place-items: center;
    font-family: "Krona One", sans-serif;
}
.loginContainer {
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); 
    border-radius: 12px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
    padding: 1rem 0;
    max-width: 90%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 1rem;
    font-size: 1.2rem;
}
.text {
    display: flex;
    margin: 0 1rem;
    justify-content: space-between;
}
.text p {
    font-size: 0.7rem;
    width: 60%;
}
.input {
    margin: 1rem;
}
h2 {
    font-family: "Cinzel", serif;
    font-weight: 900;
    color: #D49258;
    letter-spacing: 2%;
    text-shadow: -0.2rem 0.3rem 0.5rem black;
    font-size: 2rem;
}
</style>
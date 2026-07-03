<script setup>
import loginInput from '@/components/loginInput.vue';
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
}
</style>
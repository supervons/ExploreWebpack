<template>
    <div >
      hello, vue
    </div>
</template>

<script>
import {getProfile} from 'base/utils'
export default {
    name: 'App',
    mounted() {
        getProfile().then(res=>{
            alert('Vue call:' + JSON.stringify(res))
        })
    }
}
</script>

<style>
</style>

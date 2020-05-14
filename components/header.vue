<template>
    <picture>
        <source type="image/webp" :srcset="myprofimg">
        <img alt="" :src="myprofimg" decoding="async" style="object-fit: contain; max-width: 50vw;"></img>                                                              
    </picture>
</template>

<script>
export default{ 
    data: function(){ 
        return { 
            myprofimg: "https://avatars1.githubusercontent.com/u/12181838?s=460&av=4"       
        }
    }
}
</script>
~ 


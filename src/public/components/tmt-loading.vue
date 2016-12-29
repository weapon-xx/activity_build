<template lang="html">
  <div class="loading-box">
    <!-- <img src="../img/load.png" alt=""  class="loading"/> -->
    <i class="wif icon-load loading"></i>
  </div>
</template>

<script>
export default {
  data : function(){
    return{
      src : '../img/load.png'
    }
  }
}
</script>

<style lang="css">
.loading-box{
  position: fixed;
  left: 50%;
  margin-left: -1rem;
  top: 50%;
  margin-top: -1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 0.06666666666666667rem;
  background-color: #000;
  opacity: .8;
}

.loading{
  position: absolute;
  font-size: 1rem;
  left: 50%;
  margin-left: -.5rem;
  top: 50%;
  margin-top: -.5rem;
  animation: loading 2s linear infinite;
  color: #fff;
}

@keyframes loading {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>

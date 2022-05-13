<template>
  <div class="contact">
    <div class="about">
      <div class="textepresentation">
        <h1>About me</h1>
        <p>Bonjour, je m'appelle Adrien Bouteiller, j'ai 19 ans et je suis en Bachelor Devellopeur web à Hetic. Je suis passionné par le développement web </p>
      </div>

      <div class="contactme">

        <h2>Contact</h2>
        <a href="mailto:adrien.bouteiller01@gmail.com">adrien.bouteiller01@gmail.com</a>
        <p>numéro de téléphone : 06 79 91 75 81</p>
        <p>Alternant chez : <a href="https://innocean.fr/ww-en/">Innocean France</a></p>


      </div>
      <div class="techno">
        <div class="title">
          <h2>Technologies</h2>
        </div>
        
        <div class="logo">
          <div class="logo_lineone">
              <div class="partone">
                <img src="../assets/img/html5.png">
                <img src="../assets/img/css3.png">
              </div>
              <div class="parttwo">
                  <img src="../assets/img/vuejs.png">
                  <img src="../assets/img/wordpress.png">
              </div>
          </div>
          <div class="logo_linethree">
            <div class="partone">
                <img src="../assets/img/javascript.png">
                <img src="../assets/img/jquery.png">
              </div>
              <div class="parttwo">
                  <img src="../assets/img/angular.png">
                  <img src="../assets/img/threejs.png">
              </div>
          </div>
        </div>  
    </div>  
    </div>  
  </div>
</template>

<script>


export default {
  name: "AboutPage",


}
</script>

<style scoped lang="scss">

*{
  color: white;
}

.about{
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  height: 77vh;
  padding-top: 3%;

  .techno{
    width: 100%;
    .title{
       display: flex;
       padding-top: 2%;
       justify-content: space-around;
       width: 45%;
       
        h2{
          font-family: 'NeueM', sans-serif;
          font-size: clamp(1.875rem, 1.1806rem + 3.7037vw, 5.625rem);
          margin: 0;
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #fff;
          color: transparent;
        }
    }

    .logo{
      
      display: flex;
      justify-content: center;
      flex-flow: wrap;
      padding-top: 5%;

      div{
        div{
           display: flex;
           

           img{
             width: 200px;
           }
        }
      }
    }
 
  }
  .textepresentation{
    width: 45%;
    display: flex;
    flex-direction: column;
    
    
    h1{
      font-family: 'NeueM', sans-serif;
      font-size: clamp(1.875rem, 1.1806rem + 3.7037vw, 5.625rem);
      margin: 0;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: #fff;
      color: transparent;
    }
    p{
        font-size: clamp(0.875rem, 0.6898rem + 0.9877vw, 1.875rem);
        font-family: 'NeueL', serif;
        margin: 0;
    }
  }

  .contactme{
    display: flex;
    flex-direction: column;
    align-self: center;

    h2{
      font-family: 'NeueM', sans-serif;
      font-size: clamp(1.875rem, 1.1806rem + 3.7037vw, 5.625rem);
      margin: 0;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: #fff;
      color: transparent;
    }

    a,p{
      font-size: clamp(0.875rem, 0.6898rem + 0.9877vw, 1.875rem);
        font-family: 'NeueL', serif;
        margin: 0;
    }
  }
}




</style>

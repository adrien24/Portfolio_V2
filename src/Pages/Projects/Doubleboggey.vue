<template>
  <div class="Doubleboggey">
      <div class="section" id="section">
          <div class="image">
              <img src="../../assets/img/DoubleboggeyP.png" id="image">
          </div>
          <div class="texte" id="text">
              <div class="partTexte">
                  <h1>Double Boggey</h1>
                  <hr>
                  <p>Double Boggey is an association of golfers from Occitania. This association aims to bring together many people to share friendly moments around the world of golf. Their image on the net is however not very representative of their association and they want to improve it.</p> 
             </div>
              <div class="partTexte">
                  <p>The site had to be modern: indeed, the redesign of the site must move away from the visual identity already proposed in order to improve the image of the association. The site must be readable and understandable; the association's target remains set at individuals in their 50s, but most members are beyond this age group. The site must communicate conviviality: the association seeks to recruit, and to increase the spirit of sharing sport in good humor and passion.</p> 
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name: 'DoubleBoggey',

    data(){
        return{
            intElemScrollHeight: '',
            intElementPositionTop: '',
            
            
        }
    },


    mounted(){
        this.intElemScrollHeight = document.getElementById('section').scrollHeight;
        window.addEventListener('scroll', this.handleScroll); 
        console.log(this.intElemScrollHeight)  
       
    },

    methods:{
        handleScroll(){
            if (window.matchMedia("(min-width: 600px)").matches) {
        const test = String(window.scrollY)
        

            if(window.scrollY < this.intElemScrollHeight - 700){
                
                document.getElementById('image').style.marginTop = test + 'px';
                
                
            }
        }
        }
        
  }

}

</script>

<style scoped lang="scss">

.canvas{
    height: 150vh!important;
}

.section{
    display: flex;
    justify-content: space-around;
    margin-top: 10%;

        .image{
           width: 300%;
            
            #image{
                width: 450px;
                margin-left: 10%;   
                width: 75%;           
               
            }
        }

        .texte{
            margin-left: 5%;
           
           .partTexte{
                
                margin-right: 5%;

                h1{
                    color: white;
                    font-size: clamp(1rem, 0.4787rem + 2.7801vw, 9.375rem);
                    font-family: "NeueM", sans-serif;
                }
                

                p:nth-child(1){
                    margin-top: 4%;
                }

                p{
                    color: white;
                    font-size: clamp(1rem, 0.5954rem + 2.1577vw, 7.5rem);
                    font-family: "NeueL", sans-serif;
                }
           }

        }

        
}

@media (min-width: 300px) and (max-width: 600px) {
    .section{
        flex-direction: column;
    }

    .image{
        width: 100%;
    }

    #image{
        margin-top: 0!important;
        width: 30%!important;
        margin-left: 1.8%!important;
    }
}

</style>
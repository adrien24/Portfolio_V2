<template>
  <div id="work">
    <main ref="main" id="upSize">
      <ul ref="ul" id="sizeHeight">
        <li ref="li" v-on:click="show()">
          <div class="myProject">
            <div class="presentation">
              <span>Dashboard Innocean</span>
              <span>This project was created in 2021 / 2022</span>
            </div>
            <div id="show" class="remove none">
              <div class="description">
                <p>During my apprenticeship I had the chance to carry out internal projects within the company. This
                  dashboard project was intended to display throughout the open space information relating to the life
                  of the agency. Like for example the date of birthday of the employees or the weather, the road traffic
                  on a google maps. There is also the possibility of being able to post information on a dashboard page
                  via a headless cms</p>
              </div>
              <div class="link">
                <a href="www.adrienbouteiller.com" class="cool-link">Voir le site</a>
              </div>
            </div>
          </div>
        </li>
        <li ref="li" v-on:click="show1()">
          <div class="myProject">
            <div class="presentation">
              <span>Url minifier</span>
              <span>This project was created in 2022</span>
            </div>
            <div id="show1" class="remove none">
              <div class="description">
                <p>The goal of this project was to be able to shorten the existing links and to be able to generate a QR
                  code. This project was carried out for an advertising campaign by sms. Indeed, for an advertising
                  campaign by sms, we pay for the sms per character; Thus, the longer the text, the more expensive it
                  is. So, to save characters, we created a url minifier.</p>
              </div>
              <div class="link">
                <img src="../../assets/img/url_minifier.png">
                <label>(this project is private)</label>
              </div>
            </div>
          </div>
        </li>
        <li ref="li" v-on:click="show2()">
          <div class="myProject">
            <div class="presentation">
              <span>Polluscore generator</span>
              <span>This project was created in 2022</span>
            </div>
            <div id="show2" class="remove none" >
              <div class="description">
                <p>polluscore generator was created to be able to generate polluscore simply. Indeed, Innocean France
                  mainly integrates emails for Hyundai and Kia cars and in each email we must put the polluscore of each
                  car presented. To facilitate this integration. This site allows in a few fields to make this
                  polluscore for us then to generate an <img> tag that we can copy and paste in our code. it also allows
                  you to download images in png, svg and jpg.</p>
              </div>
              <div class="link">

                <img src="../../assets/img/polluscore_generator.png">
                  <label>(this project is private)</label>

              </div>
            </div>
          </div>
        </li>
      </ul>


    </main>
    <div class="page">
      <div class="about">
        <router-link to="/About" class="cool-link">About</router-link>
      </div>
      <div class="about">
        <router-link to="/" class="cool-link">Home</router-link>
      </div>
      <div class="about">
        <router-link to="/HomeWork" class="cool-link">projects page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import images from "@/assets/js/images";
import fragment from "../../assets/js/fragment.js";
import vertex from "../../assets/js/vertex.js"

export default {
  name: 'MyWork',

  data() {
    return {
      camera: null,
      container: null,
      isHover: false,
      links: [],
      mesh: null,
      offset: null,
      renderer: null,
      scene: null,
      sizes: null,
      targetX: 0,
      targetY: 0,
      textureOne: null,
      textureTwo: null,
      textureThree: null,
      texturefour: null,
      uniforms: null,
      lastScrollPosition: 0,
      intElemScrollHeight: '',
    }
  },

  mounted() {
    this.loadImages();
    this.runScene();
    this.onScrollMove()




  },

  methods: {



    show() {
      const show = document.getElementById('show')
      const show1 = document.getElementById('show1')
      const show2 = document.getElementById('show2')
      show.classList.remove('none')
      show.classList.toggle("remove");
      show.classList.toggle("show");

      show1.classList.remove('show')
      show1.classList.add('remove')
      show2.classList.remove('show')
      show2.classList.add('remove')
    },

    show1() {
      const show = document.getElementById('show')
      const show2 = document.getElementById('show2')
      const show1 = document.getElementById('show1')

      show1.classList.remove('none')
      show1.classList.toggle("remove");
      show1.classList.toggle("show");


      show.classList.remove('show')
      show.classList.add('remove')
      show2.classList.remove('show')
      show2.classList.add('remove')

    },

    show2() {
      const show = document.getElementById('show')
      const show1 = document.getElementById('show1')
      const show2 = document.getElementById('show2')

      show2.classList.remove('none')
      show2.classList.toggle("remove");
      show2.classList.toggle("show");

      show.classList.remove('show')
      show.classList.add('remove')
      show1.classList.remove('show')
      show1.classList.add('remove')


    },

    lerp(start, end, t) {
      return start * (1 - t) + end * t;
    },
    loadImages() {
      this.textureOne = new THREE.TextureLoader().load(images.Dashboard);
      this.textureTwo = new THREE.TextureLoader().load(images.Minifier);
      this.textureThree = new THREE.TextureLoader().load(images.Polluscore);
    },
    runScene() {
      this.container = this.$refs.main;
      this.links = document.querySelectorAll('li');
      this.scene = new THREE.Scene();
      this.perspective = 1000;
      this.sizes = new THREE.Vector2(0, 0);
      this.offset = new THREE.Vector2(0, 0);
      this.uniforms = {
        uTexture: {value: this.textureOne},
        uAlpha: {value: 0.0},
        uOffset: {value: new THREE.Vector2(0.0, 0.0)},
      };
      this.links.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
          switch (index) {
            case 0:
              this.uniforms.uTexture.value = this.textureOne;
              break;
            case 1:
              this.uniforms.uTexture.value = this.textureTwo;
              break;
            case 2:
              this.uniforms.uTexture.value = this.textureThree;
              break;
            case 3:
              this.uniforms.uTexture.value = this.textureFour;
              break;
          }
        });
      });
      this.listeners(this.$refs.ul);
      this.setupCamera();
      this.onMouseMove();
      this.createMesh();
      this.render();
    },

    listeners(el) {
      el.addEventListener('mouseenter', () => {
        this.isHover = true;
      });
      el.addEventListener('mouseleave', () => {
        this.isHover = false;
      });

    },

    setupCamera() {
      window.addEventListener('resize', this.onWindowResize.bind(this));
      const fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
      console.log(fov)
      this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 0.1, 1000);
      this.camera.position.set(0, 0, this.perspective);
      this.renderer = new THREE.WebGL1Renderer({antialias: true, alpha: true});
      this.renderer.setSize(this.viewport.width, this.viewport.height);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.container.appendChild(this.renderer.domElement);

    },

    onWindowResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspectRatio = this.width / this.height;
      this.camera.aspect = this.viewport.aspectRatio;
      this.camera.fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
      this.renderer.setSize(this.viewport.width, this.viewport.height);
      this.camera.updateProjectionMatrix();
    },

    onMouseMove() {
      window.addEventListener('mousemove', (e) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY + window.pageYOffset;
      });
      console.log()
    },

    onScrollMove() {
      window.addEventListener('scroll', () => {
        this.targetY += window.pageYOffset - this.lastScrollPosition;
        this.lastScrollPosition = window.pageYOffset;
      })
    },

    createMesh() {
      const geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
      const material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
      });
      this.mesh = new THREE.Mesh(geometry, material);
      this.sizes.set(250, 350);
      this.mesh.scale.set(this.sizes.x, this.sizes.y);
      this.mesh.position.set(this.offset.x, this.offset.y, 0);
      this.scene.add(this.mesh);
    },

    render() {
      this.offset.x = this.lerp(this.offset.x, this.targetX, 0.1);
      this.offset.y = this.lerp(this.offset.y, this.targetY, 0.1);
      this.uniforms.uOffset.value.set((this.targetX - this.offset.x) * 0.0005, -(this.targetY - this.offset.y) * 0.0005);
      this.mesh.position.set(this.offset.x - (this.viewport.width / 2), -this.offset.y + (this.viewport.height / 2));
      this.renderer.setSize(this.viewport.width, this.viewport.height);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render.bind(this));
    },


  },

  computed: {
    viewport() {


      const width = window.innerWidth;
      const height = this.$refs.main.clientHeight;
      const aspectRatio = width / height;

      return {
        width,
        height,
        aspectRatio
      }
    },
  }

}
</script>

<style scoped lang="scss">

* {
  font-family: 'NeueM', serif;
  font-weight: 500;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #FFFFFF;
  overflow-x: hidden;
  background-color: #131212;
}

canvas {
  mix-blend-mode: difference !important;
}

#show, #show1, #show2 {
  display: flex;
  margin-bottom: 1.5%;
}



main {
  width: 100%;
  height: 100vh;


  h1 {
    padding: 3%;
    z-index: 0;
    position: absolute;
  }


  ul {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    li {
      position: relative;
      z-index: 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #FFFFFF;
      overflow: hidden;
      cursor: pointer;
      align-items: center;

      .myProject {
        display: flex;
        flex-direction: column;
        width: 100%;

        .presentation {
          display: flex;
          flex-direction: row;

          justify-content: space-between;
          align-items: center;
          margin: 3% 0 1.5% 0;


          span:nth-child(1) {
            font-size: clamp(1.875rem, 1.1806rem + 3.7037vw, 5.625rem);
            padding-left: 2%;
          }

          span:nth-child(2) {
            padding-right: 2%;
            font-family: 'NeueL', serif;
          }


        }

        .none {
          display: none;
        }

        .remove {
          transition: height;
          display: flex !important;
          justify-content: space-around;
          transition-duration: 1s;
          height: 0vh;

          .description {
            width: 50%;
            display: flex;
            align-items: center;
            overflow: hidden;

            p {
              font-size: clamp(0.875rem, 0.6898rem + 0.9877vw, 1.875rem);
              font-family: 'NeueL', serif;
              padding: 0 2%;
            }
          }

          .link {
            display: flex;
            align-items: center;
            width: 24%;
            text-align: center;
            overflow: hidden;
            position: relative;
            z-index: 100;

            label{
              position: absolute;
              margin-top: 53%;
            }



            a {
              font-size: clamp(1.5625rem, 1.1574rem + 2.1605vw, 3.75rem);
              font-family: 'NeueM', serif;
              position: absolute;
              padding: 0 2%;
              color: transparent;
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: #fff;
              text-decoration: none;
            }

            .cool-link::after {
              content: '';
              display: block;
              width: 0;
              height: 2px;
              background: #FFFFFF;
              transition: width .3s;
            }

            .cool-link:hover::after {
              width: 100%;
              //transition: width .3s;
            }
          }
        }

        .show {
          transition: height;
          display: flex !important;
          justify-content: space-around;
          transition-duration: 2s;
          height: 29.5vh;
          overflow-y: hidden;


          .description {
            width: 50%;
            display: flex;
            align-items: center;
            overflow: hidden;


            p {
              font-size: clamp(0.875rem, 0.6898rem + 0.9877vw, 1.875rem);
              font-family: 'NeueL', serif;
              padding: 0 2%;
            }
          }

          .link {
            display: flex;
            align-items: center;
            width: 24%;
            text-align: center;
            overflow: hidden;
            label{
              position: absolute;
              margin-top: 13%;
              overflow-y: hidden;
            }



            a {
              font-size: clamp(1.5625rem, 1.1574rem + 2.1605vw, 3.75rem);
              font-family: 'NeueM', serif;
              padding: 0 2%;
              color: transparent;
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: #fff;
              text-decoration: none;
              overflow-y: hidden;
            }

            .cool-link::after {
              content: '';
              display: block;
              width: 0;
              height: 2px;
              background: #FFFFFF;
              transition: width .3s;
            }

            .cool-link:hover::after {
              width: 100%;
              //transition: width .3s;
            }
          }
        }
      }

      &:hover {
        background-position: 0% 100%;
        color: white !important;

        span {
          color: white;

        }
      }

      span:nth-child(2) {
        font-size: clamp(1rem, 0.838rem + 0.8642vw, 1.875rem);

      }
    }

  }
}

.page {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  position: absolute;
  z-index: 1000;
  height: 3vh;
  width: 100%;
  margin-left: -4%;
  background: transparent;
  bottom: 19px;


  a {
    color: white;
    position: absolute;
    text-decoration: none;
    font-size: clamp(0.875rem, 0.8287rem + 0.2469vw, 1.125rem);
    font-family: "NeueL", sans-serif;
    border-bottom: 0px solid #FFFFFF;
    background: transparent;


  }

  .cool-link::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #FFFFFF;
    transition: width .3s;
  }

  .cool-link:hover::after {
    width: 100%;
    //transition: width .3s;
  }

}


@media (min-width: 300px) and (max-width: 700px) {
  .presentation {
    flex-direction: column !important;
  }

}
</style>

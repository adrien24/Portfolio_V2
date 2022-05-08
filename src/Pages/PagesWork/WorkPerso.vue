<template>
  <div id="work">
    <main ref="main">
      <ul ref="ul">
        <li ref="li" ><span>DashBoard</span><span>This project was created 2022</span></li>
        <li ref="li"><span>GoogleSheet API</span><span>This project was created in 2022</span></li>
        <li ref="li"><span>URL minimifier</span><span>This project was created in 2022</span></li>
      
      </ul>
    </main>
  <div class="block"></div>
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
    }
  },

  mounted() {
    this.loadImages();
    this.runScene();
    this.onScrollMove()
  },

  methods: {
    lerp(start, end, t) {
      return start * (1 - t) + end * t;
    },
    loadImages() {
      this.textureOne = new THREE.TextureLoader().load(images.DoubleboggeyP);
      this.textureTwo = new THREE.TextureLoader().load(images.Michelangelo);
      this.textureThree = new THREE.TextureLoader().load(images.Nearide);
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

    onScrollMove(){
      window.addEventListener('scroll', () =>{
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
      this.mesh.position.set(this.offset.x - (this.viewport.width / 2), -this.offset.y + (this.viewport.height / 2)) ;
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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: clamp(1.875rem, 1.1806rem + 3.7037vw, 5.625rem);
  color: #FFFFFF;
  overflow-x: hidden;
  background-color: #131212;
}

main {
  width: 100%;
  height: 170vh;


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
      padding: 3% 0 3% 0;
      cursor: pointer;
      align-items: center;
    


      &:hover{
        background-position: 0% 100%;
        color: white!important;

        span{
          color: white;
        }
      }

      span:nth-child(2) {
        font-size: clamp(1rem, 0.838rem + 0.8642vw, 1.875rem);

      }
    }

  }
}


@media (min-width: 300px) and (max-width: 600px) {
  li{
    flex-direction: column;
  }

}
</style>

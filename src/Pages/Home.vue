<template>
  <div class="home">
      
      <Loading v-if="isLoading != 'false'"/>
       <div class="block"></div>
    <div class="blobs">
        <div class="blob four move"></div>
        <div class="norm blob one"></div>
      </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="position: absolute">
          <defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter>
          </defs>
        </svg>
      <main ref="main" style="height:100vh; position: absolute; z-index: 1; width: 100%;">
      <ul ref="ul" style="margin: 0; list-style-type: none">
        <li ref="li" ></li>
      
      </ul>
    </main>
      <div id="container">
          <div class="name">
            <h1>Adrien Bouteiller<br/>
            Web Developer</h1>
          </div>
          
      </div>   
      <div class="page">
              <div class="about">
                  <router-link to="/Work" class="cool-link">About</router-link>
              </div>
              <div class="about">
                  <router-link to="/HomeWork" class="cool-link">projects</router-link>
              </div>
      </div> 
  </div>
</template>

<script>
import $ from 'jquery'
import LoadingVue from '../component/loading.vue'
import {Power2, TweenMax, Circ} from 'gsap'
import * as THREE from 'three';
import images from "@/assets/js/images";
import fragment from "../assets/js/fragment.js";
import vertex from "../assets/js/vertex.js"
import Loading from '../component/loading.vue';


        
        
        

export default {
    name: "MyWork",
    component: {
        LoadingVue
    },
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
            isLoading: sessionStorage.getItem('loading')
        };
    },
    mounted() {
        


        this.loadImages();
        this.runScene();
        this.onScrollMove();

        if(this.isLoading != 'false' || this.isLoading == undefined){
        setTimeout(() => {
          sessionStorage.setItem('loading', false);
          this.isLoading = 'false';
        }, 3000);
      }

      var hoverMouse = function($el) {
        $el.each(function() {
            var $self = $(this);
            var hover = false;
            var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
            var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;

            var attachEventsListener = function() {
            $(window).on("mousemove", function(e) {
                //
                var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

                // cursor
                var cursor = {
                x: e.clientX,
                y: e.clientY + $(window).scrollTop()
                };

                // size
                var width = $self.outerWidth();
                var height = $self.outerHeight();

                // position
                var offset = $self.offset();
                var elPos = {
                x: offset.left + width / 2,
                y: offset.top + height / 2
                };

                // comparaison
                var x = cursor.x - elPos.x;
                var y = cursor.y - elPos.y;

                // dist
                var dist = Math.sqrt(x * x + y * y);

                // mutex hover
                var mutHover = false;

                // anim
                if (dist < width * hoverArea) {
                mutHover = true;
                if (!hover) {
                    hover = true;
                }
                onHover(x, y);
                }

                // reset
                if (!mutHover && hover) {
                onLeave();
                hover = false;
                }
            });
            };

            var onHover = function(x, y) {
            TweenMax.to($self, 0.4, {
                x: x * 0.8,
                y: y * 0.8,
                scale: .9,
                rotation: x * 0.1,
                ease: Power2.easeOut
            });
            };
            var onLeave = function() {
            TweenMax.to($self, 0.7, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                ease: Circ.easeOut
            });
            };

            attachEventsListener();
        });
        
};
    
        hoverMouse($('.blob')); 
        
        
    },
    methods: {

        lerp(start, end, t) {
            return start * (1 - t) + end * t;
        },
        loadImages() {
            this.textureOne = new THREE.TextureLoader().load(images.PhotoProfil);
        },
        runScene() {
            this.container = this.$refs.main;
            this.links = document.querySelectorAll("li");
            this.scene = new THREE.Scene();
            this.perspective = 1000;
            this.sizes = new THREE.Vector2(0, 0);
            this.offset = new THREE.Vector2(0, 0);
            this.uniforms = {
                uTexture: { value: this.textureOne },
                uAlpha: { value: 0 },
                uOffset: { value: new THREE.Vector2(0, 0) },
            };
            this.links.forEach((link, index) => {
                link.addEventListener("mouseenter", () => {
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
            el.addEventListener("mouseenter", () => {
                this.isHover = true;
            });
            el.addEventListener("mouseleave", () => {
                this.isHover = false;
            });
        },
        setupCamera() {
            window.addEventListener("resize", this.onWindowResize.bind(this));
            const fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
            console.log(fov);
            this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 0.1, 1000);
            this.camera.position.set(0, 0, this.perspective);
            this.renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true });
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
            window.addEventListener("mousemove", (e) => {
                this.targetX = e.clientX;
                this.targetY = e.clientY + window.pageYOffset;
            });
            console.log();
        },
        onScrollMove() {
            window.addEventListener("scroll", () => {
                this.targetY += window.pageYOffset - this.lastScrollPosition;
                this.lastScrollPosition = window.pageYOffset;
            });
        },
        createMesh() {
            const geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
            const material = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                fragmentShader: fragment,
                vertexShader: vertex,
                transparent: true,
            });
            this.mesh = new THREE.Mesh(geometry, material);
            this.sizes.set(350, 350);
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
            };
        },
    },
    components: { Loading }
}
</script>

<style scoped lang="scss">
canvas{
    z-index: 0;
}



.blob{
    background: linear-gradient(-45deg, #4DD0E1, #4DD0E1, #f5bc42, #4DD0E1)!important;
    width: 400px;
    height: 400px;
    top: 31%;
    left: 42%;
    animation: blob 15s infinite;
    
    
}

.home{
    height: 100vh;
    position: relative;
    background: linear-gradient(-45deg, #292929, #292929, #131212, #131212);
	background-size: 400% 400%;
	animation: gradient 7s ease infinite;
	height: 100vh;

#container {
     z-index: 10;
     position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 94%;
    font-family: "NeueM", sans-serif;
    font-size: clamp(1rem, 0.2824rem + 3.8272vw, 4.875rem);
    text-align: left;
    color: white;
 

  .name{
      align-self: center;
      position: absolute;

      h1{
          text-align: center;
      }
  }

  

}

.page{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-content: center;
      position: relative;
      z-index: 10;
      margin-left: -5%;
      
      a{
          color: white;
          position: absolute;
          text-decoration: none;
          font-size: clamp(0.875rem, 0.8287rem + 0.2469vw, 1.125rem);
          font-family: "NeueL", sans-serif;
          border-bottom: 0px solid #FFFFFF;
          cursor: po;
                  
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

@keyframes blob {
    0%{transform: rotate(0deg);}
    100%{transform: rotate(360deg);}
}


@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@media (min-width: 300px) and (max-width: 600px) {
    .page{
        margin-left: -15%!important;
    }
}

 .st0 { fill:url( #gradient ); }

</style>

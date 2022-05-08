<template>
  <div id="menu">
    <div id="box-4" class="box"></div>
    <div class="target">

    </div>
    <nav class="nav">
      <ul>
        <li>home</li>
        <li>about</li>
        <li>contact</li>
      </ul>
    </nav>
  </div>
</template>

<script>
import * as gsap from "gsap";


export default {
  name: "TheMenu",


  mounted() {
    this.menu()
  },

  methods: {
    menu() {
      const test = false;
      const ripple = document.querySelectorAll(".box");
      const target = document.querySelector(".target");
      const nav = document.querySelector(".nav");

      gsap.TweenMax.set(ripple, {
        xPercent: -50,
        yPercent: -50
      });

      target.addEventListener("click", function (e) {
        nav.classList.toggle('active')
        const w = window.innerWidth;
        const h = window.innerHeight;
        const cx = w / 2;
        const cy = h / 2;

        animate(ripple, e.clientX, e.clientY, w, h, cx, cy);
      });

      function animate(target, x, y, w, h, cx, cy) {

        const dx = x < cx ? w - x : x;
        const dy = y < cy ? h - y : y;

        const size = Math.sqrt(dx * dx + dy * dy) * 2;

        gsap.TweenLite.set(target, {
          x: x,
          y: y,
          width: size,
          height: size,
          scale: 0
        });

        if (!test) {
          gsap.TweenLite.to(target, 0.5, {
            scale: 1
          });

          this.test = true;
        } else {
          gsap.TweenLite.from(target, 0.5, {
            scale: 1

          });

          this.test = false
        }


      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/app";

nav {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  text-align: center;


  ul {
    margin-top: 25%;
    padding-right: 3%;
    transform: translateY(-50%);

    li {
      list-style: none;

      a {
        color: #1a1a1a;
        text-decoration: none;
        font-size: 6rem;
      }

    }
  }
}

.box {
  display: block;
  position: absolute;
  background-color: #c80000;
  border-radius: 10px;
  /*   height: 283vmax;
    width: 283vmax; */
  top: 10px;
  left: 10px;
  border-radius: 100%;
  transform: scale(0, 0);

  /*   opacity: 0.3;
    mix-blend-mode: multiply; */
}

#box-4{
  background-color: #1a1a1a;
  width: 30px;
  height: 30px;
}

.target{
  width: 30px;
  height: 30px;
  background-color: black;
  position: absolute;
}

.nav.active{
  display: block;
}

.nav{
  display: none!important;
}

nav{
  position: absolute;
  left: 50%
}



</style>

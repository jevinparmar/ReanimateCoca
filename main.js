
const cursor = document.querySelector('.cursor');
const pagesname = document.querySelectorAll('.nav ul li');
const lgo = document.querySelector('.logo');
const bname = document.querySelectorAll('.b-name ul li');
const time = gsap.timeline();

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav ul li");

  navItems.forEach((item) => {
    // Split each letter of the nav item and wrap them in span elements
    const letters = item.innerText
      .split("")
      .map((letter) => {
        return `<span style="display: inline-block; opacity: 1; transform: translateY(0); transition: opacity 0.3s ease, transform 0.3s ease;">${letter}</span>`;
      })
      .join("");

    item.innerHTML = letters;

    const spans = item.querySelectorAll("span");

    // Mouse enter animation
    item.addEventListener("mouseenter", () => {
      gsap.to(spans, {
        y: -50,
        opacity: 1,
        stagger: 0.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    // Mouse leave animation
    item.addEventListener("mouseleave", () => {
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });
});


time.from(lgo,{
  y:25,
  opacity:0,
  duration:0.6,
  delay:0.8
})
time.from(pagesname,{
  y:25,
  opacity:0,
  duration:0.8,
  stagger:0.3
});
time.from(bname,{
  y:25,
  opacity:0,
  duration:0.8,
  stagger:0.3
})
time.from(canvas, {
  scale: 1.1,
  opacity: 0,
  transformOrigin: "center",
  duration: 3,
  delay: 0.1,
  ease: "power3.out"
});

document.addEventListener("mousemove",(dot)=>{
  gsap.to(cursor,{
    x:dot.x,
    y:dot.y,
    duration:1,
    ease:"back.out"
  });
});

// ----------

window.addEventListener("wheel",(e)=>{

  if(e.deltaY > 0){

    gsap.to(".marque",{
      transform:'translateX(-100%)',
      duration:3,
      repeat:-1,
      ease:"none"
    })

    gsap.to(".marque img",{
      rotate:180
    });

  }
  else{
    gsap.to(".marque",{
      transform:'translateX(0%)',
      duration:3,
      repeat:-1,
      ease:"none"
    })

    gsap.to(".marque img",{
      rotate:0
    });
  }

});
// ===============

const boxes = document.querySelector('.main-box');
const photo = document.querySelectorAll('.photos');


gsap.to(photo, {
  scrollTrigger: {
    trigger: '.main-box', 
    start:'bottom 100%',
    scrub: 2,
    pin: true,
  },
  height: '20rem',
  width: '42rem',
  duration:2
});

// ===============


const lbtn = document.querySelector('#lbtn');
const rbtn = document.querySelector('#rbtn');


lbtn.addEventListener('click', () => {
  gsap.to(p1, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      // Change image source
      const img = p1.querySelector('img');
      const currentSrc = img.src;
      if (currentSrc.includes('p1.jpg')) {
        img.src = '/photos/p2.jpg';
      } else {
        img.src = '/photos/p1.jpg';
      }
      
      // Fade back in
      gsap.to(p1, {
        opacity: 1,
        duration: 0.5
      });
    }
  });
});

rbtn.addEventListener('click', () => {
  gsap.to(p1, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      // Change image source
      const img = p1.querySelector('img');
      const currentSrc = img.src;
      if (currentSrc.includes('p1.jpg')) {
        img.src = '/photos/p3.jpg';
      } else {
        img.src = '/photos/p1.jpg';
      }
      
      // Fade back in
      gsap.to(p1, {
        opacity: 1
      });
    }
  });
});

// ===========

const canvs = document.querySelector('.pht');
const context = canvs.getContext("2d");
const frames = {

  currentIndex : 0 ,
  maxIndex : 64

} ;

let imagesLoaded = 0;
const images = [];

function preloadImages(){

  for(var i = 1;i <= frames.maxIndex; i++){

    const imageUrl = `./frames/fram ${i.toString()}.jpg`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = ()=>{

      imagesLoaded++;

      if(imagesLoaded === frames.maxIndex){

        loadImage(frames.currentIndex);

        startAnimation();

      }

    }

   images.push(img);

  }

}

function loadImage(index) {

  if (index >= 0 && index <= frames.maxIndex) {

    const img = images[index];

    canvs.width = window.innerWidth;
    canvs.height = window.innerHeight;

    const scaleX = canvs.width / img.width;
    const scaleY = canvs.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvs.width - newWidth) / 2;
    const offsetY = (canvs.height - newHeight) / 2;

    context.clearRect(0, 0, canvs.width, canvs.height);  // Fixed typo
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);  // Fixed parameter order

    frames.currentIndex = index;

  }

}

function startAnimation(){

  var tl = gsap.timeline({

    scrollTrigger:{

      trigger: ".pare",
      start:"top 0%",
      scrub:2,
      pin:true
    }

  })


  tl.to(frames,{

    currentIndex:frames.maxIndex,

    onUpdate: function(){

      loadImage(Math.floor(frames.currentIndex));

    }

  })


}
preloadImages();

// ------

const elems = document.querySelectorAll('.elems');

elems.forEach((elem) => {
    let rotate = 0;

    elem.addEventListener('mousemove', (dets) => {
        const diffY = dets.clientY - elem.getBoundingClientRect().top;
        const diffX = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            top: diffY,
            left: dets.clientX - elem.getBoundingClientRect().left,
            rotate: gsap.utils.clamp(-20, 20, diffX),
        });
    });

    elem.addEventListener('mouseleave', () => {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power1,
        });
    });
});

// -----

let finalPath = `M 10 100 Q 560 100 1110 100`;

let sgname = document.querySelector('.sg-name svg');
let sgnamePath = sgname.querySelector('path'); 

sgname.addEventListener('mousemove', (dets) => {
 
  let dynamicPath = `M 10 100 Q 560 ${dets.offsetY} 1110 100`;

  gsap.to(sgnamePath, {
    attr: { d: dynamicPath },
    duration: 0.3,
    ease: "power3.out",
  });
});

sgname.addEventListener('mouseleave', () => {
 
  gsap.to(sgnamePath, {
    attr: { d: finalPath },
    duration: 1.5, 
    ease: "elastic.out(1, 0.2)", 
  });
});

// ====

let lastPath = `M 10 100 Q 720 100 1426 100`;

let lst = document.querySelector('.lst-svg svg');
let lstPath = lst.querySelector('path'); 

lst.addEventListener('mousemove', (dets) => {
 
  let dynamicPath = `M 10 100 Q 720 ${dets.offsetY} 1426 100`;

  gsap.to(lstPath, {
    attr: { d: dynamicPath },
    duration: 0.3,
    ease: "power3.out",
  });
});

lst.addEventListener('mouseleave', () => {
 
  gsap.to(lstPath, {
    attr: { d: lastPath },
    duration: 1.5, 
    ease: "elastic.out(1, 0.2)", 
  });
});

// ===

let ftr = document.querySelector('.footer');

ftr.addEventListener('mouseenter', () => {
  cursor.style.backgroundColor = '#fff';
});

ftr.addEventListener('mouseleave', () => {
  cursor.style.backgroundColor = 'red';
});

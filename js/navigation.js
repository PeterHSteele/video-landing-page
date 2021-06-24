/*function SBP_Navigation(){
  const _=this;
  _.primaryNav=document.getElementById('primary-nav');
  _.secondaryNav=document.getElementById('secondary-nav');


}*/

function SBP_Navigation(id){
  const _=this;
  _.nav=document.getElementById(id);
  _.toggle=_.nav.getElementsByClassName('menu-toggle')[0];
  _.links=_.nav.getElementsByTagName('ul')[0];
  //console.log(_.toggle);
  
  _.handleToggleClick=function(){
    console.log('called');
    _.links.classList.toggle('active');
  }

  _.addListeners=function(){
    _.toggle.addEventListener('click',_.handleToggleClick.bind(_));
  }

  _.addListeners();
}

const primaryNav=new SBP_Navigation('primary-nav');
/*
function debounce(fn){
  let frame;

  return function(...params){
    if (frame){
      cancelAnimationFrame(frame)
    }
    frame=requestAnimationFrame(function(){
      fn(...params);
    })
  }
}

function storeScroll(){
  document.documentElement.dataset.scroll=window.scrollY;
}

document.addEventListener('scroll', debounce(storeScroll));
*/


function darkenHeader(entries){
  const header = document.getElementsByClassName('site-header')[0];
  for (const entry of entries){
    console.log(entry.target)
    if (entry.isIntersecting){
    console.log(entry.target.getBoundingClientRect().y)
    console.log(`${entry.target.id} is in view ${entry.isIntersecting}`);
      header.classList.add('opaque');
    } else {
      header.classList.remove('opaque');
    }
  }
}
/*
function darkenHeader(entries){
  console.log(entries[0].target.boundingClientRect().y);
  const header = document.getElementsByClassName('site-header')[0];
  if (entries[0].target.getBoundingClientRect().y<200){
    header.classList.add('opaque');
  } else {
    header.classList.remove('opaque');
  }
}
*/
const observer = new IntersectionObserver(darkenHeader,{
  threshold: 0.3,
});

observer.observe(document.getElementById('section2'));
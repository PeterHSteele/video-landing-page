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

function SBP_Observers(){
  const _=this;
  _.header=document.getElementsByClassName('site-header')[0];
  _.video=document.getElementById("video-bg");

  _.darkenHeader=function(entries){
    for (const entry of entries){
      if (entry.boundingClientRect.top<0){
        _.header.classList.add('opaque');
      } else {
        _.header.classList.remove('opaque');
      }
    }
  }
  /*
  _.changeVideoPlayState=function(entries){
    console.log('trigger');
    for (const entry of entries){
      if (entry.isIntersecting){
        _.video.pause();
      } else {
        _.video.play();
      }
    }
  }
  */
  _.changeVideoPlayState=function(entries){
    for (const entry of entries){
      if (entry.isIntersecting){
        _.video.play();
      } else {
        _.video.pause();
      }
    }
  }
  
  _.initSiteHeaderObserver=function(){
    _.headerObserver = new IntersectionObserver(_.darkenHeader.bind(_),{
      threshold: 0.15,
    });

    _.headerObserver.observe(document.getElementById('headerPixel'));
    //_.headerObserver.observe(document.getElementById(g));
  }

  _.initVideoObserver=function(){
    _.videoObserver=new IntersectionObserver(this.changeVideoPlayState.bind(_),{
      threshold: 0.4,
    });

    //_.videoObserver.observe(document.getElementById('videoPixel'));
    _.videoObserver.observe(document.getElementById('section1'));
  }

  _.setUpObservers=function(){
    _.initSiteHeaderObserver();
    _.initVideoObserver();
  };
}

const sbp_obs = new SBP_Observers();
sbp_obs.setUpObservers();
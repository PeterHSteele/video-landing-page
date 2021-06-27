function SBP_Navigation_Element(id, int, handleClick){
  const _=this;
  _.active=false;
  _.timeout=false;
  _.nav=document.getElementById(id);
  _.toggle=_.nav.getElementsByClassName('menu-toggle')[0];
  _.links=_.nav.getElementsByTagName('ul')[0];

  _.addListeners=function(){
    _.toggle.addEventListener('click',()=>handleClick(int));
  }

  _.addListeners();
}

function SBP_Navigation_System(){
  const _=this;

  _.handleToggleClick=function(int){
    const active = _.navs.find(e=>e.active);
    if (!active){
      _.show(_.navs[int]);
    } else if (int==_.navs.indexOf(active)){
      _.slideAndHide(_.navs[int])
    } else {
      _.slideAndHide(active);
      _.show(_.navs[int]);
    }
  }

  _.slideAndHide=function(nav){
    nav.active=false;
    nav.toggle.classList.remove('is-pressed');
    nav.links.classList.remove('active');
    nav.timeout=true;
    _.changeIcon(nav);
    window.setTimeout(()=>{
      nav.links.classList.add('hidden')
      nav.timeout=false;
    },300);
  }

  _.changeIcon = function( nav ){
    let text = nav.toggle.innerText,
    length = text.length,
    last = text[text.length-1];
    const encodedStr = last.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
    const newLast = '&#9660;' == encodedStr ? '&#9650;' : '&#9660';
    text=text.slice(0,length-1).concat(newLast);
    nav.toggle.innerHTML=text;
  }

  _.show=function(nav){
    if (nav.timeout) return;
    nav.active=true;
    nav.toggle.classList.add('is-pressed');
    _.changeIcon(nav);
    nav.links.classList.remove('hidden');
    nav.links.classList.add('active');
  }

  _.primary=new SBP_Navigation_Element('primary-nav', 0, _.handleToggleClick.bind(_));
  _.secondary=new SBP_Navigation_Element('secondary-nav', 1, _.handleToggleClick.bind(_));
  _.navs=[_.primary,_.secondary]
}

const sbpNavSystem = new SBP_Navigation_System();

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
  }

  _.initVideoObserver=function(){
    _.videoObserver=new IntersectionObserver(this.changeVideoPlayState.bind(_),{
      threshold: 0.4,
    });

    _.videoObserver.observe(document.getElementById('section1'));
  }

  _.setUpObservers=function(){
    _.initSiteHeaderObserver();
    _.initVideoObserver();
  };
}

const sbp_obs = new SBP_Observers();
sbp_obs.setUpObservers();
var typed = new Typed(".auto-type", {
    strings: ["Java Backend Developer.","Problem Solver.", "Swimming Enthusiast." ],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
 })
 
GitHubCalendar(".calendar", "dileep8920", { responsive: true });
    // Sticky Navbar
    let header = document.querySelector('header');
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
     
     
    window.addEventListener('scroll', () => {
        header.classList.toggle('shadow', window.scrollY > 0);
    });
     
    menu.onclick = () => {
        navbar.classList.toggle('active');
    }
    window.onscroll = () => {
        navbar.classList.remove('active');
    }
     
    // Dark Mode
    let darkmode = document.querySelector('#darkmode');
     
    darkmode.onclick = () => {
        if(darkmode.classList.contains('bx-moon')){
            darkmode.classList.replace('bx-moon','bx-sun');
            document.body.classList.add('active');
        }else{
            darkmode.classList.replace('bx-sun','bx-moon');
            document.body.classList.remove('active');
        }
    }

    var typed = new Typed(".tipical", {
        strings: ["Dileep Yadav"],
        typeSpeed:100,
        backSpeed:100,
        loop:true
      });
  
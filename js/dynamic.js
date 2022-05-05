const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.5)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.addEventListener('click', (e) =>{
	modal.style.display = "block";
});

span.addEventListener('click', (e) =>{
	modal.style.display = "none";
})
window.addEventListener('click', (e) =>{
	if(e.target == modal) {
		modal.style.display = "none";
	}
})
//I ain't gonna write every single question and answer in the .js file nty 

class enar{
    constructor(){
        this.init();
        var lang = localStorage.getItem('preferred-language');
    }

    init(){

        const circle = document.querySelector('.transition-circle2');
        gsap.set(circle, { scale: 500, opacity: 1 });
        gsap.to(circle, {
            scale: 0,
            duration: 0.5,
            ease: "power2.out"
            
            
        });

        document.body.setAttribute('data-theme', localStorage.getItem('preferred-theme'));
        document.body.setAttribute('lang', localStorage.getItem('preferred-language'));
    }

    choose(eng,ar){
        lng = this.lang;
        if(lng="en"){return eng;}else{return ar;}


    }

    txtdir(){
        lng = this.lang;
        if(lng="en"){return "ltr";}else{return "rtl";}
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new enar();
});
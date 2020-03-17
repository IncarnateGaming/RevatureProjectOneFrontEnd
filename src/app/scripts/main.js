var sessionName = Math.random();
class Navbar{
    static expand(){
        Navbar.navbarData.classList.add("expanded");
    }
    static collapse(){
        Navbar.navbarData.classList.remove("expanded");
    }
    static buttonClick(ev){
        console.log(ev.currentTarget);
        console.log(Navbar.navbarData.classList);
        if(Navbar.navbarData.classList.contains("expanded")){
            Navbar.collapse();
        }else{
            Navbar.expand();
        }
    }
    static setup(){
        Navbar.navbarData = document.getElementById("navbarSupportedContent");
        Navbar.navbarExpandButton = document.getElementById("nav-expand-btn");
        Navbar.navbarExpandButton.addEventListener("click",Navbar.buttonClick);
    }
}
setTimeout(Navbar.setup,5000);
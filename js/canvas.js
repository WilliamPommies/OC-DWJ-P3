class Drawer {
    constructor (id) {
        this.canvas = document.getElementById(id)
        this.ctx = canvas.getContext("2d")
        this.drawing = false
        this.ctx.lineWidth = 3
        this.canvas.width = 300
        this.canvas.height = 300
        this.lastPoint = {x : 0, y : 0}
        this.mousePos = {x:0,y:0};
        this.lastPos = {x:0,y:0};
        this.drawing = false;
        this.canvas.addEventListener("mousedown", this.debutDessin.bind(this))
        this.canvas.addEventListener("mousemove", this.dessin.bind(this))
        this.canvas.addEventListener("mouseup", this.finDessin.bind(this))
        this.canvas.addEventListener("touchstart", this.debutDessinTactile.bind(this))
        this.canvas.addEventListener("touchmove", this.dessinTactile.bind(this))
        this.canvas.addEventListener("touchend", this.finDessinTactile.bind(this))
    }

        drawLine() {
            if(this.drawing === true){
                this.ctx.moveTo(this.lastPos.x,this.lastPos.y)
                this.ctx.lineTo(this.mousePos.x,this.mousePos.y)
                this.ctx.stroke()
                this.ctx.strokeStyle = "color(black)"
                this.ctx.beginPath()
            }
        }

        debutDessin() {
            //début du dessin avec événement souris
            this.drawing = true
            //affichage du bouton "c'est parti" suite à la validation d'une signature
            document.getElementById("finalButton").setAttribute("style", "display : initial !important")
        }

        debutDessinTactile(e) {
            //début du dessin avec événement tactile
            this.lastPos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
            this.lastPos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
            this.drawing = true
            //empêche le scroll lors du toucher du canvas
            e.preventDefault()
            }


        dessin(e){
            //dessin avec événement souris de mouvement
            this.mousePos.x = e.clientX - this.canvas.getBoundingClientRect().left
            this.mousePos.y = e.clientY - this.canvas.getBoundingClientRect().top
            this.drawLine()
            this.lastPos.x = e.clientX - this.canvas.getBoundingClientRect().left
            this.lastPos.y = e.clientY  - this.canvas.getBoundingClientRect().top
        }
        

        dessinTactile(e){
            //dessin avec événement tactile de mouvement         
            this.drawing = true
            this.mousePos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
            this.mousePos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
            this.drawLine()
            this.lastPos.x = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
            this.lastPos.y = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
            e.preventDefault()

            document.getElementById("finalButton").setAttribute("style", "display : initial !important")
        }

        finDessin(e) {
            //arrêt du dessin avec événement souris
            this.drawing = false
        }

        finDessinTactile (e) {
            //arrêt du dessin avec événement tactile
            this.drawing = false
            e.preventDefault()
        }
     
}
    

const drawer = new Drawer("canvas")
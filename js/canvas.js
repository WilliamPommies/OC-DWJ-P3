class Drawer {
    constructor (id) {
        this.canvas = document.getElementById(id)
        this.ctx = canvas.getContext("2d")
        this.drawing = false
        this.ctx.lineWidth = 3
        this.canvas.width = 300
        this.canvas.height = 300
        this.lastPoint = {x : 0, y : 0}
        this.pageClientX;
        this.pageClientY;
        this.mouseTouch;

        
        this.detectmob()

        this.canvas.addEventListener('mousedown', (e) =>{
            let target = e.target
            
            this.drawing = true
            this.lastPoint.x = e.clientX - canvas.getBoundingClientRect().left
            this.lastPoint.y = e.clientY - canvas.getBoundingClientRect().top
            console.log(this.lastPoint)

            document.getElementById("finalButton").style.display = "initial"
        })

        this.canvas.addEventListener("mousemove", (e) => {

            if (this.drawing) {
                let newPoint = {
                    x: e.clientX - canvas.getBoundingClientRect().left,
                    y: e.clientY - canvas.getBoundingClientRect().top
                }
                this.drawLigne(this.lastPoint, newPoint)
                this.lastPoint = newPoint
            }
        });

        this.canvas.addEventListener("mouseup", (e) =>{
            this.drawing = false
        });
     
    }

    detectmob() {
       
        if(window.innerWidth <= 1024 && window.innerHeight <= 600) {
                this.mode = "mobile"
            console.log("je suis une page mobile")
          return true;
        } else {
                this.mode ="desktop"
            console.log("je ne suis pas une page mobile")
          return false;
        }
     }


    drawLigne(start, end) {
        this.ctx.beginPath()
        this.ctx.moveTo(start.x, start.y)
        this.ctx.lineTo(end.x, end.y)
        this.ctx.stroke()
        this.ctx.strokeStyle = "color(black)"
        this.ctx.closePath()

    }
    
}
const drawer = new Drawer("canvas")

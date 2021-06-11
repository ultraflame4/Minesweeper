
window.addEventListener("load",()=>{
    document.getElementById("openGeneratePopup").addEventListener("click",()=>{
        document.getElementById("generateConfigContainer").style.display="flex"
    })

    document.getElementById("closeConfigButton").addEventListener("click",()=>{
        document.getElementById("generateConfigContainer").style.display="none"
    })

    document.getElementById("generateField").addEventListener("click",()=>{
        let height = parseInt((<HTMLInputElement>document.getElementById("fieldHeightInput")).value)
        let width = parseInt((<HTMLInputElement>document.getElementById("fieldWidthInput")).value)
        let totalNoTiles = height*width
        // Math.random() * (max - min) + min; returns random no between max and min
        let bombCount =  Math.round(totalNoTiles/5)

        let fieldContainer = (<HTMLDivElement>document.getElementById("minefieldContainer"))
        fieldContainer.innerHTML=""

        for (let i = 0; i < height; i++) {
            let fieldRow = <HTMLDivElement>document.createElement("div")
            fieldRow.className="row"

            for (let j = 0; j < width; j++) {
                let button=<HTMLButtonElement>document.createElement("button")
                button.id=`fieldTileId-${j}x${i}`
                button.dataset.x=j.toString()
                button.dataset.y=i.toString()
                button.className="fieldTile"
                button.addEventListener('click',(ev) => {
                    tileClicked(button)
                })
                button.dataset.isbomb=(Math.random()<(bombCount/totalNoTiles)).toString()
                fieldRow.append(button)
            }

            fieldContainer.append(fieldRow)
        }

    })


    function exposeTile(e){ // returns true if bomb
        // If not bomb, check surroundings for bomb (and count them). set no of bomb to text
        let neighbourBombs= 0

        if (e.dataset.isbomb=="true"){
            e.textContent="X"
            return true
        }

        let selfY = parseInt(e.dataset.y)
        let selfX = parseInt(e.dataset.x)

        for (let i = 0; i < 3; i++) {
            let y = i-1+selfY
            for (let j = 0; j < 3; j++) {
                let x = j-1+selfX
                let id_text = 'fieldTileId-'+x+"x"+y
                let neighbourTile = document.getElementById(id_text)


                if (neighbourTile==null){
                    continue;
                }

                if (neighbourTile.dataset.isbomb==="true"){
                    neighbourBombs++
                }

            }
        }



        e.textContent=neighbourBombs.toString()
        return false
    }


    function exposeField(){
        console.log("Exposing field...")
        let field = document.getElementById("minefieldContainer")
        Array.from(field.children).forEach((row:HTMLDivElement)=>{ // This only get rows , 1 more loop to get children
            Array.from(row.children).forEach((tile:HTMLButtonElement)=>{
                exposeTile(tile)
                tile.disabled=true
            })
        })
    }




    function tileClicked(e:HTMLButtonElement){
        if (exposeTile(e)){
            setTimeout(()=>{
                if (!confirm("Boom! Dead.\nYou stepped on a landmine and exploded.\nDo you want to continue? " +
                    "\n(Click OK to resume game and CANCEL to quit)")){
                    exposeField()
                }
            },400)

        }

        e.disabled=true
    }
})






window.addEventListener("load",()=>{
    document.getElementById("openGeneratePopup").addEventListener("click",()=>{
        document.getElementById("generateConfigContainer").style.display="flex"
    })

    document.getElementById("closeConfigButton").addEventListener("click",()=>{
        document.getElementById("generateConfigContainer").style.display="none"
    })


    let isFirstTile = false
    let totalBombCount = 0
    let uncoveredBombCount = 0
    let usedFlags = 0

    document.getElementById("generateField").addEventListener("click",()=>{

        totalBombCount = 0
        uncoveredBombCount = 0
        usedFlags = 0

        isFirstTile = true
        let height = parseInt((<HTMLInputElement>document.getElementById("fieldHeightInput")).value)
        let width = parseInt((<HTMLInputElement>document.getElementById("fieldWidthInput")).value)
        let totalNoTiles = height*width

        let fieldContainer = (<HTMLDivElement>document.getElementById("minefieldContainer"))


        let bombProb = 0.25
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

                button.addEventListener("contextmenu",ev => {// Get right click
                    ev.preventDefault()
                    flagTile(button)
                })

                button.addEventListener('click',(ev) => {
                    tileClicked(button)
                })


                let isBomb = (Math.random()<bombProb)
                if (isBomb){
                    button.dataset.isbomb = isBomb.toString()
                    //Increase totalBombCount
                    totalBombCount++
                }


                button.dataset.isflagged="false"
                fieldRow.append(button)
            }

            fieldContainer.append(fieldRow)
        }
        document.getElementById("closeConfigButton").click() //Qol close menu
    })





    function exposeTile(e,exposeNeighbours=false){ // returns true if bomb
        // If not bomb, check surroundings for bomb (and count them). set no of bomb to text
        let neighbourBombs= 0
        let isBomb = false

        let selfY = parseInt(e.dataset.y)
        let selfX = parseInt(e.dataset.x)

        let reEvaluate = false // When true, function is called again


        for (let i = 0; i < 3; i++) {
            let y = i-1+selfY
            for (let j = 0; j < 3; j++) {
                let x = j-1+selfX
                let id_text = 'fieldTileId-'+x+"x"+y
                let neighbourTile = (<HTMLButtonElement>document.getElementById(id_text))


                if (neighbourTile==null){
                    continue;
                }

                if (exposeNeighbours){
                    if (neighbourTile.dataset.isbomb==="true"){
                        neighbourTile.dataset.isbomb="false"
                        totalBombCount--
                        reEvaluate=true // There is a need to run this function again.
                                        // Some neightbour tile bombcount may be wrong as they were set in the
                                        // prev iteration before the bomb was remove from the tile
                    }
                    exposeTile(neighbourTile)
                    neighbourTile.disabled = true
                }

                if (neighbourTile.dataset.isbomb==="true"){
                    neighbourBombs++
                }

            }
        }

        e.textContent=neighbourBombs.toString()

        if (e.dataset.isbomb=="true"){
            e.textContent="X"
            isBomb=true
        }

        if (reEvaluate){
            return exposeTile(e,exposeNeighbours)
        }

        return isBomb
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
        if (e.dataset.isflagged==="true"){ //Check if tile is flagged. If true, do nothing.
            return
        }


        if (exposeTile(e,isFirstTile) && !isFirstTile){
            uncoveredBombCount++
            setTimeout(()=>{
                if (!confirm("Boom! Dead.\nYou stepped on a landmine and exploded.\nDo you want to continue? " +
                    "\n(Click OK to resume game and CANCEL to quit)")){
                    exposeField()
                }
            },400)

        }
        isFirstTile=false

        e.disabled=true

        checkWin()
    }

    function flagTile(e:HTMLButtonElement){
        if (e.disabled){ // Check if tile is already exposed
            return
        }
        else if(isFirstTile){ // Check if on first Tile click
            return;
        }

        if (e.dataset.isflagged==="true"){
            e.dataset.isflagged="false"
            e.textContent=""
            usedFlags--
        }
        else {
            e.dataset.isflagged="true"
            e.textContent="F"
            usedFlags++
            if (e.dataset.isbomb==="true") {
                uncoveredBombCount++
                if ((<HTMLInputElement>document.getElementById("checkFlag")).checked){
                    e.textContent="B"
                }
            }
        }

        checkWin()
    }

    function checkWin(){
        if (uncoveredBombCount>=totalBombCount&&usedFlags==uncoveredBombCount){
            console.log(uncoveredBombCount,totalBombCount)
            exposeField()
            setTimeout(()=>{
                alert("Congratulations!\nYou have successfuly uncovered all mines.\nClick generate to create a new game")
            },400)

        }
    }
})





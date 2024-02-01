document.addEventListener('DOMContentLoaded', () => {
    const bkg = document.querySelector('.bkg')
    const ghost = document.createElement('div')
    let isGameOver = false
    let leafCount = 5
    let leaves = []
    let ghostLeftSpace = 50
    let ghostBottomSpace = 150 //starting point

    class Leaf {
        constructor(newLeafBottom){
            this.left = Math.random() *  315 
            // 315 = 400px bkg - 85px leaf to make sure the leaf doesn't move out of the background. 
            this.bottom = newLeafBottom
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('leaf')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            bkg.appendChild(visual)
        }
    }

    function createLeaves(){
        for (let i = 0; i < leafCount; i ++){
            let leafGap = 600 / leafCount
            let newLeafBottom = 100 + i * leafGap
            let newLeaf = new Leaf(newLeafBottom)
            leaves.push(newLeaf)
            console.log(leaves)
        }
    }
    function moveLeaves(){
        if (ghostBottomSpace > 100) {
            leaves.forEach(leaf => {
                leaf.bottom -= 4
                let visual = leaf.visual
                visual.style.bottom = leaf.bottom + 'px'
            })
        }
    }


    function createGhost(){
        bkg.appendChild(ghost)
        ghost.classList.add('ghost')
        ghostLeftSpace = leaves[0].left
        ghost.style.left = ghostLeftSpace + 'px'
        ghost.style.bottom = ghostBottomSpace + 'px'
    }
    

    function start(){
        if(!isGameOver) {
            createLeaves()
            createGhost()
            setInterval(moveLeaves, 30)
        }
    }
    start()
})
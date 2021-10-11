var gachoPlayer , gachoCom, hasilAkhir ;
var listComTangan = ["batu","gunting","kertas"]
var vsText = document.getElementById('vs-text')
var resultDiv = document.getElementById('result')
var resultText = document.getElementById('result-text')
var modalBackdrop = document.getElementById('modal-backdrop')

function dataTanganPlayer(item){
    item.classList.add("selected")
    gachoPlayer = item.getAttribute('data-tangan')
    
    randomGachoComputer() //get random gacho com

    const kalkulasiHasil = (gachoPlayer, gachoCom) => {
        if (gachoPlayer===gachoCom) {
            return hasilAkhir = 'Draw'
        }
        else if (gachoPlayer === 'batu') {
            return hasilAkhir = (gachoCom === 'gunting') ? 'Player menang': 'Com menang'
        } else if (gachoPlayer === 'kertas') {
            return hasilAkhir = (gachoCom === 'batu') ? 'Player menang' : 'Com menang'
        } else if (gachoPlayer === 'gunting') {
            return hasilAkhir = (gachoCom === 'kertas') ? 'Player menang' : 'Com menang'
        } 
    }

    vsText.classList.add('d-none')
    resultDiv.classList.remove('d-none')
    resultText.innerHTML = kalkulasiHasil(gachoPlayer,gachoCom)

    modalBackdrop.classList.remove('d-none')

    if(hasilAkhir=='Player menang' || hasilAkhir=='Com menang' ){
        resultDiv.classList.add('win')
    } else{
        resultDiv.classList.add('draw')
    }
    
    console.log('Player select :',gachoPlayer)
    console.log('Computer select :',gachoCom)
    console.log('Pemenang :',kalkulasiHasil(gachoPlayer,gachoCom))
}

function randomGachoComputer(){
    var randomGachoIndex = Math.floor(Math.random()*listComTangan.length)
    gachoCom = listComTangan[randomGachoIndex]
    var selectedCom = document.querySelectorAll('.computer')
    selectedCom[randomGachoIndex].getElementsByTagName('img')[0].classList.add('selected')
    return gachoCom
}


function resetButton() {
    vsText.classList.remove('d-none')
    resultDiv.classList.add('d-none')
    resultDiv.classList.remove('win','draw')
    resultText.innerHTML =""

    var selectedDiv = document.getElementsByClassName('selected')
    while (selectedDiv.length)
        selectedDiv[0].classList.remove("selected");

    modalBackdrop.classList.add('d-none')
}

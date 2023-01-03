const parOuImpar = process.argv[2];
const number = Number(process.argv[3]);

console.log("INICIANDO JOGO PAR OU IMPAR")

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10);

const sum = number + numeroAleatorioEntreZeroeDez

let computer = null

if(parOuImpar === "PAR"){
    computer = "IMPAR"
}else if(parOuImpar === "IMPAR"){
    computer = "PAR"
}else{
    console.log("Escolha entre PAR ou IMPAR.")
}

let parOuImparResultado = null

if(sum % 2 === 0){
    parOuImparResultado = "PAR"
} else {
    parOuImparResultado = "IMPAR"
}

let message = null

if(parOuImparResultado === parOuImpar) {
    message = "Você ganhou!"
} else {
    message = "Você perdeu!"
}

console.log(`DEV: ${number}`)
console.log(`COMPUTER: ${numeroAleatorioEntreZeroeDez}`)
console.log(`Você escolheu ${parOuImpar} e o computador escolheu ${computer}. O resultado foi ${sum}. ${message}`)
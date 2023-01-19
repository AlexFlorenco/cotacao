let moeda1 = document.getElementById('moeda1')
let valor1 = document.getElementById('valor1')
let cod1 = document.getElementById('cod1')

let moeda2 = document.getElementById('moeda2')
let valor2 = document.getElementById('valor2')
let cod2 = document.getElementById('cod2')

let alternador = document.getElementById('alternador')

moeda1.addEventListener('change', () => {
    cod1.innerText = moeda1.value;
    cotacao(
        valor1.value, moeda1.value, moeda2.value, false)
})

valor1.addEventListener('change', () => {
    cotacao(
        valor1.value, moeda1.value, moeda2.value, false)
})

moeda2.addEventListener('change', () => {
    cod2.innerText = moeda2.value;
    cotacao(
        valor1.value, moeda1.value, moeda2.value, false)
})

valor2.addEventListener('change', () => {
    cotacao(
        valor2.value, moeda2.value, moeda1.value, true)
})

alternador.addEventListener('click', () => {
    let moeda_aux = moeda1.value
    let cod_aux = cod1.innerText

    moeda1.value = moeda2.value
    moeda2.value = moeda_aux

    cod1.innerText = cod2.innerText
    cod2.innerText = cod_aux

    valor2.value = ''

    cotacao(
        valor1.value, moeda1.value, moeda2.value, false)
})

function cotacao(valor, fonte, alvo, inverso) {
    var myHeaders = new Headers();
    // myHeaders.append("apikey", "gwK9XyKuscS53i8FaHgXkrJMaeN8CGWR");

    if (fonte === ' ' || alvo === ' ') {
        return;
    }

    fetch(`https://api.apilayer.com/fixer/convert?from=${fonte}&to=${alvo}&amount=${valor}`, {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    })
        .then(resposta => {
            resposta.json()
                .then(resultado => mostrarCotacao(resultado, inverso))
        })
        .catch(erro => console.log('Erro: ', erro));
}

function mostrarCotacao(resultado, inverso) {
    console.log(resultado);
    for (const chave in resultado) {
        if (chave === 'result') {
            if (inverso) {
                valor1.value = `${resultado[chave]}`;
                return;
            }
            valor2.value = `${resultado[chave]}`;
        }
    }
}
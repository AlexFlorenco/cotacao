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
    // myHeaders.append("apikey", "m3gXjq4KwOmh68NjZ2fbQIgY3aC3tr17");

    if (valor === '' || fonte === ' ' || alvo === ' ') {
        console.log('Sem parametros');
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
    let conversao = resultado.result
    let data = formatarData(resultado.date)
    let cota = resultado.info.rate
    let fonte = resultado.query.from
    let alvo = resultado.query.to
    let valor1_taxa = Number(valor1.value)
    let valor2_taxa = Number(valor2.value)

    if (inverso) {
        valor1_taxa = Number(conversao)
        valor1.value = conversao.toFixed(2)
        document.getElementById('conversao').innerText = `${valor2_taxa.toFixed(4)} ${fonte} equivale a ${valor1_taxa.toFixed(4)} ${alvo}`
        document.getElementById('taxa').innerHTML = `1 ${fonte} = ${cota.toFixed(4)} ${alvo} <br> 1 ${alvo} = ${(valor2_taxa / valor1_taxa).toFixed(4)} ${fonte}`
    }
    else {
        valor2_taxa = Number(conversao)
        valor2.value = conversao.toFixed(2);
        document.getElementById('conversao').innerText = `${valor1_taxa.toFixed(4)} ${fonte} equivale a ${valor2_taxa.toFixed(4)} ${alvo}`
        document.getElementById('taxa').innerHTML = `1 ${fonte} = ${cota.toFixed(4)} ${alvo} <br> 1 ${alvo} = ${(valor1_taxa / valor2_taxa).toFixed(4)} ${fonte}`
    }

    document.getElementById('cotacao').innerText = data

}

function formatarData(data) {
    let dataLista = []
    dataLista.unshift(data.slice(0, 4))
    dataLista.unshift(data.slice(5, 7))
    dataLista.unshift(data.slice(8, 10))
    return dataLista.join('/');
}
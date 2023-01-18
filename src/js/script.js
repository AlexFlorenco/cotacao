function mostrarCotacao(resultado, inverso) {
    console.log(resultado);
    for (const chave in resultado) {
        if (chave === 'result') {
            if (inverso) {
                document.querySelector('#valor1').value = `${resultado[chave]}`;
                return;
            }
            document.querySelector('#valor2').value = `${resultado[chave]}`;
        }
    }
}

let moeda1 = document.querySelector('#moeda1');
moeda1.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor1').value,
        document.getElementById('moeda1').value,
        document.getElementById('moeda2').value,
        false)
})

let valor1 = document.getElementById('valor1')
valor1.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor1').value,
        document.getElementById('moeda1').value,
        document.getElementById('moeda2').value,
        false)
})

let moeda2 = document.querySelector('#moeda2');
moeda2.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor1').value,
        document.getElementById('moeda1').value,
        document.getElementById('moeda2').value,
        false)
})

let valor2 = document.getElementById('valor2')
valor2.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor2').value,
        document.getElementById('moeda2').value,
        document.getElementById('moeda1').value,
        true)
})

function cotacao(valor, fonte, alvo, inverso) {
    var myHeaders = new Headers();
    // myHeaders.append("apikey", "gwK9XyKuscS53i8FaHgXkrJMaeN8CGWR");

    if (fonte === 'Moeda...' || alvo === 'Moeda...') {
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

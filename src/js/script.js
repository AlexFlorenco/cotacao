function mostrarCotacao(result, caso) {
    console.log(result);
    for (const chave in result) {
        if (chave === 'result') {
            if (caso === 2) {
                // console.log('Caso 1');
                document.querySelector('#valor2').value = `${result[chave]}`;
            }
            else if (caso === 1) {
                // console.log('Caso 2');

                document.querySelector('#valor1').value = `${result[chave]}`;

            }
        }

        //     if (chave === 'result') {
        //         console.log(result[chave]);
        //         console.log(result);
        //     }
    }
}

// let from = document.getElementById('moeda1').value;
// let to = document.getElementById('moeda2').value;
// let amount = document.getElementById('valor1').value;

let moeda1 = document.querySelector('#moeda1');
moeda1.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor1').value,
        document.getElementById('moeda2').value,
        document.getElementById('moeda1').value,
        1)
})

let valor1 = document.getElementById('valor1')
valor1.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor1').value,
        document.getElementById('moeda2').value,
        document.getElementById('moeda1').value,
        2)
})

let moeda2 = document.querySelector('#moeda2');
moeda2.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor1').value,
        document.getElementById('moeda2').value,
        document.getElementById('moeda1').value,
        2)
})

let valor2 = document.getElementById('valor2')
valor2.addEventListener('change', () => {
    cotacao(
        document.getElementById('valor2').value,
        document.getElementById('moeda1').value,
        document.getElementById('moeda2').value,
        1)
})

function cotacao(valor, fonte, alvo, caso) {
    var myHeaders = new Headers();
    // myHeaders.append("apikey", "gwK9XyKuscS53i8FaHgXkrJMaeN8CGWR");
    // const access_key = 'NR44ed5npzuK0M2E7Jowhbs8gQOk2yjD';

    if (fonte === 'Moeda...') {
        return;
    }
    if (alvo === 'Moeda...') {
        return;
    }
    if (fonte && document.querySelector('#valor2').value === '') {
        caso = 1;
    }

    fetch(`https://api.apilayer.com/fixer/convert?to=${fonte}&from=${alvo}&amount=${valor}`, {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    })
        .then(response => {
            response.json()
                .then(result => mostrarCotacao(result, caso))
        })
        .catch(error => console.log('error', error));
}

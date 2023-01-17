function mostrarCotacao(result) {
    let cotacao = document.getElementById('resultado');

    for (const chave in result) {
        if (chave === 'info') {
            let textElement = document.createElement("h2");
            let textNode = document.createTextNode(`Cotação atual: ${result[chave].rate} ${result['query'].from}`);
            cotacao.appendChild(textElement.appendChild(textNode))
        }

        if (chave === 'result') {
            console.log(result[chave]);
            console.log(result);
        }
    }
}

const btn = document.getElementById('button').addEventListener('click', () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "NR44ed5npzuK0M2E7Jowhbs8gQOk2yjD");
    const access_key = 'NR44ed5npzuK0M2E7Jowhbs8gQOk2yjD';
    const from = document.getElementById('moeda').value;
    const to = 'BRL';
    let amount = document.getElementById('valor').value;

    fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    })
        .then(response => {
            response.json()
                .then(result => mostrarCotacao(result))
        })
        .catch(error => console.log('error', error));
})

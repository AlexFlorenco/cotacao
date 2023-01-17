function mostrarCotacao(result) {
    let cotacao = document.getElementById('conversao');

    for (const chave in result) {
        if (chave === 'result') {
            cotacao.innerHTML = `${result[chave]} ${result['query'].to}`;
        }

        if (chave === 'result') {
            console.log(result[chave]);
            console.log(result);
        }
    }
}

const btn = document.getElementById('converter').addEventListener('click', () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "NR44ed5npzuK0M2E7Jowhbs8gQOk2yjD");
    const access_key = 'NR44ed5npzuK0M2E7Jowhbs8gQOk2yjD';
    const from = document.getElementById('moeda1').value;
    const to = document.getElementById('moeda2').value;
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

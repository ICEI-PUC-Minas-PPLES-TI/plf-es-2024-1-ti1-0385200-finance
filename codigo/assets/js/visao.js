// CARTOES
let divSaldo = document.querySelector("#saldo");
let divEntradas = document.querySelector("#entradas");
let divSaidas = document.querySelector("#saidas");

fetch("dados.json").then((response) => {
    response.json().then((dados) => {
        dados.cartoes.map((cartoes) => {
            divSaldo.innerHTML += `<span> ${cartoes.saldo} </span>`;
            divEntradas.innerHTML += `<span> ${cartoes.entradas} </span>`;
            divSaidas.innerHTML += `<span> ${cartoes.saidas} </span>`;
        })

    })
})
// ENTRADAS E SAIDAS 
let divUl = document.querySelector("#ultrans");

fetch("dados.json").then((response) => {
    response.json().then((dados) => {
        dados.transacao.map((transacao) => {
            divUl.innerHTML += `<li> ${transacao.nome} </li>`;
            divUl.innerHTML += `<li> ${transacao.tipo} </li>`;
            divUl.innerHTML += `<li> ${transacao.data} </li>`;
            divUl.innerHTML += `<li> ${transacao.valor} </li>`;

            
        })
        
    })
})

// METAS
let divMetas = document.querySelector("#metas");

fetch("dados.json").then((response) => {
    response.json().then((dados) => {
        dados.metas.map((metas) => {
            divMetas.innerHTML += `<p> ${metas.valor}</p>`;
            divMetas.innerHTML += `<p> ${metas.data}</p>`;
        })
        
        console.log(metas);
    })
})

let divMetas1 = document.querySelector("#metas1");

fetch("dados.json").then((response) => {
    response.json().then((dados) => {
        dados.metas1.map((metas1) => {
            divMetas1.innerHTML += `<p> ${metas1.valor}</p>`;
            divMetas1.innerHTML += `<p> ${metas1.data}</p>`;
        })
        
        console.log(metas1);
    })
})

let divMetas2 = document.querySelector("#metas2");

fetch("dados.json").then((response) => {
    response.json().then((dados) => {
        dados.metas2.map((metas2) => {
            divMetas2.innerHTML += `<p> ${metas2.valor}</p>`;
            divMetas2.innerHTML += `<p> ${metas2.data}</p>`;
        })
        
        console.log(metas2);
    })
})

// CARTAO
let divBandeira = document.querySelector("#bandeira");
let divNumero = document.querySelector("#numero");
let divNome = document.querySelector("#nome");
let divValidade = document.querySelector("#validade");

fetch("dados.json").then((response) => {
    response.json().then((dados) => {
        dados.cartoes.map((cartoes) => {
            divBandeira.innerHTML += `<span> ${cartoes.bandeira} </span>`;
            divNumero.innerHTML += `<span> ${cartoes.numero} </span>`;
            divNome.innerHTML += `<span> ${cartoes.nome} </span>`;
            divValidade.innerHTML += `<span> ${cartoes.validade} </span>`;
        })
        
    })
})

// CHARTS JS ESTATISTICAS DE GASTOS
const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Viagens', 'Faculdade', 'Alimentos', 'Aluguel', 'Contas', 'Outros'],
      datasets: [{
        label: '% de Gastos',
        data: [20, 15, 10, 10, 20, 5],
        borderWidth: 1
      }]
    },
  });
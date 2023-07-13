/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/livros';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.livros.forEach(item => insertList(item.titulo, item.autor, item.quantidade, item.valor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputBook, inputAuthor, inputQuantity, inputPrice) => {
  const formData = new FormData();
  formData.append('titulo', inputBook);
  formData.append('autor', inputAuthor);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);

  let url = 'http://127.0.0.1:5000/livro';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u2717 ");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const tituloItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja remover?")) {
        div.remove()
        deleteItem(tituloItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/livro?titulo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com titulo, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputBook = document.getElementById("newInput").value;
  let inputAuthor = document.getElementById("newAuthor").value;
  let inputQuantity = document.getElementById("newQuantity").value;
  let inputPrice = document.getElementById("newPrice").value;

  if (inputBook === '') {
    alert("Digite o título do livro!");
  }
  
  else if (inputAuthor === '') {
    alert("Digite autor!");
  }
  
  else if (inputQuantity === '') {
    alert("Digite a quantidade!");
  }

  else if (inputPrice === '') {
    alert("Digite o valor!");
  }
  
  else if (isNaN(inputQuantity)) {
    alert("Quantidade precisa ser números!");
  }

  else if (isNaN(inputPrice)) {
    alert("Valor precisam ser números!");
  }
  
  else {
    insertList(inputBook, inputAuthor, inputQuantity, inputPrice)
    postItem(inputBook, inputAuthor, inputQuantity, inputPrice)
    alert("Livro adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameBook, author, quantity, price) => {
  var item = [nameBook, author, quantity, price]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newAuthor").value = "";
  document.getElementById("newQuantity").value = "";
  document.getElementById("newPrice").value = "";

  removeElement()
}
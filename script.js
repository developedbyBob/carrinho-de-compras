//Função fabrica para gerar objtos de produto
function criarProduto(nome, preco) {
    return {
        nome, 
        preco
    };
}

//Função construtora para criar o carrinho de compras
function Carrinho() {
    let produtos = []

    //Closure adicionar produto
    this.adicionarProduto = function (produto) {
        produtos.push(produto);
        this.notificar('Produto adcionado: ' + produto.nome)
        return produtos
    }

    this.removerProduto = function(nomeProduto) {
        produtos = produtos.filter(produto => produto.nome !== nomeProduto);
        this.notificar('Produto removido: ' + nomeProduto);
        return produtos
    }

    this.calcularTotal = function() {
        const total = produtos.reduce((acc, produto) => acc + produto.preco, 0);
        this.notificar('Total calculado: R$' + total.toFixed(2));
        return total
    }

    //Callback para notificar o usuario
    this.notificar = function(mensagem) {
        console.log(mensagem)
    }

    // Função geradora para iterar sobre os produtos no carrinho
    this.iterarProdutos = function* () {
        for (const produto of produtos) {
            yield produto
        };
    }
}

// Função imediata (IIFE) para inicializar a aplicação
(function() {
    const carrinho = new Carrinho();

    const produto1 = criarProduto('Maçã', 2.5); 
    const produto2 = criarProduto('Banana', 3.0);
    const produto3 = criarProduto('Laranja', 1.5);
    const produto4 = criarProduto('Pera', 2.0);

    carrinho.adicionarProduto(produto1)
    carrinho.adicionarProduto(produto2)
    carrinho.adicionarProduto(produto3)
    carrinho.adicionarProduto(produto4)

    carrinho.calcularTotal()

    carrinho.removerProduto('Banana')

    carrinho.calcularTotal()

    // Função recursiva para aplicar desconto
    function aplicarDesconto(produtos, desconto) {
        if (produtos.length === 0) return 0;
        const [produto, ...restante] = produtos;
        produto.preco *= (1 - desconto);
        return produto.preco + aplicarDesconto(restante, desconto)
    }

    const iteração = [...carrinho.iterarProdutos()];

    const totalComDesconto = aplicarDesconto(iteração, 0.1);
    console.log('Total com desconto: R$' + totalComDesconto.toFixed(2))
})()
-- Active: 1673882407578@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

PRAGMA table_info ('users');

DROP * FROM users;

SELECT * FROM users;

INSERT INTO
    users (id, email, password)
VALUES (
        'a01',
        'lucas@labenu.com',
        'Lucas1988!'
    ), (
        'a02',
        'andre@labenu.com',
        'Andre1987!'
    ), (
        'a03',
        'juliana@labenu.com',
        'Juliana1989!'
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

PRAGMA table_info ('products');

DROP TABLE products;

SELECT * FROM products;

INSERT INTO
    products (id, name, price, category)
VALUES (
        'p01',
        'Tênis',
        1250,
        'Calçados'
    ), (
        'p02',
        'Ipad',
        2500,
        'Eletrônicos'
    ), (
        'p03',
        'Colar de Diamante',
        5450,
        'Jóias'
    ), (
        'p04',
        'Apple Watch',
        5000,
        'Eletrônicos'
    ), (
        'p05',
        'Sandália',
        450,
        'Calçados'
    );

-- exercício 1

-- Get All Users

-- retorna todos os usuários cadastrados

SELECT * FROM users;

-- Get All Products

-- retorna todos os produtos cadastrados

SELECT * FROM products;

-- Search Product by name

-- mocke um termo de busca, por exemplo "monitor"

-- retorna o resultado baseado no termo de busca

SELECT * FROM products WHERE name = 'Ipad';

-- Create User

-- mocke um novo usuário

-- insere o item mockado na tabela users

INSERT into
    users (id, email, password)
VALUES (
        'a04',
        'bobynho@labenu.com',
        'Bobynho2019!'
    );

-- Create Product

-- mocke um novo produto

-- insere o item mockado na tabela products

INSERT into
    products (id, name, price, category)
VALUES (
        'p06',
        'TV Smart 70 polegadas',
        7500,
        'Eletrõnicos'
    );

-- exercício 2

-- Get Products by id

-- mocke uma id

-- busca baseada no valor mockado

SELECT * FROM products WHERE id = 'p03';

-- Delete User by id

-- mocke uma id

-- delete a linha baseada no valor mockado

DELETE FROM users WHERE id = 'a02';

-- Delete Product by id

-- mocke uma id

-- delete a linha baseada no valor mockado

DELETE FROM products WHERE id = 'p02';

-- Edit User by id

-- mocke valores para editar um user

-- edite a linha baseada nos valores mockados

UPDATE users
SET
    email = 'lucaseditado@labenu.com',
    password = 'Lucaseditado1988!'
WHERE id = 'a01';

-- Edit Product by id

-- mocke valores para editar um product

-- edite a linha baseada nos valores mockados

UPDATE products
SET
    name = 'Tênis editado',
    price = 1350,
    category = 'Calçados editado'
WHERE id = 'p01';

-- exercício 3

-- Copie as queries do exercício 1 e refatore-as

-- Get All Users

-- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT * FROM users ORDER BY email ASC;

-- Get All Products versão 1

-- retorna o resultado ordenado pela coluna price em ordem crescente

-- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products ORDER BY price ASC LIMIT 20;

-- Get All Products versão 2

-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00

-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente

SELECT *
FROM products
WHERE
    price >= 500
    AND price <= 5500
ORDER BY price ASC;

-- Exercício 1
-- Agora que sabemos como implementar relações do tipo 1:m e 1:1, vamos refatorar a estrutura do Labecommerce!
-- Por ora não precisaremos editar as tabelas já existentes (users e products). Nosso objetivo hoje é criar a tabela de pedidos (purchases).
-- Na próxima aula veremos como criar a lógica para adicionar produtos em uma ordem de pedido.

-- Criação da tabela de pedidos
-- nome da tabela: purchases
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- total_price (REAL, único e obrigatório)
-- paid (INTEGER e obrigatório)
-- delivered_at (TEXT e opcional)
-- buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)
-- Observações
-- A coluna paid será utilizada para guardar uma lógica booleana. O SQLite recomenda o uso do número 0 para false e 1 para true.
-- Os pedidos começam com paid valendo 0 e quando o pagamento for finalizado, se atualiza para 1.

-- A coluna delivered_at será utilizada para gerenciar a data de entrega do pedido. Ela é opcional, porque sempre começará sem valor ao criar um pedido, ou seja, null.
-- O SQLite recomenda utilizar TEXT para lidar com strings no formato ISO8601 "aaaa-mm-dd hh:mm:sss". 
-- Lembre-se da existência da função nativa DATETIME para gerar datas nesse formato.

DROP TABLE purchases;

CREATE Table purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivery_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- Exercício 2
-- Popule sua tabela de pedidos, criada no exercício anterior.
-- Por enquanto não se preocupe em adicionar produtos ao pedido, veremos isso na aula que vem.
-- Com isso em mente, crie um valor aleatório para o preço total do pedido.

-- a) Crie dois pedidos para cada usuário cadastrado
-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) e devem iniciar com a data de entrega nula.

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ('pu001', 50.99, 0, 'a01'),
    ('pu002', 41.30, 0, 'a01'),
    ('pu003', 12.50, 0, 'a03'),
    ('pu004', 10.99, 0, 'a03');

SELECT * FROM purchases;

-- b) Edite o status da data de entrega de um pedido
-- Simule que o pedido foi entregue no exato momento da sua edição (ou seja, data atual).

UPDATE purchases
SET
    delivery_at = DATETIME('now')
WHERE id = 'pu001';

-- Exercício 3
-- Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.
-- Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = 'a01';


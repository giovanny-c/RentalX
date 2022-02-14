# Cadastro de carro

**Requisitos funcionais**
    Deve ser possivel cadastrar um novo carro 

    Deve ser Possivel listar todas as categorias   
**Requisitos nao funcionais**

**Regras de negocio**
    Nao deve ser possivel cadastrar um carro com uma placa já existente

    Não deve ser possivel alterar a placa de um carro já cadastrado

    O carro deve ser cadastrado por padrao, como disponivel

    O usuario responasavel pelo cadastro deve ser um admin


# Listagem de caros

**RF**
    Deve ser possivel listar todos os carros disponiveis

    Deve ser possivel listar todos os carros disponiveis  
    pela categoria
    
    Deve ser possivel listar todos os carros disponiveis  pela marca do carro

    Deve ser possivel listar todos os carros disponiveis  pelo nome


**RNF**

**RN**
    O usuario nao precisa estar logado no sistema para listar os carros


# Cadastro de Especificaçao no carro

**RF**
    Deve ser possivel cadastrar uma especificação para um carro

    Deve ser possivel lista todas as especificaçoes

    Deve ser possivel listar todos os carros
**RNF**

**RN**
    Não deve ser possivel cadastrar um especificação para um carro nao cadastrado

    Não deve ser possivel cadastrar um especificação ja existente para o mesmo carro nao cadastrado

    O usuario responasavel pelo cadastro deve ser um admin


# Cadastro de imagens do carro

**RF**
    Deve ser possivel cadastrar a imagem do carro

    Deve ser possivel listar todos os carros

**RNF**
    Utilizar o multer para upload dos arquivos

**RN**
    O usuario pode cadastra mais de uma imagem para o mesmo carro

    O usuario responasavel pelo cadastro deve ser um admin


# Aluguel de carro

**RF**
    Deve ser possivel cadastrar um aluguel

**RNF**


**RN**
    O aluguel deve ter duração minima de 24 horas

    O usuario só poderá alugar um veiculo por vez

    Um carro só deverá ser alugado por um usuario por vez

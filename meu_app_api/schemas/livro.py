from pydantic import BaseModel
from typing import Optional, List
from model.livro import Livro




class LivroSchema(BaseModel):
    """ Define como um novo livro a ser inserido deve ser representado
    """
    titulo: str = "Jornada Python"
    autor: str = "teste"
    quantidade: Optional[int] = 2
    valor: float = 61.50


class LivroBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no nome do livro.
    """
    titulo: str = "Teste"


class ListagemLivrosSchema(BaseModel):
    """ Define como uma listagem de livros será retornada.
    """
    livros:List[LivroSchema]


def apresenta_livros(livros: List[Livro]):
    """ Retorna uma representação do livro seguindo o schema definido em
        LivroViewSchema.
    """
    result = []
    for livro in livros:
        result.append({
            "titulo": livro.titulo,
            "autor": livro.autor,
            "quantidade": livro.quantidade,
            "valor": livro.valor,
        })

    return {"livros": result}


class LivroViewSchema(BaseModel):
    """ Define como um livro será retornado: livro + comentários.
    """
    id: int = 1
    titulo: str = "Jornada Python"
    autor: str = "teste"
    quantidade: Optional[int] = 2
    valor: float = 61.50
    


class LivroDelSchema(BaseModel):
    """ Define como deve ser a estrutura do dado retornado após uma requisição
        de remoção.
    """
    mesage: str
    nome: str

def apresenta_livro(livro: Livro):
    """ Retorna uma representação do livro seguindo o schema definido em
        LivroViewSchema.
    """
    return {
        "id": livro.id,
        "titulo": livro.titulo,
        "autor": livro.autor,
        "quantidade": livro.quantidade,
        "valor": livro.valor,
        
    }

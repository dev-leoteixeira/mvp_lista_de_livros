from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from  model import Base


class Livro(Base):
    __tablename__ = 'livro'

    id = Column("pk_livro", Integer, primary_key=True)
    titulo = Column(String(140), unique=True)
    autor = Column(String(140), unique=True)
    quantidade = Column(Integer)
    valor = Column(Float)
    data_insercao = Column(DateTime, default=datetime.now())

   

    def __init__(self, titulo:str, autor:str, quantidade:int, valor:float,
                 data_insercao:Union[DateTime, None] = None):
        """
        Cria um Livro

        Arguments:
            titulo: titulo do livro.
            autor: autor do livro
            quantidade: quantidade que se espera comprar daquele livro
            valor: valor esperado para o livro
            data_insercao: data de quando o livro foi inserido à base
        """
        self.titulo = titulo
        self.autor = autor
        self.quantidade = quantidade
        self.valor = valor

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao

   


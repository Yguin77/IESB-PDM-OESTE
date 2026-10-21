import { createContext, useContext, useState } from 'react';
import { diasAtras } from '../util/data';


export const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Outros']; // use as suas

const INICIAIS = [
  { id: '1', descricao: 'Supermercado', valor: 89.9, categoria: 'Alimentação', data: diasAtras(1) },
  { id: '2', descricao: 'Uber', valor: 24.5, categoria: 'Transporte', data: diasAtras(2) },
  { id: '3', descricao: 'Cinema', valor: 45.0, categoria: 'Lazer', data: diasAtras(4) },
  { id: '4', descricao: 'Conta de luz', valor: 130.0, categoria: 'Contas', data: diasAtras(10) },
  { id: '5', descricao: 'Restaurante', valor: 62.75, categoria: 'Alimentação', data: diasAtras(15) },
];

const DespesasContext = createContext();

export function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(INICIAIS);

  function adicionarDespesa(dados) {
    setDespesas((atual) => [{ ...dados, id: String(Date.now()) }, ...atual]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  function excluirDespesa(id) {
    setDespesas((atual) => atual.filter((d) => d.id !== id));
  }

  return (
    <DespesasContext.Provider
      value={{ despesas, adicionarDespesa, atualizarDespesa, excluirDespesa }}
    >
      {children}
    </DespesasContext.Provider>
  );
}

export function useDespesas() {
  return useContext(DespesasContext);
}
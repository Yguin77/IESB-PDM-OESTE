import DespesaSaida from '../components/despesa/DespesaSaida';
import { useDespesas } from '../context/DespesasContext';
import { diasAtras } from '../util/data';

export default function DespesasRecentes() {
  const { despesas } = useDespesas();
  const limite = diasAtras(7);
  const recentes = despesas.filter((d) => d.data >= limite);

  return <DespesaSaida despesas={recentes} periodo="Últimos 7 dias" />;
}

export interface Product {
  id?: number,
  nome: string,
  descricao: string,
  precoUnitario: number,
  unidade?: string,
  categoria?: string,
  marcaId: number,
  fornecedorId: number,
  faqs?: number[],
}
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';

// TODO: Replace this with your own data model type
// export interface MatTemplateTableItem {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
// const EXAMPLE_DATA: Product[] = [
  // {id: 1, name: 'Hydrogen'},
  // {id: 2, name: 'Helium'},
  // {id: 3, name: 'Lithium'},
  // {id: 4, name: 'Beryllium'},
  // {id: 5, name: 'Boron'},
  // {id: 6, name: 'Carbon'},
  // {id: 7, name: 'Nitrogen'},
  // {id: 8, name: 'Oxygen'},
  // {id: 9, name: 'Fluorine'},
  // {id: 10, name: 'Neon'},
  // {id: 11, name: 'Sodium'},
  // {id: 12, name: 'Magnesium'},
  // {id: 13, name: 'Aluminum'},
  // {id: 14, name: 'Silicon'},
  // {id: 15, name: 'Phosphorus'},
  // {id: 16, name: 'Sulfur'},
  // {id: 17, name: 'Chlorine'},
  // {id: 18, name: 'Argon'},
  // {id: 19, name: 'Potassium'},
  // {id: 20, name: 'Calcium'},
// ];
const EXAMPLE_DATA: Product[] = [
  { id: 1, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Hydrogen" },
  { id: 2, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Helium" },
  { id: 3, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Lithium" },
  { id: 4, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Beryllium" },
  { id: 5, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Boron" },
  { id: 6, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Carbon" },
  { id: 7, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Nitrogen" },
  { id: 8, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Oxygen" },
  { id: 9, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Fluorine" },
  { id: 10, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Neon" },
  { id: 11, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Sodium" },
  { id: 12, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Magnesium" },
  { id: 13, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Aluminum" },
  { id: 14, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Silicon" },
  { id: 15, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Phosphorus" },
  { id: 16, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Sulfur" },
  { id: 17, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Chlorine" },
  { id: 18, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Argon" },
  { id: 19, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Potassium" },
  { id: 20, precoUnitario: 199.35, marcaId: 1, fornecedorId: 1, descricao: "Esta é uma descrição de ", nome: "Calcium" },
];

/**
 * Data source for the MatTemplateTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
// export class MatTemplateTableDataSource extends DataSource<MatTemplateTableItem> {
//   data: MatTemplateTableItem[] = EXAMPLE_DATA;
export class MatTemplateTableDataSource extends DataSource<Product> {
  data: Product[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {
        case "name":
          return compare(a.nome, b.nome, isAsc);
        case "id":
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

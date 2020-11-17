import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';
import { MatTemplateTableDataSource } from './mat-template-table-datasource';

@Component({
  selector: 'app-mat-template-table',
  templateUrl: './mat-template-table.component.html',
  styleUrls: ['./mat-template-table.component.css']
})
export class MatTemplateTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatTable) table: MatTable<MatTemplateTableItem>;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: MatTemplateTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.dataSource = new MatTemplateTableDataSource();
    
    this.productService.getList().subscribe((list) => {
      this.dataSource.data = list;
      console.table(list);
    }); 
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

import { Component, OnInit } from '@angular/core';

// Servicios
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe((data: any) => {
      console.log('respuesta categorias', data);
      this.processCategoriesResponse(data);
    },
    (error: any) => {
      console.log('error:', error);
    });
  }

  processCategoriesResponse(resp: any): void {
    const dataCategory: CategoryElement[] = [];

    if (resp.metadata[0].code === '00') {
      const listCategory: any = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}

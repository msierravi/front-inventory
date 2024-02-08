import { Component, OnInit } from '@angular/core';

// Servicios
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog, private snackBar: MatSnackBar) { }

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

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1){
        this.openSnackBar('Categoría agregada', 'Exitosa');
        this.getCategories();
      }
      else if (result === 2) {
        this.openSnackBar('Se produjo un error al guardar la categoría', 'Error');
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}

export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}

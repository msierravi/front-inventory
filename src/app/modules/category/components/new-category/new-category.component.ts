import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Servicios
import { CategoryService } from '../../../shared/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private dialogRef: MatDialogRef<NewCategoryComponent>) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required]
      }
    );
  }

  onSave(): void {
    const data: any = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    };

    this.categoryService.saveCategorie(data)
    .subscribe(dataResult => {
      console.log('dataResult', dataResult);

      // Devuelve el control al componente que lo llamó
      this.dialogRef.close(1);
    },
    (error: any) => {
      // Devuelve el control al componente que lo llamó
      this.dialogRef.close(2);
    });
  }

  onCancel(): void {
    this.dialogRef.close(3);
  }
}

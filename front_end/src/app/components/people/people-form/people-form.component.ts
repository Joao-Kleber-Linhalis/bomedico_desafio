import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PeopleService } from '../../../services/people/people.service';
import { ToastrService } from 'ngx-toastr';
import { People } from '../../../models/people';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CepService } from '../../../services/cep/cep.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-people-form',
  imports: [FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule
  ],

  templateUrl: './people-form.component.html',
  styleUrl: './people-form.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class PeopleFormComponent implements OnInit {

  inputData: any;
  isCreate: boolean = true;
  form!: FormGroup;
  people: People = {
    first_name: '',
    last_name: '',
    state: '',
    city: '',
    phone: '',
    email: '',
    cep: '',
  }




  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PeopleFormComponent>,
    private service: PeopleService,
    private toast: ToastrService,
    private cepService: CepService,
  ) { }


  ngOnInit(): void {
    this.inputData = this.data
    console.log(this.inputData)
    if (this.inputData.people != null) {
      this.findById(this.inputData.people)
      this.isCreate = false;
    }
    this.form = new FormGroup({
      first_name: new FormControl(this.people.first_name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      last_name: new FormControl(this.people.last_name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      email: new FormControl(this.people.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      phone: new FormControl(this.people.phone, [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(11),
        Validators.minLength(11),
      ]),
      cep: new FormControl(this.people.cep, [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
      ]),

      state: new FormControl({ value: this.people.state, disabled: true }, [Validators.required]),
      city: new FormControl({ value: this.people.city, disabled: true }, [Validators.required]),
    });
  }

  findById(id: any) {
    console.log(id),
      this.service.findById(id).subscribe({
        next: (response) => {
          this.people = response
        },
        error: () => {
          this.closeDialog("Erro")
        }
      });
  }

  closeDialog(type: String = "Cancel") {
    this.dialogRef.close({ title: this.inputData.title, type: type });
  }

  save() {
    if (this.form.valid && this.validateFields()) {
      const action = this.isCreate ? 'criação' : 'atualização';
      const request = this.isCreate ? this.service.create(this.people) : this.service.update(this.people);

      request.subscribe({
        complete: () => this.closeDialog("Sucesso"),
        error: (e) => this.handleError(e, action),
      });
    } else {
      this.toast.info("Preencha os campos obrigatórios.", "Informação");
    }
  }

  getCep() {
    if (this.form.value.cep?.length === 8) {
      this.cepService.findCep(this.form.value.cep).subscribe({
        next: (response) => {
          this.people.city = response.localidade,
            this.people.state = response.estado
        },
        error: (e) => {
          this.toast.error("Erro ao obter informações do CEP", "ERRO");
          console.log(e);
        }
      })
    }
  }

  validateFields(): boolean {
    const phone = this.form.value.phone;
    const cep = this.form.value.cep;

    if (!/^\d+$/.test(phone)) {
      this.toast.warning('O campo Telefone deve conter apenas números', 'Atenção');
      return false;
    }

    if (!/^\d+$/.test(cep)) {
      this.toast.warning('O campo CEP deve conter apenas números', 'Atenção');
      return false;
    }

    return true;
  }

  private handleError(error: any, action: string) {
    this.toast.error(error, `Erro na ${action}`);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { People } from '../../../models/people';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PeopleService } from '../../../services/people/people.service';
import { PeopleFormComponent } from '../people-form/people-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-people-list',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class PeopleListComponent implements OnInit {


  constructor(
    private service: PeopleService,
    private toast: ToastrService,
    private dialogRef: MatDialog,
  ) { }

  @ViewChild('table', { static: true })
  table!: MatTable<People>;

  ELEMENT_DATA: People[] = [];
  displayedColumns: string[] = ['name', 'state', 'city', 'actions'];
  dataSource = new MatTableDataSource<People>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }

  findAll(needToast: boolean = true) {
    this.service.findAll().subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response;
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: (e) => {
        this.toast.error("Erro no Carregamento das pessoas", "ERRO");
        console.log(e);
      },
    });
  }

  delete(id: any, name: string) {
    if (confirm("Deseja excluir a pessoa: " + name)) {
      this.service.delete(id).subscribe({
        complete: () => {
          this.toast.success("Pessoa excluída com sucesso", "Exclusão");
          this.findAll(false);
        },
        error: (e) => {
          this.toast.error("Erro durante exclusão de pessoa", "ERRO");
          console.log(e);
        }
      });
    }
  }

  openFormDialog(people?: People) {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: people != null ? "Edição" : "Cadastro",
      people: people?._id
    }
    var _popup = this.dialogRef.open(PeopleFormComponent, dialogConfig);
    _popup.afterClosed().subscribe(close => {
      if (!close?.type) {
        this.toast.info("Formulário fechado pelo usuário", "Formulário")
      }
      else if (close.type === null || close.type === "Cancel") {
        this.toast.info(`${close.title} de pessoa cancelada`, close.title)
      }
      else if (close.type === "Error") {
        this.toast.error(`Erro na ${close.title}`, "Erro")
      }
      else {
        this.toast.success(`${close.title} de pessoa concluída`, close.title)
      }
      this.findAll(false)
    })
  }

  generateReport(camp: string): void {
    this.service.generateReport(camp).subscribe({
      next: (response) => {
        const blobUrl = URL.createObjectURL(response);
        window.open(blobUrl, '_blank');
      },
      error: (e) => {
        this.toast.error("Erro ao gerar relatório", "ERRO");
        console.log(e);
      }
    })

  }
}

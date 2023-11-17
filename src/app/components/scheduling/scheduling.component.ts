import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SchedulingService } from 'src/app/core/service/scheduling.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  public appointments: any;


  constructor(
    private router: Router,
    public datePipe: DatePipe,
    private schedulingService: SchedulingService
  ) { }

  ngOnInit(): void {
    this.findSchedulingByUserId()
  }

  findSchedulingByUserId() {
    this.schedulingService.findByUserId().subscribe(data => {
      this.appointments = data;
    });
  }

  cancel(id: number) {
    this.schedulingService.delete(id).subscribe(data => {
      this.findSchedulingByUserId()
      this.alertSuccess('Consulta cancelada com sucesso!')
    }, error => {
      this.alertError('Ocorreu um erro ao cancelar a consulta.')
    }
    );
  }

  alertSuccess(message: string) {
    Swal.fire({
      title: `<h5 style="color:green">${message}</h5>`,
      icon: 'success',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

  alertError(message: string) {
    Swal.fire({
      title: `<h5>${message}</h5>`,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

}

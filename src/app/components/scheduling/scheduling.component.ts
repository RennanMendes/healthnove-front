import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SchedulingService } from 'src/app/core/service/scheduling.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalSchedulingComponent } from '../modal-scheduling/modal-scheduling.component';

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
    private modalService: NgbModal,
    private schedulingService: SchedulingService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.findSchedulingByUserId()
  }

  findSchedulingByUserId() {
    this.schedulingService.findByUserId().subscribe(data => {
      this.appointments = data;
      this.cdRef.detectChanges()
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

  openModal() {
    const modalRef = this.modalService.open(ModalSchedulingComponent)
    
    modalRef.result.then((document) => {
      this.findSchedulingByUserId()
    }).catch((error) => {
      console.log(error);
    });
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

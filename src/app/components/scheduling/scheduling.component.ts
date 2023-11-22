import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SchedulingService } from 'src/app/core/service/scheduling.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalSchedulingComponent } from '../modal-scheduling/modal-scheduling.component';
import { UserService } from 'src/app/core/service/user.service';

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
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.findSchedulingByUserId()
    this.tokenIsvalid();
  }

  findSchedulingByUserId() {
    this.schedulingService.findByUserId().subscribe(data => {
      this.appointments = data;
      this.cdRef.detectChanges()
    });
  }

  cancel(id: number) {
    Swal.fire({
      title: 'ATENÇÃO!',
      text: 'Deseja realmente cancelar esta consulta?',
      showCancelButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO',
      icon: 'warning'
    }).then((result) => {
      if (result.value) {
        this.schedulingService.delete(id).subscribe(data => {
          this.findSchedulingByUserId()
          this.alertSuccess('Consulta cancelada com sucesso!')
        }, error => {
          this.alertError('Ocorreu um erro ao cancelar a consulta.')
        }
        );
      }
    })

  }

  openModal(id: number | null) {
    const modalRef = this.modalService.open(ModalSchedulingComponent)

    modalRef.componentInstance.id = id;

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

  tokenIsvalid() {
    const token = localStorage.getItem('token') ?? '';

    const currentTime = Date.now() / 1000;
    const decodedToken = this.userService.decodeToken(token);

    if (decodedToken.exp < currentTime) {
      localStorage.clear();
      this.alertError("Seu token expirou, faça o login novamente!")
      this.router.navigate(['/login'])
    }
  }

}

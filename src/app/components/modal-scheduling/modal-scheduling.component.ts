import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedulingService } from 'src/app/core/service/scheduling.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';

interface Appointment {
  doctor: string;
  speciality: string;
  date: any;
  time: any;
}

@Component({
  selector: 'app-modal-scheduling',
  templateUrl: './modal-scheduling.component.html',
  styleUrls: ['./modal-scheduling.component.css']
})
export class ModalSchedulingComponent implements OnInit {

  @Input()
  id: number | null;

  form!: FormGroup;
  doctors: any[];
  specialityIsSelected: boolean = true
  appointment: Appointment;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private schedulingService: SchedulingService
  ) {
    this.appointment = {
      doctor: '',
      speciality: '',
      date: '',
      time: ''
    }
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.findSchedulingById()
    }

    this.form = this.formBuilder.group({
      doctor: new FormControl(this.appointment.doctor, Validators.required),
      speciality: new FormControl(this.appointment.speciality, Validators.required),
      date: new FormControl(this.appointment.date, Validators.required),
      time: new FormControl(this.appointment.time, Validators.required)
    });

    this.tokenIsvalid()
  }

  findBySpeciality(speciality: string) {
    this.schedulingService.findByDoctorSpeciality(speciality).subscribe(data => {
      if (data.content.length <= 0) {
        this.alertError("Nenhum médico disponivel nesta especialidade!")
      } else {
        this.specialityIsSelected = false
        this.doctors = data.content
      }
    });
  }

  save() {
    if (this.form.valid) {
      let date = this.form.get('date')?.value;
      let time = this.form.get('time')?.value;

      let appointmentRequestDto = {
        appointmentDate: date + 'T' + time + ':00',
        doctorId: this.form.get('doctor')?.value,
        userId: localStorage.getItem('id')
      }

      if (this.id !== null) {
        this.schedulingService.delete(this.id).subscribe(data => {
          this.schedulingService.register(appointmentRequestDto).subscribe(
            (resp: any) => {
              this.alertSuccess("Consulta agendada com sucesso!");
              this.activeModal.close();
            },
            (error) => {
              this.alertError(error.error);
            }
          );
        });
      } else {
        this.schedulingService.register(appointmentRequestDto).subscribe(
          (resp: any) => {
            this.alertSuccess("Consulta agendada sucesso!");
            this.activeModal.close();
          },
          (error) => {
            this.alertError(error.error);
          }
        );
      }


    }
  }

  findSchedulingById() {
    this.schedulingService.findSchedulingById(this.id).subscribe(data => {
      let date = new Date(data.date);

      this.appointment = {
        doctor: data.doctorDto.id,
        speciality: data.doctorDto.speciality,
        date: date.toISOString().split('T')[0],
        time: date.toISOString().split('T')[1].slice(0, 5)
      }

      this.form.patchValue(this.appointment);
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
      title: '400',
      text: message,
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
      Swal.fire({
        title: 'Erro',
        text: "Seu token expirou, faça o login novamente!",
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
        showConfirmButton: false,
      });
      this.activeModal.close();
      this.router.navigate(['/login'])
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SchedulingService } from 'src/app/core/service/scheduling.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-scheduling',
  templateUrl: './modal-scheduling.component.html',
  styleUrls: ['./modal-scheduling.component.css']
})
export class ModalSchedulingComponent implements OnInit {

  form!: FormGroup;
  doctors: any[];
  specialityIsSelected: boolean = true

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private schedulingService: SchedulingService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      doctor: new FormControl('', Validators.required),
      speciality: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });
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

  register() {
    if (this.form.valid) {
      let date = this.form.get('date')?.value;
      let time = this.form.get('time')?.value;

      let appointmentRequestDto = {
        appointmentDate: date + 'T' + time + ':00',
        doctorId: this.form.get('doctor')?.value,
        userId: localStorage.getItem('id')
      }

      this.schedulingService.register(appointmentRequestDto).subscribe(
        (resp: any) => {
          this.alertSuccess("Usuário cadastrado com sucesso!");
          this.activeModal.close();
        },
        (error) => {
          this.alertError("Horário de funcionamento de segunda a sexta das 8h as 19h");
        }
      );

    }
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
      title: `<h5>Erro:</h5>`,
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

}

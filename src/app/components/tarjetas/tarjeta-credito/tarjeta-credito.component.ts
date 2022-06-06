import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription: Subscription;

  constructor(private formBuilder: FormBuilder, 
              private tarjetaService: TarjetaService,
              private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['',[Validators.required]],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],      
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],    
      cvv: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })
   }

  ngOnInit(): void {
    this.suscription = this.tarjetaService.obtenerTarjeta$().subscribe(data => {
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  guardarTarjeta(){
    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value,
    }
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data =>{
      
      this.toastr.success('Registro Guardado', 'La tarjeta fue creada')
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
    });
  }

}

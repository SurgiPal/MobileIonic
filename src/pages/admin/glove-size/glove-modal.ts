import { GloveSizeService } from './glove-size.service';
import { Param } from './../../../models/param';
import { Component } from '@angular/core';
import { Platform, NavParams, ViewController  } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({ 
  templateUrl: './../param.modal.html' 
}) 
export class ParamModal 
{ 
  
  private paramForm: FormGroup;
  param : Param; 
  public paramTitle: string= "Glove Size";
  constructor(private formBuilder: FormBuilder,
  private _service: GloveSizeService,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  )
  { 
    this.param = this.params.get('p'); 
    if (this.param===undefined){ 
      this.param = new Param(-1,'');
      this.paramTitle = "Add Glove Size"; 
    } 
    this.paramForm = this.formBuilder.group({
      id:[this.param.id],
      name: [this.param.name, Validators.compose([Validators.minLength(1), Validators.maxLength(3), Validators.pattern('-?[0-9]*(\.[0-9]+)?'), Validators.required])]
    });   
  } 
 
  logForm()
  {
    if (this.paramForm.get('id').value==-1){
      this._service.create(this.paramForm.get('name').value).then(data =>
      {
        this.dismiss('Created ' + this.paramForm.get('name').value); 
      })
        .catch(error =>
        {
          this.dismiss('Error: ' + error.toString());
        }); 
    }
    else
    {
      this.onUpdate(this.paramForm.value);
    }
 
  }
  onUpdate(p: Param)
  { 
    console.log('Updateing:' + p);
   // this.presentLoading();
    this._service.update(p)
      .then(res =>
      {
        this.dismiss('Updated paramter'); 
      })
      .catch(error =>
      {
        this.dismiss('Error: ' + error.toString());
      });
  }
  dismiss(msg:string)
  {
    this.viewCtrl.dismiss(msg);
  }
}
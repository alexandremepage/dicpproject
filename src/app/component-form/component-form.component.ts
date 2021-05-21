import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PostService } from '../services/post.service';

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.less', './component-form.component.css']
})
export class ComponentFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private postServ: PostService) { }

  SERVER_URL = "http://localhost:4200/";
  API= "http://localhost:3000/api/";

  booSubmit = false;

  patternTahitiNumber = "/T[a-zA-Z0-9][0-9]{0,4}/";

  questions = [
    {id: "justificatif", name: "Justificatif DICP"},
    {id: "contentious", name: "Contentieux"},
    {id: "declaration", name: "Déclaration"}
  ];

  dcipForm = this.formBuilder.group({ 
    selectQuestion: null,
    userEmail: ['', Validators.required, Validators.email],
    tahitiNumber: ['', [Validators.required, Validators.pattern(this.patternTahitiNumber)]],
    commentary: ['', Validators.required],
    fileDeclaration: ''
  });

  get selectQuestion() {
    return this.dcipForm.get('selectQuestion');
  }

  get tahitiNumber() {
    return this.dcipForm.get('tahitiNumber');
  }

  get userEmail() {
    return this.dcipForm.get('userEmail');
  }

  get commentary() {
    return this.dcipForm.get('commentary');
  }

  get fileDeclaration() {
    return this.dcipForm.get('fileDeclaration');
  }

  getSelVal() {
    const selectQuestion = this.dcipForm.value.selectQuestion;
    return selectQuestion;
  }

  emailRequired() {
    const email = this.dcipForm.controls.userEmail;
    return email.hasError('required');
  }

  tahitiNumberRequired() {
    const tahitiNumber = this.dcipForm.controls.tahitiNumber;
    return tahitiNumber.hasError('required');
  }
  
  tahitiNumberInvalid() {
    const tahitiNumber = this.dcipForm.controls.tahitiNumber;
    console.log("patt",tahitiNumber.hasError('pattern'))
    return tahitiNumber.hasError('pattern');
  }

  commentaryRequired() {
    const commentary = this.dcipForm.controls.commentary;
    return commentary.hasError('required');
  }

  fileDeclarationRequired() {
    const fileDeclaration = this.dcipForm.controls.fileDeclaration;
    return fileDeclaration.hasError('required');
  }

  ngOnInit() {

  }

  submit() {
    console.log("Form Submitted");
    this.booSubmit = true;

    this.postServ.create(this.dcipForm.value).subscribe(
      data => console.log("success", data),
      error => console.error("error", error)
    );

    /*const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(this.dcipForm.value);
    console.log(body)
    return this.httpClient.post(
      this.API, 
      body,
      {'headers':headers}
    
    ).subscribe((response : any)=>{
      console.log(response);//On success response
    },(errorResponse : any)=>{
      console.log(errorResponse);//On unsuccessful response
    });*/

    /*this.httpClient.post(this.API, 
      this.dcipForm.value,
      {
        headers : new HttpHeaders().set("Content-Type","application/json")
      }
      
    ).subscribe((response : any)=>{
      console.log(response);//On success response
    },(errorResponse : any)=>{
      console.log(errorResponse);//On unsuccessful response
    });*/

  }

  onReset() {
    this.booSubmit = false;
    this.dcipForm.reset();
  }


}

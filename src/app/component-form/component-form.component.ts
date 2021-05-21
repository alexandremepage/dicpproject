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

  patternTahitiNumber = "T[a-zA-Z0-9][0-9]{4}";

  questions = [
    {id: "justificatif", name: "Justificatif DICP"},
    {id: "contentious", name: "Contentieux"},
    {id: "declaration", name: "Déclaration"}
  ];

  dcipForm = this.formBuilder.group({ 
    selectQuestion: null,
    userEmail: '',
    tahitiNumber: '',
    commentary: '',
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
    
    this.booSubmit = true;

    if (this.dcipForm.valid) {

      console.log("Form Submitted");
      
      this.postServ.create(this.dcipForm.value).subscribe(
        data => console.log("success", data),
        error => console.error("error", error)
      );

      this.onReset();
    } else {
      console.log("Form not submitted");
    }
  }

  onReset() {
    this.booSubmit = false;
    this.dcipForm.reset();
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.dcipForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

}

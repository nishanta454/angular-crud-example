import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../rule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RuleModel } from '../../rule.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number
  rule: RuleModel;
  form: FormGroup;

  constructor(
    public ruleService: RuleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.ruleService.find(this.id).subscribe((data: RuleModel)=>{
      this.rule = data;
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.ruleService.update(this.id, this.form.value).subscribe(res => {
         console.log('Rule updated successfully!');
         this.router.navigateByUrl('conflict-metadata-rule/index');
    })
  }

}

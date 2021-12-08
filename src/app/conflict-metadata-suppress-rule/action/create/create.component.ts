import { RuleModel } from './../../rule.model';
import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../rule.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  loader = true
  id: number;
  rule: RuleModel;
  form: FormGroup;

  constructor(
    public ruleService: RuleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      alertId: new FormControl('', [Validators.required]),
      fieldName: new FormControl('', [Validators.required]),
      conflictCode: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      emailIds: new FormControl(''),
      active: new FormControl('Y', [Validators.required]),
      suppress: new FormControl('Y', [Validators.required]),
      suppressReason: new FormControl(''),
      messageCopy: new FormControl('')
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.ruleService.create(this.getRuleModel(this.id)).subscribe(() => {
      this.router.navigateByUrl('conflict-metadata-rule/index');
    });
  }

  getRuleModel(id: number) {
    const rule = new RuleModel()
    rule.alert_id = this.form.value.alertId
    rule.prog_rule_sgk = id
    rule.conflict_code = this.form.value.conflictCode
    rule.field_name = this.form.value.fieldName
    rule.supress_message = this.form.value.suppress
    rule.suppress_reason = this.form.value.suppressReason
    rule.eff_start_dt = this.form.value.startDate
    rule.eff_end_dt = this.form.value.endDate
    rule.email_ids = this.form.value.emailIds
    rule.message_copy = this.form.value.messageCopy
    return rule
  }
}

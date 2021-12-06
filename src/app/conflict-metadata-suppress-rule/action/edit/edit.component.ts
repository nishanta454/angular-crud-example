import { RuleModel } from './../../rule.model';
import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../rule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number;
  rule: RuleModel;
  form: FormGroup;

  constructor(
    public ruleService: RuleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['ruleId'];
    this.ruleService.find(this.id).subscribe((data: RuleModel) => {
      this.rule = data;
      console.log(data)
      this.form.setValue({
        alertId: this.rule.alert_id,
        fieldName: this.rule.field_name,
        conflictCode: this.rule.conflict_code,
        startDate: this.rule.eff_start_dt,
        endDate: this.rule.eff_end_dt,
        emailIds: this.rule.email_ids,
        active: this.rule.active_ind,
        suppress: this.rule.supress_message,
        suppressReason: this.rule.suppress_reason,
        messageCopy: this.rule.message_copy
      });
    });

    this.form = new FormGroup({
      alertId: new FormControl('', [Validators.required]),
      fieldName: new FormControl('', [Validators.required]),
      conflictCode: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      emailIds: new FormControl(''),
      active: new FormControl(''),
      suppress: new FormControl('', [Validators.required]),
      suppressReason: new FormControl(''),
      messageCopy: new FormControl('')
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.ruleService.update(this.id, this.getRuleModel(this.id)).subscribe(() => {
      console.log('Rule updated successfully!');
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

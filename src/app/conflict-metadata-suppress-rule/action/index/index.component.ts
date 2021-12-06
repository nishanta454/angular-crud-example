import { DialogContent } from './../../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../rule.service';
import { Router } from "@angular/router"
import { RuleModel } from '../../rule.model';
import { ApiResponseModel } from '../../api-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  constructor(private ruleService: RuleService, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  rules: any[] = []

  loading = true;

  dialogRef: DialogContent

  displayedColumns: string[] = ['prog_rule_sgk', 'alert_id', 'field_name', 'conflict_code', 'supress_message', 'eff_start_dt', 'eff_end_dt', 'active_ind', 'actions'];

  dataSource: MatTableDataSource<any[]>;

  form: FormGroup;

  searchForm = this.formBuilder.group({
    alertId: '',
    fieldName: ''
  });

  ngOnInit(): void {
    this.ruleService.getAll().subscribe((data: RuleModel[]) => {
      this.rules = data;
      this.loading = false;
      this.dataSource = new MatTableDataSource<any>(this.rules)
    });

    this.form = new FormGroup({
      alertId: new FormControl(''),
      fieldName: new FormControl(''),
    });
  }

  searchRules() {
    this.loading = true;
    this.ruleService.search(this.searchForm.value.alertId, this.searchForm.value.fieldName).subscribe((data: RuleModel[]) => {
      this.rules = data;
      this.loading = false;
      this.dataSource = new MatTableDataSource<any>(this.rules)
    });
  }

  deleteRule(id: number) {
    this.ruleService.delete(id).subscribe((res: ApiResponseModel) => {
      this.dialog.open(DialogContent, {
        data: {
          message: res.message ? res.message : 'Something wrong at backend',
        },
      });
      this.ruleService.getAll().subscribe((data: RuleModel[]) => {
        this.rules = data;
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(this.rules)
      });
    });
  }

  editRule(id: number) {
    this.router.navigate(['/conflict-metadata-rule/' + id + '/edit'])
  }
}

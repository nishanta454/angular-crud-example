import { SearchResponse } from './../../rule.model';
import { DialogContent } from './../../dialog/dialog.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RuleService } from '../../rule.service';
import { Router } from "@angular/router"
import { RuleModel, SearchRequest } from '../../rule.model';
import { ApiResponseModel } from '../../api-response.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from "rxjs";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, AfterViewInit {

  constructor(private ruleService: RuleService, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  totalRecords = 10

  rules: any[] = []

  loading = true;

  dialogRef: DialogContent

  displayedColumns: string[] = ['prog_rule_sgk', 'alert_id', 'field_name', 'conflict_code', 'supress_message', 'eff_start_dt', 'eff_end_dt', 'active_ind', 'actions'];

  dataSource: MatTableDataSource<any[]>;

  form: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  searchForm = this.formBuilder.group({
    alertId: '',
    fieldName: ''
  });

  ngOnInit(): void {
    this.ruleService.search(new SearchRequest()).subscribe((response: SearchResponse) => {
      this.rules = response.rules;
      this.totalRecords = response.total_count;
      this.loading = false;
      this.dataSource = new MatTableDataSource<any>(this.rules)
    });

    this.form = new FormGroup({
      alertId: new FormControl(''),
      fieldName: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.ruleService.search(new SearchRequest()).subscribe((response: SearchResponse) => {
          this.rules = response.rules;
          this.totalRecords = response.total_count;
          this.loading = false;
          this.dataSource = new MatTableDataSource<any>(this.rules)
        }))
      )
      .subscribe();
  }

  searchRules() {
    this.loading = true;
    this.ruleService.search(new SearchRequest(this.searchForm.value.alertId, this.searchForm.value.fieldName)).subscribe((response: SearchResponse) => {
      this.rules = response.rules;
      this.totalRecords = response.total_count;
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
      this.ruleService.search(new SearchRequest()).subscribe((data: RuleModel[]) => {
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

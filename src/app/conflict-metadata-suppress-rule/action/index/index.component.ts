import { Component, OnInit, ViewChild } from '@angular/core';
import { RuleService } from '../../rule.service';
import {Router} from "@angular/router"
import { RuleModel } from '../../rule.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  rules:any[] = []

  loading = true;

  displayedColumns: string[] = ['prog_rule_sgk', 'alert_id', 'field_name', 'conflict_code', 'supress_message', 'eff_start_dt', 'eff_end_dt', 'active_ind', 'actions'];

  pageSize = 4;

  dataSource : MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private ruleService: RuleService, private router: Router) {}

  ngOnInit(): void {
    this.ruleService.getAll().subscribe((data: RuleModel[]) => {
      this.rules = data;
      console.log(this.rules);
    });
  }

  deleteRule(id: number) {
    this.ruleService.delete(id).subscribe((res) => {
      this.rules = this.rules.filter((item) => item.prog_rule_sgk !== id);
      console.log('Rule deleted successfully!');
    });
  }

  editRule(id: number) {
    this.router.navigate(['/conflict-metadata-rule/'+id+'/edit'])
  }
}

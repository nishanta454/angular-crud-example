import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../rule.service';
import { ActivatedRoute } from '@angular/router';
import { RuleModel } from '../../rule.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id: number;
  rule: RuleModel;
  loading = true;

  constructor(
    public ruleService: RuleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['ruleId'];

    this.ruleService.find(this.id).subscribe((data: RuleModel[]) => {
      this.loading = false;
      if (data && data instanceof Array) {
        this.rule = data[0];
      } else {
        this.rule = data;
      }
    });
  }
}

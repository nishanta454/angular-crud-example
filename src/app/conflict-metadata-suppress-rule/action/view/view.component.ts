import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../rule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RuleModel } from '../../rule.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  rule: RuleModel;

  constructor(
    public ruleService: RuleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    this.ruleService.find(this.id).subscribe((data: RuleModel) => {
      this.rule = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RuleService } from '../../rule.service';
import { RuleModel } from '../../rule.model';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  rules: RuleModel[] = [];

  constructor(public ruleService: RuleService) { }

  ngOnInit(): void {
    this.ruleService.getAll().subscribe((data: RuleModel[])=>{
      this.rules = data;
      console.log(this.rules);
    })
  }

  deleteRule(id:number){
    this.ruleService.delete(id).subscribe(res => {
         this.rules = this.rules.filter(item => item.id !== id);
         console.log('Rule deleted successfully!');
    })
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './action/index/index.component';
import { ViewComponent } from './action/view/view.component';
import { CreateComponent } from './action/create/create.component';
import { EditComponent } from './action/edit/edit.component';

const routes: Routes = [{ path: 'conflict-metadata-rule', redirectTo: 'conflict-metadata-rule/index', pathMatch: 'full' },
{ path: 'conflict-metadata-rule/index', component: IndexComponent },
{ path: 'conflict-metadata-rule/:ruleId/view', component: ViewComponent },
{ path: 'conflict-metadata-rule/create', component: CreateComponent },
{ path: 'conflict-metadata-rule/:ruleId/edit', component: EditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleRoutingModule { }

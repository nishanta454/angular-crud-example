export class RuleModel {
  prog_rule_sgk: number;
  alert_id: string;
  field_name: string;
  conflict_code: string;
  supress_message: string;
  suppress_reason: '';
  message_copy: string;
  eff_start_dt: string;
  eff_end_dt: string;
  active_ind: string;
  email_ids: string;
  prog_alert_eml_sgk: number;
}

export class SearchResponse {
  total_count: number;
  rules: RuleModel[];
}

export class SearchRequest {
  alertId?: string;
  fieldName?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;

  constructor(alertId?: string, fieldName?: string, sortBy?: string, sortOrder?: string, page?: number, limit?: number) {
    this.alertId = alertId;
    this.fieldName = fieldName;
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.page = page;
    this.limit = limit;
  }
}

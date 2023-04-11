interface ItemModel {
  id: number;
  user_id: number;
  amount: number;
  note?: string;
  tag_ids: number[];
  happen_at: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  kind: 'expenses' | 'income';
}

interface BalanceModel {
  balance: number;
  income: number;
  expenses: number;
}

declare namespace APIResponse {
  type Item = API.Resource<ItemModel>;
  type Items = API.Resources<ItemModel>;
  type Balance = API.Resource<BalanceModel>;
}

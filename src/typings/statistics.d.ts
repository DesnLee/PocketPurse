type LineChartData = [string, number];

declare namespace APIResponse {
  type LineChartDataList = API.ResourcesWithoutPager<LineChartData>;
}

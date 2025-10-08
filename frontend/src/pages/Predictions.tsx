import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { TrendingUp, TrendingDown, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import { Progress } from "../components/ui/progress";

const predictions = [
  {
    id: 1,
    product: "Rice (1kg)",
    currentStock: 120,
    predictedDemand: 85,
    trend: "stable",
    confidence: 92,
    recommendation: "Stock sufficient for next 2 weeks",
    status: "good"
  },
  {
    id: 2,
    product: "Cooking Oil",
    currentStock: 45,
    predictedDemand: 65,
    trend: "up",
    confidence: 88,
    recommendation: "Restock 30 units within 3 days",
    status: "warning"
  },
  {
    id: 3,
    product: "Soap Bar",
    currentStock: 8,
    predictedDemand: 42,
    trend: "up",
    confidence: 95,
    recommendation: "Urgent: Restock 50 units immediately",
    status: "critical"
  },
  {
    id: 4,
    product: "Bread",
    currentStock: 15,
    predictedDemand: 12,
    trend: "down",
    confidence: 85,
    recommendation: "Current stock adequate",
    status: "good"
  },
  {
    id: 5,
    product: "Milk (1L)",
    currentStock: 30,
    predictedDemand: 38,
    trend: "up",
    confidence: 90,
    recommendation: "Restock 20 units within 5 days",
    status: "warning"
  },
];

const Predictions = () => {
  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-primary" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <div className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === "critical") return <Badge variant="destructive">Critical</Badge>;
    if (status === "warning") return <Badge className="bg-warning text-white">Warning</Badge>;
    return <Badge className="bg-primary">Good</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Demand Predictions
          </h1>
          <p className="text-muted-foreground">AI-powered insights to optimize your inventory</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Predictions
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Needs immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restock Needed</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Items below optimal level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">High prediction accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Demand Forecast</CardTitle>
          <CardDescription>
            Based on historical sales data and seasonal trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Predicted Demand (7 days)</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((prediction) => (
                <TableRow key={prediction.id}>
                  <TableCell className="font-medium">{prediction.product}</TableCell>
                  <TableCell>{prediction.currentStock}</TableCell>
                  <TableCell className="font-semibold">{prediction.predictedDemand}</TableCell>
                  <TableCell>{getTrendIcon(prediction.trend)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Progress value={prediction.confidence} className="w-16" />
                        <span className="text-sm">{prediction.confidence}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(prediction.status)}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm">{prediction.recommendation}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            How AI Predictions Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Our AI analyzes your historical sales data, seasonal trends, and market patterns to predict future demand.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Predictions are updated daily based on recent sales</li>
            <li>Confidence levels indicate prediction accuracy</li>
            <li>Critical alerts help prevent stockouts</li>
            <li>Recommendations optimize inventory levels</li>
          </ul>
          <p className="mt-4 text-xs">
            <strong>Note:</strong> This is a demo interface. Connect your backend to enable real AI predictions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Predictions;

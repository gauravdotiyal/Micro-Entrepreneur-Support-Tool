import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";

const products = [
  { id: 1, name: "Rice (1kg)", price: 50 },
  { id: 2, name: "Cooking Oil", price: 180 },
  { id: 3, name: "Soap Bar", price: 25 },
  { id: 4, name: "Bread", price: 40 },
  { id: 5, name: "Milk (1L)", price: 65 },
];

const initialSales = [
  { id: 1, date: "2025-01-15", product: "Rice (1kg)", quantity: 5, total: 250 },
  { id: 2, date: "2025-01-15", product: "Cooking Oil", quantity: 2, total: 360 },
  { id: 3, date: "2025-01-14", product: "Bread", quantity: 10, total: 400 },
];

const Sales = () => {
  const [sales, setSales] = useState(initialSales);
  const [date, setDate] = useState<Date>();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();

  const handleRecordSale = (e: React.FormEvent) => {
    e.preventDefault();
    
    const product = products.find(p => p.name === selectedProduct);
    if (!product || !date || !quantity) return;

    const newSale = {
      id: sales.length + 1,
      date: format(date, "yyyy-MM-dd"),
      product: product.name,
      quantity: Number(quantity),
      total: product.price * Number(quantity),
    };

    setSales([newSale, ...sales]);
    setSelectedProduct("");
    setQuantity("");
    setDate(undefined);
    
    toast({
      title: "Sale recorded",
      description: `${quantity}x ${product.name} - ₹${newSale.total}`,
    });
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sales Recording</h1>
        <p className="text-muted-foreground">Record and track your daily sales transactions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Record New Sale</CardTitle>
            <CardDescription>Enter sale details to update inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRecordSale} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name} - ₹{product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button type="submit" className="w-full">Record Sale</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>Quick overview of today's sales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">Total Revenue</span>
              <span className="text-2xl font-bold">₹{totalRevenue}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">Total Transactions</span>
              <span className="text-2xl font-bold">{sales.length}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">Average Sale</span>
              <span className="text-2xl font-bold">
                ₹{sales.length > 0 ? (totalRevenue / sales.length).toFixed(2) : "0.00"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>View your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell className="font-medium">{sale.product}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell className="text-right font-semibold">₹{sale.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;

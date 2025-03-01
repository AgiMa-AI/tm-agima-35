
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GPUInstance } from '@/data/instances';
import { Server, Clock, Database, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InstanceDetailsProps {
  instance: GPUInstance;
}

const InstanceDetails = ({ instance }: InstanceDetailsProps) => {
  const [rentalPeriod, setRentalPeriod] = useState(1);
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  
  // Define badge styles based on availability
  const availabilityBadge = {
    available: <Badge variant="success">Available</Badge>,
    rented: <Badge variant="warning">In Use</Badge>,
    offline: <Badge variant="danger">Offline</Badge>,
  };
  
  const handleRentNow = () => {
    // Here we would handle the rental process
    setIsRentDialogOpen(false);
    // In a real app, you would call an API to initiate the rental
    console.log(`Renting instance ${instance.id} for ${rentalPeriod} hours at $${(instance.price * rentalPeriod).toFixed(2)}`);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between flex-col sm:flex-row gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">{instance.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    {availabilityBadge[instance.availability]}
                    <span className="text-muted-foreground">{instance.location}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${instance.price}</p>
                    <p className="text-sm text-muted-foreground">per hour</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">GPU</p>
                          <p className="text-muted-foreground">{instance.gpuModel} - {instance.gpuMemory} GB VRAM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Memory & Storage</p>
                          <p className="text-muted-foreground">
                            {instance.ramSize} GB RAM, {instance.storageSize} GB SSD
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">CPU</p>
                          <p className="text-muted-foreground">{instance.cpuCores} Cores</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Performance Score
                      </p>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full"
                          style={{ width: `${instance.performance}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">0</span>
                        <span className="text-xs font-medium">{instance.performance}/100</span>
                      </div>
                      
                      <p className="text-sm mt-6 mb-2">
                        This {instance.gpuModel} instance is ideal for:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Machine Learning & AI Training</li>
                        <li>High Performance Computing</li>
                        <li>Data Processing & Analytics</li>
                        <li>Rendering & Scientific Visualization</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Detailed Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(instance.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">{key}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Instance Type</span>
                          <span className="font-medium">GPU Optimized</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Operating System</span>
                          <span className="font-medium">{instance.specs.OS || 'Ubuntu 20.04'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Network</span>
                          <span className="font-medium">{instance.specs.Bandwidth || '10 Gbps'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Power Consumption</span>
                          <span className="font-medium">{instance.specs['Power Usage'] || 'N/A'} W</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Performance Metrics</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">GPU Performance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span>CUDA Speed</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>Tensor Operations</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 5, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>Memory Bandwidth</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 10, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">System Performance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span>CPU Speed</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 15, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>Disk I/O</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 8, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>Network</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 3, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Benchmark Results</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm font-semibold">TensorFlow</p>
                            <p className="text-2xl font-bold mt-1">
                              {Math.floor(instance.performance * 1.2)} FPS
                            </p>
                            <p className="text-xs text-muted-foreground">ResNet-50</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm font-semibold">PyTorch</p>
                            <p className="text-2xl font-bold mt-1">
                              {Math.floor(instance.performance * 1.1)} FPS
                            </p>
                            <p className="text-xs text-muted-foreground">BERT-Large</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm font-semibold">CUDA</p>
                            <p className="text-2xl font-bold mt-1">
                              {Math.floor(instance.performance * 0.8)} TFLOPS
                            </p>
                            <p className="text-xs text-muted-foreground">FP16 Performance</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Rental Options</CardTitle>
              <CardDescription>Configure and rent this instance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {instance.availability === 'available' ? (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Price</p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-primary">${instance.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">per hour</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Estimated monthly: ${(instance.price * 24 * 30).toFixed(2)}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Availability</p>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Ready to deploy instantly</span>
                    </div>
                  </div>
                  
                  <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Rent Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rent {instance.name}</DialogTitle>
                        <DialogDescription>
                          Configure your rental period and payment method.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="rental-period">Rental Period (hours)</Label>
                          <Input
                            id="rental-period"
                            type="number"
                            min="1"
                            value={rentalPeriod}
                            onChange={(e) => setRentalPeriod(parseInt(e.target.value))}
                          />
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm font-medium">Cost Summary</p>
                          <div className="flex justify-between mt-2">
                            <span className="text-muted-foreground">
                              {rentalPeriod} {rentalPeriod === 1 ? 'hour' : 'hours'} @ ${instance.price}/hr
                            </span>
                            <span className="font-medium">
                              ${(instance.price * rentalPeriod).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRentDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleRentNow}>
                          Confirm Rental
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-800 font-medium">
                      {instance.availability === 'rented' 
                        ? 'This instance is currently in use.' 
                        : 'This instance is currently offline.'}
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      {instance.availability === 'rented'
                        ? 'You can set an alert to be notified when it becomes available.'
                        : 'It may be under maintenance or temporarily unavailable.'}
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    {instance.availability === 'rented' ? 'Notify When Available' : 'View Similar Instances'}
                  </Button>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Need Help?</p>
                <p className="text-sm text-muted-foreground">
                  Our support team is available 24/7 to help you with any questions about this instance.
                </p>
                <Button variant="link" className="h-auto p-0">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstanceDetails;


import React from 'react';
import { HostMapData, StatsData, GpuData } from '@/types/chartData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ChartDataTablesProps {
  gpuComparisonData: GpuData[];
  hostMapData: HostMapData[];
  statsData: StatsData[];
  loading: boolean;
}

const ChartDataTables = ({ gpuComparisonData, hostMapData, statsData, loading }: ChartDataTablesProps) => {
  return (
    <>
      <div className="bg-background rounded-md shadow-md border-0">
        <div className="p-4 bg-muted/30">
          <h3 className="text-lg font-medium">GPU 数据表格</h3>
          <p className="text-sm text-muted-foreground">详细数据列表</p>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>GPU 型号</TableHead>
                <TableHead>性能分数</TableHead>
                <TableHead>价格 (¥/小时)</TableHead>
                <TableHead>内存 (GB)</TableHead>
                <TableHead>功率 (W)</TableHead>
                <TableHead>效率比</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">加载数据中...</TableCell>
                </TableRow>
              ) : (
                gpuComparisonData.map((gpu) => (
                  <TableRow key={gpu.name}>
                    <TableCell className="font-medium">{gpu.name}</TableCell>
                    <TableCell>{gpu.performance}</TableCell>
                    <TableCell>{gpu.price.toFixed(2)}</TableCell>
                    <TableCell>{gpu.memory}</TableCell>
                    <TableCell>{gpu.power}</TableCell>
                    <TableCell>{gpu.efficiency.toFixed(1)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="bg-background rounded-md shadow-md border-0 mt-4">
        <div className="p-4 bg-muted/30">
          <h3 className="text-lg font-medium">主机地图数据</h3>
          <p className="text-sm text-muted-foreground">地理位置分布数据</p>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>主机名称</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>经度</TableHead>
                <TableHead>纬度</TableHead>
                <TableHead>GPU 数量</TableHead>
                <TableHead>可用 GPU</TableHead>
                <TableHead>性能分数</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">加载数据中...</TableCell>
                </TableRow>
              ) : (
                hostMapData.map((host) => (
                  <TableRow key={host.name}>
                    <TableCell className="font-medium">{host.name}</TableCell>
                    <TableCell>{host.location}</TableCell>
                    <TableCell>{host.lng.toFixed(4)}</TableCell>
                    <TableCell>{host.lat.toFixed(4)}</TableCell>
                    <TableCell>{host.gpuCount}</TableCell>
                    <TableCell>{host.availableGpus}</TableCell>
                    <TableCell>{host.performance}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="bg-background rounded-md shadow-md border-0 mt-4">
        <div className="p-4 bg-muted/30">
          <h3 className="text-lg font-medium">性能统计数据</h3>
          <p className="text-sm text-muted-foreground">时间序列性能数据</p>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>时间戳</TableHead>
                <TableHead>GPU 使用率 (%)</TableHead>
                <TableHead>内存使用率 (%)</TableHead>
                <TableHead>温度 (°C)</TableHead>
                <TableHead>功率 (W)</TableHead>
                <TableHead>价格 (¥/小时)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">加载数据中...</TableCell>
                </TableRow>
              ) : (
                statsData.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(stat.timestamp).toLocaleString('zh-CN')}
                    </TableCell>
                    <TableCell>{stat.gpuUtilization.toFixed(1)}</TableCell>
                    <TableCell>{stat.memoryUsage.toFixed(1)}</TableCell>
                    <TableCell>{stat.temperature.toFixed(1)}</TableCell>
                    <TableCell>{stat.power.toFixed(1)}</TableCell>
                    <TableCell>{stat.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ChartDataTables;

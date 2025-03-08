
import React from 'react';

interface ResourceConfigurationProps {
  resourceType: string;
}

const ResourceConfiguration = ({ resourceType }: ResourceConfigurationProps) => {
  return (
    <div className="bg-muted/20 p-4 rounded-lg space-y-3">
      <h3 className="font-medium">计算资源配置</h3>
      <div className="grid grid-cols-2 gap-4">
        {resourceType === 'gpu' ? (
          <>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">GPU 型号</span>
              <span className="font-medium">NVIDIA A100</span>
            </div>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">单GPU内存</span>
              <span className="font-medium">80GB HBM2e</span>
            </div>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">CPU 配置</span>
              <span className="font-medium">64核 AMD EPYC</span>
            </div>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">系统内存</span>
              <span className="font-medium">512GB DDR4</span>
            </div>
          </>
        ) : (
          <>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">CPU 型号</span>
              <span className="font-medium">AMD EPYC 7763</span>
            </div>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">单核频率</span>
              <span className="font-medium">2.45 GHz (3.5 GHz加速)</span>
            </div>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">系统内存</span>
              <span className="font-medium">256GB DDR4</span>
            </div>
            <div className="bg-background rounded p-3 flex flex-col">
              <span className="text-xs text-muted-foreground">存储配置</span>
              <span className="font-medium">2TB NVMe SSD</span>
            </div>
          </>
        )}
      </div>
      <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-sm text-primary font-medium">按天租赁，超过3天享受优惠折扣</p>
      </div>
    </div>
  );
};

export default ResourceConfiguration;

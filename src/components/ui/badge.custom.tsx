
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const Badge = ({
  children,
  variant = 'default',
  size = 'default',
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        
        // Size styles
        size === 'default' && 'px-2.5 py-0.5 text-xs rounded-full',
        size === 'sm' && 'px-2 py-0.5 text-xs rounded-full',
        size === 'lg' && 'px-3 py-1 text-sm rounded-full',
        
        // Variant styles
        variant === 'default' && 
          'bg-primary/10 text-primary hover:bg-primary/20',
        variant === 'secondary' && 
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        variant === 'outline' && 
          'border border-border bg-transparent text-foreground hover:bg-muted/50',
        variant === 'success' && 
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800',
        variant === 'warning' && 
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800',
        variant === 'danger' && 
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800',
        
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
